//u nodu se ovako exportuje
module.exports=(sequelize,DataTypes)=>{
    const Vozaci=sequelize.define("Vozaci",{
      IDVozaca:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
      },
      ImeVozaca:{
        type:DataTypes.STRING(10),
        allowNull:false
      },
      PrezimeVozaca:{
        type:DataTypes.STRING(17),
        allowNull:false
      },
      JMBG:{
        type:DataTypes.STRING(13),
        allowNull:false
      },
      BrojTel:{
        type:DataTypes.STRING(12),
        allowNull:false
      }
    });


    Vozaci.associate = function (models) {
       Vozaci.belongsTo(models.Cinovi,{
         foreignKey: {
         name: 'IDCina',
         type: DataTypes.INTEGER,
         allowNull:false
      },
         onDelete:"CASCADE",
         onUpdate:"CASCADE"
      });
      Vozaci.hasMany(models.Evidencija,{
         foreignKey: {
         name: 'IDVozaca',
         type: DataTypes.INTEGER,
         allowNull:false
      },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      });
    };
    

    return Vozaci;
};