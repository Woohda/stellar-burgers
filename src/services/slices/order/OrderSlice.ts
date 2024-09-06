import { createSlice } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";
import getOrderByNumber from "./actions";

interface OrderState {
    orders: TOrder [];
    orderData: TOrder | null;
    error: string | null;
    orderResponseStatus: 'idle' | 'pending' | 'success' | 'failed'
}

export const initialState: OrderState = {
    orders: [],
    orderData: null,
    error: null,
    orderResponseStatus: 'idle',
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    selectors: {
        getOrdersData: (state: OrderState) => state.orders,
        getOrderData: (state: OrderState) => state.orderData,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOrderByNumber.pending, (state) => {
            state.orderResponseStatus = 'pending';
            state.error = '';
        });
        builder.addCase(getOrderByNumber.rejected, (state, action) => {
            state.orderResponseStatus = 'failed';
            state.error = action.error.message as string;
        });
        builder.addCase(getOrderByNumber.fulfilled, (state, action) => {
            state.orderResponseStatus = 'success';
            state.orderData = action.payload.orders[0];
            state.error = '';
        });
    }
});

export const { 
    getOrdersData,
    getOrderData } = orderSlice.selectors

export default orderSlice.reducer