import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@iitk\.ac\.in$/  // Enforces email format
    },
    password: { type: String, required: true },
    otp: String,
    otpExpiry: Date
});

// Ensure emails are stored in lowercase to avoid case-sensitive issues
userSchema.pre('save', function (next) {
    this.email = this.email.toLowerCase();
    next();
});

const User = mongoose.model('User', userSchema);
export default User;
