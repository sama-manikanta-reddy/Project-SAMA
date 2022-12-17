import express from "express";
import { wrapAsync, requireLogin, nocache, validateMail } from "../middlewares.js";
import { mailController } from "../Controller/mailController.js";

const router = express.Router({ mergeParams: true });

router.get('/', requireLogin, wrapAsync(mailController.mailbox));

router.get('/compose', requireLogin, wrapAsync(mailController.mailForm));

router.post('/mail', requireLogin, nocache, validateMail, wrapAsync(mailController.sendMail))

router.get('/:mid', requireLogin, wrapAsync(mailController.specificMail));

router.get('/:mid/mark_as_read', requireLogin, wrapAsync(mailController.markasread));

router.get('/:mid/delete', requireLogin, wrapAsync(mailController.deleteMail));

export { router };