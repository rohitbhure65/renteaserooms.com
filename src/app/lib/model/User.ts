import mongoose, { Document, Schema, model } from 'mongoose';
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  phone: number;
  password: string;
  role: string;
  city: string;
  gender: string;
  email: string;
  avatar: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  city: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

UserSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const UserModel = mongoose.models.User || model<IUser>('User', UserSchema);
export default UserModel;
