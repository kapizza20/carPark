//u nodu se ovako exportuje
module.exports=(sequelize,DataTypes)=>{
    const Privilegije=sequelize.define("Privilegije",{
      IDPrivilegije:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
      },
      NazivPrivilegije:{
        type:DataTypes.STRING(30),
        allowNull:false
      }
      
    })

    Privilegije.associate = function (models) {
       Privilegije.hasMany(models.Users,{
         foreignKey: {
         name: 'IDPrivilegije',
         type: DataTypes.INTEGER,
         allowNull:false
      },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      })
    }
    return Privilegije;
}