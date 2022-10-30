import express from "express";
import { basicControl } from "../Controller/basicController.js";
import { nocache, wrapAsync, validateUser } from "../middlewares.js";

const router = express.Router();

router.get('/', nocache, basicControl.home);

router.route('/register')
    .get(nocache, basicControl.registrationForm)
    .post(nocache, validateUser, wrapAsync(basicControl.register));

router.route('/login')
    .get(nocache, basicControl.loginPage)
    .post(nocache, wrapAsync(basicControl.login))

router.post('/logout', nocache, basicControl.logout);

export { router };