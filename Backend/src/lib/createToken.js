import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config/config.js';

export async function createAccessToken(payload) {
    return new Promise((res, rej) => {
        jwt.sign(payload, SECRET_JWT_KEY, { expiresIn: '15m' }, (err, token) => {
            if (err) rej(err);
            res(token);
        });
    });
}

export async function createRefreshToken(payload) {
    return new Promise((res, rej) => {
        jwt.sign(payload, SECRET_JWT_KEY, { expiresIn: '7d' }, (err, token) => {
            if (err) rej(err);
            res(token);
        });
    });
}