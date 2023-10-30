const jwt = require("jsonwebtoken");
const httpStatus = require("http-status-codes");

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(httpStatus.UNAUTHORIZED).send("You are not authorized")
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err)
            return res.status(httpStatus.FORBIDDEN).send("Token is not valid");
        req.user = user;
        next();
    })
}
const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(httpStatus.UNAUTHORIZED).send("You are not authorized!")
        }
    });
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(httpStatus.UNAUTHORIZED).send("You are not authorized!")
        }
    });
};

module.exports = {
    verifyToken,
    verifyUser,
    verifyAdmin
}