const jwt = require("jsonwebtoken")

const authService = (req, res, next) =>{
    const token = req.header("Authorization")

    if(!token){
        return res.status(401).json({error:"Access denied. No token provided"});
    }

    try{
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET)
        req.user = decoded;
        next();
    }catch(error){
        return res.status(403).json({error:"Token expired or invalid"});
    }
}

module.exports = authService;