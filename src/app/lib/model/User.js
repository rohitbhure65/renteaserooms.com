import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    cpassword: {
        type: String,
        required: true,
        min: 6
    },
    role: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", UserSchema);