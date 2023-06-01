const express = require("express");
const bookService = require("../services/book");
const router = express.Router();
const { authMiddleware } = require("../middleware/authentication-jwt");

router.get("/:bookId", async (req, res) => {
  const bookId = req.params.bookId;
  try {
    const book = await bookService.getBook(bookId);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const { isbn, titulo, autor, year, libraryId } = req.body;
  try {
    const newBook = await bookService.createBook({ isbn, titulo, autor, year, libraryId });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:bookId", authMiddleware, async (req, res) => {
  const bookId = req.params.bookId;
  const { isbn, titulo, autor, year, libraryId } = req.body;
  try {
    const updatedBook = await bookService.updateBook(bookId, { isbn, titulo, autor, year, libraryId });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:bookId", authMiddleware, async (req, res) => {
  const bookId = req.params.bookId;
  try {
    const book = await bookService.deleteBook(bookId);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
