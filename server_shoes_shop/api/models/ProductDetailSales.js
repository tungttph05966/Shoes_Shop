/**
 * ProductDetailSales.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    product_id: {
      model: 'Products',
    },

    product_detail_id: {
      model: 'ProductDetails',
    },

    sale_price: {
      type: 'number',
      required: true,
    },

    start_date: {
      type: 'string',
    },

    end_date: {
      type: 'string',
    },
  },
  schema: true,
  tableName: 'product_detail_sales'
};

