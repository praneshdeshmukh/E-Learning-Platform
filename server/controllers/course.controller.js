import fs from 'fs/promises';
import path from 'path';

import cloudinary from 'cloudinary';

import asyncHandler from '../middlewares/asyncHandler.middleware.js';
import Course from '../models/course.model.js';
import AppError from '../utils/AppError.js';

/**
 * @ALL_COURSES
 * @ROUTE @GET {{URL}}/api/v1/courses
 * @ACCESS Public
 */
export const getAllCourses = asyncHandler(async (_req, res, next) => {
  // Find all the courses without lectures
  const courses = await Course.find({}).select('-lectures');

  res.status(200).json({
    success: true,
    message: 'All courses',
    courses,
  });
});

/**
 * @CREATE_COURSE
 * @ROUTE @POST {{URL}}/api/v1/courses
 * @ACCESS Private (admin only)
 */
export const createCourse = asyncHandler(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy) {
    return next(new AppError('All fields are required', 400));
  }

  const course = await Course.create({
    title,
    description,
    category,
    createdBy,
  });

  if (!course) {
    return next(
      new AppError('Course could not be created, please try again', 400)
    );
  }
  // Run only if user sends a file
  console.log(req.file);
  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
      });
      if (result) {
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;
      }
      await fs.unlink(req.file.path); // Remove file after upload
    } catch (error) {
      console.error(`File upload failed: ${error.message}`);
      return next(new AppError("File upload failed, please try again", 400));
    }
  }
  // if (req.file) {
  //   try {
  //     const result = await cloudinary.v2.uploader.upload(req.file.path, {
  //       folder: 'lms', // Save files in a folder named lms
  //     });
  //   console.log(result);
  //     // If success
  //     if (result) {
  //       // Set the public_id and secure_url in array
  //       course.thumbnail.public_id = result.public_id;
  //       course.thumbnail.secure_url = result.secure_url;
  //     }

  //     // After successful upload remove the file from local storage
  //     fs.rm(`upload/${req.file.filename}`);
  //   } catch (error) {
  //     // Empty the uploads directory without deleting the uploads directory
      

  //     // Send the error message
  //     return next(
  //       new AppError(
  //         JSON.stringify(error) || 'File not uploaded, please try again',
  //         400
  //       )
  //     );
  //   }
  // }

  // Save the changes
  await course.save();

  res.status(201).json({
    success: true,
    message: 'Course created successfully',
    course,
  });
});

/**
 * @GET_LECTURES_BY_COURSE_ID
 * @ROUTE @POST {{URL}}/api/v1/courses/:id
 * @ACCESS Private(ADMIN, subscribed users only)
 */
export const getLecturesByCourseId = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const course = await Course.findById(id);

  if (!course) {
    return next(new AppError('Invalid course id or course not found.', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Course lectures fetched successfully',
    lectures: course.lectures,
  });
});

/**
 * @ADD_LECTURE
 * @ROUTE @POST {{URL}}/api/v1/courses/:id
 * @ACCESS Private (Admin Only)
 */
export const addLectureToCourseById = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  const { id } = req.params;

  let lectureData = {};

  if (!title || !description) {
    return next(new AppError('Title and Description are required', 400));
  }

  const course = await Course.findById(id);

  if (!course) {
    return next(new AppError('Invalid course id or course not found.', 400));
  }

  // Run only if user sends a file
  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'lms', // Save files in a folder named lms
        chunk_size: 50000000, // 50 mb size
        resource_type: 'video',
      });

      // If success
      if (result) {
        // Set the public_id and secure_url in array
        lectureData.public_id = result.public_id;
        lectureData.secure_url = result.secure_url;
      }

      // After successful upload remove the file from local storage
      fs.rm(`upload/${req.file.filename}`);
    } catch (error) {
      // Empty the uploads directory without deleting the uploads directory
      // for (const file of await fs.readdir('uploads/')) {
      //   await fs.unlink(path.join('uploads/', file));
      // }

      // Send the error message
      return next(
        new AppError(
          JSON.stringify(error) || 'File not uploaded, please try again',
          400
        )
      );
    }
  }

  course.lectures.push({
    title,
    description,
    lecture: lectureData,
  });

  course.numberOfLectures = course.lectures.length;

  // Save the course object
  await course.save();

  res.status(200).json({
    success: true,
    message: 'Course lecture added successfully',
    course,
  });
});

