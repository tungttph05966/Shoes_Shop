/**
 * ProductsController.js
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const slug = require('slug');

 module.exports = {
    find: async (req, res) => {
        const { page = 1, perPage = 10, sorted = [], filtered = [] } = req.query;
        try {
            const filter = {};

            if (filtered && filtered.length > 0) {
                for (let i = 0; i < filtered.length; i++) {
                    const filterItem = JSON.parse(filtered[i]);
                    if (filterItem.id && filterItem.value) {
                        filter[filterItem.id] = filterItem.id == "product_id" ? filterItem.value : { contains: filterItem.value };
                    }
                }
            }

            const total = await ProductDetailSales.count(filter);
            const productDetailSaleData = await ProductDetailSales.find(filter)
                .limit(Number(perPage))
                .skip((Number(page) - 1) * Number(perPage))
                .sort(sorted && sorted.length > 0 ? sorted.map(sortItem => JSON.parse(sortItem)).map(sortItem => ({ [sortItem.id]: sortItem.desc ? 'DESC' : 'ASC' })) : [])
                .populate('product_id');

            const product_details = await ProductDetails.find({
                id: {
                    in: productDetailSaleData.map(item => item.product_detail_id)
                }
            }).populate('color_id').populate('sizes');

            res.json({
                success: 1,
                data: {
                    data: productDetailSaleData.map(productDetailSale => {
                        return {
                            ...productDetailSale,
                            product_detail_id: product_details.filter(item => item.id == productDetailSale.product_detail_id)[0],
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

            const productDetailSaleFound = await ProductDetailSales.findOne(query).populate('product_detail_id').populate('product_id');

            if (!productDetailSaleFound || !productDetailSaleFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Chương trình khuyến mãi không tồn tại!'
                });
            }

            return res.json({
                success: 1,
                data: productDetailSaleFound,
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

            const productDetailSaleFound = await ProductDetailSales.findOne(query);

            if (!productDetailSaleFound || !productDetailSaleFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Chương trình khuyến mãi không tồn tại!'
                });
            }

            await ProductDetailSales.destroyOne({ id });

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
        const { product_id, product_detail_id, sale_price, start_date, end_date } = req.body;

        try {
            const query = {
                id,
            };

            const productDetailSaleFound = await ProductDetailSales.findOne(query);

            if (!productDetailSaleFound || !productDetailSaleFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Chương trình khuyến mãi không tồn tại!'
                });
            }

            await ProductDetailSales.updateOne({ id })
                .set({
                    product_id: product_id || productDetailSaleFound.product_id,
                    product_detail_id: product_detail_id || productDetailSaleFound.product_detail_id,
                    sale_price: sale_price || productDetailSaleFound.sale_price,
                    start_date: start_date || productDetailSaleFound.start_date,
                    end_date: end_date || productDetailSaleFound.end_date,
                });

            const productDetailSaleUpdated = await ProductDetailSales.findOne(query);

            return res.json({
                success: 1,
                data: productDetailSaleUpdated,
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
        const { product_id, product_detail_id, sale_price, start_date, end_date } = req.body;
        try {
            const productDetailSaleCreated = await ProductDetailSales.create({
                product_id,
                product_detail_id,
                sale_price,
                start_date,
                end_date,
            }).fetch();

            return res.json({
                success: 1,
                data: productDetailSaleCreated,
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
