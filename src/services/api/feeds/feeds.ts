import { getCookie } from "../../../utils/cookie";
import { fetchWithRefresh } from "../token/RefreshToken";
import { checkResponse, TServerResponse, URL } from "../index";
import { TOrder } from "@utils-types";

type TFeedsResponse = TServerResponse<{
    orders: TOrder[];
    total: number;
    totalToday: number;
}>;
  
export const getFeedsApi = () =>
    fetch(`${URL}/orders/all`)
      .then((res) => checkResponse<TFeedsResponse>(res))
      .then((data) => {
        if (data?.success) return data;
        return Promise.reject(data);
      });
  
export const getOrdersApi = () =>
    fetchWithRefresh<TFeedsResponse>(`${URL}/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('accessToken')
      } as HeadersInit
    }).then((data) => {
      if (data?.success) return data.orders;
      return Promise.reject(data);
    });