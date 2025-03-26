import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        sparse: true,
    },
    email: {
        type: String,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@iitk\.ac\.in$/  // Enforces email format
    },
    password: {
        type: String,
    },
    otp: String,
    otpExpiry: Date,
    verified: { type: Boolean, default: false }
});

userSchema.pre('save', function (next) {
    this.email = this.email.toLowerCase();
    next();
});

const User = mongoose.model('User', userSchema);
export default User;