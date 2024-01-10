import { Response, Request, NextFunction } from "express";

function auth(req: Request, res: Response, next: NextFunction) {
     if (!req.user.isAdmin) return res.status(403).send("Access denied.");
    next();
}

export default auth;
