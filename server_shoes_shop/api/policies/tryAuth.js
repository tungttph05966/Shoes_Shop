/**
 * auth
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */
module.exports = async (req, res, next) => {
  const { userInfo } = req.session;
  
  if (userInfo) {
    const { username } = req.session.userInfo;
    const userFound = await Users.findOne({ username });

    if (!userFound || !userFound.id) {
      return res.status(404).json({
        success: 0,
        data: null,
        message: 'Tài khoản này không tồn tại.'
      });
    }

    req.user = userFound;
    next();
  } else {
    return res.status(401).json({
      success: 0,
      data: null,
      message: 'Bạn cần đăng nhập để truy cập hệ thống!'
    });
  }
};
