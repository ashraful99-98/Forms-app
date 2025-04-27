import mongoose, { Document, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { IUser } from './User';

export interface IOption {
  optionText: string;
  optionImage?: string;
}

export interface IQuestion {
  open: boolean;
  questionText: string;
  questionImage?: string;
  options: IOption[];
}

export interface IForm extends Document {
  createdBy: mongoose.Types.ObjectId | IUser; 
  name: string;
  description: string;
  questions: IQuestion[];
  stared: boolean;
  formType: string;
}

const FormSchema = new Schema<IForm>(
  {
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    questions: [
      {
        open: { type: Boolean, default: false },
        questionText: String,
        questionImage: { type: String, default: '' },
        options: [
          {
            optionText: String,
            optionImage: { type: String, default: '' },
          },
        ],
      },
    ],
    stared: { type: Boolean, default: false },
    formType: { type: String, default: 'anonymous' },
  },
  { timestamps: true }
);

FormSchema.plugin(mongoosePaginate);

export const FormModel = mongoose.model<IForm>('Form', FormSchema);








// final code 
// import mongoose, { Document, Schema } from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

// // Interface for options
// export interface IOption {
//   optionText: string;
//   optionImage?: {
//     public_id: string;
//     url: string;
//   };
// }

// // Interface for questions
// export interface IQuestion {
//   open: boolean;
//   questionText: string;
//   questionImage?: {
//     public_id: string;
//     url: string;
//   };
//   options: IOption[];
// }

// // Interface for the form model (extends mongoose document)
// export interface IForm extends Document {
//   createdBy: mongoose.Types.ObjectId;
//   name: string;
//   description: string;
//   questions: IQuestion[];
//   starred: boolean; // Corrected spelling here
//   formType: 'anonymous' | 'public' | 'private'; // Enum for form types
// }

// // Schema for options (embedded in question)
// const OptionSchema = new Schema<IOption>(
//   {
//     optionText: { type: String, required: true },
//     optionImage: {
//       public_id: { type: String },
//       url: { type: String },
//     },
//   },
//   { _id: false }
// );

// // Schema for questions (holds options and image)
// const QuestionSchema = new Schema<IQuestion>(
//   {
//     open: { type: Boolean, default: false },
//     questionText: { type: String, required: true },
//     questionImage: {
//       public_id: { type: String },
//       url: { type: String },
//     },
//     options: [OptionSchema],
//   },
//   { _id: false }
// );

// // Schema for form (main schema)
// const FormSchema = new Schema<IForm>(
//   {
//     createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     name: { type: String, required: true },
//     description: { type: String, default: '' },
//     questions: { type: [QuestionSchema], default: [] },
//     starred: { type: Boolean, default: false },
//     formType: { 
//       type: String, 
//       enum: ['anonymous', 'public', 'private'], 
//       default: 'anonymous' 
//     },
//   },
//   { timestamps: true }
// );

// // Applying pagination plugin
// FormSchema.plugin(mongoosePaginate);

// // Exporting the model
// export const FormModel = mongoose.model<IForm>('Form', FormSchema);

