const jwt = require("jsonwebtoken");
const {UserModel} = require("../database");

const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = async (req,res,next)=>{
    try{
        const token  = req.cookies.LeetCodeToken;
        const verifyToken = jwt.verify(token, SECRET_KEY);
        const rootUser = await UserModel.findOne({_id:verifyToken._id,"tokens.token":token});
        if(!rootUser){
            throw new Error("User Not Found");
        }
        req.token = token ;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();
    }catch(err){
        res.status(401).send({message:"Unauthorized:No token provided"});
    }
}

module.exports = authMiddleware;