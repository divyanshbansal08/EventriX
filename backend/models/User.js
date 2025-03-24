import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    otp: String,
    otpExpiry: Date,
    verified: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

export default User;
