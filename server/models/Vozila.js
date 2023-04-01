//u nodu se ovako exportuje
const MarkeVozila = require('./MarkeVozila');

module.exports=(sequelize,DataTypes)=>{
    const Vozila=sequelize.define("Vozila",{
      IDVozila:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
      },
      OznakaTablica:{
        type:DataTypes.STRING(10),
        allowNull:false
      },
      VINBroj:{
        type:DataTypes.STRING(17),
        allowNull:false
      }
    });


    Vozila.associate = function (models) {
       Vozila.belongsTo(models.MarkeVozila,{
         foreignKey: {
         name: 'IDMarkeVozila',
         type: DataTypes.INTEGER,
         allowNull:false
      },
         onDelete:"CASCADE",
         onUpdate:"CASCADE"
      });
      Vozila.belongsTo(models.TipoviVozila,{
         foreignKey: {
         name: 'IDTipa',
         type: DataTypes.INTEGER,
         allowNull:false
      },
         onDelete:"CASCADE",
         onUpdate:"CASCADE"
      });
      Vozila.belongsTo(models.StatusVozila,{
         foreignKey: {
         name: 'IDStatusa',
         type: DataTypes.INTEGER,
         allowNull:false
      },
         onDelete:"CASCADE",
         onUpdate:"CASCADE"
      });
      Vozila.hasMany(models.Evidencija,{
         foreignKey: {
         name: 'IDVozila',
         type: DataTypes.INTEGER,
         allowNull:false
      },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      });
    };
    

    return Vozila;
};