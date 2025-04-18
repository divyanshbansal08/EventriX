import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

const addAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        const adminData = {
            username: "OutreachCellCody",
            clubID: "70",
            clubName: "outreachcell",
            email: "outreachcell@iitk.ac.in",
            password: "password_outreach",
        };

        const existingAdmin = await Admin.findOne({ email: adminData.email });
        if (existingAdmin) {
            console.log("Admin already exists");
            mongoose.connection.close();
            return;
        }

        adminData.password = await bcrypt.hash(adminData.password, 10);

        const newAdmin = new Admin(adminData);
        await newAdmin.save();

        console.log("Admin added successfully:", newAdmin);
        mongoose.connection.close();
    } catch (error) {
        console.error("Error adding admin:", error);
        mongoose.connection.close();
    }
};

addAdmin();
