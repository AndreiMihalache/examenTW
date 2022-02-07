const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelize");

const JobPosting = sequelize.define("JobPosting", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: DataTypes.INTEGER,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 255],
    },
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
});

JobPosting.associate = () => {
  const { Candidate } = sequelize.models;
  JobPosting.hasMany(Candidate);
};

module.exports = JobPosting;
