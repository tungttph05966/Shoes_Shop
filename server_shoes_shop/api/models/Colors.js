/**
 * Colors.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    color_name: {
      type: 'string',
      required: true,
    },

    color_code: {
      type: 'string',
      required: true,
    },
  },
  schema: true,
  tableName: 'colors'
};

