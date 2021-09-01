import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from '../reducers';
import {
  watchAuth,
  watchProductCategories,
  watchProducts,
  watchColors,
  watchSizes,
  watchCarts,
  watchOrders,
  watchFavoriteProducts,
} from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchProductCategories);
sagaMiddleware.run(watchFavoriteProducts);
sagaMiddleware.run(watchProducts);
sagaMiddleware.run(watchColors);
sagaMiddleware.run(watchSizes);
sagaMiddleware.run(watchCarts);
sagaMiddleware.run(watchOrders);

export default store;
