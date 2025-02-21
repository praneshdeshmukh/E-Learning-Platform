
import mongoose from "mongoose";
mongoose.set('strictQuery',false);
// if data not found about some extra info req then dont give error ignore it and chill

const connectionToDb = async () => {
    try {
        const {connection} = await mongoose.connect(
            process.env.MONGO_URL || 
            'mongodb://127.0.0.1:27017/lms'
        );
            if (connection) {
                console.log(`CONNECTED TO MongoDB: ${connection.host}`);
            }
        } catch (e) {
            console.log(e);
            process.exit(1);
    }
}

export default connectionToDb;