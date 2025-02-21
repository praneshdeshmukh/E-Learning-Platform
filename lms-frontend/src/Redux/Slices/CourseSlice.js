import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    courseData: [],
};

export const getAllCourses = createAsyncThunk("/course/get", async (_, { rejectWithValue }) => {
    try {
        const response = axiosInstance.get("/courses");
        toast.promise(response, {
            loading: "Loading course data...",
            success: "Courses loaded successfully",
            error: "Failed to get the courses",
        });
        return (await response).data.courses;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
    }
});

export const deleteCourse = createAsyncThunk("/course/delete", async (id, { rejectWithValue }) => {
    try {
        const response = axiosInstance.delete(`/courses/${id}`);
        toast.promise(response, {
            loading: "Deleting course...",
            success: "Course deleted successfully",
            error: "Failed to delete the course",
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
    }
});

export const createNewCourse = createAsyncThunk("/course/create", async (data, { rejectWithValue }) => {
    try {
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);

        const response = axiosInstance.post("/courses", formData);
        toast.promise(response, {
            loading: "Creating new course",
            success: "Course created successfully",
            error: "Failed to create course",
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data);
    }
});

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if (action.payload) {
                state.courseData = [...action.payload];
            }
        });
    },
});

export default courseSlice.reducer;
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import { toast } from "react-hot-toast";

// import axiosInstance from "../../Helpers/axiosInstance";

// const initialState = {
//     courseData: []
// }

// export const getAllCourses = createAsyncThunk("/course/get", async () => {
//     try {
//         const response = axiosInstance.get("/courses");
//         toast.promise(response, {
//             loading: "loading course data...",
//             success: "Courses loaded successfully",
//             error: "Failed to get the courses",
//         });

//         return (await response).data.courses;
//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// }); 

// export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
//     try {
//         const response = axiosInstance.delete(`/courses/${id}`);
//         toast.promise(response, {
//             loading: "deleting course ...",
//             success: "Courses deleted successfully",
//             error: "Failed to delete the courses",
//         });

//         return (await response).data;
//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// }); 

// export const createNewCourse = createAsyncThunk("/course/create", async (data) => {
//     try {
//         let formData = new FormData();
//         formData.append("title", data?.title);
//         formData.append("description", data?.description);
//         formData.append("category", data?.category);
//         formData.append("createdBy", data?.createdBy);
//         formData.append("thumbnail", data?.thumbnail);

//         const response = axiosInstance.post("/courses", formData);
//         toast.promise(response, {
//             loading: "Creating new course",
//             success: "Course created successfully",
//             error: "Failed to create course"
//         });

//         return (await response).data

//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// });

// const courseSlice = createSlice({
//     name: "courses",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(getAllCourses.fulfilled, (state, action) => {
//             if(action.payload) {
//                 state.courseData = [...action.payload];
//             }
//         })
//     }
// });

// export default courseSlice.reducer;


// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import { toast } from "react-hot-toast";

// import axiosInstance from "../../Helpers/axiosInstance";

// const initialState = {
//     courseData: []
// }

// export const getAllCourses = createAsyncThunk("/course/get", async () => {
//     try {
//         const response = axiosInstance.get("/courses");
//         toast.promise(response, {
//             loading: "loading course data...",
//             success: "Courses loaded successfully",
//             error: "Failed to get the courses",
//         });

//         return (await response).data.courses;
//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// }); 

// export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
//     try {
//         const response = axiosInstance.delete(`/courses/${id}`);
//         toast.promise(response, {
//             loading: "deleting course ...",
//             success: "Courses deleted successfully",
//             error: "Failed to delete the courses",
//         });

//         return (await response).data;
//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// }); 

// export const createNewCourse = createAsyncThunk("/course/create", async (data) => {
//     try {
//         let formData = new FormData();
//         formData.append("title", data?.title);
//         formData.append("description", data?.description);
//         formData.append("category", data?.category);
//         formData.append("createdBy", data?.createdBy);
//         formData.append("thumbnail", data?.thumbnail);

//         const response = axiosInstance.post("/courses", formData);
//         toast.promise(response, {
//             loading: "Creating new course",
//             success: "Course created successfully",
//             error: "Failed to create course"
//         });

//         return (await response).data

//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// });

// const courseSlice = createSlice({
//     name: "courses",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(getAllCourses.fulfilled, (state, action) => {
//             if(action.payload) {
//                 state.courseData = [...action.payload];
//             }
//         })
//     }
// });

// export default courseSlice.reducer;



// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import { toast } from "react-hot-toast";

