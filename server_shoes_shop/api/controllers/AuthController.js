/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcrypt');
const randomstring = require('randomstring');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const emailService = require('../services/EmailService');

module.exports = {
	checkAuth: async (req, res) => {
		if (req.session.userInfo && req.session.userInfo.username) {
			const { username } = req.session.userInfo;
			const userFound = await Users.findOne({ username });
			if (!userFound || !userFound.id) {
				return res.status(404).json({
					success: 0,
					data: null,
					message: 'Tài khoản này không tồn tại.'
				});
			}

			res.json({
				success: 1,
				data: {
					...req.session.userInfo,
					address: userFound.address,
					phone: userFound.phone,
				},
				message: '',
			});
		} else {
			res.status(401).json({
				success: 0,
				data: null,
				message: 'Bạn cần đăng nhập để truy cập hệ thống!'
			});
		}
	},
	updateProfile: async (req, res) => {
		const { fullname, phone, address } = req.body;

		if (req.session.userInfo && req.session.userInfo.username) {
			const { username } = req.session.userInfo;
			const userFound = await Users.findOne({ username });
			if (!userFound || !userFound.id) {
				return res.status(404).json({
					success: 0,
					data: null,
					message: 'Tài khoản này không tồn tại.'
				});
			}

			await Users.updateOne({ id: userFound.id })
				.set({
					fullname: fullname || userFound.fullname,
					address: address,
					phone: phone,
				});

			res.json({
				success: 1,
				data: null,
				message: '',
			});
		} else {
			res.status(401).json({
				success: 0,
				data: null,
				message: 'Bạn cần đăng nhập để truy cập hệ thống!'
			});
		}
	},
	signIn: async (req, res) => {
		const { username, password } = req.body;

		if (!username || !password) {
			return res.status(400).json({
				success: 0,
				data: null,
				message: 'Thiếu tài khoản hoặc mật khẩu.'
			});
		}

		try {
			const userFound = await Users.findOne({ username });

			if (!userFound || !userFound.id) {
				return res.status(404).json({
					success: 0,
					data: null,
					message: 'Tài khoản này không tồn tại!'
				});
			}

			if (bcrypt.compareSync(password, userFound.password)) {
				req.session.userInfo = {
					username,
					email: userFound.email,
					fullname: userFound.fullname,
					is_admin: userFound.is_admin,
					id: userFound.id
				};
				return res.json({
					success: 1,
					data: {
						...req.session.userInfo,
						address: userFound.address,
						phone: userFound.phone,
					},
					message: '',
				});
			} else {
				return res.status(401).json({
					success: 0,
					data: null,
					message: 'Sai mật khẩu!'
				});
			}
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: 0,
				data: null,
				message: 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
			});
		}
	},
	signUp: async (req, res) => {
		const { email, password, fullname } = req.body;

		if (!email || !password || !fullname) {
			return res.status(400).json({
				success: 0,
				data: null,
				message: 'Cần điền đầy đủ thông tin.'
			});
		}

		try {
			const hashPassword = bcrypt.hashSync(password, 12);
			const now = new Date();

			const userFoundByUsername = await Users.findOne({ username: email });

			if (userFoundByUsername && userFoundByUsername.id) {
				return res.status(400).json({
					success: 0,
					data: null,
					message: 'Tài khoản này đã tồn tại!'
				});
			}

			const userFoundByEmail = await Users.findOne({ email });

			if (userFoundByEmail && userFoundByEmail.id) {
				return res.status(400).json({
					success: 0,
					data: null,
					message: 'Địa chỉ email này đã được dùng để đăng ký một tài khoản khác!'
				});
			}

			const user = await Users.create({
				email,
				username: email,
				password: hashPassword,
				fullname,
			}).fetch();

			return res.json({
				success: 1,
				data: {
					username: email,
					email,
					fullname,
				},
				message: '',
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: 0,
				data: null,
				message: error && error.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
			});
		}
	},
	signOut: (req, res) => {
		if (req.session.userInfo) {
			req.session.userInfo = undefined;
			req.session.destroy();
		}

		res.json({
			success: 1,
			data: null,
			message: '',
		})
	},
	recoverAccount: async (req, res) => {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({
				success: 0,
				data: null,
				message: 'Cần điền đầy đủ thông tin.'
			});
		}

		try {
			const userFound = await Users.findOne({ email });

			if (!userFound || !userFound.id) {
				return res.status(404).json({
					success: 0,
					data: null,
					message: 'Không có tài khoản nào được đăng ký với địa chỉ email này.'
				});
			}

			await Users.updateOne({ id: userFound.id })
				.set({
					reset_password_code: '123456',
				});

			res.json({
				success: 1,
				data: null,
				message: '',
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: 0,
				data: null,
				message: error && error.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
			});
		}
	},
	resetAccount: async (req, res) => {
		const { email, new_password } = req.body;

		if (!email || !new_password) {
			return res.status(400).json({
				success: 0,
				data: null,
				message: 'Cần điền đầy đủ thông tin.'
			});
		}

		try {
			const userFound = await Users.findOne({ email, reset_password_code: '123456', });

			if (!userFound || !userFound.id) {
				return res.status(404).json({
					success: 0,
					data: null,
					message: 'Không có tài khoản nào được đăng ký với địa chỉ email này.'
				});
			}

			const hashPassword = bcrypt.hashSync(new_password, 12);

			await Users.updateOne({ id: userFound.id })
				.set({
					password: hashPassword,
					reset_password_code: '',
				});

			res.json({
				success: 1,
				data: null,
				message: '',
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: 0,
				data: null,
				message: error && error.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
			});
		}
	},
	changePassword: async (req, res) => {
		const { new_password, old_password } = req.body;

		if (!old_password || !new_password) {
			return res.status(400).json({
				success: 0,
				data: null,
				message: 'Cần điền đầy đủ thông tin.'
			});
		}

		try {
			if (req.session.userInfo && req.session.userInfo.username) {
				const { username } = req.session.userInfo;
				const userFound = await Users.findOne({ username });

				if (!userFound || !userFound.id) {
					return res.status(401).json({
						success: 0,
						data: null,
						message: 'Bạn cần đăng nhập để truy cập chức năng này.'
					});
				}

				if (!bcrypt.compareSync(old_password, userFound.password)) {
					return res.status(400).json({
						success: 0,
						data: null,
						message: 'Mật khẩu hiện tại không đúng.'
					});
				}

				const hashPassword = bcrypt.hashSync(new_password, 12);

				await Users.updateOne({ id: userFound.id })
					.set({
						password: hashPassword,
					});

				res.json({
					success: 1,
					data: null,
					message: '',
				});
			} else {
				res.status(401).json({
					success: 0,
					data: null,
					message: 'Bạn cần đăng nhập để truy cập hệ thống!'
				});
			}
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: 0,
				data: null,
				message: error && error.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau!'
			});
		}
	},
};

