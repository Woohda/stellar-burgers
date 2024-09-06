import { createAppAsyncThunk } from "../../hooks/appHooks";

const getOrderByNumber = createAppAsyncThunk(
    'order/byNumber',
    async (number: number, thunkAPI ) => 
         thunkAPI.extra.api.getOrderByNumberApi(number) 
);

export default getOrderByNumber