'use strict';
module.exports = (sequelize, DataTypes) => {
  var List = sequelize.define('List', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    private: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  List.associate = (models) => {
    List.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    List.hasMany(models.Item, {
      foreignKey: 'listId',
      as: 'items'
    });
  };
  return List;
};
