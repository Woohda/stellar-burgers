import { setCookie } from "../../../utils/cookie";
import { checkResponse, TServerResponse, URL } from "../index";


  type TRefreshResponse = TServerResponse<{
    refreshToken: string;
    accessToken: string;
  }>;
  
  export const refreshToken = (): Promise<TRefreshResponse> =>
    fetch(`${URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    })
      .then((res) => checkResponse<TRefreshResponse>(res))
      .then((refreshData) => {
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem('refreshToken', refreshData.refreshToken);
        setCookie('accessToken', refreshData.accessToken);
        return refreshData;
      });
  
  export const fetchWithRefresh = async <T>(
    url: RequestInfo,
    options: RequestInit
  ) => {
    try {
      const res = await fetch(url, options);
      return await checkResponse<T>(res);
    } catch (err) {
      if ((err as { message: string }).message === 'jwt expired') {
        const refreshData = await refreshToken();
        if (options.headers) {
          (options.headers as { [key: string]: string }).authorization =
            refreshData.accessToken;
        }
        const res = await fetch(url, options);
        return await checkResponse<T>(res);
      } else {
        return Promise.reject(err);
      }
    }
  };