const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/code_socially_development');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error in connecting the mongodb"));

db.once('open',function(){
    console.log("Succesfully connected to mongodb");
});

module.exports=db;
