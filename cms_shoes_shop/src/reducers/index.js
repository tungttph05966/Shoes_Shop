import { combineReducers } from 'redux';

import auth from './auth';
import common from './common';
import productCategories from './productCategories';
import users from './users';
import products from './products';
import productDetailSales from './productDetailSales';
import orders from './orders';
import colors from './colors';
import sizes from './sizes';

const rootReducer = combineReducers({
    auth,
    common,
    productCategories,
    users,
    products,
    productDetailSales,
    orders,
    colors,
    sizes,
})

export default rootReducer;
