import { Router } from "express";
import { changeAvatar, currentUser, login, logOut, refreshAccessToken, registerUser, updatePassword, updateProfile ,validate} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router()

router.route('/register').post(upload.single("avatar"),registerUser)

router.route('/login').post(login)

router.route('/logout').post(verifyJwt,logOut)

router.route('/update-profile').post(verifyJwt,upload.single("avatar"),updateProfile)

router.route('/update-password').post(verifyJwt,updatePassword)

router.route('/change-avatar').post(verifyJwt,upload.single("avatar"),changeAvatar)

router.route('/get-current-user').get(verifyJwt,currentUser)

router.route('/refresh-access-token').post(refreshAccessToken)

router.route('/check-auth').get(verifyJwt,validate)
export default router
