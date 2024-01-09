import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk('fetch/users', async (a, {rejectWithValue}) => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        return users;
    }
    catch (error) {
        return rejectWithValue({error: error.message});
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: true,
        data: [],
        fetchOnce: true,
        error: null
    },
    reducers: {
        add: (state, action) => {
            state.data.push(action.payload);
        },
        update: (state, action) => {
            const index = state.data.findIndex(user => user.id === action.payload.id);
            state.data[index] = action.payload;
        },
        remove: (state, action) => {
            debugger
            state.data = state.data.filter(user => user.id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.data = [];
            state.error = action.payload.error;
            state.loading = false;
        })
        .addCase(fetchUsers.pending, (state, action) => {
            state.loading = true;
        })
    } 
});

export const { 
    add, 
    update, 
    remove} = userSlice.actions;

export default userSlice.reducer;