import express from "express";
import { basicControl } from "../Controller/basicController.js";
import { nocache, wrapAsync, validateUser, restrictPages } from "../middlewares.js";

const router = express.Router();

router.get('/', nocache, restrictPages, basicControl.home);

router.route('/register')
    .get(nocache, restrictPages, basicControl.registrationForm)
    .post(nocache, restrictPages, validateUser, wrapAsync(basicControl.register));

router.route('/login')
    .get(nocache, restrictPages, basicControl.loginPage)
    .post(nocache, restrictPages, wrapAsync(basicControl.login))

router.post('/logout', nocache, basicControl.logout);

export { router };