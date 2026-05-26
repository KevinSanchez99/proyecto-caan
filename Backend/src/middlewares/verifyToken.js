import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from "../config/config.js";

export const verifyToken = (req, res, next) => {
    try {
        const {token} = req.cookies;

        if(!token)
            return res.status(401).json({message:"authorization denied"});

        jwt.verify(token,SECRET_JWT_KEY,(error, user) => {
            if(error) return res.status(401).json({ message: "Token is not valid" });

            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}