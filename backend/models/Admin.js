import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    clubID: { type: String, unique: true },
    clubName: { type: String, unique: true },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@iitk\.ac\.in$/
    },
    password: { type: String, required: true },
});

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;