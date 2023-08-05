const express=require('express');
const path=require('path');
//this route get all members
const logger=require('./middleware/logger')
const app=express()
const members=require('./Members')
const expressHbs = require('express-handlebars');
//middleware

//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Handlebars middleware
app.engine('handlebars', expressHbs.engine({
    layoutsDir: 'views/', // directory to handlebars files
    defaultLayout: null,
    extname: 'handlebars'
  })
);

app.set('view engine', 'handlebars');
app.set('views', 'views');    // optional


//init middleware
app.use(logger)
//

//homepage route 
app.get('/',(req,res)=>{res.render('index',{title:'Member App',members})})

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'public','index.html'));
// })
//set static folder

app.use(express.static(path.join(__dirname,'public')));
const PORT=process.env.PORT || 5000;



//Members Api route
app.use('/api/members',require('./routes/api/members'))
app.listen(PORT,()=>console.log(`server started on port ${PORT}`));


