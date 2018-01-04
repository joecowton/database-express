'use strict';

module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('item', {
    key: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('value');
      },
    }
  });

  return Item;
};
