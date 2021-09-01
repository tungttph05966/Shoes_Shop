/**
 * UserController.js
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt');

module.exports = {
    options: async (req, res) => {
        try {
            const userData = await Users.find({ is_admin: false });

            res.json({
                success: 1,
                data: userData,
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
            const filter = { is_admin: false };

            if (filtered && filtered.length > 0) {
                for (let i = 0; i < filtered.length; i++) {
                    const filterItem = JSON.parse(filtered[i]);
                    if (filterItem.id && filterItem.value) {
                        filter[filterItem.id] = { contains: filterItem.value };
                    }
                }
            }

            const total = await Users.count(filter);
            const userData = await Users.find(filter)
                .limit(Number(perPage))
                .skip((Number(page) - 1) * Number(perPage))
                .sort(sorted && sorted.length > 0 ? sorted.map(sortItem => JSON.parse(sortItem)).map(sortItem => ({ [sortItem.id]: sortItem.desc ? 'DESC' : 'ASC' })) : []);

            res.json({
                success: 1,
                data: {
                    data: userData,
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

            const userFound = await Users.findOne(query);

            if (!userFound || !userFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Người dùng không tồn tại!'
                });
            }

            return res.json({
                success: 1,
                data: userFound,
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

            const userFound = await Users.findOne(query);

            if (!userFound || !userFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Người dùng không tồn tại!'
                });
            }

            await Users.destroyOne({ id });

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
        const { fullname, phone, address, email, password } = req.body;

        try {
            if (email) {
                const userExist = await Users.findOne({ email });
    
                if (userExist && userExist.id && userExist.id != id) {
                    return res.status(400).json({
                        success: 0,
                        data: null,
                        message: 'Đã tồn tại tài khoản với địa chỉ email này!'
                    });
                }
            }

            const query = {
                id,
            };

            const userFound = await Users.findOne(query);

            if (!userFound || !userFound.id) {
                return res.status(404).json({
                    success: 0,
                    data: null,
                    message: 'Người dùng không tồn tại!'
                });
            }

            await Users.updateOne({ id })
                .set({
                    fullname: fullname || userFound.fullname,
                    phone: phone || userFound.phone,
                    address: address || userFound.address,
                    email: email || userFound.email,
                    password: password ? bcrypt.hashSync(password, 12) : userFound.password,
                });

            const userUpdated = await Users.findOne(query);

            return res.json({
                success: 1,
                data: userUpdated,
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
        const { fullname, phone, address, username, email, password } = req.body;
        try {
            const userFound = (await Users.find({
                or: [
                    { username },
                    { email }
                ]
            }))[0];

            if (userFound && userFound.id) {
                if (userFound.username == username) {
                    return res.status(400).json({
                        success: 0,
                        data: null,
                        message: 'Đã tồn tại tài khoản với tên đăng nhập này!'
                    });
                }
                
                if (email && userFound.email == email) {
                    return res.status(400).json({
                        success: 0,
                        data: null,
                        message: 'Đã tồn tại tài khoản với địa chỉ email này!'
                    });
                }
            }

            const userCreated = await Users.create({
                fullname,
                phone,
                address,
                username,
                email,
                password: bcrypt.hashSync(password, 12),
                type: 'basic',
            }).fetch();

            return res.json({
                success: 1,
                data: userCreated,
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
