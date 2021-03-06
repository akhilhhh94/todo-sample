const jwt =  require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const apiResponse = require("../helpers//apiResponse");

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return apiResponse.ErrorResponse(res, "Auth failed");
            }
            req.user = user;
            next();
        });
    } else {
        return apiResponse.ErrorResponse(res, "Auth failed");
    }
};
module.exports = authenticateJWT;