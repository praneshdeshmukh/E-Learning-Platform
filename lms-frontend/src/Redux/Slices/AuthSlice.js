import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const getStoredData = (key) => {
    const item = localStorage.getItem(key);
    if (!item) return {};
    try {
        return JSON.parse(item);
    } catch (error) {
        console.error(`Error parsing localStorage data for key: ${key}`, error);
        return {};
    }
};

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    role: localStorage.getItem("role") || "",
    data: getStoredData("data"),
};

export const createAccount = createAsyncThunk("/auth/signup", async (data, { rejectWithValue }) => {
    try {
        const res = axiosInstance.post("user/register", data);
        toast.promise(res, {
            loading: "Wait! Creating your account",
            success: (data) => data?.data?.message,
            error: "Failed to create account",
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
    }
});

export const login = createAsyncThunk("/auth/login", async (data, { rejectWithValue }) => {
    try {
        const res = axiosInstance.post("user/login", data);
        toast.promise(res, {
            loading: "Wait! Authentication in progress...",
            success: (data) => data?.data?.message,
            error: "Failed to log in",
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
    }
});

export const logout = createAsyncThunk("/auth/logout", async (_, { rejectWithValue }) => {
    try {
        const res = axiosInstance.post("user/logout");
        toast.promise(res, {
            loading: "Wait! Logout in progress...",
            success: (data) => data?.data?.message,
            error: "Failed to log out",
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
    }
});

export const updateProfile = createAsyncThunk("/user/update/profile", async (data, { rejectWithValue }) => {
    try {
        const res = axiosInstance.put(`/user/update/${data[0]}`, data[1]);
        toast.promise(res, {
            loading: "Wait! Profile update in progress...",
            success: (data) => data?.data?.message,
            error: "Failed to update profile",
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
    }
});

export const getUserData = createAsyncThunk("/user/details", async (_, { rejectWithValue }) => {
    try {
        const res = axiosInstance.get("user/me");
        return (await res).data;
    } catch (error) {
        toast.error(error.message);
        return rejectWithValue(error?.response?.data);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("role", action?.payload?.user?.role);
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.data = {};
                state.isLoggedIn = false;
                state.role = "";
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                if (!action?.payload?.user) return;
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("role", action?.payload?.user?.role);
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role;
            });
    },
});

export default authSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";

// import axiosInstance from "../../Helpers/axiosInstance"
// // const initialState = {
// //     isLoggedIn: localStorage.getItem('isLoggedIn') || false,
// //     role: localStorage.getItem('role') || "",
// //     data: localStorage.getItem('data') != undefined ? JSON.parse(localStorage.getItem('data')) : {}
// // };
// const getStoredData = (key) => {
//     const item = localStorage.getItem(key);
//     if (!item) return {}; // Return empty object if null or undefined

//     try {
//         return JSON.parse(item);
//     } catch (error) {
//         console.error(`Error parsing localStorage data for key: ${key}`, error);
//         return {}; // Return empty object on JSON parsing error
//     }
// };

// const initialState = {
//     isLoggedIn: localStorage.getItem('isLoggedIn') === "true", // Ensure it's a boolean
//     role: localStorage.getItem('role') || "",
//     data: getStoredData('data') // Safe JSON parsing
// };

// export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
//     try {
//         const res = axiosInstance.post("user/register", data);
//         toast.promise(res, {
//             loading: "Wait! creating your account",
//             success: (data) => {
//                 return data?.data?.message;
//             },
//             error: "Failed to create account"
//         });
//         return (await res).data;
//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// })

// export const login = createAsyncThunk("/auth/login", async (data) => {
//     try {
//         const res = axiosInstance.post("user/login", data);
//         toast.promise(res, {
//             loading: "Wait! authentication in progress...",
//             success: (data) => {
//                 return data?.data?.message;
//             },
//             error: "Failed to log in"
//         });
//         return (await res).data;
//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// });

// export const logout = createAsyncThunk("/auth/logout", async () => {
//     try {
//         const res = axiosInstance.post("user/logout");
//         toast.promise(res, {
//             loading: "Wait! logout in progress...",
//             success: (data) => {
//                 return data?.data?.message;
//             },
//             error: "Failed to log out"
//         });
//         return (await res).data;
//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// });

// export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
//     try {
//         const res = axiosInstance.put(`user/update/${data[0]}`, data[1]);
//         toast.promise(res, {
//             loading: "Wait! profile update in progress...",
//             success: (data) => {
//                 return data?.data?.message;
//             },
//             error: "Failed to update profile"
//         });
//         return (await res).data;
//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// })

// export const getUserData = createAsyncThunk("/user/details", async () => {
//     try {
//         const res = axiosInstance.get("user/me");
//         return (await res).data;
//     } catch(error) {
//         toast.error(error.message);
//     }
// })


// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//         .addCase(login.fulfilled, (state, action) => {
//             localStorage.setItem("data", JSON.stringify(action?.payload?.user));
//             localStorage.setItem("isLoggedIn", true);
//             localStorage.setItem("role", action?.payload?.user?.role);
//             state.isLoggedIn = true;
//             state.data = action?.payload?.user;
//             state.role = action?.payload?.user?.role
//         })
//         .addCase(logout.fulfilled, (state) => {
//             localStorage.clear();
//             state.data = {};
//             state.isLoggedIn = false;
//             state.role = "";
//         })
//         .addCase(getUserData.fulfilled, (state, action) => {
//             if(!action?.payload?.user) return;
//             localStorage.setItem("data", JSON.stringify(action?.payload?.user));
//             localStorage.setItem("isLoggedIn", true);
//             localStorage.setItem("role", action?.payload?.user?.role);
//             state.isLoggedIn = true;
//             state.data = action?.payload?.user;
//             state.role = action?.payload?.user?.role
//         });
//     }
// });

// // export const {} = authSlice.actions;
// export default authSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";

// import axiosInstance from "../../Helpers/axiosInstance"
// const initialState = {
//     isLoggedIn: localStorage.getItem('isLoggedIn') || false,
//     role: localStorage.getItem('role') || "",
//     data: localStorage.getItem('data') != undefined ? JSON.parse(localStorage.getItem('data')) : {}
// };

// export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
//     try {
//         const res = axiosInstance.post("user/register", data);
//         toast.promise(res, {
//             loading: "Wait! creating your account",
//             success: (data) => {
//                 return data?.data?.message;
//             },
//             error: "Failed to create account"
//         });
//         return (await res).data;
//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// })

// export const login = createAsyncThunk("/auth/login", async (data) => {
//     try {
//         const res = axiosInstance.post("user/login", data);
//         toast.promise(res, {
//             loading: "Wait! authentication in progress...",
//             success: (data) => {
//                 return data?.data?.message;
//             },
//             error: "Failed to log in"
//         });
//         return (await res).data;
//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// });

// export const logout = createAsyncThunk("/auth/logout", async () => {
//     try {
//         const res = axiosInstance.post("user/logout");
//         toast.promise(res, {
//             loading: "Wait! logout in progress...",
//             success: (data) => {
//                 return data?.data?.message;
//             },
//             error: "Failed to log out"
//         });
//         return (await res).data;
//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// });

// export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
//     try {
//         const res = axiosInstance.put(`user/update/${data[0]}`, data[1]);
//         toast.promise(res, {
//             loading: "Wait! profile update in progress...",
//             success: (data) => {
//                 return data?.data?.message;
//             },
//             error: "Failed to update profile"
//         });
//         return (await res).data;
//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// })

// export const getUserData = createAsyncThunk("/user/details", async () => {
//     try {
//         const res = axiosInstance.get("user/me");
//         return (await res).data;
//     } catch(error) {
//         toast.error(error.message);
//     }
// })


// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//         .addCase(login.fulfilled, (state, action) => {
//             localStorage.setItem("data", JSON.stringify(action?.payload?.user));
//             localStorage.setItem("isLoggedIn", true);
//             localStorage.setItem("role", action?.payload?.user?.role);
//             state.isLoggedIn = true;
//             state.data = action?.payload?.user;
//             state.role = action?.payload?.user?.role
//         })
//         .addCase(logout.fulfilled, (state) => {
//             localStorage.clear();
//             state.data = {};
//             state.isLoggedIn = false;
//             state.role = "";
//         })
//         .addCase(getUserData.fulfilled, (state, action) => {
//             if(!action?.payload?.user) return;
//             localStorage.setItem("data", JSON.stringify(action?.payload?.user));
//             localStorage.setItem("isLoggedIn", true);
//             localStorage.setItem("role", action?.payload?.user?.role);
//             state.isLoggedIn = true;
//             state.data = action?.payload?.user;
//             state.role = action?.payload?.user?.role
//         });
//     }
// });

// // export const {} = authSlice.actions;
// export default authSlice.reducer;










// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";

// import axiosInstance from "../../Helpers/axiosInstance"
// const initialState = {
//     isLoggedIn: localStorage.getItem('isLoggedIn') || false,
//     role: localStorage.getItem('role') || "",
//     data: localStorage.getItem('data') || {}
// };

// export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
//     try {
//         const res = axiosInstance.post("user/register", data);
//         toast.promise(res, {
//             loading: "Wait! creating your account",
//             success: (data) => {
//                 return data?.data?.message;
//             },
//             error: "Failed to create account"
//         });
//         return (await res).data;
//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// })
// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {},
// });
// export const {} = authSlice.actions;


// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";

// import axiosInstance from "../../Helpers/axiosInstance"

// const initialState = {
//     isLoggedIn : localStorage.getItem('isLoggedIn')|| false,
//     role:localStorage.getItem('role')|| "" ,
//     data: JSON.parse(localStorage.getItem("data")) || {}
    
// }

// export const creatAccount =createAsyncThunk("/auth/singup", async(data)=>{
//     try {
//         const res =axiosInstance.post("user/register", data);
//         toast.promise(res,{
//             loading:"wait creating your account",
//             success:(data)=>{
//                 return data?.data?.message;
//             },
//             error:"Failed in create account"
//         });
//         return(await res).data;
        
//     } catch (error) {
//         toast.error(error?.response?.data?.message);
//     }
// })

// export const login =createAsyncThunk("/auth/login", async(data)=>{
//     try {
//         const res =axiosInstance.post("user/login", data);
//         toast.promise(res,{
//             loading:"wait authentication in process..... ",
//             success:(data)=>{
//                 return data?.data?.message;
//             },
//             error:"Failed to login"
//         })
//         return(await res).data;
        
//     } catch (error) {
//         toast.error(error?.response?.data?.message);
//     }
// })

// export const logout=createAsyncThunk("/auth/logout", async ()=>{
//     try {
//         const res =axiosInstance.post("user/logout");
//         toast.promise(res,{
//             loading:"wait logout in process..... ",
//             success:(data)=>{
//                 return data?.data?.message;
//             },
//             error:"Failed to logout"
//         })
//         return(await res).data;

//     } catch (error) {
//         toast.error(error?.response?.data?.message)
//     }
// })

// export const updateProfile=createAsyncThunk("/user/update/profile", async ( data)=>{
//     try {
//         const res =axiosInstance.put(`user/update`, data);
//         toast.promise(res,{
//             loading:"wait profile update in process..... ",
//             success:(data)=>{
//                 return data?.data?.message;
//             },
//             error:"Failed to profile update"
//         })
//         return(await res).data;

//     } catch (error) {
//         toast.error(error?.response?.data?.message)
//     }
// })

// export const getuserData=createAsyncThunk("/user/details", async ()=>{
//     try {
//         const res =axiosInstance.get("user/me");
//         return(await res).data;
//     } catch (error) {
//         toast.error(error?.message)
//     }
// })

// export const forgetPassword =createAsyncThunk("/auth/forget-Password", async(data)=>{
//     try {
//         const res =axiosInstance.post("user/reset", data);
//         toast.promise(res,{
//             loading:"wait forgetPassword in process..... ",
//             success:(data)=>{
//                 return data?.data?.message;
//             },
//             error:"Failed to forgetPassword"
//         })
//         return(await res).data;
        
//     } catch (error) {
//         toast.error(error?.response?.data?.message);
//     }
// })

// export const changePassword = createAsyncThunk(
//     "/auth/changePassword",
//     async (userPassword) => {
//         try {
//         let res = axiosInstance.post("/user/change-password", userPassword);
//         toast.promise(res,{
//             loading:"wait  in process..... ",
//             success:(data)=>{
//                 return data?.data?.message;
//             },
//             error:"Failed to change Password"
//         })
//         return(await res).data;
//         } catch (error) {
//         toast.error(error?.response?.data?.message);
//         }
//  });

// export const resetPassword = createAsyncThunk("/user/reset", async (data) => {
//     try {
//         let res = axiosInstance.post(`/user/reset/${data.resetToken}`, { password: data.password });
//         toast.promise(res,{
//             loading:"wait  in process..... ",
//             success:(data)=>{
//                 return data?.data?.message;
//             },
//             error:"Failed to reset Password"
//         })
//         return(await res).data;
//     } catch (error) {
//         toast.error(error?.response?.data?.message);
//     }
// });

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers:{},
//     extraReducers:(builder)=>{
//         builder
//         .addCase(creatAccount.fulfilled, (state, action)=>{
//             localStorage.setItem("data", JSON.stringify(action?.payload?.user));
//             localStorage.setItem("isLoggedIn", true);
//             localStorage.setItem("role", action?.payload?.user?.role);
//             state.data=action?.payload?.user;
//             state.role=action?.payload?.user?.role
//             state.isLoggedIn = true;

//         })
//         .addCase(login.fulfilled, (state, action)=>{
//             localStorage.setItem("data", JSON.stringify(action?.payload?.user));
//             localStorage.setItem("isLoggedIn", true);
//             localStorage.setItem("role", action?.payload?.user?.role);
//             state.data=action?.payload?.user;
//             state.role=action?.payload?.user?.role
//             {state.role &&(state.isLoggedIn=true) } 

//         })
//         .addCase(logout.fulfilled, (state)=>{
//             localStorage.clear();
//             state.data={};
//             state.isLoggedIn=false;
//             state.role="";

//         })
//         .addCase(getuserData.fulfilled, (state, action)=>{
//             if(action?.payload?.user)return;
//             localStorage.setItem("data", JSON.stringify(action?.payload?.user));
//             localStorage.setItem("isLoggedIn", true);
//             localStorage.setItem("role", action?.payload?.user?.role);
//             state.isLoggedIn=true;
//             state.data=action?.payload?.user;
//             state.role=action?.payload?.user?.role

//         })

//     }
// });

// // export default authSlice.reducer;


// export const {}= authSlice.actions;
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";

// import axiosInstance from "../../Helpers/axiosInstance"

// const initialState = {
//     isLoggedIn : localStorage.getItem('isLoggedIn')|| false,
//     role:localStorage.getItem('role')|| "" ,
//     data:localStorage.getItem('data')||{}
// }

// export const creatAccount =createAsyncThunk("/auth/singup", async(data)=>{
//     try {
//         const res =axiosInstance.post("user/register", data);
//         toast.promise(res,{
//             loading:"wait creating your account",
//             success:(data)=>{
//                 return data?.data?.message;
//             },
//             error:"Failed in create account"
//         })
//         return(await res).data;
        
//     } catch (error) {
//         toast.error(error?.response?.data?.message);
//     }
// })
// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers:{},
// });

// // export default authSlice.reducer;