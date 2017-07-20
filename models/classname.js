'use strict';
module.exports = function(sequelize, DataTypes) {
  var classname = sequelize.define('classname', {
    name: DataTypes.STRING
  });
  classname.associate = (models) => {
    classname.belongsToMany(models.member, {
      through:'memberclass',
      foreignKey:'ClassnameId'
    });
  }
  return classname;
};
