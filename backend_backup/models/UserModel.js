import mongoose from 'mongoose';

const { Schema, model } = mongoose;



const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    messages: { type:[Schema.Types.ObjectId] ,ref:"Message" }

});


userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.__v
    return userObject;
};

const User = model('User', userSchema);




export default User;