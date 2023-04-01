//u nodu se ovako exportuje
module.exports=(sequelize,DataTypes)=>{
    const Cinovi=sequelize.define("Cinovi",{
      IDCina:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
      },
      NazivCina:{
        type:DataTypes.STRING(30),
        allowNull:false
      }
      
    })

    Cinovi.associate = function (models) {
       Cinovi.hasMany(models.Vozaci,{
         foreignKey: {
         name: 'IDCina',
         type: DataTypes.INTEGER,
         allowNull:false
      },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      })
    }
    return Cinovi;
}