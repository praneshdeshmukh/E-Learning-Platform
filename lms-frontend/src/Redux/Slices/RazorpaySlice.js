import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: [],
};

export const getRazorPayId = createAsyncThunk("/razorpay/getId", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/payments/razorpay-key");
        return response.data;
    } catch (error) {
        toast.error("Failed to load data");
        return rejectWithValue(error?.response?.data);
    }
});

export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/payments/subscribe");
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
    }
});

export const verifyUserPayment = createAsyncThunk("/payments/verify", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/payments/verify", {
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature,
        });
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
    }
});

export const getPaymentRecord = createAsyncThunk("/payments/record", async (_, { rejectWithValue }) => {
    try {
        const response = axiosInstance.get("/payments?count=100");
        toast.promise(response, {
            loading: "Getting the payment records",
            success: (data) => data?.data?.message,
            error: "Failed to get payment records",
        });
        return (await response).data;
    } catch (error) {
        toast.error("Operation failed");
        return rejectWithValue(error?.response?.data);
    }
});

export const cancelCourseBundle = createAsyncThunk("/payments/cancel", async (_, { rejectWithValue }) => {
    try {
        const response = axiosInstance.post("/payments/unsubscribe");
        toast.promise(response, {
            loading: "Unsubscribing the bundle",
            success: (data) => data?.data?.message,
            error: "Failed to unsubscribe",
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
    }
});

const razorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRazorPayId.fulfilled, (state, action) => {
                state.key = action?.payload?.key;
            })
            .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
                state.subscription_id = action?.payload?.subscription_id;
            })
            .addCase(verifyUserPayment.fulfilled, (state, action) => {
                toast.success(action?.payload?.message);
                state.isPaymentVerified = action?.payload?.success;
            })
            .addCase(verifyUserPayment.rejected, (state, action) => {
                toast.error(action?.payload?.message);
                state.isPaymentVerified = action?.payload?.success || false;
            })
            .addCase(getPaymentRecord.fulfilled, (state, action) => {
                state.allPayments = action?.payload?.allPayments || {};
                state.finalMonths = action?.payload?.finalMonths || {};
                state.monthlySalesRecord = action?.payload?.monthlySalesRecord || [];
            });
    },
});

export default razorpaySlice.reducer;
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import toast from "react-hot-toast"

// import axiosInstance from "../../Helpers/axiosInstance"

// const initialState = {
//     key: "",
//     subscription_id: "",
//     isPaymentVerified: false,
//     allPayments: {},
//     finalMonths: {},
//     monthlySalesRecord: []
// }

// export const getRazorPayId = createAsyncThunk("/razorpay/getId", async () => {
//     try {
//         const response = await axiosInstance.get("/payments/razorpay-key");
//         return response.data;
//     } catch(error) {
//         toast.error("Failed to load data");
//     }
// })


// export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse", async () => {
//     try {
//         const response = await axiosInstance.post("/payments/subscribe");
//         console.log(response)
//         return response.data;
//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// });

// export const verifyUserPayment = createAsyncThunk("/payments/verify", async (data) => {
//     try {
//         const response = await axiosInstance.post("/payments/verify", {
//             razorpay_payment_id: data.razorpay_payment_id,
//             razorpay_subscription_id: data.razorpay_subscription_id,
//             razorpay_signature: data.razorpay_signature
//         });
//         return response.data;
//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// });

// export const getPaymentRecord = createAsyncThunk("/payments/record", async () => {
//     try {
//         const response = axiosInstance.get("/payments?count=100", );
//         toast.promise(response, {
//             loading: "Getting the payment records",
//             success: (data) => {
//                 return data?.data?.message
//             },
//             error: "Failed to get payment records"
//         })
//         return (await response).data;
//     } catch(error) {
//         toast.error("Operation failed");
//     }
// });

// export const cancelCourseBundle = createAsyncThunk("/payments/cancel", async () => {
//     try {
//         const response = axiosInstance.post("/payments/unsubscribe");
//         toast.promise(response, {
//             loading: "unsubscribing the bundle",
//             success: (data) => {
//                 return data?.data?.message
//             },
//             error: "Failed to ubsubscribe"
//         })
//         return (await response).data;
//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// });

// const razorpaySlice = createSlice({
//     name: "razorpay",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//         .addCase(getRazorPayId.fulfilled, (state, action) =>{
//             state.key = action?.payload?.key;
//         })
//         .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
//             state.subscription_id = action?.payload?.subscription_id;
//         })
//         .addCase(verifyUserPayment.fulfilled, (state, action) => {
//             console.log(action);
//             toast.success(action?.payload?.message);
//             state.isPaymentVerified = action?.payload?.success;
//         })
//         .addCase(verifyUserPayment.rejected, (state, action) => {
//             console.log(action);
//             toast.success(action?.payload?.message);
//             state.isPaymentVerified = action?.payload?.success;
//         })
//         .addCase(getPaymentRecord.fulfilled, (state, action) => {
//             state.allPayments = action?.payload?.allPayments;
//             state.finalMonths = action?.payload?.finalMonths;
//             state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
//         })
//     }
// });

