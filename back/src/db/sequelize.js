const { Sequelize } = require("sequelize");

sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
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
