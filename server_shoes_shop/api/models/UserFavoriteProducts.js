/**
 * UserFavoriteProducts.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    user_id: {
      model: 'Users',
    },

    product_id: {
      model: 'Products',
    },
  },
  schema: true,
  tableName: 'user_favorite_products'
};

