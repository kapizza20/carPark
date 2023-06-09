//u nodu se ovako exportuje
module.exports=(sequelize,DataTypes)=>{
    const MarkeVozila=sequelize.define("MarkeVozila",{
      IDMarkeVozila:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
      },
      NazivMarke:{
        type:DataTypes.STRING(30),
        allowNull:false
      }
      
    })

    MarkeVozila.associate = function (models) {
       MarkeVozila.hasMany(models.Vozila,{
         foreignKey: {
         name: 'IDMarkeVozila',
         type: DataTypes.INTEGER,
         allowNull:false
      },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      })
    }
    return MarkeVozila;
}