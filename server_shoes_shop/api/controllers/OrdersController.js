/**
 * OrdersController.js
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
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

            const total = await Orders.count(filter);
            const orderData = await Orders.find(filter)
                .limit(Number(perPage))
                .skip((Number(page) - 1) * Number(perPage))
                .sort(sorted && sorted.length > 0 ? sorted.map(sortItem => JSON.parse(sortItem)).map(sortItem => ({ [sortItem.id]: sortItem.desc ? 'DESC' : 'ASC' })) : []);

            res.json({
                success: 1,
                data: {
                    data: orderData,
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

            const orderFound = await Orders.findOne(query);

            if (!orderFound || !orderFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Đơn hàng không tồn tại!'
                });
            }

            const order_product_details = await OrderProductDetails.find({ order_id: orderFound.id });

            const product_details = await ProductDetails.find({
                id: {
                    in: order_product_details.map(item => item.product_detail_id),
                }
            }).populate('product_id').populate('color_id');

            return res.json({
                success: 1,
                data: {
                    ...orderFound,
                    order_product_details: order_product_details.map(item => {
                        return {
                            ...item,
                            product_detail: product_details.filter(_item => _item.id == item.product_detail_id)[0],
                        };
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
    update: async (req, res) => {
        const { id } = req.params;
        const { user_id, customer_fullname, customer_phone, customer_email, customer_address, status, order_product_details, total } = req.body;

        try {
            const query = {
                id,
            };

            const orderFound = await Orders.findOne(query).populate('order_product_details');

            if (!orderFound || !orderFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Đơn hàng không tồn tại!'
                });
            }

            if (orderFound.status == 'accomplished') {
                return res.status(400).json({
                    success: 0,
                    data: null,
                    message: 'Đơn hàng đã hoàn thành!'
                });
            }

            if (orderFound.status == 'cancelled') {
                return res.status(400).json({
                    success: 0,
                    data: null,
                    message: 'Đơn hàng đã bị hủy!'
                });
            }

            // if (orderFound.status == 'shipping') {
            //     return res.status(400).json({
            //         success: 0,
            //         data: null,
            //         message: 'Đơn hàng hiện đang được giao!'
            //     });
            // }

            await Orders.updateOne({ id })
                .set({
                    user_id,
                    customer_fullname,
                    customer_phone,
                    customer_email,
                    customer_address,
                    status,
                    total: order_product_details.reduce((total, order_detail) => total + (order_detail.quantity * (order_detail.sale_price || order_detail.price)), 0)
                });

            if (status == 'accomplished') {
                if (orderFound.order_product_details && orderFound.order_product_details.length > 0) {
                    for (let i = 0; i < orderFound.order_product_details.length; i++) {
                        const order_product_detail = orderFound.order_product_details[i];
                        if (order_product_detail && order_product_detail.product_detail_id) {
                            const productDetail = await ProductDetails.findOne({ id: order_product_detail.product_detail_id })
                                .populate('product_id');

                            if (productDetail && productDetail.product_id && productDetail.product_id.id) {
                                await Products.updateOne({
                                    where: {
                                        id: productDetail.product_id.id
                                    }
                                }).set({
                                    sold: productDetail.product_id.sold + order_product_detail.quantity,
                                });
                            }
                        }
                        if (order_product_detail && order_product_detail.product_size_detail_id) {
                            const productSizeDetail = await ProductSizeDetails.findOne({ id: order_product_detail.product_size_detail_id });

                            if (productSizeDetail && productSizeDetail.id) {
                                await ProductSizeDetails.updateOne({
                                    where: {
                                        id: productSizeDetail.id
                                    }
                                }).set({
                                    quantity: productSizeDetail.quantity - order_product_detail.quantity,
                                });
                            }
                        }
                    }
                }
            } else {
                if (order_product_details) {
                    const orderProductDetailsToDelete = [];
                    for (let i = 0; i < orderFound.order_product_details.length; i++) {
                        if (!order_product_details.filter(order_product_detail => order_product_detail.id).map(order_product_detail => order_product_detail.id).includes(orderFound.order_product_details[i].id)) {
                            orderProductDetailsToDelete.push(orderFound.order_product_details[i].id);
                        }
                    }
                    await OrderProductDetails.destroy({
                        id: {
                            in: orderProductDetailsToDelete
                        }
                    });

                    for (let i = 0; i < order_product_details.length; i++) {
                        const order_product_detail = order_product_details[i];
                        if (!order_product_detail.id) {
                            await OrderProductDetails.create({
                                order_id: orderFound.id,
                                product_detail_id: order_product_detail.product_detail_id,
                                product_size_detail_id: order_product_detail.product_size_detail_id,
                                quantity: order_product_detail.quantity,
                                price: order_product_detail.price,
                                sale_price: order_product_detail.sale_price,
                            });
                        } else {
                            await OrderProductDetails.updateOne({
                                id: order_product_detail.id
                            }).set({
                                product_detail_id: order_product_detail.product_detail_id,
                                product_size_detail_id: order_product_detail.product_size_detail_id,
                                quantity: order_product_detail.quantity,
                                price: order_product_detail.price,
                                sale_price: order_product_detail.sale_price,
                            });
                        }
                    }
                }
            }

            const orderUpdated = await Orders.findOne(query);

            return res.json({
                success: 1,
                data: orderUpdated,
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
