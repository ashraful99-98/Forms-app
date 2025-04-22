import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  image: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Image", ImageSchema);


// import mongoose, { Schema, Document } from "mongoose";

// interface IImage extends Document {
//   image: {
//     public_id: string;
//     url: string;
//   };
// }

// const ImageSchema = new Schema<IImage>(
//   {
//     image: {
//       public_id: { type: String, required: true },
//       url: { type: String, required: true },
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model<IImage>("Image", ImageSchema);
