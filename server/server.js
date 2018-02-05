const mongoose=require('./db/db'),
    route=require('./router/route'),
    express=require('express'),
    bodyParser=require('body-parser'),
    bcrypt=require('bcrypt'),
    jwt=require('jsonwebtoken');

var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use((req,res,next)=>{
    //console.log(req.headers('x-auth'));

    if(req.headers)
    {
        console.log("Header not found");
    }

    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT')
    {
        console.log("inside id middleware");
        jwt.verify(req.headers.authorization.split(' ')[1],'RESTFULAPIs',(err,decode)=>{
            if(err)
            {
                console.log(err);
                req.user=undefined;
            }
            req.user=decode;
            next();
        });
    }
    else
    {
        console.log("Inside middleware else")
        req.user=undefined;
        next();
    }
});

route.route(app);

app.listen(3000,()=>{
   console.log('Started');
});

