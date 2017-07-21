'use strict';

var Model = require('../models');

module.exports = function(sequelize, DataTypes) {
  var memberclass = sequelize.define('memberclass', {
    MemberId: DataTypes.INTEGER,
    ClassnameId: DataTypes.INTEGER,
    date: DataTypes.DATE
  });
  memberclass.associate = (models) => {
    memberclass.belongsTo(models.member, {foreignKey:'MemberId'});
    memberclass.belongsTo(models.classname, {foreignKey:'ClassnameId'});
  }
  return memberclass;
};


// validate:
// { isTheSame: (value, next) => {
//   Modelmemberclass.findAndCountAll({
//     where: {
//       MemberId:value
//     }
//   })
//   .then( countDone => {
//     Model.member.findById({
//       where: {
//         id:value
//       }
//     })
//     .then( countKuota => {
//       if (countKuota.kuota == countDone) return next('Kuota already finished');
//       return next();
//     })
//       .catch(err => next(err));
//     })
//   }
// }
// },
