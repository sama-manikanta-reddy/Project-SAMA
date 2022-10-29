import mongoose from "mongoose";
import User from "./user.js";
const { Schema } = mongoose;

const friendSchema = new Schema({
    list: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    }
})

const Friend = mongoose.model('Friend', friendSchema);

export default Friend;