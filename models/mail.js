import mongoose from "mongoose";
import timestamp from "time-stamp";
const { Schema } = mongoose;

const mailSchema = new Schema({

    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timeStamp: {
        type: String,
        required: true,
        default: timestamp('HH:mm:ss - DD/MM/YYYY'),
    },
    read: {
        type: Boolean,
        required: true,
    }

});

const Mail = new mongoose.model('Mail', mailSchema);

export default Mail;
