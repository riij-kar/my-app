import {configureStore, ThunkMiddleware} from '@reduxjs/toolkit';
import reducers from './reducers';
import { apiSlice } from '../components/feature/api/apiSlice';

export default configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware ) => getDefaultMiddleware().concat(apiSlice.middleware),
})