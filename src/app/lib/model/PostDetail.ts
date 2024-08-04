import { Document, Schema, model } from 'mongoose';

export interface IPostDetail extends Document {
  id: string;
  postId: string;
  desc: string;
  utilities: string;
  pet: string;
  income: string;
  size: number;
  school: number;
  bus: number;
  restaurant: number;
}

const PostDetailSchema = new Schema<IPostDetail>({
  id: { type: String, required: true, unique: true },
  postId: { type: String, required: true },
  desc: { type: String, required: true },
  utilities: { type: String, required: true },
  pet: { type: String, required: true },
  income: { type: String, required: true },
  size: { type: Number, required: true },
  school: { type: Number, required: true },
  bus: { type: Number, required: true },
  restaurant: { type: Number, required: true }
},{ timestamps: true });

const PostDetailModel = model<IPostDetail>('PostDetail', PostDetailSchema);
export default PostDetailModel;
