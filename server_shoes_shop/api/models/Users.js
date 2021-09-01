/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    fullname: 'string',
    phone: 'string',
    address: 'string',
    username: {
      type: 'string',
      required: true,
      unique: true,
    },
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    type: {
      type: 'string',
      isIn: ['basic', 'facebook', 'google'],
      defaultsTo: 'basic'
    },
    is_admin: {
      type: 'boolean',
      defaultsTo: false
    },
    verify_code: 'string',
    reset_password_code: 'string',
    favorite_products: {
      collection: 'UserFavoriteProducts',
      via: 'user_id',
    },
  },
  schema: true,
  tableName: 'users'
};

