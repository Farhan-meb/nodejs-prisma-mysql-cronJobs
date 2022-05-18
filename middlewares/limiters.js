const rateLimit = require('express-rate-limit');

exports.loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // limit login IP to 10 requests per windowMs
});

exports.resetPasswordLimiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 3 minutes
    max: 1, // limit reset password IP to 1 requests per windowMs
});

exports.sendOtpLimiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 3 minutes
    max: 1, // limit reset password IP to 1 requests per windowMs
});
