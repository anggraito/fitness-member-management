'use strict';
module.exports = function(sequelize, DataTypes) {
  var memberclass = sequelize.define('memberclass', {
    MemberId: DataTypes.INTEGER,
    ClassnameId: DataTypes.INTEGER
  });
  memberclass.associate = (models) => {
    memberclass.belongsTo(models.member, {foreignKey:'MemberId'});
    memberclass.belongsTo(models.classname, {foreignKey:'ClassnameId'});
  }
  return memberclass;
};
