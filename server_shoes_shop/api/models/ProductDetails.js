/**
 * ProductDetails.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    product_id: {
      model: 'Products',
      unique: true,
    },
    
    color_id: {
      model: 'Colors',
    },

    price: {
      type: 'number',
      required: true,
    },

    sizes: {
      collection: 'ProductSizeDetails',
      via: 'product_detail_id',
    },

    sales: {
      collection: 'ProductDetailSales',
      via: 'product_detail_id',
    },
  },
  schema: true,
  tableName: 'product_details'
};

