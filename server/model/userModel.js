const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

var USchema=new mongoose.Schema({
    fullname:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    hash_password:{
        type: String,
        required: true
    },
    created:{
        type: Date,
        default: Date.now()
    }
});

USchema.methods.comparePassword=(password)=>{
  return bcrypt.compareSync(password,this.hash_password,(err,result)=>{
      if(err){
          return console.log("In usermodel comparePssword" + err);
      }
      return result;
  });
};

var tokenUser=mongoose.model('tokenUser',USchema);

module.exports=tokenUser;