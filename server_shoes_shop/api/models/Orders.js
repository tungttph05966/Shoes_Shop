/**
 * Orders.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    user_id: {
      model: 'Users',
    },

    customer_fullname: {
      type: 'string',
      required: true,
    },

    customer_phone: {
      type: 'string',
      required: true,
    },

    customer_email: {
      type: 'string',
      required: true,
    },

    customer_address: {
      type: 'string',
      required: true,
    },

    status: {
      type: 'string',
      isIn: ['pending', 'processing', 'packed', 'shipping', 'accomplished', 'cancelled'],
      defaultsTo: 'pending'
    },

    total: {
      type: 'number',
      required: true,
    },

    order_product_details: {
      collection: 'OrderProductDetails',
      via: 'order_id',
    },
  },
  schema: true,
  tableName: 'orders'
};

