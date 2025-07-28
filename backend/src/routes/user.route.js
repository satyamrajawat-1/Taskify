import { Router } from "express";
import { changeAvatar, changeCoverImage, currentUser, login, logOut, refreshAccessToken, registerUser, updatePassword, updateProfile } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router()

router.route('/register').post(upload.fields([
    {
        name:'avatar',
        maxCount:1
    },
    {
        name:'coverImage',
        maxCount:1
    }
]),registerUser)

router.route('/login').post(login)

router.route('/logout').post(verifyJwt,logOut)

router.route('/update-profile').post(verifyJwt,updateProfile)

router.route('/update-password').post(verifyJwt,updatePassword)

router.route('/change-avatar').post(verifyJwt,upload.single("avatar"),changeAvatar)

router.route('/change-cover-image').post(verifyJwt,upload.single("coverImage"),changeCoverImage)

router.route('/get-current-user').get(verifyJwt,currentUser)

router.route('/refresh-access-token').post(refreshAccessToken)

export default router
