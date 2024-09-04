import { getFeedsApi, getOrdersApi } from "./feeds/feeds";
import { getIngredientsApi } from "./ingredients/ingredients";
import { getOrderByNumberApi, orderBurgerApi } from "./order/order";
import { refreshToken } from "./token/RefreshToken";
import {
    forgotPasswordApi,
    getUserApi,
    loginUserApi,
    logoutApi,
    registerUserApi,
    resetPasswordApi,
    updateUserApi
} from "./user/user";

export type TServerResponse<T> = {
    success: boolean;
  } & T;

export const checkResponse = <T>(res: Response): Promise<T> =>
    res.ok ? res.json() : res.json()
    .then((err) => Promise.reject(err));

export const URL = process.env.BURGER_API_URL;

const api = {
    getFeedsApi,
    getOrdersApi,
    getIngredientsApi,
    orderBurgerApi,
    getOrderByNumberApi,
    refreshToken,
    registerUserApi,
    loginUserApi,
    forgotPasswordApi,
    resetPasswordApi,
    getUserApi,
    updateUserApi,
    logoutApi  
}

export default api