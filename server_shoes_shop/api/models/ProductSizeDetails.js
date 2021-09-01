/**
 * ProductSizeDetails.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    product_detail_id: {
      model: 'ProductDetails',
    },
    
    size_id: {
      model: 'Sizes',
    },

    quantity: {
      type: 'number',
      defaultsTo: 0,
    },
  },
  schema: true,
  tableName: 'product_size_details'
};

