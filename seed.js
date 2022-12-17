import mongoose from "mongoose";
import express from 'express';
import User from "./models/user.js";
import Friend from "./models/friends.js";
import RequestTab from "./models/request.js";

const app = express();
mongoose.connect('mongodb://localhost:27017/Project_ACR')
    .then(() => { console.log('Connected to database') })
    .catch((e) => { console.log('Cannot connect to database', e) });
const seeddb = async () => {
    await User.deleteMany({});
    await Friend.deleteMany({});
    await RequestTab.deleteMany({});
    for (let index = 0; index < 10; index++) {
        const user = new User({
            username: `test_account_${index}`,
            name: `Test Account - ${index}`,
            email: `test_account_${index}@gmail.com`,
            phoneNumber: '9876543021',
            password: `test_account_${index}`
        });
        const friendsList = new Friend({});
        await friendsList.save();
        const requestTab = new RequestTab({});
        await requestTab.save();
        user.friendsList = friendsList._id;
        user.requests = requestTab._id;
        await user.save();
    }
}

await seeddb().then(() => {
    mongoose.connection.close();
});