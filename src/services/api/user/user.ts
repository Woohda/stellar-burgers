import { TUser } from "@utils-types";
import { checkResponse, TServerResponse, URL } from "../index";
import { fetchWithRefresh } from "../token/RefreshToken";
import { getCookie } from "../../../utils/cookie";

export type TRegisterData = {
    email: string;
    name: string;
    password: string;
};
  
export type TAuthResponse = TServerResponse<{
    refreshToken: string;
    accessToken: string;
    user: TUser;
}>;
  
  export const registerUserApi = (data: TRegisterData) =>
    fetch(`${URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
      .then((res) => checkResponse<TAuthResponse>(res))
      .then((data) => {
        if (data?.success) return data;
        return Promise.reject(data);
      });
  
  export type TLoginData = {
    email: string;
    password: string;
  };
  
  export const loginUserApi = (data: TLoginData) =>
    fetch(`${URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
      .then((res) => checkResponse<TAuthResponse>(res))
      .then((data) => {
        if (data?.success) return data;
        return Promise.reject(data);
      });
  
  export const forgotPasswordApi = (data: { email: string }) =>
    fetch(`${URL}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
      .then((res) => checkResponse<TServerResponse<{}>>(res))
      .then((data) => {
        if (data?.success) return data;
        return Promise.reject(data);
      });
  
  export const resetPasswordApi = (data: { password: string; token: string }) =>
    fetch(`${URL}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
      .then((res) => checkResponse<TServerResponse<{}>>(res))
      .then((data) => {
        if (data?.success) return data;
        return Promise.reject(data);
      });
  
export type TUserResponse = TServerResponse<{ user: TUser }>;
  
  export const getUserApi = () =>
    fetchWithRefresh<TUserResponse>(`${URL}/auth/user`, {
      headers: {
        authorization: getCookie('accessToken')
      } as HeadersInit
    })
  
  export const updateUserApi = (user: Partial<TRegisterData>) =>
    fetchWithRefresh<TUserResponse>(`${URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('accessToken')
      } as HeadersInit,
      body: JSON.stringify(user)
    });
  
  export const logoutApi = () =>
    fetch(`${URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    }).then((res) => checkResponse<TServerResponse<{}>>(res));
  