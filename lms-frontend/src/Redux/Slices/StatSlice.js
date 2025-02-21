import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    allUsersCount: 0,
    subscribedCount: 0,
};

export const getStatsData = createAsyncThunk("stats/get", async (_, { rejectWithValue }) => {
    try {
        const response = axiosInstance.get("/admin/stats/users");
        toast.promise(response, {
            loading: "Getting the stats...",
            success: (data) => data?.data?.message,
            error: "Failed to load data stats",
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
    }
});

const statSlice = createSlice({
    name: "state",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStatsData.fulfilled, (state, action) => {
            state.allUsersCount = action?.payload?.allUsersCount || 0;
            state.subscribedCount = action?.payload?.subscribedUsersCount || 0;
        });
    },
});

export default statSlice.reducer;
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";

// import axiosInstance from "../../Helpers/axiosInstance";
// const initialState = {
//     allUsersCount: 0,
//     subscribedCount: 0
// };

// export const getStatsData = createAsyncThunk("stats/get", async () => {
//     try {
//         const response = axiosInstance.get("/admin/stats/users");
//         toast.promise(response, {
//             loading: "Getting the stats...",
//             success: (data) => {
//                 return data?.data?.message
//             },
//             error: "Failed to load data stats"
//         });
//         return (await response).data;
//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// })

// const statSlice = createSlice({
//     name: "state",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(getStatsData.fulfilled, (state, action) => {
//             state.allUsersCount = action?.payload?.allUsersCount;
//             state.subscribedCount =  action?.payload?.subscribedUsersCount;
//         })
//     }
// });

// export default statSlice.reducer;




// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
// import toast from 'react-hot-toast';

// import axiosInstance from '../../Helpers/axiosInstance';

// const initialState={
//     allUsersCount :0,
//     subscribedCount:0
// };

// export const getStatsData=createAsyncThunk("stats/get", async()=>{
//     try {
//         const response= axiosInstance.get("/admin/stats/users");
//         toast.promise(response,{
//             loading:"Getting the stats........",
//             success:(data)=>{
//                 return data?.data?.message
//             }, 
//             error:"Failed to load stats"
//         })
//         return (await response).data;
//     } catch (error) {
//         toast.error(error?.response?.data?.message)
//     }
// })
// const statSlice  = createSlice({
//     name:"state",
//     initialState,
//     reducers:{},
//     extraReducers:(builder)=>{
//         builder.addCase(getStatsData.fulfilled,(state, action)=>{
//             // console.log(action)
//             state.allUsersCount = action?.payload?.allUsersCount;
//             state.subscribedCount = action?.payload?.subscribedUsersCount;
//         });
//     }
// })
// export default statSlice.reducer;