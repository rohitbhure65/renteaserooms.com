import { Document, Schema, model } from 'mongoose';

export interface IChat extends Document {
  id: string;
  userIDs: string[];
  seenBy: string[];
  lastMessage: string;
  createdAt: Date;
}

const ChatSchema = new Schema<IChat>({
  id: { type: String, required: true, unique: true },
  userIDs: { type: [String], required: true },
  seenBy: { type: [String], required: true },
  lastMessage: { type: String },
  createdAt: { type: Date, default: Date.now }
},{ timestamps: true });

const ChatModel = model<IChat>('Chat', ChatSchema);
export default ChatModel;
