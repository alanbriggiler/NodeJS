const { Book } = require('../models');

// Controlador para obtener todos los libros
async function getAllBooks(req, res) {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los libros' });
  }
}

// Controlador para crear un nuevo libro
async function createBook(req, res) {
  const { title, author, year } = req.body;

  try {
    const book = await Book.create({ title, author, year });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el libro' });
  }
}

// Controlador para obtener un libro por su ID
async function getBookById(req, res) {
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: 'Libro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el libro' });
  }
}

// Controlador para actualizar un libro por su ID
async function updateBook(req, res) {
  const { id } = req.params;
  const { title, author, year } = req.body;

  try {
    const book = await Book.findByPk(id);
    if (book) {
      await book.update({ title, author, year });
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: 'Libro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el libro' });
  }
}

// Controlador para eliminar un libro por su ID
async function deleteBook(req, res) {
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id);
    if (book) {
      await book.destroy();
      res.status(200).json({ message: 'Libro eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Libro no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
}

module.exports = {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
};
