const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next){
    const userToken = req.headers['authorization']
    const token = userToken.substring(7).replace(/"/g, '')

    if(!token) return res.status(403 ).send({auth:false, success:false, message: 'error: unknown user.'})

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
        if(err) 
            return res.status(403).send({auth: false, message: 'Access denied, invalid user.'})
        res.locals.token = token;
        next();
    });
}
module.exports = verifyToken;