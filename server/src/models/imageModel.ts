// import mongoose, { Document, Schema, Model } from 'mongoose';

// // Image document interface
// export interface IImage extends Document {
//   image: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// // Define schema
// const imageSchema = new Schema<IImage>(
//   {
//     image: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// // Create and export model
// const ImageModel: Model<IImage> = mongoose.model<IImage>('Image', imageSchema);
// export default ImageModel;


import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  image: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Image", ImageSchema);