/**
 * @Remove_LECTURE
 * @ROUTE @DELETE {{URL}}/api/v1/courses/:courseId/lectures/:lectureId
 * @ACCESS Private (Admin only)
 */
export const removeLectureFromCourse = asyncHandler(async (req, res, next) => {
  // Grabbing the courseId and lectureId from req.query
  const { courseId, lectureId } = req.query;

  console.log(courseId);

  // Checking if both courseId and lectureId are present
  if (!courseId) {
    return next(new AppError('Course ID is required', 400));
  }

  if (!lectureId) {
    return next(new AppError('Lecture ID is required', 400));
  }

  // Find the course uding the courseId
  const course = await Course.findById(courseId);

  // If no course send custom message
  if (!course) {
    return next(new AppError('Invalid ID or Course does not exist.', 404));
  }

  // Find the index of the lecture using the lectureId
  const lectureIndex = course.lectures.findIndex(
    (lecture) => lecture._id.toString() === lectureId.toString()
  );

  // If returned index is -1 then send error as mentioned below
  if (lectureIndex === -1) {
    return next(new AppError('Lecture does not exist.', 404));
  }

  // Delete the lecture from cloudinary
  await cloudinary.v2.uploader.destroy(
    course.lectures[lectureIndex].lecture.public_id,
    {
      resource_type: 'video',
    }
  );

  // Remove the lecture from the array
  course.lectures.splice(lectureIndex, 1);

  // update the number of lectures based on lectres array length
  course.numberOfLectures = course.lectures.length;

  // Save the course object
  await course.save();

  // Return response
  res.status(200).json({
    success: true,
    message: 'Course lecture removed successfully',
  });
});

/**
 * @UPDATE_COURSE_BY_ID
 * @ROUTE @PUT {{URL}}/api/v1/courses/:id
 * @ACCESS Private (Admin only)
 */
export const updateCourseById = asyncHandler(async (req, res, next) => {
  // Extracting the course id from the request params
  const { id } = req.params;

  // Finding the course using the course id
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: req.body, // This will only update the fields which are present
    },
    {
      runValidators: true, // This will run the validation checks on the new data
    }
  );

  // If no course found then send the response for the same
  if (!course) {
    return next(new AppError('Invalid course id or course not found.', 400));
  }

  // Sending the response after success
  res.status(200).json({
    success: true,
    message: 'Course updated successfully',
  });
});

/**
 * @DELETE_COURSE_BY_ID
 * @ROUTE @DELETE {{URL}}/api/v1/courses/:id
 * @ACCESS Private (Admin only)
 */
export const deleteCourseById = asyncHandler(async (req, res, next) => {
  // Extracting id from the request parameters
  const { id } = req.params;
  // Finding the course via the course ID
  const course = await Course.findById(id);
  // If course not find send the message as stated below
  if (!course) {
    return next(new AppError('Course with given id does not exist.', 404));
  }

  // Remove course
  await course.deleteOne();
  

  // Send the message as response
  res.status(200).json({
    success: true,
    message: 'Course deleted successfully',
  });
});

// import Course from "../models/course.model.js";
// import AppError from "../utils/AppError.js"
// import cloudinary from 'cloudinary'
// import fs from 'fs/promises'

// const getAllCourses = async (req,res,next) => {

//     try {
//         //bcz, we want courses only high level detail
//         //& not the lecture info
//         //eg-Student who havent buyed course cannnot 
//         //be able to see lectures related info 
//         const allCourses = await Course.find({}).select('-lectures');
        
//         res.status(200).json({
//             success: true,
//             message: 'Courses Available',
//             allCourses
//         })


//     } catch (e) {
//         return next(new AppError('Something happened, try again later',500))
//     }

// };


// const getLecturesByCourseId = async (req,res,next) => {

//     try {

//         const { id } = req.params;
//         console.log('course id :',id);
//         const course = await Course.findById(id);
//         console.log('course details:', course);
//         if(!course) {
//             return next(
//                 new AppError('Invalid course Id',400)
//             )
//         }
//         res.status(200).json({
//             success: true,
//             message: 'Course details',
//             lecture: course.lectures
//         })


        
//     } catch (e) {
//         return next(new AppError('Something happened, try again later',500))
//     }



// };


