import express from "express";

const router = express.Router();

import {
    authUser, getUserProfile, registerUser,getUsers, deleteUser,updateUserProfile, getUserById, updateUser
} from '../controllers/userController.js';
import { protect ,  admin} from "../middleware/authMiddleware.js";

router.post('/login' , authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser)
router.route('/').post(registerUser).get(protect,admin,getUsers)
export default router;