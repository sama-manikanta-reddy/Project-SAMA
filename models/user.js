import mongoose from "mongoose";
import * as bcrypt from 'bcrypt'
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 8
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    accountType: {
        type: String,
        required: true,
        enum: ['user', 'creator', 'admin'],
        default: 'user'
    },
    friendsList: {
        type: Schema.Types.ObjectId
    },
    requests: {
        type: Schema.Types.ObjectId
    }
});

//Password Hashing Middleware
userSchema.pre('save', async function (next) {
    if (this.isModified('password'))
        this.password = await bcrypt.hash(this.password, 14);
    next();
});

const User = new mongoose.model('User', userSchema);

export default User;