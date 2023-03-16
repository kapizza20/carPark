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
        type:DataTypes.STRING,
        allowNull:false
      }
    })
    return MarkeVozila;
};