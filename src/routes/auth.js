const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const { secret } = require("../middleware/authentication-jwt");
const userProvider = require("../providers/userProvider");

router.post("/", async (req, res) => {
  const { user, password } = req.body;
  // Verificación de que los datos del usuario son correctos

  if (user === "admin" && password === "admin") {
    const token = jwt.sign({ user, role: "Admin" }, secret);
    res.json({ token });
  } else {
    const dbUser = await userProvider.validateUser(user, password);
    if (dbUser) {
      const token = jwt.sign({ user: dbUser.email }, secret);
      res.json({ token });
    } else {
      res.status(400).json({ message: "Usuario o contraseña incorrecto" });
    }
  }
});

module.exports = router;
