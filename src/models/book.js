const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");
const Library = require("./library");

const Book = sequelize.define("Books", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  isbn: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Book.belongsTo(Library, { foreignKey: "libraryId" });
Library.hasMany(Book, { foreignKey: "libraryId" });

module.exports = Book;
