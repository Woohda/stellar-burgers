import { configureStore, ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredients/IngredientsSlice';
import constructorReducer from '../slices/constuctor/ConstructorSlice';
import orderReducer from '../slices/order/OrderSlice';
import api from '../api/index';

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<
  R,
  AppState,
  typeof extraArgument,
  UnknownAction
>;

export const extraArgument = {
  api, 
};

const rootReducer = {
  ingredients: ingredientsReducer,
  composition: constructorReducer,
  order: orderReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ thunk: { extraArgument } }),
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