// const createCourse = async (req,res,next) => {
//     const { title, description, category, createdBy } = req.body;

//     if(!title ||  !description || !category || !createdBy){
//         return next(
//             new AppError('All fields are required',400)
//         )
//     }

//     const course = await Course.create({
//         title,
//         description,
//         category,
//         createdBy,
//         thumbnail: {
//             public_id: 'dummy',
//             secure_url: 'dummy'
//         } 
//     })

//     if(!course) {
//         return next(
//             new AppError('Course could not be created,try again', 500)
//         )
//     }

//     if(req.file) {
//         try {
            
//             const result = await cloudinary.v2.uploader.upload(req.file.path, {
//                 folder: 'lms',
//             });
    
//             if(result) {
//                 course.thumbnail.public_id = result.public_id;
//                 course.thumbnail.secure_url = result.secure_url;
//             }
    
//             // to remove the file(img)
//             // fs.rm(`uploads/${req.file.filename}`);

//         } catch (e) {
//             return next(
//                 new AppError(e.message,500)
//             )
//         }

//         await course.save();
    
//         res.status(200).json({
//             success: true,
//             message: "course has been created successfully!",
//             course
//         })
//     }
// };


// const updateCourse = async (req,res,next) => {

//     try {
//         const { id } = req.params;
    
//         const courseById = await Course.findByIdAndUpdate(
//             id,
//             { // whatever is comming in body update that
//                 // field in the cours suppose. "description"
//                 $set: req.body
//             },
//             { //checks whatever new data comming in body
//                 // is an existing field in the model 
//                 // or not. suppose "couurseTeam" (no such field)
//                 runValidators: true
//             }
//         )
//         if(!courseById) {
//             return next(
//                 new AppError('Course with given ID does not exist',500)
//             ) 
//         }
//         res.status(200).json({
//             success:true,
//             message: 'Course updated successfully',
//             courseById
//         });
        
//     } catch (error) {
//         return next(
//             new AppError(e.message,500)
//         )
//     }
// };


// const deleteCourse = async (req,res,next) => {

//     try {
        
//         const { id } = req.params;
    
//         const courseToRemove = await Course.findById(id);
        
//         if(!courseToRemove) {
//             return next(
//                 new AppError('Course with given ID does not exist',500)
//                 ) 
//             }
//         await Course.findByIdAndDelete(id);
        
//         res.status(200).json({
//             success: true,
//             message: "Course deleted successfully!",
//         })
        
//     } catch (e) {

//         return next(
//             new AppError(e.message , 500)
//         ) 
//     }
// };

// const addLectureToCourse = async (req,res,next) => {
//     try {
  
//         const {title, description } = req.body;
//         const { id } = req.params;
    
//         if(!title || !description) {
//             return next(
//                 new AppError('All fields are required',400)
//             )
//         }
//         const courseToAddLectures = await Course.findById(id);
    
//         if(!courseToAddLectures) {
//             return next(
//                 new AppError('Course does not exist',400)
//             )
//         };
    
//         // save all info of lecuture in lectureData
//         const lectureData = {
//             title,
//             description,
//             lecture: {},
//         } 
//         // all info is done but thumbnail remains
//         if(req.file) {
//             try {
                
//                 const result = await cloudinary.v2.uploader.upload(req.file.path, 
//                     {
//                         folder: 'lms',
//                     },
//                 );
//                 if(result) {
//                     lectureData.lecture.public_id = result.public_id;
//                     lectureData.lecture.secure_url = result.secure_url;
//                 };
    
//             } catch (e) {
//                 return next(
//                     new AppError(e.message,400)
//                 )
//             }
//             console.log('lecture ->', JSON.stringify(lectureData));
//             courseToAddLectures.lectures.push(lectureData);
    
    
//             courseToAddLectures.numberOfLectures = courseToAddLectures.lectures.length;
            
//             await courseToAddLectures.save();
    
    
//             res.status(200).json({
//                 success: true,
//                 message: 'Lecture added successfully!',
//                 courseToAddLectures
//             })
//         }

        
//     } catch (e) {
//         return next(
//             new AppError(e.message,500)
//         )
//     }

// }
// export {
//     getAllCourses,
//     getLecturesByCourseId,
//     createCourse,
//     updateCourse,
//     deleteCourse,
//     addLectureToCourse
// }