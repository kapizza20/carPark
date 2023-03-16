const express=require('express'); //pozivanje instance frejmvorka
const app=express();  //inicijalizacija api-ja za server
const cors=require('cors');

//Parsiranje
app.use(express.json());
app.use(cors());

const db=require('./models');

//Exspress za rutiranje
//Api endpoint /marke ->
const markeRouter=require('./routes/MarkeVozila.js');

app.use('/marke',markeRouter);

//Sinhronizacija sa bazom preko sequelize
db.sequelize.sync().then(()=>{
//dodeljivanje porta i pokretanje servera
app.listen(3001,()=>{
    console.log('Server pokrenut, port 3001!')
})

});