import jwt from 'jsonwebtoken'

export const generateAccessToken = (userId, role) => {
    return jwt.sign(
        {_id: userId, role},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn: process.env.JWT_ACCESS_EXP}
    )
}

export const generateRefreshToken = (userId) => {
    return jwt.sign(
        {_id: userId},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn: process.env.JWT_REFRESH_EXPIRY}
    )
}

export const verifyToken = (token, secret) => {
    return jwt.verify(token, secret)
}