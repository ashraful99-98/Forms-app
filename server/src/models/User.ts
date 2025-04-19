import mongoose, { Document, Schema, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export type UserRole = 'admin' | 'user';
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image?: string;
  role: UserRole;
  languagePreference?: string;
  createdForms: mongoose.Types.ObjectId[];
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    languagePreference: { type: String, default: 'en' },
    createdForms: [{ type: Schema.Types.ObjectId, ref: 'Form' }],
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: undefined,
  }
);

UserSchema.plugin(mongoosePaginate);

const User = mongoose.model<IUser, PaginateModel<IUser>>('User', UserSchema, 'Users');

export default User;

