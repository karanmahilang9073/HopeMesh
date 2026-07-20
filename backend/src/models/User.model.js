import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    fullname: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true, trim: true},
    password: {type: String, required: true, minlength: 6},
    role: {type: String, required: true, enum: ['donor','ngo','admin'], default: 'donor'},
    phone: {type: String, required: true},
    profilepic: {type: String},
    address: {type: String},
    city: {type: String},
    state: {type: String},
    country: {type: String},
    refreshToken: {type: String}
})

const User = new mongoose.model('User', userSchema)

export default User