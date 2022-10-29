import bcrypt from 'bcrypt';
import Friend from "./../models/friends.js";
import RequestTab from "./../models/request.js";
import User from "./../models/user.js";

const userControl = {};

userControl.userPage = async (req, res) => {
    const { id } = req.params;
    const foundUser = await User.findById(id);
    const friendsListTab = await Friend.findById(foundUser.friendsList).populate('list', 'name')
    let isFriend = false;
    for (let i = 0; i < friendsListTab.list.length; i++) {
        if ((res.locals.currentUser._id).equals(friendsListTab.list[i]._id)) {
            isFriend = true;
            break;
        }
    }
    const friendsList = friendsListTab.list;
    res.render('./user/userPage.ejs', { foundUser, isFriend, friendsList });
};

userControl.deletePage = (req, res) => {
    res.render('./user/delete.ejs')
};

userControl.deleteAccount = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    const loginUser = await User.findById(id);
    if (await bcrypt.compare(password, loginUser.password)) {
        const deletedUser = await User.findByIdAndDelete(id);
        await Friend.findByIdAndDelete(deletedUser.friendsList);
        await RequestTab.findByIdAndDelete(deletedUser.requests);
        req.session.destroy();
        res.redirect('/login');
    } else {
        req.flash('error', 'Incorrect password, Try again');
        res.redirect(`/user/${id}/delete`);
    }
};

userControl.searchResults = async (req, res) => {
    const { search } = req.query;
    const user = await User.findOne({ username: search });
    if (!user) {
        req.flash('error', 'No user found with that username')
        res.redirect(`/user/${req.params.id}`);
    }
    else { res.render('./results.ejs', { user }); }
};

userControl.sendRequest = async (req, res) => {
    const { id } = req.params;
    const foundUser = await User.findById(id);
    const checkRequest = await RequestTab.findById(foundUser.requests);
    if (checkRequest.friendRequests.find(seeRequest => seeRequest.from == req.session.user_id)) {
        req.flash('error', 'You already sent a request');
    } else {
        await checkRequest.updateOne({ $push: { friendRequests: { from: req.session.user_id, to: id } } });
    }
    res.redirect(`/user/${id}`);
};

userControl.deleteRequest = async (req, res) => {
    const { id, reqId } = req.params;
    const user = await User.findById(id);
    const request = await RequestTab.findByIdAndUpdate(user.requests, { $pull: { friendRequests: { _id: reqId } } });
    res.redirect(`/user/${id}`);
};

userControl.requestAccepted = async (req, res) => {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friendAcc = await User.findById(friendId);
    const friendslist = await Friend.findByIdAndUpdate(user.friendsList, { $push: { list: { _id: friendId } } });
    const friend_friendslist = await Friend.findByIdAndUpdate(friendAcc.friendsList, { $push: { list: { _id: id } } });
    const request = await RequestTab.findByIdAndUpdate(user.requests, { $pull: { friendRequests: { from: friendId } } });
    res.redirect(`/user/${id}`);
}

export { userControl };