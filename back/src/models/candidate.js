const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelize");

const Candidate = sequelize.define("Candidate", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5, 255],
    },
  },
  cv: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [100, 255],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  jobPostingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Candidate.associate = () => {
  const { JobPosting } = sequelize.models;
  Candidate.belongsTo(JobPosting, { foreignKey: "jobPostingId" });
};

module.exports = Candidate;
