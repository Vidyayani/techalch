const jwt = require('jsonwebtoken')
const tokenSecret = "my-token-secret"
const logger = require('logger').createLogger();

exports.verify = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) res.status(403).json({error: "please provide a token"})
    else {
        jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
            if (err) res.status(500).json({error: 'failed to authenticate token'})
            else{
            logger.info("JWT token authenticated")
            next()
            }
        })
    }
}

exports.generateToken = (user) => {
    logger.info("Generating new JWT token")
    return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'})
}