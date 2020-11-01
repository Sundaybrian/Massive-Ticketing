const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split("Bearer ")[1];
    } else {
        return res.status(403).json({
            message: "Token not found, access denied",
        });
    }

    // verify token
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedToken.user;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = auth;
