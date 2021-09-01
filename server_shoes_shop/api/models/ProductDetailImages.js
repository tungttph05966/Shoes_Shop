/**
 * ProductDetailImages.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    product_id: {
      model: 'Products',
    },

    image_path: {
      type: 'string',
      required: true,
    },

    thumb_path: {
      type: 'string',
      required: true,
    },
  },
  schema: true,
  tableName: 'product_detail_images'
};

