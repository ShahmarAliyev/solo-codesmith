import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import restaurantReducer from './restaurantSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
};

export const rootReducer = combineReducers({
  user: userReducer,
  restaurant: restaurantReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
