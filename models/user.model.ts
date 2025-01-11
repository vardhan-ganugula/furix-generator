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
        default: "https://res.cloudinary.com/djwnxly09/image/upload/v1736590995/A_dynamic_motion-filled_cat_logo_on_a_white_background._The_pink-coated_cat_reminiscent_of_the_Squid_Game_front_man_is_rendered_in_electric_vivid_colors_with_blurred_lines_and_action_poses_ow5c9j.jpg",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        default: "",
    },
    verificationTokenExpires: {
        type: Date,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
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