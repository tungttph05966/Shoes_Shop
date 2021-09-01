import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from '../reducers';
import {
  watchAuth,
  watchProductCategories,
  watchUsers,
  watchProducts,
  watchProductDetailSales,
  watchOrders,
  watchColors,
  watchSizes,
} from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchProductCategories);
sagaMiddleware.run(watchUsers);
sagaMiddleware.run(watchProducts);
sagaMiddleware.run(watchProductDetailSales);
sagaMiddleware.run(watchOrders);
sagaMiddleware.run(watchColors);
sagaMiddleware.run(watchSizes);

export default store;
