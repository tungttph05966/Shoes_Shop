/**
 * Products.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    slug: {
      type: 'string',
      unique: true,
      required: true,
    },
    sku: {
      type: 'string',
      unique: true,
      required: true,
    },
    description: {
      type: 'string',
      columnType: 'longtext',
    },
    views: {
      type: 'number',
      defaultsTo: 0
    },
    sold: {
      type: 'number',
      defaultsTo: 0
    },
    is_new: {
      type: 'boolean',
      defaultsTo: false
    },
    is_disable: {
      type: 'boolean',
      defaultsTo: false
    },
    category_parent: {
      model: 'ProductCategories',
    },
    categories: {
      collection: 'ProductCategories',
      via: 'product_id',
    },
    images: {
      collection: 'ProductDetailImages',
      via: 'product_id',
    },
  },
  schema: true,
  tableName: 'products'
};