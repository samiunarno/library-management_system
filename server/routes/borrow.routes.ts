import express from "express";
import { borrowBook, getBorrowSummary } from "../controller/borrow.controller";

const router = express.Router();

router.post("/", borrowBook);
router.get("/summary", getBorrowSummary);

export default router;
