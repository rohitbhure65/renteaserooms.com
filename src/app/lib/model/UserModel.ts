import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a username"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true
    },
    phone: {
        type: Number,
        required: [true, "Please provide a phone number"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        min: 6
    },
    role: {
        type: String,
        required: [true, "Please provide a role"],
    },
    city:{
        type: String,
        required: [true, "Please provide a city"]
    },
    profileImg: {
        type: String,
        default: ""
    },
    isVerified:{
        type: Boolean,
        // default: false, 
        default: true
        //uncommet when you add SMTP email verification             
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;  