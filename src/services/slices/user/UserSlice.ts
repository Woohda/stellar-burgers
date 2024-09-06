import { createSlice } from "@reduxjs/toolkit";
import { TOrder, TUser } from "@utils-types";
import { 
    fetchUser, 
    fetchUserOrders, 
    forgotPassword, 
    loginUser, 
    logoutUser, 
    registerUser, 
    resetPassword, 
    updateUser } from "./actions";


export interface UserState {
    user: TUser | null;
    userOrders: TOrder[];
    isAuthChecked: boolean;
    error: string | null;
    fetchUserRequestStatus: 'idle' | 'pending' | 'success' | 'failed';
}

export const initialState: UserState = {
    user: null,
    userOrders: [],
    isAuthChecked: false,
    error: null,
    fetchUserRequestStatus: 'idle',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    selectors: {
        getUser: (state) => state.user,
        getUserError: (state) => state.error,
        getIsAuthChecked: (state) => state.isAuthChecked,
        getUserOrders: (state) => state.userOrders,
        selectIsFetchUserIdled: (state: UserState) => state.fetchUserRequestStatus === 'idle',
        selectIsFetchUserPending: (state: UserState) => state.fetchUserRequestStatus === 'pending',

    },
    reducers: {},
    extraReducers: (builder) => {
        // запрос данных пользователя
        builder.addCase(fetchUser.pending, (state) => {
            state.fetchUserRequestStatus = 'pending';
            state.error = '';
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.fetchUserRequestStatus = 'failed';
            state.error = action.error.message as string;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.fetchUserRequestStatus = 'success';
            state.user = action.payload.user;
            state.error = '';
        });
        // Вход пользователя
        builder.addCase(loginUser.pending, (state) => {
            state.fetchUserRequestStatus = 'pending';
            state.error = '';
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.fetchUserRequestStatus = 'failed';
            state.error = action.error.message as string;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.fetchUserRequestStatus = 'success';
            state.isAuthChecked = true;
            state.user = action.payload.user;
            state.error = '';
        });
        // Выход пользователя
        builder.addCase(logoutUser.pending, (state) => {
            state.fetchUserRequestStatus = 'pending';
            state.error = '';
        });
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.fetchUserRequestStatus = 'failed';
            state.error = action.error.message as string;
        });
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.fetchUserRequestStatus = 'success';
            state.user = null;
            state.error = '';
        });
        // Регистрация пользователя
        builder.addCase(registerUser.pending, (state) => {
            state.fetchUserRequestStatus = 'pending';
            state.error = '';
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.fetchUserRequestStatus = 'failed';
            state.error = action.error.message as string;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.fetchUserRequestStatus = 'success';
            state.user = action.payload.user;
            state.error = '';
        });
        // Обновление данных пользователя
        builder.addCase(updateUser.pending, (state) => {
            state.fetchUserRequestStatus = 'pending';
            state.error = '';
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.fetchUserRequestStatus = 'failed';
            state.error = action.error.message as string;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.fetchUserRequestStatus = 'success';
            state.user = action.payload.user;
            state.error = '';
        });
        // Запрос заказов пользователя
        builder.addCase(fetchUserOrders.pending, (state) => {
            state.fetchUserRequestStatus = 'pending';
            state.error = '';
        });
        builder.addCase(fetchUserOrders.rejected, (state, action) => {
            state.fetchUserRequestStatus = 'failed';
            state.error = action.error.message as string;
        });
        builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
            state.fetchUserRequestStatus = 'success';
            state.userOrders = action.payload;
            state.error = '';
        });
        // Пользователь забыл пароль
        builder.addCase(forgotPassword.pending, (state) => {
            state.fetchUserRequestStatus = 'pending';
        });
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.fetchUserRequestStatus = 'failed';
            state.error = action.error.message as string;
        });
        builder.addCase(forgotPassword.fulfilled, (state) => {
            state.fetchUserRequestStatus = 'success';
            state.error = '';
        });
        // Пользователь сменил пароль
        builder.addCase(resetPassword.pending, (state) => {
            state.fetchUserRequestStatus = 'pending';
        });
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.fetchUserRequestStatus = 'failed';
            state.error = action.error.message as string;
        });
        builder.addCase(resetPassword.fulfilled, (state) => {
            state.fetchUserRequestStatus = 'success';
            state.error = '';
        });

    }
});

export const { 
    getUser,
    getUserError, 
    getIsAuthChecked, 
    getUserOrders,
    selectIsFetchUserIdled,
    selectIsFetchUserPending} = userSlice.selectors

export default userSlice.reducer