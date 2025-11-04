const { Schema, model } = require('mongoose')

const userSchema = new Schema({

    username:{type: String , required:true,unique: true},
    email: {type: String , required:true, unique: true},
    password: {type:String , required:true},
    profileImage: String,
    Bio: {type:String , maxLength : 200},
    profession: String,
    role:{
        type:String,
        default : 'user'
    },
    createdAt : {type:Date , default:Date.now}
})

//check if EMAIL IS TAKEN - model level helper
userSchema.statics.isEmailTaken = async function(email) {
    const user = await this.findOne({email});

    return !!user;
}


const User = model('User' , userSchema);

module.exports = User