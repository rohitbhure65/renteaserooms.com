import { Document, Schema, model } from 'mongoose';

export interface IPost extends Document {
  id: string;
  userId: string;
  title: string;
  price: number;
  images: string[];
  country: string;
  state: string;
  city: string;
  address: string;
  bedroom: number;
  bathroom: number;
  latitude: string;
  longitude: string;
  type: string;
  property: string;
  createdAt: Date;
}

const PostSchema = new Schema<IPost>({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  bedroom: { type: Number, required: true },
  bathroom: { type: Number, required: true },
  latitude: { type: String },
  longitude: { type: String },
  type: { type: String },
  property: { type: String },
  createdAt: { type: Date, default: Date.now }
},{ timestamps: true });

const PostModel = model<IPost>('Post', PostSchema);
export default PostModel;
