import { Request, Response } from "express";
import { Book } from "../model/book.model";
import { Borrow } from "../model/borrow.model";

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { bookId, quantity, dueDate } = req.body;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.copies < quantity) {
      return res.status(400).json({ message: "Not enough copies available" });
    }

    const borrow = await Borrow.create({ bookId, quantity, dueDate });
    book.copies -= quantity;
    book.available = book.copies > 0;
    await book.save();

    res.status(201).json({ borrow, book });
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const getBorrowSummary = async (_req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$bookId",
          totalQuantityBorrowed: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },
      {
        $project: {
          _id: 0,
          bookId: "$_id",
          title: "$book.title",
          isbn: "$book.isbn",
          totalQuantityBorrowed: 1,
        },
      },
    ]);

    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
