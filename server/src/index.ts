import express, { Application, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import  cloudinary  from 'cloudinary';
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fs from 'fs/promises';


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

// cloudinary config 
cloudinary.v2.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY, });

// upload image 
// app.post("/api/image", upload.single("myfile"), async (req: Request, res: Response) => {
//   try {
//     const file = req.file;
//     if (!file) {
//       res.status(400).json({ error: "No file uploaded" });
//       return;
//     }

//     // Upload to Cloudinary
//     const myCloud = await cloudinary.v2.uploader.upload(file.path, {
//       folder: "FormImage",
//     });

//     // Save to MongoDB
//     const newImage = new ImageModel({
//       image: {
//         public_id: myCloud.public_id,
//         url: myCloud.secure_url,
//       },
//     });

//     const savedImage = await newImage.save();

//     // Delete the file from local server after uploading to cloud
//     await fs.unlink(file.path);

//     res.status(201).json({
//       success: true,
//       message: "Image uploaded successfully",
//       image: {
//         _id: savedImage._id,
//         public_id: savedImage?.image?.public_id,
//         url: savedImage?.image?.url,
//         createdAt: savedImage.createdAt,
//         updatedAt: savedImage.updatedAt,
//       },
//     });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: "Upload failed", details: (e as Error).message });
//   }
// });

// // GET all uploaded images

// app.get("/api/images", async (_req: Request, res: Response) => {
//   try {
//     const images = await ImageModel.find().lean();
//     res.status(200).json({
//       success: true,
//       images: images.map(img => ({
//         _id: img._id,
//         public_id: img?.image?.public_id,
//         url: img?.image?.url,
//         createdAt: img.createdAt,
//         updatedAt: img.updatedAt,
//       })),
//     });
//   } catch (e) {
//     res.status(500).json({ error: "Image fetch failed", details: (e as Error).message });
//   }
// });





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




















// updated indexedDB.ts 

// import express, { Application, Request,NextFunction, Response } from "express";
// import mongoose from "mongoose";
// import { v2 as cloudinary } from "cloudinary"; // 🔥 fixed import
// import cors from "cors";
// import dotenv from "dotenv";
// import multer from "multer";
// import path from "path";
// import cookieParser from "cookie-parser";
// import bodyParser from "body-parser";
// import fs from "fs/promises";

// // Route Imports
// import authRoutes from "./routes/auth";
// import userRoutes from "./routes/userRoute";
// import formRoutes from "./routes/formRoutes";
// import ImageModel from "./models/imageModel";

// dotenv.config();

// const app: Application = express();
// const PORT: number = Number(process.env.PORT) || 8000;

// // MongoDB connection
// const dbUrl = process.env.MONGO_URI || "mongodb+srv://formsAppServer:05jx80NNrcTScUrJ@forms-app.nwxnlgi.mongodb.net/?retryWrites=true&w=majority&appName=forms-app";

// mongoose.set("debug", true);
// mongoose.connect(dbUrl)
//   .then(conn => console.log(`MongoDB Connected: ${conn.connection.host}`)) // 🔥 fixed backtick
//   .catch(err => {
//     console.error("MongoDB connection error:", err.message);
//     setTimeout(() => mongoose.connect(dbUrl), 5000);
//   });

// // Middleware
// app.use(cors({
//   origin: process.env.ORIGIN || 'http://localhost:3000',
//   credentials: true,
// }));
// app.use(express.json());
// app.use(cookieParser());
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// // Serve static files (uploaded images)
// app.use('/public', express.static(path.join(__dirname, 'public')));

// // Multer setup
// // const storage = multer.diskStorage({
// //   destination: path.join(__dirname, 'public'),
// //   filename: (_req, file, cb) => {
// //     const uniqueName = `google-form-content-questions-${Date.now()}${path.extname(file.originalname)}`; // 🔥 fixed backtick
// //     cb(null, uniqueName);
// //   }
// // });
// // const upload = multer({ storage });

// const storage = multer.memoryStorage(); // or diskStorage if you're saving locally
// const upload = multer({ storage });


// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/forms", formRoutes);

// // Cloudinary config
// cloudinary.config({ 
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_SECRET_KEY,
// });

// // Upload image
// // app.post("/api/images", upload.single("myfile"), async (req: Request, res: Response) => {
// //   try {
// //     const file = req.file;
// //     if (!file) {
// //       res.status(400).json({ error: "No file uploaded" });
// //       return;
// //     }

// //     // Upload to Cloudinary
// //     const myCloud = await cloudinary.uploader.upload(file.path, {
// //       folder: "FormImage",
// //     });

// //     // Save to MongoDB
// //     const newImage = new ImageModel({
// //       image: {
// //         public_id: myCloud.public_id,
// //         url: myCloud.secure_url,
// //       },
// //     });

// //     const savedImage = await newImage.save();

// //     // Delete file from local server
// //     await fs.unlink(file.path).catch(err => console.error("Failed to delete local file", err)); // 🔥 safe delete

// //     res.status(201).json({
// //       success: true,
// //       message: "Image uploaded successfully",
// //       image: {
// //         _id: savedImage._id,
// //         public_id: savedImage?.image?.public_id,
// //         url: savedImage?.image?.url,
// //         // createdAt: savedImage.createdAt,
// //         // updatedAt: savedImage.updatedAt,
// //       },
// //     });
// //   } catch (e) {
// //     console.error(e);
// //     res.status(500).json({ error: "Upload failed", details: (e as Error).message });
// //   }
// // });

// app.post("/api/images", upload.single("myfile"), async (req, res) => {
//   try {
//     const file = req.file;
//     if (!file) {
//     res.status(400).json({ message: "No file uploaded" });
//     return;
//     }

//     // For example: upload to Cloudinary
//     const result = cloudinary.uploader.upload_stream(
//       { resource_type: "image" },
//       (error, result) => {
//         if (error) return res.status(500).json({ message: error.message });

//         return res.status(200).json({
//           image: {
//             public_id: result?.public_id,
//             url: result?.secure_url,
//           },
//         });
//       }
//     );

//     // Pipe the file buffer to Cloudinary
//     // streamifier.createReadStream(file.buffer).pipe(result);
//   } catch (error) {
//     console.error("Upload error:", error);
//     res.status(500).json({ message: "Image upload failed" });
//   }
// });


// // Get all uploaded images
// app.get("/api/images", async (_req: Request, res: Response) => {
//   try {
//     const images = await ImageModel.find().lean();
//     res.status(200).json({
//       success: true,
//       images: images.map(img => ({
//         _id: img._id,
//         public_id: img?.image?.public_id,
//         url: img?.image?.url,
//         // createdAt: img.createdAt,
//         // updatedAt: img.updatedAt,
//       })),
//     });
//   } catch (e) {
//     res.status(500).json({ error: "Image fetch failed", details: (e as Error).message });
//   }
// });

// // Health check
// app.get("/", (_req: Request, res: Response) => {
//   res.send("Forms app server is running");
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on PORT: ${PORT}`); // 🔥 fixed backtick
// });

