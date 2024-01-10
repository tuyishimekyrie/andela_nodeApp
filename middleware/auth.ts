import config from 'config'
import { Response,Request,NextFunction } from 'express'
import jwt from 'jsonwebtoken'
// import user from '../schemas/userSchema';

function auth(req:Request,res:Response, next:NextFunction) {
    const token = req.header('x-token')
    if (!token) return res.status(404).send("Access denied, no token provided")
    try {
        const decode = jwt.verify(token, config.get("jwtPrivateKey"))
        req.user = decode;
        next();
    }
    catch (ex:any) {
        res.status(400).send("invalid token")
    }
}

export default auth;