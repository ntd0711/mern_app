import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import dotenv from 'dotenv';
import client from '../helpers/connections-redis.js';
dotenv.config();

export const signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const option = { expiresIn: '1h' };

    jwt.sign(payload, secret, option, function (err, token) {
      if (err) reject(err);
      resolve(token);
    });
  });
};

export const signRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId };
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const option = { expiresIn: '1y' };

    jwt.sign(payload, secret, option, function (err, token) {
      if (err) reject(err);
      client
        .set(userId.toString(), token, { EX: 60 * 60 * 24 * 365 })
        .then(() => resolve(token))
        .catch((err) => reject(err));
    });
  });
};

export const verifyAccessToken = (req, res, next) => {
  try {
    if (!req.headers.authorization?.split(' ')[1]) {
      throw createError.Unauthorized();
    }

    const jwtFromClient = req.headers.authorization?.split(' ')[1];

    jwt.verify(jwtFromClient, process.env.ACCESS_TOKEN_SECRET, function (err, decodedData) {
      if (err) throw createError.Unauthorized(err.message);
      req.userId = decodedData?.userId;
    });

    next();
  } catch (error) {
    next(error);
  }
};

export const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decodedData) => {
      if (err) reject(createError.Unauthorized(err.message));

      client
        .get(decodedData.userId)
        .then((value) => {
          if (value !== refreshToken) reject(createError.InternalServerError());
          resolve(decodedData);
        })
        .catch((err) => reject(err));
    });
  });
};
