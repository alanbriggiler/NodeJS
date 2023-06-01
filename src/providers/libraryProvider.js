const express = require("express");
const libraryService = require("../services/library");
const router = express.Router();
const { authIsAdmin } = require("../middleware/authentication-jwt");

router.get("/:libraryId", async (req, res) => {
  const libraryId = req.params.libraryId;
  try {
    const library = await libraryService.getLibrary(libraryId);
    res.status(200).json(library);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const libraries = await libraryService.getLibraries();
    res.status(200).json(libraries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", authIsAdmin, async (req, res) => {
  const { nombre } = req.body;
  const isAuthenticated = req.isAuthenticated(); // Obtener el estado de autenticación

  try {
    const newLibrary = await libraryService.createLibrary({ nombre }, isAuthenticated);
    res.status(201).json(newLibrary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:libraryId", authIsAdmin, async (req, res) => {
  const libraryId = req.params.libraryId;
  const { nombre } = req.body;
  const isAuthenticated = req.isAuthenticated(); // Obtener el estado de autenticación

  try {
    const updatedLibrary = await libraryService.updateLibrary(libraryId, { nombre }, isAuthenticated);
    res.status(200).json(updatedLibrary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:libraryId", authIsAdmin, async (req, res) => {
  const libraryId = req.params.libraryId;
  const isAuthenticated = req.isAuthenticated(); // Obtener el estado de autenticación

  try {
    const library = await libraryService.deleteLibrary(libraryId, isAuthenticated);
    res.status(200).json(library);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
