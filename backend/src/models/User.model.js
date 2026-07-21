import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    fullname: {type: String, required: true, trim: true, minlength: 3, maxlength: 20},
    email: {type: String, required: true, unique: true, lowercase: true, trim: true, index: true},
    password: {type: String, required: true, minlength: 6, select: false},
    role: {type: String, required: true, enum: ['donor','ngo','admin'], default: 'donor'},
    phone: {type: String, required: true, trim: true, unique: true, index: true},
    profilepic: {type: String},
    address: {
        street: {type: String},
        city: {type: String},
        state: {type: String},
        country: {type: String},
    },
    // email verification
    isEmailverified: {type: Boolean, default: false},
    emailverificationToken: {type: String, select: false},
    emailVerificationExp: {type: Date, select: false},

    // password reset
    passwordResetToken: {type: String, select: false},
    passwordResetExp: {type: Date, select: false},
    passwordChangedAt: {type: Date, select: false},

    refreshToken: {type: String, select: false},
    refreshTokenExp: {type: Date, select: false},

    isActive: {type: Boolean, default: true}
}, {timestamps: true})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)

    if(!this.isNew){
        this.passwordChangedAt = Date.now() - 1000
    }
    next()
})

userSchema.methods.comparePassword = async function(userPassword){
    return bcrypt.compare(userPassword, this.password)
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role,
            fullname: this.fullname,
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXP}
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {_id: this._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXP}
    )
}

const User = mongoose.model('User', userSchema)

export default User