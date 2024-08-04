import { Document, Schema, model } from 'mongoose';

export interface ISavedPost extends Document {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
}

const SavedPostSchema = new Schema<ISavedPost>({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  postId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
},{ timestamps: true });

const SavedPostModel = model<ISavedPost>('SavedPost', SavedPostSchema);
export default SavedPostModel;
