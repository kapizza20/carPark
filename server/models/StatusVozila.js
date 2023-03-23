//u nodu se ovako exportuje
module.exports=(sequelize,DataTypes)=>{
    const StatusVozila=sequelize.define("StatusVozila",{
      IDStatusa:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
      },
      NazivStatusa:{
        type:DataTypes.STRING(20),
        allowNull:false
      }
    })
    StatusVozila.associate = function (models) {
    StatusVozila.hasMany(models.Vozila,{
         foreignKey: {
         name: 'IDStatusa',
         type: DataTypes.INTEGER,
         allowNull:false
      },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      })}
    return StatusVozila;
};