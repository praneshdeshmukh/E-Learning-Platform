import { Router } from 'express';
import {
  addLectureToCourseById,
  createCourse,
  deleteCourseById,
  getAllCourses,
  getLecturesByCourseId,
  removeLectureFromCourse,
  updateCourseById,
} from '../controllers/course.controller.js';
import {
  authorizeRoles,
  authorizeSubscribers,
  isLoggedIn,
} from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router = Router();

router
  .route('/')
  .get(getAllCourses)
  .post(
    isLoggedIn,
    authorizeRoles('ADMIN'),
    upload.single('thumbnail'),
    createCourse
  )
  .delete(isLoggedIn, authorizeRoles('ADMIN'), removeLectureFromCourse);

router
  .route('/:id')
  .get(isLoggedIn, authorizeSubscribers, getLecturesByCourseId) 
  .post(
    isLoggedIn,
    authorizeRoles('ADMIN'),
    upload.single('lecture'),
    addLectureToCourseById
  )
  .delete(isLoggedIn,authorizeRoles('ADMIN'),deleteCourseById)
  .put(isLoggedIn, authorizeRoles('ADMIN'), updateCourseById);

export default router;

// import { Router } from 'express';
// import {
//   addLectureToCourseById,
//   createCourse,
//   deleteCourseById,
//   getAllCourses,
//   getLecturesByCourseId,
//   removeLectureFromCourse,
//   updateCourseById,
// } from '../controllers/course.controller.js';
// import {
//   authorizeRoles,
//   authorizeSubscribers,
//   isLoggedIn,
// } from '../middlewares/auth.middleware.js';
// import upload from '../middlewares/multer.middleware.js';

// const router = Router();

// router
//   .route('/')
//   .get(getAllCourses)
//   .post(
//     isLoggedIn,
//     authorizeRoles('ADMIN'),
//     upload.single('thumbnail'),
//     createCourse
//   )
//   .delete(isLoggedIn, authorizeRoles('ADMIN'), removeLectureFromCourse);

// router
//   .route('/:id')
//   .get(isLoggedIn, authorizeSubscribers, getLecturesByCourseId) 
//   .post(
//     isLoggedIn,
//     authorizeRoles('ADMIN'),
//     upload.single('lecture'),
//     addLectureToCourseById
//   )
//   .delete(isLoggedIn,authorizeRoles('ADMIN'),deleteCourseById)
//   .put(isLoggedIn, authorizeRoles('ADMIN'), updateCourseById);

// export default router;

// import { Router } from 'express';
// import { addLectureToCourse, createCourse, deleteCourse, getAllCourses, getLecturesByCourseId, updateCourse } from '../controllers/course.controller.js';
// import { authorizedRoles, isLoggedIn } from '../middlewares/auth.middleware.js';
// import upload from '../middlewares/multer.middleware.js';

// const courseRouter = Router();
// // .get(isLoggedIn ,getAllCourses)
// courseRouter.route('/')
//             .get(getAllCourses)
//             //whenever post req--> thumbnail img in body
//             //steps: 1. read info from thumbnail first
//             // before creating course,
//             .post(
//                 isLoggedIn,
//                 authorizedRoles('ADMIN'), // = (...roles) => { }
//                 upload.single('thumbnail'), //cz single img hence ".single()"
//                 // from which form-field data is obtained "("thumbnail")"
//                 createCourse,
//                 )

//             // data fetched thru query params
// courseRouter.route('/:id')
//             .get(isLoggedIn ,
//                 getLecturesByCourseId
//                 )
//             .put(
//                 isLoggedIn,
//                 authorizedRoles('ADMIN'),
//                 updateCourse
//                 )
//             .delete(
//                 isLoggedIn,
//                 authorizedRoles('ADMIN'),
//                 deleteCourse
//                 ) // want to add lectures in course?
//             .post(
//                 isLoggedIn,
//                 authorizedRoles('ADMIN'),
//                 upload.single('lecture'), // get thumbnail through body 
//                 addLectureToCourse,
//             )


// export default courseRouter;
