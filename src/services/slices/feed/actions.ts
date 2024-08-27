import { createAppAsyncThunk } from "../../hooks/appHooks";

export const fetchFeeds = createAppAsyncThunk(
    'ingredients/fetchFeeds',
    async (_, thunkAPI) => 
         thunkAPI.extra.api.getFeedsApi(),
);

