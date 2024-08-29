import { 
    forgotPasswordApi,
    getUserApi,
    loginUserApi,
    logoutApi, 
    registerUserApi, 
    resetPasswordApi, 
    TLoginData, 
    TRegisterData, 
    updateUserApi} from "../../../services/api/user/user";
import { createAppAsyncThunk } from "../../../services/hooks/appHooks";
import {userSlice} from "./UserSlice";
import { deleteCookie, setCookie } from "../../../utils/cookie";

export const fetchUser = createAppAsyncThunk(
    'user/fetchUser',
    async () => getUserApi(),
    // { 
    //     condition: (params, { getState }) => {
    //         const isIdle = userSlice.selectors.selectIsFetchUserIdled(getState());
    //         if(!params?.refetch && !isIdle) 
    //             {return false;}
    //         return true;
    //     }
    // } 
);

export const loginUser = createAppAsyncThunk(
    'user/loginUser',
    async (data: TLoginData) => loginUserApi(data)
        .then(data => {
            setCookie('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            return data;
        }),
)

export const logoutUser = createAppAsyncThunk(
    'user/logoutUser',
    async () => logoutApi()
        .then(() => {
            localStorage.clear();
            deleteCookie('accessToken');
        })  
)

export const registerUser = createAppAsyncThunk(
    'user/registerUser',
    async (data: TRegisterData) => registerUserApi(data)
)

export const updateUser = createAppAsyncThunk(
    'user/updateUser',
    async (data: TRegisterData) => updateUserApi(data)
)

export const fetchUserOrders = createAppAsyncThunk(
    'user/fetchUserOrders',
    async (_, thunkAPI) => thunkAPI.extra.api.getOrdersApi(),
)

export const forgotPassword = createAppAsyncThunk(
    'user/forgotPassword',
    async (data :{ email: string }) => forgotPasswordApi(data),
)

export const resetPassword = createAppAsyncThunk(
    'user/resetPassword',
    async (data :{ password: string; token: string }) => resetPasswordApi(data),
)