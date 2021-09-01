/**
 * SizesController.js
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const slug = require("slug");

 module.exports = {
    options: async (req, res) => {
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

            const total = await Sizes.count(filter);
            const sizeData = await Sizes.find(filter)
                .limit(Number(perPage))
                .skip((Number(page)-1)*Number(perPage))
                .sort(sorted && sorted.length > 0 ? sorted.map(sortItem => JSON.parse(sortItem)).map(sortItem => ({ [sortItem.id]: sortItem.desc ? 'DESC' : 'ASC' })) : []);

            res.json({
                success: 1,
                data: {
                    data: sizeData,
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

            const sizeFound = await Sizes.findOne(query);

            if (!sizeFound || !sizeFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Size sản phẩm không tồn tại!'
                });
            }

            return res.json({
                success: 1,
                data: sizeFound,
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

            const sizeFound = await Sizes.findOne(query);

            if (!sizeFound || !sizeFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Size sản phẩm không tồn tại!'
                });
            }

            const productSizeDetailsCount = await ProductSizeDetails.count({ size_id: sizeFound.id });
            
            if (productSizeDetailsCount > 0) {
                return res.status(400).json({
                    success: 0,
                    data: null,
                    message: 'Không xóa được màu vì đã có sản phẩm!'
                });
            }

            await Sizes.destroyOne({ id });

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
        const { size, size_code } = req.body;

        try {
            const sizeExistFound = await Sizes.findOne({
                or: [
                    { size },
                    { size_code }
                ]
            });

            if (sizeExistFound && sizeExistFound.id && sizeExistFound.id != id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Size hoặc mã size này đã tồn tại!'
                });
            }

            const query = {
                id,
            };

            const sizeFound = await Sizes.findOne(query);

            if (!sizeFound || !sizeFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Size sản phẩm không tồn tại!'
                });
            }

            await Sizes.updateOne({ id })
                .set({
                    size: size || sizeFound.size,
                    size_code: size_code || sizeFound.size_code,
                });

            const sizeUpdated = await Sizes.findOne(query);

            return res.json({
                success: 1,
                data: sizeUpdated,
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
        const { size, size_code } = req.body;

        try {
            const sizeExistFound = await Sizes.findOne({
                or: [
                    { size },
                    { size_code }
                ]
            });

            if (sizeExistFound && sizeExistFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Size hoặc mã size này đã tồn tại!'
                });
            }

            const sizeCreated = await Sizes.create({
                size,
                size_code,
            }).fetch();

            return res.json({
                success: 1,
                data: sizeCreated,
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
