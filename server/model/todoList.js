const mongoose=require('mongoose');

var Schema=new mongoose.Schema({
    task:{
        type: String
    },
    completed:{
        type: Boolean
    }
});

var todoList=mongoose.model('todoList',Schema);

module.exports=todoList;