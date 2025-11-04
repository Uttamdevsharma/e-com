const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

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



//check if password match or not
userSchema.methods.isPasswordMatch = async function(password){
    const user =  this 
    return bcrypt.compare(user.password , password)
}

//check if EMAIL IS TAKEN - model level helper
userSchema.statics.isEmailTaken = async function(email) {
    const user = await this.findOne({email});

    return !!user;
}


//hash password befor saving the user(instance level helper)

userSchema.pre("save" , async function(next) {
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,10)
    }
    next()


})

const User = model('User' , userSchema);

module.exports = User