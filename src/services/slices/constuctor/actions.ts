import { createAppAsyncThunk } from "../../hooks/appHooks";

const postRequestOrder = createAppAsyncThunk(
    'order/postRequest',
    async (data:string[], thunkAPI ) => 
         thunkAPI.extra.api.orderBurgerApi(data),   
);

export default postRequestOrder

