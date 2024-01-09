import { apiSlice } from '../components/feature/api/apiSlice';
import userReducer, { load } from './../components/feature/users/userSlice';

export default {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
}