import { Document, Schema, model } from "mongoose";

export interface IMessage extends Document {
  id: string;
  userId: string;
  chatId: string;
  text: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  chatId: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
},{ timestamps: true });

const MessageModel = model<IMessage>("Message", MessageSchema);
export default MessageModel;
