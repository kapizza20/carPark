//u nodu se ovako exportuje
module.exports=(sequelize,DataTypes)=>{
    const Users=sequelize.define("Users",{
      IDUser:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
      },
      Username:{
        type:DataTypes.STRING(30),
        allowNull:false
      },
      Pwd:{
        type:DataTypes.STRING(30),
        allowNull:false
      }
    })

    Users.associate = function (models) {
       Users.belongsTo(models.Privilegije,{
         foreignKey: {
         name: 'IDPrivilegije',
         type: DataTypes.INTEGER,
         allowNull:false
      },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      })
    }
    return Users;
}