/**
 * CartsController.js
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const moment = require('moment');

module.exports = {
    all: async (req, res) => {
        const { page = 1, perPage = 10 } = req.query;
        try {
            const cartData = await Carts.find({
                cart_id: req.session.id
            });

            const productData = await Products.find({
                id: cartData.map(item => item.product_id)
            })
                .populate('images');

            const productDetails = await ProductDetails.find({
                id: cartData.map(item => item.product_detail_id)
            }).populate('color_id').populate('sizes').populate('sales');

            const productSizeDetails = await ProductSizeDetails.find({
                id: cartData.map(item => item.product_size_detail_id)
            }).populate('size_id')

            res.json({
                success: 1,
                data: cartData.map(cartItem => {
                    return {
                        ...cartItem,
                        product: productData.filter(product => product.id == cartItem.product_id)[0],
                        productDetail: productDetails.filter(product => product.id == cartItem.product_detail_id)[0],
                        productSizeDetail: productSizeDetails.filter(product => product.id == cartItem.product_size_detail_id)[0],
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
    destroy: async (req, res) => {
        const { id } = req.params;

        try {
            const query = {
                id,
                cart_id: req.session.id
            };

            const cartItemFound = await Carts.findOne(query);

            if (!cartItemFound || !cartItemFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Sản phẩm không tồn tại trong giỏ hàng!'
                });
            }

            await Carts.destroyOne({ id });

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
    destroyAll: async (req, res) => {
        try {
            const query = {
                cart_id: req.session.id,
            };

            const cartData = await Carts.find(query);

            if (!cartData || cartData.length == 0) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Giỏ hàng hiện đang trống!'
                });
            }

            await Carts.destroy({ cart_id: req.session.id });

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
        const { product_id, product_detail_id, product_size_detail_id, quantity, price, sale_price } = req.body;

        try {
            const query = {
                id,
                cart_id: req.session.id,
            };

            const cartItemFound = await Carts.findOne(query);

            if (!cartItemFound || !cartItemFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Sản phẩm không tồn tại trong giỏ hàng!'
                });
            }

            const productSizeDetailFound = await ProductSizeDetails.findOne({ id: (product_size_detail_id || cartItemFound.product_size_detail_id) });

            if (!productSizeDetailFound || !productSizeDetailFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Thông số sản phẩm không tồn tại!'
                });
            }

            if ((quantity || 0) > productSizeDetailFound.quantity) {
                return res.status(400).json({
                    success: 0,
                    data: null,
                    message: 'Số lượng sản phẩm trong kho không còn đủ!'
                });
            }

            await Carts.updateOne({ id })
                .set({
                    product_id: product_id || cartItemFound.product_id,
                    product_detail_id: product_detail_id || cartItemFound.product_detail_id,
                    product_size_detail_id: product_size_detail_id || cartItemFound.product_size_detail_id,
                    quantity: quantity || cartItemFound.quantity,
                    price: price || cartItemFound.price,
                    sale_price: sale_price || cartItemFound.sale_price,
                });

            const cartUpdated = await Carts.findOne(query);

            return res.json({
                success: 1,
                data: cartUpdated,
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
        const { product_id, product_detail_id, product_size_detail_id, quantity, price, sale_price } = req.body;

        try {
            const productDetailFound = await ProductDetails.findOne({
                id: product_detail_id
            }).populate('color_id').populate('sizes').populate('sales');

            const now = moment().valueOf();

            const sales = productDetailFound && productDetailFound.sales ? productDetailFound.sales
                .filter(sale => moment(sale.start_date).startOf('date').valueOf() <= now && moment(sale.end_date).endOf('date').valueOf() >= now)
                .sort((a, b) => moment(b.start_date).startOf('date').valueOf() - moment(a.start_date).startOf('date').valueOf()) : [];

            const productSizeDetailFound = await ProductSizeDetails.findOne({ id: product_size_detail_id });

            if (!productSizeDetailFound || !productSizeDetailFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Thông số sản phẩm không tồn tại!'
                });
            }

            const cartItemFound = await Carts.findOne({
                product_id,
                product_detail_id,
                product_size_detail_id,
                cart_id: req.session.id,
            });

            if ((quantity + (cartItemFound && cartItemFound.id ? cartItemFound.quantity : 0)) > productSizeDetailFound.quantity) {
                return res.status(400).json({
                    success: 0,
                    data: null,
                    message: 'Số lượng sản phẩm trong kho không còn đủ!'
                });
            }

            if (cartItemFound && cartItemFound.id) {
                await Carts.updateOne({ id: cartItemFound.id })
                    .set({
                        quantity: quantity + cartItemFound.quantity,
                        price,
                        sale_price: sales && sales[0] ? sales[0].sale_price : sale_price,
                    });

                const cartUpdated = await Carts.findOne({ id: cartItemFound.id });

                return res.json({
                    success: 1,
                    data: cartUpdated,
                    message: '',
                });
            } else {
                const cartCreated = await Carts.create({
                    product_id,
                    product_detail_id,
                    product_size_detail_id,
                    quantity,
                    price,
                    sale_price: sales && sales[0] ? sales[0].sale_price : sale_price,
                    cart_id: req.session.id,
                }).fetch();

                return res.json({
                    success: 1,
                    data: cartCreated,
                    message: '',
                });
            }
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
