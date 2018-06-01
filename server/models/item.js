'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      allowNull: false
    },
    checked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Item.associate = (models) => {
    Item.belongsTo(models.List, {
      foreignKey: 'listId',
      onDelete: 'CASCADE'
    });
  };
  return Item;
};
