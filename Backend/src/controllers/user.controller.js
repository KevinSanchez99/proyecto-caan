import { UserModel } from '../models/mongodb/user.model.js';
import { createAccessToken, createRefreshToken } from '../lib/createToken.js';
import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config/config.js';

export class userController {
    static async login(req, res) {
        const { username, password } = req.body;

        try {
            const user = await UserModel.login({ username, password });
            
            const accessToken = await createAccessToken({ id: user._id });
            const refreshToken = await createRefreshToken({ id: user._id });

            user.refreshToken = refreshToken;
            await user.save();

            res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 }); // 15 mins
            res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 días

            res.status(200).json("logueado correctamente");
        } catch (error) {
            res.status(401).json(error.message);
        }
    }

    static async register(req, res) {
        const { username, password } = req.body;

        try {
            const user = await UserModel.register({ username, password });
            
            const accessToken = await createAccessToken({ id: user._id });
            const refreshToken = await createRefreshToken({ id: user._id });

            user.refreshToken = refreshToken;
            await user.save();

            res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 }); // 15 mins
            res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 días

            res.status(201).json({ user });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async refresh(req, res) {
        try {
            const { refreshToken } = req.cookies;
            
            if (!refreshToken) {
                return res.status(401).json({ message: "No refresh token provided" });
            }

            const decoded = jwt.verify(refreshToken, SECRET_JWT_KEY);
            const user = await UserModel.obtainUserByID(decoded.id);

            if (!user || user.refreshToken !== refreshToken) {
                return res.status(401).json({ message: "Invalid refresh token" });
            }

            const newAccessToken = await createAccessToken({ id: user._id });
            res.cookie("accessToken", newAccessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });

            res.status(200).json({ message: "Token renovado" });
        } catch (error) {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            res.status(401).json({ message: "Refresh token expirado, por favor vuelve a iniciar sesión" });
        }
    }

    static async logout(req, res) {
        try {
            const { refreshToken } = req.cookies;
            if (refreshToken) {
                const decoded = jwt.verify(refreshToken, SECRET_JWT_KEY, { ignoreExpiration: true });
                const user = await UserModel.obtainUserByID(decoded.id);
                if (user) {
                    user.refreshToken = null;
                    await user.save();
                }
            }
            
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            res.status(200).json({ message: 'Deslogueado correctamente' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async obtainUser(req, res) {
        try {
            const { _id: id, username } = req.user; 
            return res.status(200).json({ id, username });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}