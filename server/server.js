import app from './app.js';
import connectionToDb from './config/databaseConnect.js';
import cloudinary from 'cloudinary';
const PORT = process.env.PORT || 7000;
import Razorpay from "razorpay";

// cloudinary configurations
cloudinary.v2.config({ 
    cloud_name: 'dzpzr6rvu', 
    api_key: '292947562157186', 
    api_secret: '-uFIuSFvystaW6OAdjfkNtut9do'
     
  });
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

app.listen(PORT,async () => {
    await connectionToDb();
    console.log(`Server Up at http://localhost:${PORT}`);
})                                                          