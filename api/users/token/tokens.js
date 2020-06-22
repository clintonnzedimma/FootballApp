const {
    sign
} = require('jsonwebtoken');

// Create tokens
// ----------------------------------
const createAccessToken = userId => {
    return sign({
        userId
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
    });
};

const createRefreshToken = userId => {
    return sign({
        userId
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    });
};

// Send tokens
// ----------------------------------
const sendAccessToken = (res, email, accessToken) => {
    res.send({
        accessToken,
        email
    });
};

const sendRefreshToken = (res, refreshtoken) => {
    res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/refresh_token',
    });
};

module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken
};