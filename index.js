const express=require('express');

const app=express();

const port=8000;

const expressLayouts=require('express-ejs-layouts');



app.use(expressLayouts);

app.use(express.static('./assets'));

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use('/',require('./routes/index.js'));

app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in running server :${err}`);
    }

    console.log(`Server is running at port:${port}`);
});