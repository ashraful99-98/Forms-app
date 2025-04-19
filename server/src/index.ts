// import cors from "cors";
// import express, { Application, Request, Response } from "express";
// import mongoose from "mongoose";
// import authRoutes from "./routes/auth";
// import dotenv from "dotenv";
// import userRoutes from "./routes/userRoute";

// import formRoutes from './routes/formRoutes';

// dotenv.config();

// // const app: Application = express();
// const PORT: number = Number(process.env.PORT) || 8000;

// //

// const app = express();
// const cookieParser = require("cookie-parser");
// mongoose.set("debug", true);

// require('dotenv').config();


// const port = process.env.PORT || 8000;

// // Use middleware
// app.use(express.json());
// app.use(cookieParser());


// // CORS configuration
// app.use(
//     cors({
//         origin: process.env.ORIGIN || 'http://localhost:3000',
//         credentials: true,
//     })
// );


// //
// // Middleware
// app.use(cors({ credentials: true, origin: true }));
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/forms', formRoutes);

// // MongoDB connection URI
// // const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@forms-app.nwxnlgi.mongodb.net/?retryWrites=true&w=majority&appName=forms-app`

// const dbUrl = "mongodb+srv://formsAppServer:05jx80NNrcTScUrJ@forms-app.nwxnlgi.mongodb.net/?retryWrites=true&w=majority&appName=forms-app"

// // MongoDB client setup
// const connectDB = async (): Promise<void> => {
//   try {
//     const connection = await mongoose.connect(dbUrl);
//     console.log(`Database connected successfully: ${connection.connection.host}`);
//   } catch (error) {
//     console.error("Database connection error:", (error as Error).message);
//     setTimeout(connectDB, 5000); // Retry connection after 5 seconds
//   }
// };

// connectDB();

// // Routes
// app.get("/", (req: Request, res: Response) => {
//   res.send("froms app server is running");
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on PORT: ${PORT}`);
// });

import express, { Application, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fs from "fs"; // Optional if you plan to check or manipulate files

// Route Imports
import authRoutes from "./routes/auth";
import userRoutes from "./routes/userRoute";
import formRoutes from './routes/formRoutes';
import ImageModel from "./models/imageModel";

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 8000;

// MongoDB connection
const dbUrl = process.env.MONGO_URI || "mongodb+srv://formsAppServer:05jx80NNrcTScUrJ@forms-app.nwxnlgi.mongodb.net/?retryWrites=true&w=majority&appName=forms-app";

mongoose.set("debug", true);
mongoose.connect(dbUrl)
  .then(conn => console.log(`MongoDB Connected: ${conn.connection.host}`))
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    setTimeout(() => mongoose.connect(dbUrl), 5000);
  });

// Middleware
app.use(cors({
  origin: process.env.ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files (uploaded images)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Multer setup
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public'),
  filename: (_req, file, cb) => {
    const uniqueName = `google-form-content-questions-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/forms", formRoutes);

// GET all uploaded images
app.get("/api/images", async (_req: Request, res: Response) => {
  try {
    const result = await ImageModel.find().lean();
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: "Image fetch failed", details: (e as Error).message });
  }
});

// POST image upload
app.post("/api/images", upload.single("myfile"), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const newImage = new ImageModel({ image: file.filename });
    const savedImage = await newImage.save();

    res.status(201).json({
      image: savedImage.image,
      host: `${req.protocol}://${req.get("host")}`
    });
  } catch (e) {
    res.status(500).json({ error: "Upload failed", details: (e as Error).message });
  }
});


// Health check
app.get("/", (_req: Request, res: Response) => {
  res.send("Forms app server is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
