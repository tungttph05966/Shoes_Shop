/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const path = require('path');
const fs = require('fs');
const fileType = require('file-type');

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  'GET /api/auth/check': 'AuthController.checkAuth',
  'POST /api/auth/signin': 'AuthController.signIn',
  'POST /api/auth/signup': 'AuthController.signUp',
  'GET /api/auth/signout': 'AuthController.signOut',
  'POST /api/auth/reset-account': 'AuthController.resetAccount',
  'POST /api/auth/recover-account': 'AuthController.recoverAccount',
  'POST /api/auth/profile': 'AuthController.updateProfile',
  'POST /api/auth/change-password': 'AuthController.changePassword',

  'GET /api/categories/options': 'CategoriesController.options',

  'GET /api/users/options': 'UsersController.options',

  'GET /api/colors/options': 'ColorsController.options',

  'GET /api/sizes/options': 'SizesController.options',

  'GET /api/dashboards': 'DashboardController.dashboardInfo',

  'GET /api/statistics/order': 'StatisticController.totalOrder', 
  'GET /api/statistics/income': 'StatisticController.totalIncome', 
  'GET /api/statistics/inventory': 'StatisticController.inventory', 

  'GET /api/fe/categories/options': 'FrontendController.findCategoryOptions',
  'GET /api/fe/categories': 'FrontendController.findCategories', 
  'GET /api/fe/categories/:id': 'FrontendController.findOneCategory', 
  'GET /api/fe/products/top-featured': 'FrontendController.topFeaturedProducts',
  'GET /api/fe/products/top-view': 'FrontendController.topViewProducts',
  'GET /api/fe/products/top-new': 'FrontendController.topNewProducts',
  'GET /api/fe/products/top-sales': 'FrontendController.topSalesProducts',
  'GET /api/fe/products/colors': 'FrontendController.productColors',
  'GET /api/fe/products/sizes': 'FrontendController.productSizes',
  'GET /api/fe/products': 'FrontendController.filterProducts',
  'GET /api/fe/products/:productSlug/by-slug': 'FrontendController.getProductBySlug',
  'GET /api/fe/orders/:id': 'FrontendController.getOrderById',
  'GET /api/fe/orders': 'FrontendController.getOrders',
  'POST /api/fe/orders': 'FrontendController.createOrder',
  'GET /api/fe/favorites': 'UserFavoriteProductsController.find',
  'DELETE /api/fe/favorites/:product_id': 'UserFavoriteProductsController.destroy',
  'POST /api/fe/favorites': 'UserFavoriteProductsController.create',
  'GET /api/fe/carts': 'CartsController.all',
  'DELETE /api/fe/carts/:id': 'CartsController.destroy',
  'POST /api/fe/carts/delete-all': 'CartsController.destroyAll',
  'PUT /api/fe/carts/:id': 'CartsController.update',
  'POST /api/fe/carts': 'CartsController.create',

  'POST /api/upload': 'FileController.upload',

  '/images/*': (req, res) => {
    if (req.params && req.params[0]) {
      const urlFile = path.resolve(__dirname, '../assets/images', req.params[0]);
      console.log(urlFile)
      if (fs.existsSync(urlFile)) {
        const image = fs.readFileSync(urlFile);
        res.writeHead(200, { 'Content-Type': fileType(image).mime });
        res.end(image, 'binary');
      } else res.status(404).send('File not found!');
    } else res.status(400).send();
  },
};
