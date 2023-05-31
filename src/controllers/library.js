const { Library } = require('../models');

// Controlador para obtener todas las librerías
async function getAllLibraries(req, res) {
  try {
    const libraries = await Library.findAll();
    res.status(200).json(libraries);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las librerías' });
  }
}

// Controlador para crear una nueva librería
async function createLibrary(req, res) {
  const { name, location, telefono } = req.body;

  try {
    const library = await Library.create({ name, location, telefono });
    res.status(201).json(library);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la librería' });
  }
}

// Controlador para obtener una librería por su ID
async function getLibraryById(req, res) {
  const { id } = req.params;

  try {
    const library = await Library.findByPk(id);
    if (library) {
      res.status(200).json(library);
    } else {
      res.status(404).json({ error: 'Librería no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la librería' });
  }
}

// Controlador para actualizar una librería por su ID
async function updateLibrary(req, res) {
  const { id } = req.params;
  const { name, location, telefono } = req.body;

  try {
    const library = await Library.findByPk(id);
    if (library) {
      await library.update({ name, location, telefono });
      res.status(200).json(library);
    } else {
      res.status(404).json({ error: 'Librería no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la librería' });
  }
}

// Controlador para eliminar una librería por su ID
async function deleteLibrary(req, res) {
  const { id } = req.params;

  try {
    const library = await Library.findByPk(id);
    if (library) {
      await library.destroy();
      res.status(200).json({ message: 'Librería eliminada correctamente' });
    } else {
      res.status(404).json({ error: 'Librería no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la librería' });
  }
}

module.exports = {
  getAllLibraries,
  createLibrary,
  getLibraryById,
  updateLibrary,
  deleteLibrary,
};
