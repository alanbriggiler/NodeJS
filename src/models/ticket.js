const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");
const User = require("./user");

const Ticket = sequelize.define("Tickets", {
  used: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

User.hasMany(Ticket);
Ticket.belongsTo(User);

module.exports = Ticket;
