import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler'

const protect =  asyncHandler(async(req,res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
        token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');

        console.log(decoded);
        res.status(200).send('Hello');
    } catch(err) {
        res.json({
            error:"Not Authorized ,Token failed",
        })
    }
    if(!token) {
        res.status(401).json({
            error:"Not authorized , no token"
        })
    }
}
})

export {protect};