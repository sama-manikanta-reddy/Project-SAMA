import express from "express";
import { nocache, requireLogin, wrapAsync } from "../middlewares.js";
import { userControl } from "../Controller/userController.js";

const router = express.Router({ mergeParams: true });

router.get('/', requireLogin, nocache, wrapAsync(userControl.userPage));

router.route('/delete')
    .get(requireLogin, nocache, userControl.deletePage)
    .delete(requireLogin, nocache, wrapAsync(userControl.deleteAccount));

router.get('/search/results', requireLogin, wrapAsync(userControl.searchResults));

router.get('/request', requireLogin, wrapAsync(userControl.sendRequest));

router.delete('/request/:reqId', requireLogin, wrapAsync(userControl.deleteRequest));

router.post('/request/:friendId/accepted', requireLogin, wrapAsync(userControl.requestAccepted));

export { router };
