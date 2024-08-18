import { configureStore } from "@reduxjs/toolkit";
import addToCartReducer from "./fetures/addToCartSlice";
import { baseApi } from "./api/baseApi";
// import storage from "redux-persist/lib/storage";

// don't delete refresh use it
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";

// const persistConfig = {
//   key: "addToCart",
//   storage,
// };
// don't delete refresh use it
// const persistedReducer = persistReducer(persistConfig, addToCartReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    addToCart: addToCartReducer,
  },
  // don't delete refresh use it
  // middleware: (getDefaultMiddlewares) =>
  //   getDefaultMiddlewares({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }).concat(baseApi.middleware),
  middleware: (getDefaultMiddlewares) =>getDefaultMiddlewares().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// don't delete refresh use it
// export const persistor = persistStore(store);
