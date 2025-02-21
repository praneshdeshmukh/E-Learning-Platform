import cookieParser from 'cookie-parser';
config();
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

// Middlewares
// Built-In
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Third-Party
const corsOptions ={
  origin:'http://localhost:5173', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(cookieParser());

// Server Status Check Route
app.get('/ping', (_req, res) => {
  res.send('Pong');
});

// Import all routes
import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import miscRoutes from './routes/miscellaneous.routes.js';

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1', miscRoutes);

// Default catch all route - 404
app.all('*', (_req, res) => {
  res.status(404).send('OOPS!!! 404 Page Not Found');
});

// Custom error handling middleware
app.use(errorMiddleware);

export default app;



// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import { config } from 'dotenv';
// import express from 'express';
// import morgan from 'morgan';

// import errorMiddlware from './middlewares/error.middleware.js';
// import courseRoutes from './routes/course.Routes.js'
// import miscRoutes from './routes/miscellanous.routes.js'
// import paymentRoutes from './routes/payment.routes.js'
// import userRoutes from './routes/user.Routes.js'

// config();

// const app = express();

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// app.use(
//     cors({
//         // origin: 'https://learning-management-system-roan.vercel.app',
//         origin : [process.env.FRONTEND_URL],
//         // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//         // preflightContinue: false,
//         // optionsSuccessStatus: 204,
//         credentials: true,
//     })
//   );

// app.use(cookieParser());

// app.use(morgan('dev'));

// app.use('/ping',function(_req,res){
//     res.send('Pong');
// })

// app.use('/api/v1/user', userRoutes)
// app.use('/api/v1/course', courseRoutes)
// app.use('/api/v1/payments', paymentRoutes)
// app.use('/api/v1', miscRoutes);
// app.all('*',(_req,res)=>{
//     res.status(404).send('OOPS!!  404 page not found ')
// })
// app.use(errorMiddlware);

// export default app;