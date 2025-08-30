import { asyncHandler } from "../utility/AsyncHandler.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from '../utility/ApiResponse.js'
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utility/cloudinary.js";
import jwt from "jsonwebtoken"
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(400, "Error in generating access and refresh token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { username, fullname, email, password } = req.body
    if ([username, fullname, email, password].some((field) => field?.trim === "")) {
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existedUser) {
        throw new ApiError(400, "user already existed")
    }
    const avatarLocalPath = req.file?.path
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    console.log(avatar)
    if (!avatar) {
        throw new ApiError(400, "Error in uploading avatar")
    }
    const user = await User.create({
        username,
        fullname,
        email,
        password,
        avatar: avatar.url,
    })
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
    const options = {
        httpOnly: true,
        secure: true
    }
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if (!createdUser) {
        throw new ApiError(400, "Error in registering user")
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, {user:createdUser, accessToken, refreshToken  }, "user registered successfully"))
})

const login = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body
    if (!identifier) {
        throw new ApiError(400, "Username Or Email Required")
    }
    let user
    if (identifier.includes('@')) {
        user = await User.findOne({ email: identifier });
    } else {
        user = await User.findOne({ username: identifier });
    }
    if(!user){
        throw new ApiError(401,"user not found")
    }
    const correctPassword = await user.isPasswordCorrect(password)
    if (!correctPassword) {
        throw new ApiError(400, "Inccorect Password")
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
    const options = {
        httpOnly: true,
        secure: true
    }
    const loggedUser = await User.findById(user._id).select("-password -refreshToken")
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { user: loggedUser, accessToken, refreshToken }, "LOGIN SUCCESSFULL"))
})

const logOut = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user?._id, {
        $set: {
            refreshToken: undefined
        },

    },
        {
            new: true
        })
    const options = {
        httpOnly: true,
        secure: true
    }
    res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User LoggedOut Successfully"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(400, "UNAUTHORISED ACCESS")
    }
    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)
        if (!user) {
            throw new ApiError(400, "INVALID OR EXPIRED TOKEN")
        }
        if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(400, "UNAUTHORISED ACCESS")
        }
        const options = {
            httpOnly: true,
            secure: true
        }
        const { accessToken, newrefreshToken } = await generateAccessAndRefreshToken(user._id)
        return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", newrefreshToken, options).json(new ApiResponse(200,
            { accessToken, refreshToken: newrefreshToken }
            , "ACCESS TOKEN REFRESHED"))
    } catch (error) {
        throw new ApiError(401, error?.message || "INVALID REFRESH TOKEN")
    }
})

const updateProfile = asyncHandler(async (req, res) => {
    const { fullname, username, email } = req.body
    if (!email || !username || !fullname) {
        throw new ApiError(400, "FIELDS ARE REQUIRED")
    }
    const avatarLocalPath = req.file?.path
    console.log(avatarLocalPath)
    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if (!avatar) {
        throw new ApiError(400, "ERROR WHILE UPLODING AVAATR")
    }
    console.log("avatar", avatar)
    const user = await User.findById(req.user._id).select("-password -refreshToken")
    const anotherUser = await User.findOne({
        $or: [{ email }, { username }],
        _id: { $ne: req.user._id }
    });

    if (anotherUser) {
        throw new ApiError(400, "Username Or Email Already Existed")
    }
    user.email = email || user.email
    user.fullname = fullname || user.fullname
    user.username = username || user.username
    user.avatar = avatar.url || user.avatar
    await user.save({ validateBeforeSave: false })
    res.status(200).json(new ApiResponse(200, user, "Profile Updated Successfully"))
})

const updatePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    console.log(oldPassword)
    if (!newPassword || !oldPassword) {
        throw new ApiError(400, "PASSWORD IS REQUIRED ")
    }
    const user = await User.findById(req.user._id)
    const correctPassword = await user.isPasswordCorrect(oldPassword)
    console.log(correctPassword)
    if (!correctPassword) {
        throw new ApiError(400, "Old Password Is Incorrect")
    }
    user.password = newPassword
    await user.save()
    res.status(200).json(new ApiResponse(200, {}, "Password Updated Successfully"))
})

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(200, req.user, "CURRENT USER FETCHED SUCCESSFULLY"))
})

const changeAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path
    console.log(avatarLocalPath)
    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if (!avatar) {
        throw new ApiError(400, "ERROR WHILE UPLODING AVAATR")
    }
    console.log("avatar", avatar)
    const user = await User.findById(req.user?._id).select("-password -refreshToken")
    console.log("user :", user)
    user.avatar = avatar.url
    await user.save({ validateBeforeSave: false })
    res.status(200).json(new ApiResponse(200, user, "AVATAR UPDATED SUCCESSFULLY"))
})


const validate = asyncHandler(async(req,res)=>{
    const user = req.user
    res.status(200).json(new ApiResponse(200,{loggedIn: true,user},"authenticated user"))
})
export {
    registerUser,
    login,
    logOut,
    refreshAccessToken,
    updateProfile,
    updatePassword,
    currentUser,
    changeAvatar,
    validate
}