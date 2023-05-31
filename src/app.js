const express = require("express");
const bodyParser = require("body-parser");
const { logging } = require("./middleware");
const { userRouter, authRouter } = require("./routes");
const { initializeDB } = require("./config/dbConfig");
const { authMiddleware } = require("./middleware/authentication-jwt");

const PORT = 8080;

const app = express();

app.use(bodyParser.json());
app.use(logging);

app.use("/user", authMiddleware, userRouter);

app.use("/login", authRouter);

app.listen(PORT, async () => {
  await initializeDB();
  console.log(
    `Escuchando peticiones en el puerto: ${PORT}`
  );
});
