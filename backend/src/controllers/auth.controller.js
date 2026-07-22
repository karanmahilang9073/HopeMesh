import { asyncHandler } from "../middleware/asyncHandler.js";
import { register } from "../services/auth.service.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const registerUser = asyncHandler(async(req, res) => {
    const userData = req.body 
    const user = await register(userData)
    res.status(201).json(new ApiResponse(201, user, 'user registered successfully'))
}) 