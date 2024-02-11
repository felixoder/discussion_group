import express from "express";
import mongoose from "mongoose";
import authRoutes from './routes/auth.route.js'
const app = express();
app.use(express.json())



mongoose
  .connect(
    "mongodb+srv://discussion_felix:zVkQZIqZSHzz0vVv@cluster0.5ztqso0.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(console.log("database is connected"))
  .catch((err) => {
    console.log("error is occurring", err);
  });

app.use('/api/auth' , authRoutes)

app.listen(3000,()=>{
console.log('Server is running on port 3000')
});

//zVkQZIqZSHzz0vVv
