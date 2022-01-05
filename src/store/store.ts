import { configureStore } from "@reduxjs/toolkit";

import { combineReducers } from "redux";

import albumsReducer from "../reducers/albumsSlice";
import modalReducer from '../reducers/modalSlice';
import miniatureImagesReducer from '../reducers/miniatureImagesSlice';
import settingsSlice, { setActiveNavigationItemId } from "../reducers/settingsSlice";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'


const rootReducer = combineReducers({
  albums: albumsReducer,
  miniatureImages: miniatureImagesReducer,
  modal: modalReducer,
  settings: settingsSlice,
})

const persistConfig = {
  key: 'miniature_board',
  version: 1,
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store =  configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export default store;