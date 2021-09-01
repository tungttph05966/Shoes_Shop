/**
 * OrderProductDetails.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    order_id: {
      model: 'Orders',
    },

    product_detail_id: {
      model: 'ProductDetails',
    },

    product_size_detail_id: {
      model: 'ProductSizeDetails',
    },

    quantity: {
      type: 'number',
      required: true,
    },

    price: {
      type: 'number',
      required: true,
    },

    sale_price: {
      type: 'number',
      required: true,
    },
  },
  schema: true,
  tableName: 'order_product_details'
};

