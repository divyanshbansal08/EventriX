import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ success: false, message: "Please log in first." });
        }

        const token = authHeader.split(" ")[1]; // Extract token part
        if (!token) {
            return res.status(401).json({ success: false, message: "Invalid token format." });
        }

        // Verify the token (without checking expiration)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user details (email, username) to request
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token. Please log in again." });
    }
};