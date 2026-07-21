import { z } from 'zod'

export const registerSchema = z.object({
    fullname: z.string({required_error: 'full name is required'})
        .trim().min(3, 'Full name must be at least 3 character').max(20, 'full name must not exceed 20 character'),
    email: z.string({required_error: 'email is required'})
        .trim().toLowerCase().email('invalid email'),
    password: z.string({required_error: 'password is required'})
        .min(6).max(20)
        .regex(/[A-Z]/, 'password must contain atleast one upper case character')
        .regex(/[a-z]/, 'password must contain atleast one lower case character')
        .regex(/[0-9]/, 'password must contain atleast one number'),
    phone: z.string({required_error: 'phone number is required'})
        .trim()
        .regex(/^\+?[0-9]{10,15}$/, 'invalid phone number'),
    address: z.object({
        street: z.string().trim().min(2).max(100).optional(),
        city: z.string().trim().min(2).max(50).optional(),
        state: z.string().trim().min(2).max(50).optional(),
        country: z.string().trim().min(2).max(56).optional(),
    }).strict().optional()
}).strict()

export const loginSchema = z.object({
    email: z.string({required_error: 'email is required'})
        .trim().toLowerCase().email('invalid email'),
    password: z.string({required_error: 'password is required'})
        .min(1, 'password is required')
}).strict()

export const forgotPasswordSchema = z.object({
    email: z.string({required_error: 'email is required'})
        .trim().toLowerCase().email('invalid email')
}).strict()

export const resetPasswordSchema = z.object({
    token: z.string({required_error: 'token is required'})
        .trim().min(1, 'token is required'),
    password: z.string({required_error: 'password is required'})
        .min(6).max(20)
        .regex(/[A-Z]/, 'password must contain atleast one upper case character')
        .regex(/[a-z]/, 'password must contain atleast one lower case character')
        .regex(/[0-9]/, 'password must contain atleast one number'),
    confirmPassword: z.string({required_error: 'confirm password is required'})
        .min(1, 'confirm password is required')
}).strict().refine((data) => data.password === data.confirmPassword, {
    message: 'password do not match',
    path: ['confirmPassword'],
})

export const changePasswordSchema = z.object({
    currPassword: z.string({required_error: 'current password is required'}).min(1, 'current password is required'),
    newPassword: z.string({required_error: 'new Password is required'})
        .min(6).max(20)
        .regex(/[A-Z]/, 'password must contain at least one upper case character')
        .regex(/[a-z]/, 'password must contain at least one lower case character')
        .regex(/[0-9]/, 'password must contain at least one numeric value'),
    confirmPassword: z.string({required_error: 'confirm password is required'})
        .min(1, 'confirm password is required'),
}).strict().refine((data) => data.newPassword === data.confirmPassword, {
    message: 'password do not match with confirm password',
    path: ['confirmPassword'],
}).refine((data) => data.newPassword !== data.currPassword, {
    message: 'new password must be different from current password',
    path: ['newPassword']
})