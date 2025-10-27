const definitions = (sequelize, Sequelize) => {
  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  return db;
};

module.exports = definitions;
