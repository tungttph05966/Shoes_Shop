/**
 * ColorsController.js
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const slug = require("slug");

 module.exports = {
    options: async (req, res) => {
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

            const total = await Colors.count(filter);
            const colorData = await Colors.find(filter)
                .limit(Number(perPage))
                .skip((Number(page)-1)*Number(perPage))
                .sort(sorted && sorted.length > 0 ? sorted.map(sortItem => JSON.parse(sortItem)).map(sortItem => ({ [sortItem.id]: sortItem.desc ? 'DESC' : 'ASC' })) : []);

            res.json({
                success: 1,
                data: {
                    data: colorData,
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

            const colorFound = await Colors.findOne(query);

            if (!colorFound || !colorFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Màu sản phẩm không tồn tại!'
                });
            }

            return res.json({
                success: 1,
                data: colorFound,
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

            const colorFound = await Colors.findOne(query);

            if (!colorFound || !colorFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Màu sản phẩm không tồn tại!'
                });
            }

            const productDetailsCount = await ProductDetails.count({ color_id: colorFound.id });
            
            if (productDetailsCount > 0) {
                return res.status(400).json({
                    success: 0,
                    data: null,
                    message: 'Không xóa được màu vì đã có sản phẩm!'
                });
            }

            await Colors.destroyOne({ id });

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
        const { color_name, color_code } = req.body;

        try {
            const colorExistFound = await Colors.findOne({
                or: [
                    { color_name },
                    { color_code }
                ]
            });

            if (colorExistFound && colorExistFound.id && colorExistFound.id != id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Tên màu hoặc mã màu này đã tồn tại!'
                });
            }

            const query = {
                id,
            };

            const colorFound = await Colors.findOne(query);

            if (!colorFound || !colorFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Màu sản phẩm không tồn tại!'
                });
            }

            await Colors.updateOne({ id })
                .set({
                    color_name: color_name || colorFound.color_name,
                    color_code: color_code || colorFound.color_code,
                });

            const colorUpdated = await Colors.findOne(query);

            return res.json({
                success: 1,
                data: colorUpdated,
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
        const { color_name, color_code } = req.body;

        try {
            const colorExistFound = await Colors.findOne({
                or: [
                    { color_name },
                    { color_code }
                ]
            });

            if (colorExistFound && colorExistFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Tên màu hoặc mã màu này đã tồn tại!'
                });
            }

            const colorCreated = await Colors.create({
                color_name,
                color_code,
            }).fetch();

            return res.json({
                success: 1,
                data: colorCreated,
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
