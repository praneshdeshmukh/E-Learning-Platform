import { Schema, model } from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minLength: [8, 'Title must be atleast 8 charachters'],
        maxLength: [60, 'Title must be atleast 60 charachters'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [4, 'Description must be atleast 4 charachters'],
        maxLength: [200, 'Description must be atleast 200 charachters'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
    },
    //thumbnail of the lecture
    thumbnail: {
        public_id: {
            type: String,
            required: true, // not giving an error but required field
         },
         secure_url: {
             type:String, 
            //  required: true,
         } 
    },
    // lectures --> multiple lectures
    lectures: [
        // every lecture will have
        { 
            title: String,
            //every lecture will have its own description
            description: String,
            // thumbnail of particular episode
            lecture: {
                public_id: {
                   type: String,
                   required: true,
                },
                secure_url: {
                    type:String,
                    required: true,
                } 
            }
        }
    ],
    numberOfLectures: {
        type: String,
        default: 0,
    },
    createdBy: {
        // Admin related
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Course = model('Course', courseSchema);
export default Course;