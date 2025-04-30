"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.registerAdmin = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || "secret";
// const JWT_SECRET = process.env.JWT_SECRET as string; 
// Register Controller
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = new User_1.default({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (err) {
        console.error("Register Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.register = register;
// Register Admin Controller
const registerAdmin = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = new User_1.default({
            name,
            email,
            password: hashedPassword,
            role: "admin", // ✅ Here we are setting role to "admin"
        });
        await user.save();
        res.status(201).json({ message: "Admin registered successfully" });
    }
    catch (err) {
        console.error("Register Admin Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.registerAdmin = registerAdmin;
// Login Controller
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        const user = await User_1.default.findOne({ email }).select('+password');
        if (!user) {
            res.status(401).json({ message: "Unauthorized: User not found" });
            return;
        }
        if (user.isBlocked) {
            res.status(403).json({ message: "Your account is blocked" });
            return;
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (err) {
        console.error("Login Error:", err);
        next(err);
    }
};
exports.login = login;
// export const login = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const { email, password } = req.body;
//     const user: IUser | null = await User.findOne({ email });
//     // if (!user || user.isBlocked) {
//     //   res.status(401).json({ message: "Unauthorized" });
//     //   return;
//     // }
//     if (!user) {
//       res.status(401).json({ message: "Unauthorized" });
//       return;
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       res.status(400).json({ message: "Invalid credentials" });
//       return;
//     }
//     // const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
//     //   expiresIn: "1d",
//     // });
//     const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
//       expiresIn: '7d',
//     });
//     // Set token in HTTP-only cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000, // 1 day
//     });
//     await user.save();
//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error("Login Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// Logout Controller
const logout = async (req, res, _next) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (err) {
        console.error("Logout Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.logout = logout;
