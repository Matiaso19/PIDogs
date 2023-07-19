const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {

   id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
   },
   image: {
    type: DataTypes.STRING,
    isUrl: true,
    allowNull: true,
   },
   name: {
    type: DataTypes.STRING,
    allowNull: false,
   },
   weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
   },
   height: {
    type: DataTypes.INTEGER,
    allowNull: false,
   },
   life_span: {
    type: DataTypes.INTEGER,
    allowNull: false
   },
   created: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true

   }
   
  }, {
    timestamps: false
  }
);
}


