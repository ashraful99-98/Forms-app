"use strict";
// import { Request, Response, NextFunction } from 'express';
// import jwt, { JwtPayload } from 'jsonwebtoken';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("Token Verification Error:", error);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
exports.default = authMiddleware;
// Authorization Middleware
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role || !roles.includes(req.user.role)) {
            res.status(403).json({
                message: `Role '${req.user?.role || 'Unknown'}' is not allowed to access this resource`,
            });
            return;
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
