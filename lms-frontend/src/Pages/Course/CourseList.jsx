import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../Components/CourseCard";
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";

function CourseList() {
    const dispatch = useDispatch();
    const { courseData } = useSelector((state) => state.course);
    const [isLoading, setIsLoading] = useState(true); // Optional: Add loading state

    async function loadCourses() {
        setIsLoading(true); // Optional
        await dispatch(getAllCourses());
        setIsLoading(false); // Optional
    }

    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 pl-4 md:pl-20 flex flex-col gap-10 text-black">
                <h1 className="text-center text-3xl font-semibold mb-5">
                    Explore the courses made by
                    <span className="font-bold text-yellow-500"> Industry experts</span>
                </h1>
                {isLoading ? ( // Optional: Loading state
                    <p className="text-center">Loading courses...</p>
                ) : (
                    <div className="mb-10 flex flex-wrap gap-14 justify-center">
                        {courseData?.map((element) => (
                            <CourseCard key={element._id} data={{ ...element, numberOfLectures: element.numberOfLectures }} />
                        ))}
                    </div>
                )}
            </div>
        </HomeLayout>
    );
}

export default CourseList;
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import CourseCard from "../../Components/CourseCard";
// import HomeLayout from "../../Layouts/HomeLayout";
// import { getAllCourses } from "../../Redux/Slices/CourseSlice";

// function CourseList() {
//     const dispatch = useDispatch();

//     const {courseData} = useSelector((state) => state.course);

//     async function loadCourses() {
//         await dispatch(getAllCourses());
//     }

//     useEffect(() => {
//         loadCourses();
//     }, []);

//     return (
//         <HomeLayout>
//             <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
//                 <h1 className="text-center text-3xl font-semibold mb-5">
//                     Explore the courses made by
//                     <span className="font-bold text-yellow-500">
//                         Industry experts
//                     </span>
//                 </h1>
//                 <div className="mb-10 flex flex-wrap gap-14">
//                     {courseData?.map((element) => {
//                         return <CourseCard key={element._id} data={element} />
//                     })}
//                 </div>
                

//             </div>
//         </HomeLayout>
//     );

// }

// export default CourseList;


// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import CourseCard from "../../Components/CourseCard";
// import HomeLayout from "../../Layouts/HomeLayout";
// import { getAllCourses } from "../../Redux/Slices/CourseSlice";

// function CourseList() {
//     const dispatch = useDispatch();

//     const {courseData} = useSelector((state) => state.course);

//     async function loadCourses() {
//         await dispatch(getAllCourses());
//     }

//     useEffect(() => {
//         loadCourses();
//     }, []);

//     return (
//         <HomeLayout>
//             <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
//                 <h1 className="text-center text-3xl font-semibold mb-5">
//                     Explore the courses made by
//                     <span className="font-bold text-yellow-500">
//                         Industry experts
//                     </span>
//                 </h1>
//                 <div className="mb-10 flex flex-wrap gap-14">
//                     {courseData?.map((element) => {
//                         return <CourseCard key={element._id} data={element} />
//                     })}
//                 </div>
                

//             </div>
//         </HomeLayout>
//     );

// }

// export default CourseList;

// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// import HomeLayout from '../../Layouts/HomeLayout'
// import { getAllCourse } from '../../Redux/Slices/CourseSlice'
// import CourseCard from './CourseCard';

// function CourseList() {
//     const dispatch = useDispatch();

//     const { courseData } = useSelector((state) => state?.course)

//     async function loadCourses() {
//         await dispatch(getAllCourse())
//     }
//     useEffect(() => {
//         loadCourses()
//     }, [])

//     return (
//         <HomeLayout>
//             <div className='flex flex-col lg:h-screen lg:pt-10 md:pt-10 pt-20 lg:px-20 px-4 gap-14'>
//                 <h1 className='font-bold lg:text-4xl md:text-4xl text-2xl font-serif text-white text-center'>Explore all courses made by <span className='text-yellow-400'>Industry Experts</span></h1>
//                 <div className='flex flex-wrap mb-10 gap-14 w-full px-8 justify-center'>
//                     {
//                         courseData?.map((course) => (
//                             <CourseCard key={course._id} data={course} />
//                         ))
//                     }
//                 </div>
//             </div>
//         </HomeLayout>
//     )
// }

// export default CourseList

// import { useEffect } from "react";
// import {useDispatch, useSelector} from "react-redux"

// import CourseCard from "../../Components/CourseCard";
// import HomeLayout from "../../Layouts/HomeLayout";
// import { getAllCourse } from "../../Redux/Slices/CourseSlice";

// function CourseList(){

//     const dispatch = useDispatch()
//     const {courseData}= useSelector((state)=>state.course);

//    async function loadCourses(){
//          await dispatch(getAllCourse());
//     }
//     useEffect(()=>{
//         loadCourses();
//     },[]);
//     return (
//         <HomeLayout>
//            <div className=" min-h-[90vh]   pt-12  flex flex-col gap-10 text-white">
//                 <h1 className="text-center text-3xl  font-semibold">
//                     Explore the course made by 
//                     <span className=" font-bold text-yellow-500">
//                         Industry experts
//                     </span>
//                 </h1>
//                 <div className=" grid xl:grid-cols-3 md:grid-cols-2 mx-auto  gap-16 grid-cols-1 text-center mb-10">
//                     {courseData?.map((element)=>{
//                         return <CourseCard key={element._id} data={element}/>
//                     })}
//                 </div>
             
//            </div>

//         </HomeLayout>
//     )
// }
// export default CourseList;