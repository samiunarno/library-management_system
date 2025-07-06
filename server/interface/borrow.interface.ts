import { Document, Types } from "mongoose";

export interface IBorrow extends Document {
  bookId: Types.ObjectId;
  quantity: number;
  dueDate: Date;
  borrowedAt: Date;
}
