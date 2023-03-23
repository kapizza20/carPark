//u nodu se ovako exportuje
module.exports=(sequelize,DataTypes)=>{
    const TipoviVozila=sequelize.define("TipoviVozila",{
      IDTipa:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
      },
      NazivTipa:{
        type:DataTypes.STRING(20),
        allowNull:false
      }
    })
    TipoviVozila.associate = function (models) {
    TipoviVozila.hasMany(models.Vozila,{
         foreignKey: {
         name: 'IDTipa',
         type: DataTypes.INTEGER,
         allowNull:false
      },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      })}
    return TipoviVozila;
};