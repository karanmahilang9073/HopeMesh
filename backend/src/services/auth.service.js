import User from "../models/User.model.js"
import crypto from 'crypto'

export const register =async(userData) => {
    const emailExist = await User.findOne({email: userData.email})
    if (emailExist) {
        throw new Error('email already exists')
    }
    const phoneExist = await User.findOne({phone: userData.phone})
    if (phoneExist) {
        throw new Error('phone number already exists')
    }
    const emailverificationToken = crypto.randomBytes(32).toString('hex')
    const emailVerificationExp = new Date(Date.now() + 15 * 60 * 1000)

    const user = await User.create({...userData, emailverificationToken, emailVerificationExp})
    return {
        success: true,
        message: 'registration successfull',
        user: {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
        }
    }
}