import { TOrder } from "@utils-types";
import { checkResponse, TServerResponse, URL } from "../index";
import { getCookie } from "../../../utils/cookie";
import { fetchWithRefresh } from "../token/RefreshToken";

  
type TNewOrderResponse = TServerResponse<{
    order: TOrder;
    name: string;
}>;

  export const orderBurgerApi = (data: string[]) =>
    fetchWithRefresh<TNewOrderResponse>(`${URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('accessToken')
      } as HeadersInit,
      body: JSON.stringify({
        ingredients: data
      })
    }).then((data) => {
      if (data?.success) 
        return data;
      return Promise.reject(data);
    });
  
type TOrderResponse = TServerResponse<{
    orders: TOrder[];
}>;
  
export const getOrderByNumberApi = (number: number) =>
    fetch(`${URL}/orders/${number}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => checkResponse<TOrderResponse>(res));