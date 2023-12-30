const express=require('express')
const app=express()
require('dotenv').config()
const session = require('express-session');
const nocache=require('nocache')
const port=process.env.PORT || 8000
const filePath = require('path')
const router = require('./routes/routes')



app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: true,
    saveUninitialized: false
}));

// app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(nocache())
app.use(express.static("public"));
app.set('views',filePath.join(__dirname,'views'));
app.use('/',router)

app.listen(port,()=>{
    console.log(`Your App Started At Port Number: ${port}`);
})