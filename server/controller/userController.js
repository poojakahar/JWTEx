const mongoose=require('mongoose'),
    bcrypt=require('bcrypt'),
    tokenUser=require('./../model/userModel'),
    jwt=require('jsonwebtoken');

exports.register=(req,res)=>{
    var newUser=new tokenUser(req.body);
    newUser.hash_password=bcrypt.hashSync(req.body.password,10);

    newUser.save().then((user)=>{
            user.hash_password=undefined;
            return res.json(user);
    },(err)=>{
        return res.status(400).send({message: err});
    }).catch((err)=>{
        return res.status(400).json({message: err});
    });

    /*var user=new tokenUser(req.body);
    var salt = bcrypt.genSaltSync(10);
    user.hash_password=bcrypt.hashSync(req.body.password,salt);
    user.save().then((doc)=>{
        console.log(doc);
        user.hash_password=undefined;
        res.json(doc);
    }).catch((e)=>{
        console.log(e);
    });*/
};

exports.signIn=(req,res)=>{
    tokenUser.findOne({email:req.body.email}).then((user)=>{
        console.log(user);
        if(!user)
        {
            res.json({message: 'Authenticate failed: Wrong Username'});
        }
        else
        {
            console.log('Insdie main else: ' + req.body.password + " " + user.hash_password);
            if(!bcrypt.compareSync(req.body.password,user.hash_password))
            {
                console.log('Insdie compare Password If');
                res.json({message: 'Authenticate failed: Wrong Password'});
            }
            else
            {
                console.log('Insdie compare Password else');
                var token=jwt.sign({email:user.email,fullname: user.fullname, _id: user._id},'RESTFULAPIs');
                res.header('x-auth',token).send(user);
            }
        }
    },(err)=>{
        console.log('Insdie promise err');
        return res.json(err);
    }).catch((error)=>{
        console.log('Insdie catch' + error);
        return res.send(error);
    });
};

exports.loginRequired=(req,res,next)=>{
    console.log(req.user);
    if (req.user) {
        console.log(user);
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};