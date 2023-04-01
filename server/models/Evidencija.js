//u nodu se ovako exportuje
module.exports=(sequelize,DataTypes)=>{
    const Evidencija=sequelize.define("Evidencija",{
      IDEvidencije:{ 
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
      },
      BrojNaloga:{
        type:DataTypes.STRING(20),
        allowNull:false
      },
      DatumIzlaska:{
        type:DataTypes.DATE,
        allowNull:false
      },
      DatumPovratka:{
        type:DataTypes.DATE,
        allowNull:false
      }
    });


    Evidencija.associate = function (model) {
       Evidencija.belongsTo(model.Vozaci,{
         foreignKey: {
         name: 'IDVozaca',
         type: DataTypes.INTEGER,
         allowNull:false
      },
         onDelete:"CASCADE",
         onUpdate:"CASCADE"
      });
      Evidencija.belongsTo(model.Vozila,{
         foreignKey: {
         name: 'IDVozila',
         type: DataTypes.INTEGER,
         allowNull:false
      },
         onDelete:"CASCADE",
         onUpdate:"CASCADE"
      });
    };
    

    return Evidencija;
};