import { configureStore ,combineReducers} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from "./user/user";
import orderReducer from "./order/order";

const rootReducer = combineReducers({
  user:userReducer,
  order:orderReducer
})


const persistConfig = {
  key:"root",
  storage,
  version:1
}


const persistReducers = persistReducer(persistConfig,rootReducer)
export const store = configureStore({
  reducer:persistReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false,
    })
});


export const persistor = persistStore(store);