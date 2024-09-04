import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState, extraArgument } from '../store/store';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppState;
    dispatch: AppDispatch;
    extra: typeof extraArgument;
}>();