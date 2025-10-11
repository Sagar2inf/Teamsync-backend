import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},

    role: {type: String, enum: ["user", "admin"], default: "user"},
    profilePicture: {type: String, default: "https://codeforces.org/s/19515/images/codeforces-sponsored-by-ton.png"},
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;