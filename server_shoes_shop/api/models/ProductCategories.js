/**
 * ProductCategories.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    category_id: {
      model: 'Categories',
    },

    product_id: {
      model: 'Products',
    },
  },
  schema: true,
  tableName: 'product_categories'
};

