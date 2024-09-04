import { TIngredient } from "@utils-types";
import { checkResponse, TServerResponse, URL} from "../index";

type TIngredientsResponse = TServerResponse<{
    data: TIngredient[];
  }>;
  
  export const getIngredientsApi = () =>
    fetch(`${URL}/ingredients`)
      .then((res) => checkResponse<TIngredientsResponse>(res))
      .then((data) => {
        if (data?.success) 
          return data.data;
        
        return Promise.reject(data);
      });