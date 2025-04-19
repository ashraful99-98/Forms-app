// import { Request, Response, NextFunction } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User, { IUser } from "../models/User";

// // You should store this securely in .env
// const JWT_SECRET = process.env.JWT_SECRET || "secret";

// export const register = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const { name, email, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       res.status(400).json({ message: "User already exists" });
//       return;
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user: IUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await user.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const login = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const { email, password } = req.body;

//     const user: IUser | null = await User.findOne({ email });
//     if (!user) {
//       res.status(400).json({ message: "Invalid credentials" });
//       return;
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       res.status(400).json({ message: "Invalid credentials" });
//       return;
//     }

//     const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     res.status(200).json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// export const logout = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     // For stateless JWT, we simply inform the client to delete the token
//     res.status(200).json({ message: "User logged out successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User"; 
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Register Controller
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login Controller
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user: IUser | null = await User.findOne({ email });

    if (!user || user.isBlocked) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    await user.save();

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
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout Controller
export const logout = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
