const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerSchema = new Schema({
    fullName :{
        type : String,
        required: [true, 'Full name is required'],
        trim: true,
    },
    email :{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    username : {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
    },
    password : {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
module.exports = mongoose.model('User',registerSchema);