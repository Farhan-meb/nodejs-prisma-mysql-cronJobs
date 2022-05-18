const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/user/user');
const AppError = require('../utils/appError');

module.exports = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer') &&
        req.cookies.vendorToken
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.vendorToken) {
        token = req.cookies.vendorToken;
    }

    if (!token) {
        return next(
            new AppError('You are not logged in! Please login to process!')
        );
    }

    const decoded = await promisify(jwt.verify)(
        token,
        process.env.ACCESS_TOKEN_SECRET
    );

    const freshUser = await User.findById(decoded.id).select(
        '-password -otp -otpExpiration'
    );

    if (!freshUser) {
        return next('User does not exist.', 401);
    }

    req.user = freshUser;
    res.locals.user = freshUser;

    next();
};
