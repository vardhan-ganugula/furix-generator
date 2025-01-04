import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "Please enter your username"],
        unique: [true, "Username already exists"],
    },
    password: {
        type: String,
        require: [true, "Please enter your password"],
    },
    email: {
        type: String,
        require: [true, "Please enter your email"],
        unique: [true, "Email already exists"],
    },
    role: {
        type: String,
        require: true,
        default: "user",
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dkkgmzpqd/image/upload/v1631024399/avatar/avatar-1_e8z9y4.png",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpire: {
        type: Date,
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordExpire: {
        type: Date,
    },
    token : {
        type: Number,
        default: 3000,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);


export default User;