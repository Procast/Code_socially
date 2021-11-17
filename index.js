// const { urlencoded } = require('express');
const express=require('express');

const app=express();

const cookieParser=require('cookie-parser');

const port=8000;

const expressLayouts=require('express-ejs-layouts');

const db=require('./config/mongoose');

const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const { mongo } = require('mongoose');

const MongoStore=require('connect-mongo');

const sassMiddleware=require('node-sass-middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'

}));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressLayouts);

app.use(express.static('./assets'));

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'Code Socially',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store : MongoStore.create({
        mongoUrl:'mongodb://localhost/code_socially_development',
        autoRemove:'disabled'
    },
    function(err){
        console.log(err || "connect mongodb setup ok");
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);



app.use('/',require('./routes/index.js'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running server :${err}`);
    }

    console.log(`Server is running at port:${port}`);
});