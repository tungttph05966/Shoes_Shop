/**
 * DashboardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

module.exports = {
    totalOrder: async (req, res) => {
        let { start_date, end_date } = req.query;

        try {
            start_date = start_date ? moment(Number(start_date)).startOf('date').valueOf() : moment().startOf('date').add(-7, 'day').valueOf();
            end_date = end_date ? moment(Number(end_date)).endOf('date').valueOf() : moment().endOf('date').valueOf();

            const orderData = await Orders.find({
                created_at: { '>=': start_date, '<=': end_date }
            });

            const range = moment.range(moment(start_date), moment(end_date));
            const totalOrder = Array.from(range.by('day')).map(day => {
                return { [day.valueOf()]: orderData.filter(orderItem => orderItem.created_at >= moment(day).startOf('date').valueOf() && orderItem.created_at <= moment(day).endOf('date').valueOf()).length }
            });

            res.json({
                success: 1,
                data: totalOrder,
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
    totalIncome: async (req, res) => {
        let { start_date, end_date } = req.query;

        try {
            start_date = start_date ? moment(Number(start_date)).startOf('date').valueOf() : moment().startOf('date').add(-7, 'day').valueOf();
            end_date = end_date ? moment(Number(end_date)).endOf('date').valueOf() : moment().endOf('date').valueOf();

            const orderData = await Orders.find({
                created_at: { '>=': start_date, '<=': end_date },
                status: 'accomplished',
            });

            const range = moment.range(moment(start_date), moment(end_date));
            const totalOrder = Array.from(range.by('day')).map(day => {
                return {
                    [day.valueOf()]: orderData.filter(orderItem => orderItem.created_at >= moment(day).startOf('date').valueOf() && orderItem.created_at <= moment(day).endOf('date').valueOf()).reduce((total, orderItem) => {
                        return total += orderItem.total;
                    }, 0),
                }
            });

            res.json({
                success: 1,
                data: totalOrder,
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
    inventory: async (req, res) => {
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
                .sort(sorted && sorted.length > 0 ? sorted.map(sortItem => JSON.parse(sortItem)).map(sortItem => ({ [sortItem.id]: sortItem.desc ? 'DESC' : 'ASC' })) : []);

            const productDetails = await ProductDetails.find({
                product_id: productData.map(product => product.id)
            }).populate('color_id').populate('sizes');

            res.json({
                success: 1,
                data: {
                    data: productData.map(product => {
                        const product_detail = productDetails.filter(productDetail => productDetail.product_id == product.id)[0];
                        return {
                            ...product,
                            product_detail: product_detail,
                            totalInventory: product_detail && (product_detail.sizes || []).reduce((totalQuantity, productSizeDetail) => {
                                return totalQuantity += productSizeDetail.quantity;
                            }, 0) || 0,
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
};

