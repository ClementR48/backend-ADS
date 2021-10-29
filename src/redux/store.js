import { createStore, applyMiddleware, combineReducers } from "redux";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import productReducer from './reducers/productReducer';

import thunk from "redux-thunk";

const persistConfig = {
  key:'root',
  storage,
}
const rootReducer = combineReducers({
  productReducer,

})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store)
