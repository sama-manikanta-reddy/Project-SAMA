import Friend from "./../models/friends.js";
import RequestTab from "./../models/request.js";
import User from "./../models/user.js";
import bcrypt from 'bcrypt';
const basicControl = {};

basicControl.home = (req, res) => {
    // res.render('./home.ejs');
    res.redirect('/login')
};

basicControl.registrationForm = (req, res) => {
    res.render('./user/register.ejs');
};

basicControl.register = async (req, res) => {
    const newUser = new User(req.body);
    const friendsList = new Friend({});
    const requestTab = new RequestTab({});
    await requestTab.save();
    await friendsList.save();
    newUser.friendsList = friendsList._id;
    newUser.requests = requestTab._id;
    await newUser.save();
    req.session.user_id = newUser._id
    res.redirect(`/user/${newUser._id}`)
};

basicControl.loginPage = (req, res) => {
    res.render('./user/login.ejs');
};

basicControl.login = async (req, res) => {
    const { username, password } = req.body;
    const loginUser = await User.findOne({ username });
    if (!loginUser) {
        req.flash('error', 'No account found!')
        res.redirect('/login');
    } else {
        if (await bcrypt.compare(password, loginUser.password)) {
            req.session.user_id = loginUser._id;
            req.flash('success', 'Welcome Back!!')
            res.redirect(`/user/${loginUser._id}`);
        }
        else {
            req.flash('error', 'Incorrect username or password')
            res.redirect('/login');
        }
    }
};

basicControl.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

export { basicControl };