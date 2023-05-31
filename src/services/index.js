const { getUser, getUsers, createUser, updateUser, deleteUser } = require("./user");
const { getLibrary, createLibrary, updateLibrary, deleteLibrary } = require("./library");
const { getBook, getAllBooks, createBook, updateBook, deleteBook } = require("./book");

module.exports = { getUser, getUsers, createUser, updateUser, deleteUser, getLibrary, createLibrary, updateLibrary, deleteLibrary, getBook, getAllBooks, createBook, updateBook, deleteBook };
