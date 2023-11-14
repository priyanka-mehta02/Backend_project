import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.js";
import authMiddleware from "./middelware/authMiddleware.js";
import dotenv from 'dotenv';
import Users from "./models/Users.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB setup
mongoose.connect("mongodb://localhost:27017/my-mern-app");

//I want you to define a private end point
// In that end point you will use authMiddle ware
// That middle ware will verify the token
// after verifying the token you will have access to the payload of the user
// this pay load could contain _id of the user it depends what payload you used while generating the token
// through that private end point you should perform any activity that you like e.g  updating the user profile by adding his age
// in case of updating/ adding age to user profile you need to pass the value of age with token from post man
// and after verifying token your controller for that end point will update the age in in data base
// and will send back the new values of that user record

// Routes
app.use("/api/auth", authRoutes);

app.get("/", async (req, res, next) => {
  res.send("hello to everyone");
});

// Private endpoint for updating user age
app.put("/api/user/update-age", authMiddleware, async (req, res) => {
  try{
    const { age } = req.body;
    if (!age || typeof age !== "number") {
      return res
        .status(400)
        .json({ message: "Bad Request: Age is required and must be a number" });
    }

  console.log('user id in controller', req.userId)
   const user = await Users.findByIdAndUpdate(
      req.userId,
      { $set: { age } },
      { new: true })
     
  
        // Respond with the updated user profile
        res.json({ user: user });
      }

      catch(err){
        res.send(err.message)
    
      }
  }
  );

// Routes
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
