import asyncHandler from 'express-async-handler';

import bcrypt from 'bcryptjs'
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const authUser = asyncHandler(async(req,res,next) => {
const {email,password} = req.body;
const user = await User.findOne({ email })
if(user && (await user.matchPassword(password))) {
    res.json({
        _id : user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user._id),
    })

} else {
    res.status(401)
    throw new Error('Invalid email or address')
}


})


const getUserProfile = asyncHandler(async(req,res) => {
const user = await User.findById(req.user._id);
    

if(user) {
 res.json({
     _id:user._id,
     name:user.name,
     email:user.email,
     isAdmin:user.isAdmin,
 })

} else {
    res.status(404).json({
        error:"User not Found"
    })
}

    })


const registerUser =  asyncHandler(async(req,res) => {
    const {name,email,password} = req.body;
const userExists = await User.findOne({email});
if(userExists) {
    throw new Error('User already exists')
} else {
    const user = await User.create({
        name,
        email,
        password
    })
     res.json({
     name:user.name,
     email:user.email,
     password:user.password,
 })
}








})


export {authUser, getUserProfile , registerUser }
