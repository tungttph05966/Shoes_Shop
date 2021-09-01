/**
 * isSuperAdmin
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */
module.exports = function (req, res, next) {
  if (!req.user || !req.user.is_admin) {
    return res.status(401).json({
      success: 0,
      data: null,
      message: 'Tài khoản của bạn không có quyền truy cập tài nguyên này!'
    });
  }

  next();
};