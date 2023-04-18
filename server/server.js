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
const tipoviRouter=require('./routes/TipoviVozila');
const statusiRouter=require('./routes/StatusiVozila');
const vozilaRouter=require('./routes/Vozila.js');
const cinoviRouter=require('./routes/Cinovi.js');
const vozaciRouter=require('./routes/Vozaci.js');
const evidencijaRouter=require('./routes/Evidencija.js');

app.use('/marke',markeRouter);
app.use('/tipovi',tipoviRouter);
app.use('/statusi',statusiRouter);
app.use('/vozila',vozilaRouter);
app.use('/cinovi',cinoviRouter);
app.use('/vozaci',vozaciRouter);
app.use('/evidencije',evidencijaRouter);


//Port je ili 3001 ili onaj koji nam je sam zadat od strane neceg sa strane
const PORT=process.env.PORT || 3001
//Sinhronizacija sa bazom preko sequelize
db.sequelize.sync().then(()=>{
//dodeljivanje porta i pokretanje servera
app.listen(PORT,()=>{
    console.log(`Server pokrenut, port ${PORT}`)
})

});