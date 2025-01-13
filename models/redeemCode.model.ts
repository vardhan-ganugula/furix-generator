import { Schema, model, models } from "mongoose";

const redeemCodeSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  tokens: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expireAt: {
    type: Date,
    default: Date.now() + 7 * 24 * 60 * 60 * 1000,
  },
  limit: {
    type: Number,
    default: 1,
  }
});

redeemCodeSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export default models.RedeemCode || model("RedeemCode", redeemCodeSchema);