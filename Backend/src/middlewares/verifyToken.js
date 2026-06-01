import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from "../config/config.js";
import { UserModel } from "../models/mongodb/user.model.js";

export const verifyToken = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token)
            return res.status(401).json({ message: "authorization denied" });

        const decoded = jwt.verify(token, SECRET_JWT_KEY);
        
        const user = await UserModel.obtainUserByID(decoded.id);
        
        if (!user) 
            return res.status(401).json({ message: "User not found" });

        if (user.currentSessionToken !== token) {
            return res.status(401).json({ message: "Session invalid or opened in another device" });
        }

        req.user = user;
        
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid" });
    }
}