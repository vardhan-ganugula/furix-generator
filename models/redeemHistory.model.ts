import {Schema, model, models} from 'mongoose';


const redeemHistorySchema = new Schema({
    redeemBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    redeemDate: {
        type: Date,
        default: Date.now,
    },
    redeemCode: {
        type: String,
        required: true,
    },
    
});

export default models.RedeemHistory || model('RedeemHistory', redeemHistorySchema);