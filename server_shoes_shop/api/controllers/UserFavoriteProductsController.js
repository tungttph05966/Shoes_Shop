/**
 * UserFavoriteProductsController.js
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const slug = require('slug');
const moment = require('moment');

module.exports = {
    find: async (req, res) => {
        const { page = 1, perPage = 9 } = req.query;
        try {
            const filter = {
                user_id: req.session.userInfo.id,
            };

            const total = await UserFavoriteProducts.count(filter);
            const favoriteProductData = await UserFavoriteProducts.find(filter)
                .limit(Number(perPage))
                .skip((Number(page) - 1) * Number(perPage));

            const products = await Products.find({
                id: {
                    in: favoriteProductData.map(item => item.product_id),
                }
            }).populate('images');

            const productDetails = await ProductDetails.find({
                product_id: {
                    in: products.map(product => product.id),
                }
            }).populate('color_id').populate('sizes').populate('sales');

            const now = moment().valueOf();

            res.json({
                success: 1,
                data: {
                    data: favoriteProductData.map(favoriteProduct => {
                        const product = products.filter(item => item.id == favoriteProduct.product_id)[0];
                        return {
                            ...favoriteProduct,
                            product: product ? {
                                ...product,
                                is_favorite: true,
                                product_detail: productDetails.filter(productDetail => productDetail.product_id == product.id).sort((a, b) => b.sales.length - a.sales.length).map(productDetail => {
                                    return {
                                        ...productDetail,
                                        sales: productDetail.sales
                                            .filter(sale => moment(sale.start_date).startOf('date').valueOf() <= now && moment(sale.end_date).endOf('date').valueOf() >= now)
                                            .sort((a, b) => moment(b.start_date).startOf('date').valueOf() - moment(a.start_date).startOf('date').valueOf()),
                                    }
                                })[0]
                            } : null,
                        }
                    }),
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
    destroy: async (req, res) => {
        const { product_id } = req.params;

        try {
            const query = {
                product_id,
                user_id: req.session.userInfo.id,
            };

            const userFavoriteProductFound = await UserFavoriteProducts.findOne(query);

            if (!userFavoriteProductFound || !userFavoriteProductFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Sản phẩm không nằm trong danh sách yêu thích!'
                });
            }

            await UserFavoriteProducts.destroy(query);

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
    create: async (req, res) => {
        const { product_id } = req.body;
        try {
            const userFavoriteProductExist = await UserFavoriteProducts.findOne({
                product_id,
                user_id: req.session.userInfo.id,
            });

            if (userFavoriteProductExist && userFavoriteProductExist.id) {
                return res.status(400).json({
                    success: 0,
                    data: null,
                    message: 'Sản phẩm này đã nằm trong danh sách yêu thích của bạn rồi!'
                });
            }

            const userFavoriteProductCreated = await UserFavoriteProducts.create({
                product_id,
                user_id: req.session.userInfo.id,
            }).fetch();

            return res.json({
                success: 1,
                data: userFavoriteProductCreated,
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
