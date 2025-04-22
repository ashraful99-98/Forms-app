import mongoose, { Document, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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
  createdBy: mongoose.Types.ObjectId;
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


// import mongoose, { Document, Schema } from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

// export interface IOption {
//   optionText: string;
//   optionImage?: {
//     public_id: string;
//     url: string;
//   };
// }

// export interface IQuestion {
//   open: boolean;
//   questionText: string;
//   questionImage?: {
//     public_id: string;
//     url: string;
//   };
//   options: IOption[];
// }

// export interface IForm extends Document {
//   createdBy: mongoose.Types.ObjectId;
//   name: string;
//   description: string;
//   questions: IQuestion[];
//   stared: boolean;
//   formType: string;
// }

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

// const FormSchema = new Schema<IForm>(
//   {
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     name: { type: String, required: true },
//     description: { type: String, default: '' },
//     questions: [QuestionSchema],
//     stared: { type: Boolean, default: false },
//     formType: { type: String, default: 'anonymous' },
//   },
//   { timestamps: true }
// );

// FormSchema.plugin(mongoosePaginate);

// export const FormModel = mongoose.model<IForm>('Form', FormSchema);
