const { Op } = require("sequelize");
const { Book } = require("../models");

const createBook = async (bookOptions, isAuthenticated) => {
  try {
    if (!isAuthenticated) {
      throw new Error("No estás autenticado. No puedes crear un libro.");
    }

    const newBook = await Book.create(bookOptions);
    return newBook;
  } catch (error) {
    throw error;
  }
};

const getBook = async (id) => {
  try {
    const book = await Book.findByPk(id, { paranoid: false });
    if (book) {
      return book;
    } else {
      throw new Error("Libro no encontrado");
    }
  } catch (error) {
    throw error;
  }
};

const getBooks = async () => {
  try {
    const books = await Book.findAll({ paranoid: false });
    return books;
  } catch (error) {
    throw error;
  }
};

const updateBook = async (bookId, bookOptions, isAuthenticated) => {
  try {
    if (!isAuthenticated) {
      throw new Error("No estás autenticado. No puedes modificar un libro.");
    }

    await getBook(bookId);
    const [numRowsUpdated] = await Book.update(bookOptions, {
      where: { id: bookId },
    });
    console.log(`Se actualizaron ${numRowsUpdated} filas en la DB`);
    return Book.findByPk(bookId);
  } catch (error) {
    throw error;
  }
};

const deleteBook = async (bookId, isAuthenticated) => {
  try {
    if (!isAuthenticated) {
      throw new Error("No estás autenticado. No puedes eliminar un libro.");
    }

    await getBook(bookId);
    await Book.destroy({ where: { id: bookId } }); // Realizar un borrado lógico eliminando el libro de la base de datos
    return;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createBook, // (AUTH)
  deleteBook, // (AUTH)
  getBook,
  getBooks,
  updateBook, // (AUTH)
};
