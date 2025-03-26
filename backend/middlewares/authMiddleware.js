import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ success: false, message: "Please log in first." });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }

        // Verify the token (without checking expiration)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token. Please log in again." });
    }
};

export const verifyAdmin = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.isAdmin) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

