/**
 * ProductDetailSizes.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    size: {
      type: 'string',
      required: true,
    },

    size_code: {
      type: 'string',
      required: true,
    },
  },
  schema: true,
  tableName: 'sizes'
};

