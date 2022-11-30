const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const path = require('path');
const PORT = 4000;
//requiring fs
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// const staticPath = path.join(__dirname,"./public");
const staticPath = path.join(__dirname,"./");
app.use(express.static(staticPath));
console.group(staticPath);

app.engine('handlebars',hbs.engine());
app.set('view engine','handlebars');
app.set('views','./views');

//routes
const mainRoute = require('./routes/mainRoute');
const userRoute = require('./routes/userRoute');

app.use("/",mainRoute);
app.use("/users",userRoute);

//for not found page
app.use("*",(req,res)=>{
    res.render("notfound");
})

app.listen(PORT,(err)=>{
    if(err) throw err;
    else console.log(`PORT ${PORT} working fine..`);
});