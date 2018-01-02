module.exports = function(sequelize, DataType) {
  var Somekey = sequelize.define('somekey', {
    somekey: DataType.INTEGER,
  })
  return Somekey;
}
