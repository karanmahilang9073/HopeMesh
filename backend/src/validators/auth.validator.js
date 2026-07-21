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