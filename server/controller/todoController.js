const mongoose=require('mongoose'),
    todoList=require('./../model/todoList');

exports.add=(req,res)=>{
    var todo=new todoList({
        task:req.body.task,
        completed:req.body.completed
    });

    todo.save().then((docs)=>{
        res.json(docs);
    },(err)=>{
        res.json(err);
    }).catch((err)=>{
        res.json(err);
    });
}

exports.upd=(req,res)=>{
    todoList.findOneAndUpdate({_id:req.params.id}, {
        $set:{
            task: req.body.task,
            completed: req.body.completed
        }
    }).then((docs)=>{
        res.json(err);
    },(err)=>{
        res.json(err);
    }).catch((err)=>{
        res.json(err);
    });
}

exports.del=(req,res)=>{
    todoList.findByIdAndRemove({_id: req.params.id}).then((docs)=>{
        res.json(err);
    },(err)=>{
        res.json(err);
    }).catch((err)=>{
        res.json(err);
    });
}

exports.getAll=(req,res)=>{
    todoList.find().then((docs)=>{
        console.log(docs);
        res.json(docs);
    },(err)=>{
        res.json(err);
    }).catch((err)=>{
        res.json(err);
    });
}

exports.getOne=(req,res)=>{
    todoList.find({_id: req.params.id}).then((docs)=>{
        res.json(err);
    },(err)=>{
        res.json(err);
    }).catch((err)=>{
        res.json(err);
    });
}
