/**
 * DashboardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    dashboardInfo: async (req, res) => {
        try {
            const totalCusomer = await Users.count({ is_admin: false });
            const totalProduct = await Products.count({});
            const totalOrder = await Orders.count({});
            const totalPendingOrder = await Orders.count({ status: 'pending' });

            res.json({
                success: 1,
                data: {
                    totalCusomer,
                    totalProduct,
                    totalOrder,
                    totalPendingOrder,
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

