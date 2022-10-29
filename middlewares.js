import User from "./models/user.js";
import RequestTab from "./models/request.js";
import Friend from "./models/friends.js";
const nocache = function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
};
const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }
    next();
}

/*
const isAuthenticated = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user._id !== req.session.user_id) {
        req.flash('error', "You don't have permission to do that!!");
        res.redirect(`/user/${id}`);
    } else
        next();
}
*/

const assignResLocals = async (req, res, next) => {
    if (req.session.user_id) {
        const user = await User.findById(req.session.user_id)
        res.locals.currentUser = user;
        const requestTab = await RequestTab.findById(user.requests).populate('friendRequests.from', 'name');
        res.locals.requests = requestTab.friendRequests;
    } else {
        res.locals.currentUser = null;
    }
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
}

const sessionConfig = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e));
    }
}

export { nocache, requireLogin, assignResLocals, sessionConfig, wrapAsync };