// import axiosInstance from "../../Helpers/axiosInstance";

// const initialState = {
//     courseData: []
// }

// export const getAllCourses = createAsyncThunk("/course/get", async () => {
//     try {
//         const response = axiosInstance.get("/courses");
//         toast.promise(response, {
//             loading: "loading course data...",
//             success: "Courses loaded successfully",
//             error: "Failed to get the courses",
//         });

//         return (await response).data.courses;
//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// }); 

// export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
//     try {
//         const response = axiosInstance.delete(`/courses/${id}`);
//         toast.promise(response, {
//             loading: "deleting course ...",
//             success: "Courses deleted successfully",
//             error: "Failed to delete the courses",
//         });

//         return (await response).data;
//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// }); 

// export const createNewCourse = createAsyncThunk("/course/create", async (data) => {
//     try {
//         let formData = new FormData();
//         formData.append("title", data?.title);
//         formData.append("description", data?.description);
//         formData.append("category", data?.category);
//         formData.append("createdBy", data?.createdBy);
//         formData.append("thumbnail", data?.thumbnail);

//         const response = axiosInstance.post("/courses", formData);
//         toast.promise(response, {
//             loading: "Creating new course",
//             success: "Course created successfully",
//             error: "Failed to create course"
//         });

//         return (await response).data

//     } catch(error) {
//         toast.error(error?.response?.data?.message);
//     }
// });

// const courseSlice = createSlice({
//     name: "courses",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(getAllCourses.fulfilled, (state, action) => {
//             if(action.payload) {
//                 state.courseData = [...action.payload];
//             }
//         })
//     }
// });

// export default courseSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import toast from "react-hot-toast";

// import axiosInstance from "../../Helpers/axiosInstance";

// const initialState ={
//     courseData: []
// }

// export const getAllCourse = createAsyncThunk("/course/get", async ()=>{
//     try {
//         const response=axiosInstance.get("/course");
//         toast.promise(response, {
//             loading:"loading course data ...",
//             success:"courses loaded sucessfully",
//             error:"Failed to get the courses",
//         });
//         return (await response).data.courses;
//     } catch (error) {
//         toast.error(error?.response?.data?.message);    
//     }
// })

// export const createNewCourse= createAsyncThunk("/course/create", async(data)=>{
//     try {
//         let fromData = new FormData();
//         fromData.append("title",data?.title);
//         fromData.append("description",data?.description);
//         fromData.append("category",data?.category);
//         fromData.append("createdBy",data?.createdBy);
//         fromData.append("thumbnail",data?.thumbnail);

//         const response=axiosInstance.post("/course", fromData);
//         toast.promise(response,{
//             loading:"Creating new course",
//             success:"Course created sucessfully",
//             error:"Failed to create course"
//         });

//         return (await response).data;
        
//     } catch (error) {
//         toast.error(error?.response?.data?.message);
//     }
// })

// export const deleteCourse = createAsyncThunk("/course/delete", async (id)=>{
//     try {
//         const response=axiosInstance.delete(`/course/${id}`);
//         toast.promise(response, {
//             loading:"deleting course data ...",
//             success:"course deleted sucessfully",
//             error:"Failed to delete the course",
//         });
//         return (await response).data;
//     } catch (error) {
//         toast.error(error?.response?.data?.message);    
//     }
// })

// export const updateCourse = createAsyncThunk("/course/update", async (data) => {
//     try {
//       // creating the form data from user data
//       const formData = new FormData();
//       formData.append("title", data.title);
//       formData.append("category", data.category);
//       formData.append("createdBy", data.createdBy);
//       formData.append("description", data.description);
//       // backend is not allowing change of thumbnail
//       if (data.thumbnail) {
//         formData.append("thumbnail", data.thumbnail);
//       }
  
//       const res = axiosInstance.put(`/course/${data.id}`, {
//         title: data.title,
//         category: data.category,
//         createdBy: data.createdBy,
//         description: data.description,
//       });
  
//       toast.promise(res, {
//         loading: "Updating the course...",
//         success: "Course updated successfully",
//         error: "Failed to update course",
//       });
  
//       const response = await res;
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       toast.error(error?.response?.data?.message);
//     }
//   });

// const courseSlice =createSlice({
//     name :"course",
//     initialState,
//     reducers:{},
//     extraReducers:(builder)=>{
//         builder.addCase(getAllCourse.fulfilled,(state, action)=>{
//             if(action.payload){
//                 state.courseData=[...action.payload]
                
//             }
//         })
//     } 
// });

// export default courseSlice.reducer;