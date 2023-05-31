const { Op } = require("sequelize");
const { User, Ticket } = require("../models");

const createUser = async (userOptions) => {
  try {
    const newUser = await User.create(userOptions);
    const ticket = await Ticket.create({ used: false, UserId: newUser.id });
    return newUser;
  } catch (error) {
    throw error;
  }
};

const getUser = async (id) => {
  try {
    const user = await User.findByPk(id, { include: [{ all: true }] });
    if (user) {
      return user;
    } else {
      throw new Error("Usuario no encontrado");
    }
  } catch (error) {
    throw error;
  }
};

const getUsers = async (criteria) => {
  try {
    let options = { include: [{ all: true }] };
    if (criteria) {
      options = { ...options, where: { [Op.or]: criteria } };
    }
    const users = await User.findAll(options);

    if (users) {
      return users;
    } else {
      throw new Error(
        "No se encontraron usuarios con ese criterio de busqueda"
      );
    }
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId, userOptions) => {
  try {
    await getUser(userId);
    const [numRowsUpdated] = await User.update(userOptions, {
      where: { id: userId },
    });
    console.log(`Se actualizaron ${numRowsUpdated} filas en la DB`);
    return User.findByPk(userId);
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    return User.destroy({ where: { id: userId } });
  } catch (error) {
    throw error;
  }
};

const validateUser = async (email, password) => {
  try {
    const user = await User.findOne({
      where: { email, password },
    });
    if (user) {
      return user;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  validateUser,
};
