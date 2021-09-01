/**
 * FrontendController.js
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const slug = require("slug");
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = {
    getOrders: async (req, res) => {
        const { page = 1, perPage = 10 } = req.query;

        try {
            const total = await Orders.count({
                user_id: req.session.userInfo.id,
            });
            const orderData = await Orders.find({
                user_id: req.session.userInfo.id,
            }).sort('created_at DESC').limit(Number(perPage)).skip((Number(page) - 1) * Number(perPage)).populate('order_product_details');

            res.json({
                success: 1,
                data: {
                    data: orderData,
                    page: Number(page),
                    total: total,
                    perPage: Number(perPage),
                    totalPage: Math.ceil(Number(total) / Number(perPage)),
                },
                message: '',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: 0,
                data: null,
                message: error && error.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
            });
        }
    },
    getOrderById: async (req, res) => {
        const { id } = req.params;

        try {
            const orderFound = await Orders.findOne({
                id,
                user_id: req.session.userInfo.id,
            }).populate('order_product_details');

            if (!orderFound || !orderFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Đơn hàng không tồn tại!',
                });
            }

            const orderProductDetails = await OrderProductDetails.find({ order_id: orderFound.id });

            const productDetails = await ProductDetails.find({ id: orderProductDetails.map(item => item.product_detail_id) }).populate('product_id').populate('color_id');
            const productSizeDetails = await ProductSizeDetails.find({ id: orderProductDetails.map(item => item.product_size_detail_id) }).populate('size_id');

            res.json({
                success: 1,
                data: {
                    ...orderFound,
                    order_product_details: orderProductDetails.map(item => {
                        return {
                            ...item,
                            product_detail: productDetails.filter(productDetail => productDetail.id == item.product_detail_id)[0],
                            product_size_detail: productSizeDetails.filter(productSizeDetail => productSizeDetail.id == item.product_size_detail_id)[0],
                        }
                    }),
                },
                message: '',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: 0,
                data: null,
                message: error && error.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
            });
        }
    },
    createOrder: async (req, res) => {
        const { fullname, phone, address, email, password, carts } = req.body;

        if (!fullname || !phone || !address || !carts || carts.length == 0) {
            return res.status(400).json({
                success: 0,
                data: null,
                message: 'Bạn cần điền đầy đủ thông tin!'
            });
        }

        try {
            let userFound = await Users.findOne({ username: email || (req.session && req.session.userInfo && req.session.userInfo.username || null) });
            if ((!userFound || !userFound.id) && email && password) {
                userFound = await Users.create({
                    fullname,
                    phone,
                    address,
                    email,
                    username: email,
                    password: bcrypt.hashSync(password, 12),
                    type: 'basic',
                }).fetch();
            }

            if ((!userFound || !userFound.id)) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Người dùng không tồn tại!'
                });
            }

            const orderCreated = await Orders.create({
                user_id: userFound.id,
                customer_fullname: fullname,
                customer_phone: phone,
                customer_email: email || userFound.email,
                customer_address: address,
                status: 'pending',
                total: carts.reduce((total, cartItem) => total + cartItem.quantity * (cartItem.sale_price || cartItem.price || 0), 0),
            }).fetch();

            for (let i = 0; i < carts.length; i++) {
                const cartItem = carts[i];
                await OrderProductDetails.create({
                    order_id: orderCreated.id,
                    product_detail_id: cartItem.productDetail.id,
                    product_size_detail_id: cartItem.productSizeDetail.id,
                    quantity: cartItem.quantity,
                    price: cartItem.price,
                    sale_price: cartItem.sale_price,
                });
            }

            res.json({
                success: 1,
                data: orderCreated,
                message: '',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: 0,
                data: null,
                message: error && error.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
            });
        }
    },
    getProductBySlug: async (req, res) => {
        const { productSlug } = req.params;
        try {
            const productFound = await Products.findOne({
                slug: productSlug,
            }).populate('images');

            if (!productFound || !productFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Sản phẩm không tồn tại!',
                });
            }

            const productDetail = await ProductDetails.findOne({
                product_id: productFound.id
            }).populate('color_id').populate('sizes').populate('sales');

            const productSizeDetails = await ProductSizeDetails.find({
                id: productDetail.sizes.map(size => size.id)
            }).populate('size_id')

            let productFavorite = null;
            if (req.session && req.session.userInfo && req.session.userInfo.id) {
                productFavorite = await UserFavoriteProducts.findOne({
                    product_id: productFound.id,
                    user_id: req.session.userInfo.id,
                });
            }

            const now = moment().valueOf();

            await Products.updateOne({ id: productFound.id })
                .set({
                    views: productFound.views + 1,
                });

            res.json({
                success: 1,
                data: {
                    ...productFound,
                    is_favorite: productFavorite && productFavorite.id ? true : false,
                    product_detail: {
                        ...productDetail,
                        sales: productDetail.sales
                            .filter(sale => moment(sale.start_date).startOf('date').valueOf() <= now && moment(sale.end_date).endOf('date').valueOf() >= now)
                            .sort((a, b) => moment(b.start_date).startOf('date').valueOf() - moment(a.start_date).startOf('date').valueOf()),
                        sizes: productSizeDetails.filter(_item => {
                            return productDetail.sizes.map(size => size.id).includes(_item.id);
                        }),
                    }
                },
                message: '',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: 0,
                data: null,
                message: error && error.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
            });
        }
    },
    filterProducts: async (req, res) => {
        const { page = 1, perPage = 9, sorted = '', filtered = '' } = req.query;
        try {
            let category_parent_slug = null;
            let category = null;
            let color = null;
            let sizes = [];
            let priceRange = [0, 100000000];

            try {
                const filteredParser = JSON.parse(filtered);

                category_parent_slug = filteredParser.category_parent_slug;
                category = filteredParser.category;
                color = filteredParser.color;
                sizes = filteredParser.sizes;
                priceRange = filteredParser.priceRange;
            } catch (error) {
            }

            const productSizeDetails = await ProductSizeDetails.find(sizes && sizes.length > 0 ? {
                size_id: sizes,
            } : {});

            const productDetailQuery = {
                id: productSizeDetails.map(item => item.product_detail_id),
                price: { '>=': priceRange && priceRange[0] || 0, '<=': priceRange && priceRange[1] || 100000000 },
            };

            if (color) {
                productDetailQuery.color_id = color;
            }

            const productDetails = await ProductDetails.find(productDetailQuery).populate('color_id').populate('sizes').populate('sales');;

            const productCategoryQuery = {
                product_id: productDetails.map(item => item.product_id),
            };

            if (category) {
                productCategoryQuery.category_id = category;
            }

            const productCategories = await ProductCategories.find(productCategoryQuery);

            const productQuery = {};

            if (category) {
                productQuery.id = productCategories.map(item => item.product_id).filter(productId => productDetails.map(item => item.product_id).includes(productId));
            } else if (category_parent_slug) {
                const categoryFound = await Categories.findOne({ slug: category_parent_slug });
                productQuery.category_parent = categoryFound && categoryFound.id || null;
                productQuery.id = productDetails.map(item => item.product_id);
            }

            const total = await Products.count(productQuery);
            const productData = await Products.find(productQuery)
                .limit(Number(perPage))
                .skip((Number(page) - 1) * Number(perPage))
                .sort(sorted)
                .populate('images');

            const now = moment().valueOf();

            for (let i = 0; i < productData.length; i++) {
                const product = productData[i];

                let productFavorite = null;
                if (req.session && req.session.userInfo && req.session.userInfo.id) {
                    productFavorite = await UserFavoriteProducts.findOne({
                        product_id: product.id,
                        user_id: req.session.userInfo.id,
                    });
                }

                productData[i] = {
                    ...product,
                    is_favorite: productFavorite && productFavorite.id ? true : false,
                    product_detail: productDetails.filter(productDetail => productDetail.product_id == product.id).sort((a, b) => b.sales.length - a.sales.length).map(productDetail => {
                        return {
                            ...productDetail,
                            sales: productDetail.sales
                                .filter(sale => moment(sale.start_date).startOf('date').valueOf() <= now && moment(sale.end_date).endOf('date').valueOf() >= now)
                                .sort((a, b) => moment(b.start_date).startOf('date').valueOf() - moment(a.start_date).startOf('date').valueOf())
                        }
                    })[0],
                };
            }

            res.json({
                success: 1,
                data: {
                    data: productData,
                    page: Number(page),
                    total: total,
                    perPage: Number(perPage),
                    totalPage: Math.ceil(Number(total) / Number(perPage)),
                },
                message: '',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: 0,
                data: null,
                message: error && error.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
            });
        }
    },
    productColors: async (req, res) => {
        try {
            const colorData = await Colors.find({});

            res.json({
                success: 1,
                data: colorData,
                message: '',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: 0,
                data: null,
                message: error && error.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
            });
        }
    },
    productSizes: async (req, res) => {
        try {
            const sizeData = await Sizes.find({});

            res.json({
                success: 1,
                data: sizeData,
                message: '',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: 0,
                data: null,
                message: error && error.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
            });
        }
    },
    topSalesProducts: async (req, res) => {
        try {
            const productSaleData = await ProductDetailSales.find({
                start_date: { '<=': moment().startOf('date').toISOString() },
                end_date: { '>=': moment().startOf('date').toISOString() },
            }).sort([{ created_at: 'DESC' }]);
            console.log(productSaleData);
            const productIds = [];

            for (let i = 0; i < productSaleData.length; i++) {
                if (productSaleData[i] && productSaleData[i].product_id && !productIds.includes(productSaleData[i].product_id)) {
                    productIds.push(productSaleData[i].product_id);
                }
            }

            const productData = await Products.find({ is_disable: false, id: productIds })
                .limit(10)
                .sort([{ sold: 'DESC' }])
                .populate('images');

            const productDetails = await ProductDetails.find({
                product_id: {
                    in: productData.map(product => product.id),
                }
            }).populate('color_id').populate('sizes').populate('sales');

            const now = moment().valueOf();

            for (let i = 0; i < productData.length; i++) {
                const product = productData[i];

                let productFavorite = null;
                if (req.session && req.session.userInfo && req.session.userInfo.id) {
                    productFavorite = await UserFavoriteProducts.findOne({
                        product_id: product.id,
                        user_id: req.session.userInfo.id,
                    });
                }

                productData[i] = {
                    ...product,
                    is_favorite: productFavorite && productFavorite.id ? true : false,
                    product_detail: productDetails.filter(productDetail => productDetail.product_id == product.id).sort((a, b) => b.sales.length - a.sales.length).map(productDetail => {
                        return {
                            ...productDetail,
                            sales: productDetail.sales
                                .filter(sale => moment(sale.start_date).startOf('date').valueOf() <= now && moment(sale.end_date).endOf('date').valueOf() >= now)
                                .sort((a, b) => moment(b.start_date).startOf('date').valueOf() - moment(a.start_date).startOf('date').valueOf())
                        }
                    })[0],
                };
            }

            res.json({
                success: 1,
                data: productData,
                message: '',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: 0,
                data: null,
                message: error && error.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
            });
        }
    },
    topFeaturedProducts: async (req, res) => {
        try {
            const productData = await Products.find({ is_disable: false, sold: { '>': 0 } })
                .limit(10)
                .sort([{ sold: 'DESC' }])
                .populate('images');

            const productDetails = await ProductDetails.find({
                product_id: {
                    in: productData.map(product => product.id),
                }
            }).populate('color_id').populate('sizes').populate('sales');

            const now = moment().valueOf();

            for (let i = 0; i < productData.length; i++) {
                const product = productData[i];

                let productFavorite = null;
                if (req.session && req.session.userInfo && req.session.userInfo.id) {
                    productFavorite = await UserFavoriteProducts.findOne({
                        product_id: product.id,
                        user_id: req.session.userInfo.id,
                    });
                }

                productData[i] = {
                    ...product,
                    is_favorite: productFavorite && productFavorite.id ? true : false,
                    product_detail: productDetails.filter(productDetail => productDetail.product_id == product.id).sort((a, b) => b.sales.length - a.sales.length).map(productDetail => {
                        return {
                            ...productDetail,
                            sales: productDetail.sales
                                .filter(sale => moment(sale.start_date).startOf('date').valueOf() <= now && moment(sale.end_date).endOf('date').valueOf() >= now)
                                .sort((a, b) => moment(b.start_date).startOf('date').valueOf() - moment(a.start_date).startOf('date').valueOf())
                        }
                    })[0],
                };
            }

            res.json({
                success: 1,
                data: productData,
                message: '',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: 0,
                data: null,
                message: error && error.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
            });
        }
    },
    topViewProducts: async (req, res) => {
        try {
            const productData = await Products.find({ is_disable: false, views: { '>': 0 } })
                .limit(10)
                .sort([{ views: 'DESC' }])
                .populate('images');

            const productDetails = await ProductDetails.find({
                product_id: {
                    in: productData.map(product => product.id),
                }
            }).populate('color_id').populate('sizes').populate('sales');

            const now = moment().valueOf();

            for (let i = 0; i < productData.length; i++) {
                const product = productData[i];

                let productFavorite = null;
                if (req.session && req.session.userInfo && req.session.userInfo.id) {
                    productFavorite = await UserFavoriteProducts.findOne({
                        product_id: product.id,
                        user_id: req.session.userInfo.id,
                    });
                }

                productData[i] = {
                    ...product,
                    is_favorite: productFavorite && productFavorite.id ? true : false,
                    product_detail: productDetails.filter(productDetail => productDetail.product_id == product.id).sort((a, b) => b.sales.length - a.sales.length).map(productDetail => {
                        return {
                            ...productDetail,
                            sales: productDetail.sales
                                .filter(sale => moment(sale.start_date).startOf('date').valueOf() <= now && moment(sale.end_date).endOf('date').valueOf() >= now)
                                .sort((a, b) => moment(b.start_date).startOf('date').valueOf() - moment(a.start_date).startOf('date').valueOf())
                        }
                    })[0],
                };
            }

            res.json({
                success: 1,
                data: productData,
                message: '',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: 0,
                data: null,
                message: error && error.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
            });
        }
    },
    topNewProducts: async (req, res) => {
        try {
            const productData = await Products.find({ is_disable: false, is_new: true })
                .limit(10)
                .sort([{ updated_at: 'DESC' }])
                .populate('images');

            const productDetails = await ProductDetails.find({
                product_id: {
                    in: productData.map(product => product.id),
                }
            }).populate('color_id').populate('sizes').populate('sales');

            const now = moment().valueOf();


            for (let i = 0; i < productData.length; i++) {
                const product = productData[i];

                let productFavorite = null;
                if (req.session && req.session.userInfo && req.session.userInfo.id) {
                    productFavorite = await UserFavoriteProducts.findOne({
                        product_id: product.id,
                        user_id: req.session.userInfo.id,
                    });
                }

                productData[i] = {
                    ...product,
                    is_favorite: productFavorite && productFavorite.id ? true : false,
                    product_detail: productDetails.filter(productDetail => productDetail.product_id == product.id).sort((a, b) => b.sales.length - a.sales.length).map(productDetail => {
                        return {
                            ...productDetail,
                            sales: productDetail.sales
                                .filter(sale => moment(sale.start_date).startOf('date').valueOf() <= now && moment(sale.end_date).endOf('date').valueOf() >= now)
                                .sort((a, b) => moment(b.start_date).startOf('date').valueOf() - moment(a.start_date).startOf('date').valueOf())
                        }
                    })[0],
                };
            }

            res.json({
                success: 1,
                data: productData,
                message: '',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: 0,
                data: null,
                message: error && error.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
            });
        }
    },
    findCategoryOptions: async (req, res) => {
        try {
            const categoryData = await Categories.find({});

            res.json({
                success: 1,
                data: categoryData,
                message: '',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: 0,
                data: null,
                message: error && error.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
            });
        }
    },
    findCategories: async (req, res) => {
        const { page = 1, perPage = 10, sorted = [], filtered = [] } = req.query;
        try {
            const categoryData = await Categories.find({ parent_id: null })
                .populate('children');

            res.json({
                success: 1,
                data: categoryData,
                message: '',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: 0,
                data: null,
                message: error && error.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
            });
        }
    },
    findOneCategory: async (req, res) => {
        const { id } = req.params;

        try {
            const query = {
                id,
            };

            const categoryFound = await Categories.findOne(query);

            if (!categoryFound || !categoryFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Danh mục sản phẩm không tồn tại!'
                });
            }

            return res.json({
                success: 1,
                data: categoryFound,
                message: '',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: 0,
                data: null,
                message: error && error.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
            });
        }
    },
};