// export default razorpaySlice.reducer;






// // // import cookieParser from 'cookie-parser';
// // // import cors from 'cors';
// // // import { config } from 'dotenv';
// // // import express from 'express';
// // // import morgan from 'morgan';

// // // import errorMiddlware from './middlewares/error.middleware.js'
// // // import courseRoutes from './routes/course.Routes.js'
// // // import miscRoutes from './routes/miscellanous.routes.js'
// // // import paymentRoutes from './routes/payment.routes.js'
// // // import userRoutes from './routes/user.Routes.js'

// // // config();

// // const app = express();

// // app.use(express.json());

// // app.use(express.urlencoded({ extended: true }));

// // app.use(
// //     cors({
// //         origin: 'https://learning-management-system-roan.vercel.app',
// //         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// //         preflightContinue: false,
// //         optionsSuccessStatus: 204,
// //         credentials: true,
// //     })
// //   );

// // app.use(cookieParser());

// // app.use(morgan('dev'));

// // app.use('/ping',function(_req,res){
// //     res.send('Pong');
// // })

// // app.use('/api/v1/user', userRoutes)
// // app.use('/api/v1/course', courseRoutes)
// // app.use('/api/v1/payments', paymentRoutes)
// // app.use('/api/v1', miscRoutes);
// // app.all('*',(_req,res)=>{
// //     res.status(404).send('OOPS!!  404 page not found ')
// // })
// // app.use(errorMiddlware);

// // export default app;


// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import toast from "react-hot-toast"

// import axiosInstance from "../../Helpers/axiosInstance";

// const initialState = {
//     key: "",
//     subscription_id: "",
//     isPaymentVerified: false,
//     allPayments: {},
//     finalMonths: {},
//     monthlySalesRecord: []
// }

// export const getRazorPayId = createAsyncThunk("/razorpay/getId", async () => {
//     try {
//         const response = await axiosInstance.get("/payments/razorpay-key");
//         return response.data;
//     } catch(error) {
//         toast.error("Failed to load data");
//     }
// })


// export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse", async () => {
//     try {
//         const response = await axiosInstance.post("/payments/subscribe");
//         // console.log(response)
//         return response.data;
//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// });

// export const verifyUserPayment = createAsyncThunk("/payments/verify", async (data) => {
//     try {
//         const response = await axiosInstance.post("/payments/verify", {
//             razorpay_payment_id: data.razorpay_payment_id,
//             razorpay_subscription_id: data.razorpay_subscription_id,
//             razorpay_signature: data.razorpay_signature
//         });
//         return response.data;
//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// });

// export const getPaymentRecord = createAsyncThunk("/payments/record", async () => {
//     try {
//         const response = axiosInstance.get("/payments?count=100", );
//         toast.promise(response, {
//             loading: "Getting the payment records",
//             success: (data) => {
//                 return data?.data?.message
//             },
//             error: "Failed to get payment records"
//         })
//         return (await response).data;
//     } catch(error) {
//         toast.error("Operation failed");
//     }
// });

// export const cancelCourseBundle = createAsyncThunk("/payments/cancel", async () => {
//     try {
//         const response = axiosInstance.post("/payments/unsubscribe");
//         toast.promise(response, {
//             loading: "unsubscribing the bundle",
//             success: (data) => {
//                 return data?.data?.message
//             },
//             error: "Failed to ubsubscribe"
//         })
//         return (await response).data;
//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// });

// const razorpaySlice = createSlice({
//     name: "razorpay",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//         .addCase(getRazorPayId.fulfilled, (state, action) =>{
//             state.key = action?.payload?.key;
//         })
//         .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
//             state.subscription_id = action?.payload?.subscription_id;
//         })
//         .addCase(verifyUserPayment.fulfilled, (state, action) => {
//             // console.log(action);
//             toast.success(action?.payload?.message);
//             state.isPaymentVerified = action?.payload?.success;
//         })
//         .addCase(verifyUserPayment.rejected, (state, action) => {
//             // console.log(action);
//             toast.success(action?.payload?.message);
//             state.isPaymentVerified = action?.payload?.success;
//         })
//         .addCase(getPaymentRecord.fulfilled, (state, action) => {
//             state.allPayments = action?.payload?.allPayments;
//             state.finalMonths = action?.payload?.finalMonths;
//             state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
//         })
//     }
// });

// export default razorpaySlice.reducer;