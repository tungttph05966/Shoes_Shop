/**
 * Categories.js
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
      required: true,
    },

    parent_id: {
      model: 'Categories',
    },

    children: {
      collection: 'Categories',
      via: 'parent_id',
    },
  },
  schema: true,
  tableName: 'categories'
};

