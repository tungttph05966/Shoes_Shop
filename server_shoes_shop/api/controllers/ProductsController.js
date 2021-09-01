/**
 * ProductsController.js
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const slug = require('slug');
const moment = require('moment');

module.exports = {
    options: async (req, res) => {
        try {
            const productData = await Products.find({}).populate('categories');

            const categories = await ProductCategories.find({
                id: {
                    in: productData.reduce((total, item) => {
                        return [
                            ...total,
                            ...(item.categories || []).map(category => category.category_id)
                        ]
                    }, [])
                }
            });

            const product_details = await ProductDetails.find({
                product_id: {
                    in: productData.map(product => product.id),
                }
            }).populate('color_id').populate('sizes').populate('sales');

            const product_size_details = await ProductSizeDetails.find({
                id: {
                    in: product_details.reduce((total, item) => [...total, ...item.sizes.map(item => item.id)], []),
                }
            }).populate('size_id');

            const now = moment().valueOf();

            res.json({
                success: 1,
                data: productData.map(product => {
                    return {
                        ...product,
                        categories: (product.categories || []).map(category => {
                            return {
                                ...category,
                                category: categories.filter(item => item.id == category.category_id)[0],
                            }
                        }),
                        product_detail: product_details.filter(item => item.product_id == product.id).sort((a, b) => b.sales.length - a.sales.length).map(item => {
                            return {
                                ...item,
                                sizes: product_size_details.filter(size => item.sizes.map(_item => _item.id).includes(size.id)),
                                sales: item.sales
                                    .filter(sale => moment(sale.start_date).startOf('date').valueOf() <= now && moment(sale.end_date).endOf('date').valueOf() >= now)
                                    .sort((a, b) => moment(b.start_date).startOf('date').valueOf() - moment(a.start_date).startOf('date').valueOf())
                            }
                        })[0],
                    }
                }),
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
    find: async (req, res) => {
        const { page = 1, perPage = 10, sorted = [], filtered = [] } = req.query;
        try {
            const filter = {};

            if (filtered && filtered.length > 0) {
                for (let i = 0; i < filtered.length; i++) {
                    const filterItem = JSON.parse(filtered[i]);
                    if (filterItem.id && filterItem.value) {
                        filter[filterItem.id] = { contains: filterItem.value };
                    }
                }
            }

            const total = await Products.count(filter);
            const productData = await Products.find(filter)
                .limit(Number(perPage))
                .skip((Number(page) - 1) * Number(perPage))
                .sort(sorted && sorted.length > 0 ? sorted.map(sortItem => JSON.parse(sortItem)).map(sortItem => ({ [sortItem.id]: sortItem.desc ? 'DESC' : 'ASC' })) : [])
                .populate('categories');

            const product_details = await ProductDetails.find({
                product_id: {
                    in: productData.map(product => product.id),
                }
            }).populate('sales');

            const categories = await Categories.find({
                id: {
                    in: productData.reduce((total, item) => {
                        return [
                            ...total,
                            ...(item.categories || []).map(category => category.category_id)
                        ]
                    }, [])
                }
            });

            res.json({
                success: 1,
                data: {
                    data: productData.map(product => {
                        return {
                            ...product,
                            categories: (product.categories || []).map(category => {
                                return {
                                    ...category,
                                    category: categories.filter(item => item.id == category.category_id)[0],
                                }
                            }),
                            product_detail: product_details.filter(item => item.product_id == product.id).sort((a, b) => b.sales.length - a.sales.length)[0],
                        }
                    }),
                    page: Number(page),
                    total: total,
                    perPage: Number(perPage),
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
    findOne: async (req, res) => {
        const { id } = req.params;

        try {
            const query = {
                id,
            };

            const productFound = await Products.findOne(query).populate('categories').populate('images');

            if (!productFound || !productFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Sản phẩm không tồn tại!'
                });
            }

            const categories = await ProductCategories.find({
                id: {
                    in: productFound.categories.map(item => item.id),
                }
            }).populate('category_id');

            const product_detail = await ProductDetails.findOne({
                product_id: productFound.id
            }).populate('color_id').populate('sizes');

            const sizes = await ProductSizeDetails.find({
                id: product_detail && product_detail.sizes && product_detail.sizes.map(sizeItem => sizeItem.id) || [],
            }).populate('size_id');

            return res.json({
                success: 1,
                data: {
                    ...productFound,
                    categories,
                    product_detail: {
                        ...product_detail,
                        sizes,
                    },
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
    destroy: async (req, res) => {
        const { id } = req.params;

        try {
            const query = {
                id,
            };

            const productFound = await Products.findOne(query);

            if (!productFound || !productFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Sản phẩm không tồn tại!'
                });
            }

            await Products.destroyOne({ id });
            await ProductCategories.destroy({
                product_id: id,
            });

            return res.json({
                success: 1,
                data: null,
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
    update: async (req, res) => {
        const { id } = req.params;
        const { name, is_disable, description, is_new, category_parent, categories, product_detail, images } = req.body;

        try {
            const query = {
                id,
            };

            const productFound = await Products.findOne(query).populate('categories').populate('images');

            if (!productFound || !productFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Sản phẩm không tồn tại!'
                });
            }

            await Products.updateOne({ id })
                .set({
                    name: name || productFound.name,
                    slug: slug(name || productFound.name),
                    category_parent,
                    description,
                    is_new,
                    is_disable,
                });

            if (images) {
                const imagesToDelete = [];
                for (let i = 0; i < productFound.images.length; i++) {
                    if (!images.filter(image => image.id).map(image => image.id).includes(productFound.images[i].id)) {
                        imagesToDelete.push(productFound.images[i].id);
                    }
                }
                await ProductDetailImages.destroy({
                    id: {
                        in: imagesToDelete
                    }
                });

                for (let i = 0; i < images.length; i++) {
                    if (!images[i].id) {
                        const productDetailImageCreated = await ProductDetailImages.create({
                            product_id: id,
                            image_path: images[i].url,
                            thumb_path: images[i].url,
                        }).fetch();
                    }
                }
            }

            if (categories) {
                const categoriesToDelete = [];
                for (let i = 0; i < productFound.categories.length; i++) {
                    if (!categories.includes(productFound.categories[i].category_id)) {
                        categoriesToDelete.push(productFound.categories[i].id);
                    }
                }
                await ProductCategories.destroy({
                    id: {
                        in: categoriesToDelete
                    }
                });

                for (let i = 0; i < categories.length; i++) {
                    if (!productFound.categories.map(category => category.category_id).includes(categories[i])) {
                        await ProductCategories.create({
                            category_id: categories[i],
                            product_id: productFound.id,
                        });
                    }
                }
            }

            if (product_detail) {
                if (!product_detail.id) {
                    const productDetailFound = await ProductDetails.findOne({
                        product_id: productFound.id
                    }).populate('color_id').populate('sizes');

                    if (productDetailFound && productDetailFound.id) {
                        await ProductDetails.destroy({
                            id: productDetailFound.id,
                        });
                    }

                    const productDetailCreated = await ProductDetails.create({
                        product_id: productFound.id,
                        color_id: product_detail.color_id,
                        price: product_detail.price,
                    }).fetch();

                    if (product_detail.sizes && product_detail.sizes.length > 0) {
                        for (let j = 0; j < product_detail.sizes.length; j++) {
                            const size_detail = product_detail.sizes[j];

                            const productSizeDetailCreated = await ProductSizeDetails.create({
                                product_detail_id: productDetailCreated.id,
                                size_id: size_detail.size_id,
                                quantity: size_detail.quantity,
                            }).fetch();
                        }
                    }
                } else {
                    await ProductDetails.updateOne({
                        id: product_detail.id
                    }).set({
                        color_id: product_detail.color_id,
                        price: product_detail.price,
                    });

                    for (let j = 0; j < product_detail.sizes.length; j++) {
                        const product_size_detail = product_detail.sizes[j];

                        if (!product_size_detail.id) {
                            const productSizeDetailCreated = await ProductSizeDetails.create({
                                product_detail_id: product_detail.id,
                                size_id: product_size_detail.size_id,
                                quantity: product_size_detail.quantity,
                            }).fetch();
                        } else {
                            await ProductSizeDetails.updateOne({
                                id: product_size_detail.id
                            }).set({
                                size_id: product_size_detail.size_id,
                                quantity: product_size_detail.quantity,
                            });
                        }
                    }
                }
            }

            const productUpdated = await Products.findOne(query);

            return res.json({
                success: 1,
                data: productUpdated,
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
    create: async (req, res) => {
        const { name, description, is_new, is_disable, category_parent, categories, product_detail, images } = req.body;
        try {
            const lastProduct = await Products.find({}).sort('id DESC').limit(1);

            const productCreated = await Products.create({
                name,
                slug: slug(name),
                sku: `MSP${lastProduct[0] && lastProduct[0].id ? lastProduct[0].id + 1 : 1}`,
                category_parent,
                description,
                is_new,
                is_disable,
            }).fetch();

            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];

                await ProductCategories.create({
                    category_id: category,
                    product_id: productCreated.id,
                });
            }

            if (product_detail) {
                const productDetailCreated = await ProductDetails.create({
                    product_id: productCreated.id,
                    color_id: product_detail.color_id,
                    price: product_detail.price,
                }).fetch();

                if (product_detail.sizes && product_detail.sizes.length > 0) {
                    for (let j = 0; j < product_detail.sizes.length; j++) {
                        const size_detail = product_detail.sizes[j];

                        const productSizeDetailCreated = await ProductSizeDetails.create({
                            product_detail_id: productDetailCreated.id,
                            size_id: size_detail.size_id,
                            quantity: size_detail.quantity,
                        }).fetch();
                    }
                }
            }

            for (let i = 0; i < images.length; i++) {
                const imageUrl = images[i];

                const productDetailImageCreated = await ProductDetailImages.create({
                    product_id: productCreated.id,
                    image_path: imageUrl,
                    thumb_path: imageUrl,
                }).fetch();
            }

            return res.json({
                success: 1,
                data: productCreated,
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
