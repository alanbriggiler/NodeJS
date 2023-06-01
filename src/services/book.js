const bookProvider = require("../providers/bookProvider");

const getBook = async (id) => {
  return await bookProvider.getBook(id);
};

const getAllBooks = async () => {
  return await bookProvider.getAllBooks();
};

const createBook = async (book) => {
  return await bookProvider.createBook(book);
};

const updateBook = async (id, book) => {
  return await bookProvider.updateBook(id, book);
};

const deleteBook = async (id) => {
  return await bookProvider.deleteBook(id);
};

module.exports = {
  getBook,
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
};
