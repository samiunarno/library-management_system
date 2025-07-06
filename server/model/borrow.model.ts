import { Schema, model } from "mongoose";
import { IBorrow } from "../interface/borrow.interface";

const borrowSchema = new Schema<IBorrow>({
  bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  quantity: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  borrowedAt: { type: Date, default: Date.now },
});

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
