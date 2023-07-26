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
    type: DataTypes.STRING(20000),
    allowNull: true,
   },
   name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
   },
   weightMin: {
    type: DataTypes.INTEGER,
    allowNull: false,
   },
   weightMax: {
    type: DataTypes.INTEGER,
    allowNull: false,
   },
   heightMin: {
    type: DataTypes.INTEGER,
    allowNull: false,
   },
   heightMax: {
    type: DataTypes.INTEGER,
    allowNull: false,
   },
   lifeSpan: {
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


