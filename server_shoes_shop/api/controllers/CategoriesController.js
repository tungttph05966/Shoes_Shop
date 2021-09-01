/**
 * CategoriesController.js
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const slug = require("slug");

 module.exports = {
    options: async (req, res) => {
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
    find: async (req, res) => {
        const { page = 1, perPage = 10, sorted = [], filtered = [] } = req.query;
        try {
            const filter = { parent_id: { '!': null } };

            if (filtered && filtered.length > 0) {
                for (let i = 0; i < filtered.length; i++) {
                    const filterItem = JSON.parse(filtered[i]);
                    if (filterItem.id && filterItem.value) {
                        filter[filterItem.id] = filterItem.id == "parent_id" ? filterItem.value : { contains: filterItem.value };
                    }
                }
            }

            const total = await Categories.count(filter);
            const categoryData = await Categories.find(filter)
                .limit(Number(perPage))
                .skip((Number(page)-1)*Number(perPage))
                .sort(sorted && sorted.length > 0 ? sorted.map(sortItem => JSON.parse(sortItem)).map(sortItem => ({ [sortItem.id]: sortItem.desc ? 'DESC' : 'ASC' })) : [])
                .populate('parent_id');

            res.json({
                success: 1,
                data: {
                    data: categoryData,
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
    destroy: async (req, res) => {
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

            const productCategoriesCount = await ProductCategories.count({ category_id: categoryFound.id });
            
            if (productCategoriesCount > 0) {
                return res.status(400).json({
                    success: 0,
                    data: null,
                    message: 'Không xóa được danh mục vì đã có sản phẩm!'
                });
            }

            await Categories.destroyOne({ id });

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
        const { name, parent_id } = req.body;

        try {
            const categoryExistFound = await Categories.findOne({ slug: slug(name), parent_id });

            if (categoryExistFound && categoryExistFound.id && categoryExistFound.id != id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Tên danh mục này đã tồn tại!'
                });
            }

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

            await Categories.updateOne({ id })
                .set({
                    name: name || categoryFound.name,
                    slug: slug(name || categoryFound.name),
                    parent_id: parent_id || categoryFound.parent_id,
                });

            const categoryUpdated = await Categories.findOne(query);

            return res.json({
                success: 1,
                data: categoryUpdated,
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
        const { name, parent_id } = req.body;

        try {
            const categoryFound = await Categories.findOne({ slug: slug(name), parent_id });

            if (categoryFound && categoryFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Tên danh mục này đã tồn tại!'
                });
            }

            const categoryCreated = await Categories.create({
                name,
                slug: slug(name),
                parent_id,
            }).fetch();

            return res.json({
                success: 1,
                data: categoryCreated,
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
