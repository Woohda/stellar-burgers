import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrder, TUser } from "@utils-types";
import { loginUserApi, TLoginData } from "../api/user/user";

export interface UserState {
    isInit: boolean;
    isLoading: boolean;

    user: TUser | null;
    userOrder: TOrder[] | null;
    error: string | null;
}

const initialState: UserState = {
    isInit: false,
    isLoading: false,
    user: null,
    userOrder: null,
    error: null,
}

export const loginUserThunk = createAsyncThunk(
    'user/login',
    (data: TLoginData) =>
        loginUserApi(data)
            .then(token => {
                localStorage.setItem('token', token.accessToken);
                return token;
            }),
)
// export const getUserThunk = createAsyncThunk(
//     'users/get',
//     ({token}: {token: string}) =>
//         getUserApi({token}),
// )

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        init: (state) => {
            state.isInit = true;
        },
        logout: (state) => {
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUserThunk.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(loginUserThunk.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(loginUserThunk.fulfilled, (state) => {
            state.isLoading = false;
        });

        // builder.addCase(getUserThunk.pending, (state) => {
        //     state.isLoading = true;
        // });
        // builder.addCase(getUserThunk.rejected, (state) => {
        //     state.isInit = true;
        //     state.isLoading = false;
        // });
        // builder.addCase(getUserThunk.fulfilled, (state, {payload}) => {
        //     state.isInit = true;
        //     state.isLoading = false;
        //     state.error = payload.;
        // });
    }
});

export const {init, logout} = userSlice.actions;

export default userSlice.reducer