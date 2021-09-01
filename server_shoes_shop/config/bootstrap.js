/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */
const bcrypt = require('bcrypt');

module.exports.bootstrap = async function() {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  if (await Users.count() == 0) {
    await Users.createEach([
      { fullname: 'Admin', username: 'admin', password: bcrypt.hashSync("123456", 12), is_admin: true, type: 'basic' },
    ]);
  }
  
  if (await Categories.count() == 0) {
    await Categories.createEach([
      {
        id: 1,
        name: "Nam",
        slug: "nam",
        parent_id: null
      },
      {
        id: 2,
        name: "Nữ",
        slug: "nu",
        parent_id: null
      },
    ]);
  }
  
  // if (await Orders.count() == 0) {
  //   const order = await Orders.create(
  //     {
  //       customer_fullname: "Huynh Tuan Huy",
  //       customer_phone: "0372075655",
  //       customer_email: "huyht.work@gmail.com",
  //       customer_address: "Ha Noi, Viet Nam",
  //       status: 'pending',
  //       total: 20000
  //     },
  //   ).fetch();
  //   await OrderProductDetails.createEach([
  //     {
  //       order_id: order.id,
  //       product_detail_id: 1,
  //       product_size_detail_id: 1,
  //       quantity: 10,
  //       price: 100000,
  //       sale_price: 10000,
  //     },
  //     {
  //       order_id: order.id,
  //       product_detail_id: 1,
  //       product_size_detail_id: 2,
  //       quantity: 20,
  //       price: 150000,
  //       sale_price: 15000,
  //     },
  //   ]);
  // }
  // ```

};
