import express from "express";
import mongoose from "mongoose";
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import postRoutes from './routes/post.route.js'

import cookieParser from "cookie-parser";
const app = express();
app.use(express.json())
app.use(cookieParser());



mongoose
  .connect(
    "mongodb+srv://discussion_felix:zVkQZIqZSHzz0vVv@cluster0.5ztqso0.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(console.log("database is connected"))
  .catch((err) => {
    console.log("error is occurring", err);
  });

app.use('/api/auth' , authRoutes)
app.use('/api/user', userRoutes);
app.use('/api/post',postRoutes)

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode ||500
  const message = err.message
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })

})
app.listen(3000,()=>{
console.log('Server is running on port 3000')
});

//zVkQZIqZSHzz0vVv
