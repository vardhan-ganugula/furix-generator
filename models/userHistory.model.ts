import {Schema, model, models} from 'mongoose';


const userHistorySchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name : {
        type: String,
        required: true
    },
    response : {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    tokens: {
        type: Number,
        required: true,
        default: 50
    },
    date: {
        type: Date,
        default: Date.now
    },

});


export default models.UserHistory || model('UserHistory', userHistorySchema);