import { createSelector, createSlice } from "@reduxjs/toolkit";
import { TIngredient } from "@utils-types";
import { fetchIngredients } from "./actions";

interface IngredientsState {
    ingredients: TIngredient [];
    error: string | null;
    fetchIngredientsStatus: 'idle' | 'pending' | 'success' | 'failed';
}

export const initialState: IngredientsState = {
    ingredients: [],
    error: null,
    fetchIngredientsStatus: 'idle',
}

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    selectors: {
        selectIsFetchIngredientsPending: (state: IngredientsState) => state.fetchIngredientsStatus === 'pending',
        selectIsFetchIngredientsIdled: (state: IngredientsState) => state.fetchIngredientsStatus === 'idle',
        sortIngredientsByType: createSelector(
            (state: IngredientsState) => state.ingredients,
            (_: IngredientsState, type: string) => type,
            (ingredients, type) => ingredients?.filter((ingredient) => ingredient.type === type)
        ),
        getIngredients: (state: IngredientsState) => state.ingredients,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchIngredients.pending, (state) => {
            state.fetchIngredientsStatus = 'pending';
            state.error = '';
        });
        builder.addCase(fetchIngredients.rejected, (state, action) => {
            state.fetchIngredientsStatus = 'failed';
            state.error = action.error.message as string;
        });
        builder.addCase(fetchIngredients.fulfilled, (state, action) => {
            state.fetchIngredientsStatus = 'success';
            state.ingredients = action.payload;
            state.error = '';
        });
    }
});

export const { 
    sortIngredientsByType, 
    getIngredients, 
    selectIsFetchIngredientsPending, 
    selectIsFetchIngredientsIdled } = ingredientsSlice.selectors

export default ingredientsSlice.reducer