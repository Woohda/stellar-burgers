import { createSlice } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";
import {fetchFeeds} from "./actions";

interface FeedState {
    orders: TOrder [];
    total: number | null;
    totalToday: number | null;
    error: string | null;
    fetchFeedStatus: 'idle' | 'pending' | 'success' | 'failed'
}

const initialState: FeedState = {
    orders: [],
    total: null,
    totalToday: null,
    error: null,
    fetchFeedStatus: 'idle',
}

export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    selectors: {
        selectIsFetchFeedIdled: (state: FeedState) => state.fetchFeedStatus === 'idle',
        selectIsFetchFeedPending: (state: FeedState) => state.fetchFeedStatus === 'pending',
        getFeedOrders: (state: FeedState) => state.orders,
        getFeedData: (state: FeedState) => state
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFeeds.pending, (state) => {
            state.fetchFeedStatus = 'pending';
            state.error = '';
        });
        builder.addCase(fetchFeeds.rejected, (state, action) => {
            state.fetchFeedStatus = 'failed';
            state.error = action.error.message as string;
        });
        builder.addCase(fetchFeeds.fulfilled, (state, action) => {
            state.fetchFeedStatus = 'success';
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
            state.error = '';
        });
    }
});

export const { 
    selectIsFetchFeedIdled,
    selectIsFetchFeedPending,
    getFeedOrders,
    getFeedData } = feedSlice.selectors

export default feedSlice.reducer