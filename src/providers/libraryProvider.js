const { Op } = require("sequelize");
const { Library, Book } = require("../models");

const createLibrary = async (libraryOptions, isAuthenticated) => {
  try {
    if (!isAuthenticated) {
      throw new Error("No estás autenticado. No puedes crear una librería.");
    }

    const newLibrary = await Library.create(libraryOptions);
    return newLibrary;
  } catch (error) {
    throw error;
  }
};

const getLibrary = async (id) => {
  try {
    const library = await Library.findByPk(id, {
      include: [{ model: Book, as: "books" }],
    });
    if (library) {
      return library;
    } else {
      throw new Error("Librería no encontrada");
    }
  } catch (error) {
    throw error;
  }
};

const getLibraries = async () => {
  try {
    const libraries = await Library.findAll();
    return libraries;
  } catch (error) {
    throw error;
  }
};

const updateLibrary = async (libraryId, libraryOptions, isAuthenticated) => {
  try {
    if (!isAuthenticated) {
      throw new Error("No estás autenticado. No puedes modificar una librería.");
    }

    await getLibrary(libraryId);
    const [numRowsUpdated] = await Library.update(libraryOptions, {
      where: { id: libraryId },
    });
    console.log(`Se actualizaron ${numRowsUpdated} filas en la DB`);
    return Library.findByPk(libraryId);
  } catch (error) {
    throw error;
  }
};

const deleteLibrary = async (libraryId, isAuthenticated) => {
  try {
    if (!isAuthenticated) {
      throw new Error("No estás autenticado. No puedes eliminar una librería.");
    }

    await getLibrary(libraryId);
    await Library.destroy({ where: { id: libraryId } });
    return;
  } catch (error) {
    throw error;
  }
};

const addBookToLibrary = async (libraryId, bookOptions, isAuthenticated) => {
  try {
    if (!isAuthenticated) {
      throw new Error("No estás autenticado. No puedes agregar un libro a una librería.");
    }

    await getLibrary(libraryId);
    const newBook = await Book.create({
      ...bookOptions,
      libraryId: libraryId,
    });
    return newBook;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createLibrary, // (AUTH)
  deleteLibrary, // (AUTH)
  getLibrary,
  getLibraries,
  updateLibrary, // (AUTH)
  addBookToLibrary, // (AUTH)
};
