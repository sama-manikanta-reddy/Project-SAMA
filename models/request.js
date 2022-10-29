import mongoose from "mongoose";
const { Schema } = mongoose;

const requestSchema = new Schema({
    friendRequests: [
        {
            from: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            to: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
});

const RequestTab = new mongoose.model('RequestTab', requestSchema);
export default RequestTab;