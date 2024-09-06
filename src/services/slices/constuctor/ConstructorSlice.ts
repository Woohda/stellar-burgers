import { createSelector, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { TConstructorIngredient, TIngredient, TOrder } from "@utils-types";
import postRequestOrder from "./actions"; 

interface ConstructorState {
    constructorItems:{
        bun: TConstructorIngredient | null;
        ingredients: TConstructorIngredient [];
    };
    orderModalData: TOrder | null;
    error: string | null;
    orderRequestStatus: 'idle' | 'pending' | 'success' | 'failed'
}

export const initialState: ConstructorState = {
    constructorItems: {
        bun: null,
        ingredients: []
    },
    orderModalData: null,
    error: null,
    orderRequestStatus: 'idle'
}

export const constructorSlice = createSlice({
    name: 'composition',
    initialState,
    selectors: {
        selectIsPostRequestOrderPending: (state: ConstructorState) => state.orderRequestStatus === 'pending',
        selectIsOrderModalData: (state: ConstructorState) => state.orderModalData,
        selectIsConstructorItems: (state: ConstructorState) => state.constructorItems,
        getFormatedUserOrder: createSelector(
            (state: ConstructorState) => state.constructorItems.bun?._id,
            (state: ConstructorState) => state.constructorItems.ingredients,
            (_id, ingredients): string[] => {
                if(_id && ingredients){
                    return [_id, ...ingredients.map((ingredient) => ingredient._id), _id]
                }
                return []
            }           
        ),
        getTotalPrice: createSelector(
            (state: ConstructorState) => state.constructorItems,
            (constructorItems) => {
                const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
                const ingredientsPrice = constructorItems.ingredients ?
                    constructorItems.ingredients.reduce(
                        (sum: number, ingredient: TConstructorIngredient) => sum + ingredient.price,
                        0
                    )
                    : 0;
                return bunPrice + ingredientsPrice;         
            }
        )
    },
    reducers: {
        addIngredient: {
            reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
              if (action.payload.type === 'bun') {
                state.constructorItems.bun = action.payload;
              } else {
                state.constructorItems.ingredients?.push(action.payload);
              }
            },
            prepare: (ingredient: TIngredient) => {
                const id = nanoid();
                return { payload: { ...ingredient, id } };
              }
        },
        moveIngredientUp: (state, action: PayloadAction<number>) => {
            state.constructorItems.ingredients?.splice(
                action.payload, 
                0, 
                state.constructorItems.ingredients?.splice(action.payload - 1, 1)[0]
            )
        },
        moveIngredientDown: (state, action: PayloadAction<number>) => {
            state.constructorItems.ingredients?.splice(
                action.payload, 
                0, 
                state.constructorItems.ingredients?.splice(action.payload + 1, 1)[0]
            )
        },
        removeIngredient: (state, action: PayloadAction<string>) => {
            state.constructorItems.ingredients = state.constructorItems.ingredients?.filter(
                (ingredient) => ingredient.id !== action.payload
            ) ?? null;
        },
        resetOrderModal: (state) => {
            state.orderModalData = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postRequestOrder.pending, (state) => {
            state.orderRequestStatus = 'pending';
            state.error = '';
        });
        builder.addCase(postRequestOrder.rejected, (state, action) => {
            state.orderRequestStatus = 'failed';
            state.error = action.error.message as string;
        });
        builder.addCase(postRequestOrder.fulfilled, (state, action) => {
            state.orderRequestStatus = 'success';
            state.orderModalData = action.payload.order;
            state.constructorItems = { bun: null, ingredients: [] }
            state.error = '';
        });
    }
});

export const { 
    addIngredient, 
    moveIngredientUp, 
    moveIngredientDown, 
    removeIngredient,
    resetOrderModal } = constructorSlice.actions

export const { 
    selectIsPostRequestOrderPending,
    selectIsOrderModalData,
    selectIsConstructorItems,
    getFormatedUserOrder,
    getTotalPrice } = constructorSlice.selectors

export default constructorSlice.reducer
