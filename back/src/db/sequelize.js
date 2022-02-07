const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "/.src/db/database.db",
});

const associate = () => {
  const db = sequelize.models;
  Object.keys(db).forEach((model) => {
    if (db[model].associate) {
      db[model].associate(db);
    }
  });
};

module.exports = { sequelize, associate };
