import { createAppAsyncThunk } from "../../hooks/appHooks";
import { ingredientsSlice } from "./IngredientsSlice";

export const fetchIngredients = createAppAsyncThunk(
    'ingredients/fetchIngredients',
    async (_, thunkAPI) => 
         thunkAPI.extra.api.getIngredientsApi(),
    // { 
    //     condition: (params, { getState }) => {
    //        const isIdle = ingredientsSlice.selectors.selectIsFetchIngredientsIdled(getState()); 
    //        if(!params?.refetch && !isIdle) 
    //         {return false;}
    //        return true;
    //     }
    // }    
);