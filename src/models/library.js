const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const Library = sequelize.define("Library", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  paranoid: true, // Agrega eliminación lógica
});

module.exports = Library;
