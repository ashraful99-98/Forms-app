// import { Request, Response } from 'express';
// import User from '../models/User';

// // Get all users (with pagination)
// export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { page = 1, limit = 10 } = req.query;
//     const users = await (User as any).paginate({}, {
//       page: Number(page),
//       limit: Number(limit)
//     });
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching users', error });
//   }
// };

// // Get user by ID
// export const getUserById = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user || user.isDeleted) {
//       res.status(404).json({ message: 'User not found' });
//       return;
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching user', error });
//   }
// };

// // Block user
// export const blockUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user || user.isDeleted) {
//       res.status(404).json({ message: 'User not found or deleted' });
//       return;
//     }
//     user.isBlocked = true;
//     await user.save();
//     res.status(200).json({ message: 'User blocked', user });
//   } catch (error) {
//     res.status(500).json({ message: 'Error blocking user', error });
//   }
// };

// // Unblock user
// export const unblockUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user || user.isDeleted) {
//       res.status(404).json({ message: 'User not found or deleted' });
//       return;
//     }
//     user.isBlocked = false;
//     await user.save();
//     res.status(200).json({ message: 'User unblocked', user });
//   } catch (error) {
//     res.status(500).json({ message: 'Error unblocking user', error });
//   }
// };

// // Soft delete user
// // export const deleteUser = async (req: Request, res: Response): Promise<void> => {
// //   try {
// //     const user = await User.findById(req.params.id);
// //     if (!user || user.isDeleted) {
// //       res.status(404).json({ message: 'User not found or already deleted' });
// //       return;
// //     }
// //     user.isDeleted = true;
// //     await user.save();
// //     res.status(200).json({ message: 'User soft deleted', user });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error deleting user', error });
// //   }
// // };

// export const deleteUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);

//     if (!deletedUser) {
//       res.status(404).json({ message: 'User not found' });
//       return;
//     }

//     res.status(200).json({ message: 'User permanently deleted', user: deletedUser });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting user', error });
//   }
// };
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Get all users (with pagination and sorting by lastLogin)
export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Get current authenticated user via token
export const getCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.isDeleted) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Block multiple users
export const blockUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userIds }: { userIds: string[] } = req.body;
    await User.updateMany({ _id: { $in: userIds } }, { isBlocked: true });
    res.status(200).json({ message: 'Users blocked successfully' });
  } catch (error) {
    next(error);
  }
};

// Unblock multiple users
export const unblockUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userIds }: { userIds: string[] } = req.body;
    await User.updateMany({ _id: { $in: userIds } }, { isBlocked: false });
    res.status(200).json({ message: 'Users unblocked successfully' });
  } catch (error) {
    next(error);
  }
};

// Permanently delete multiple users
export const deleteUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userIds }: { userIds: string[] } = req.body;
    await User.deleteMany({ _id: { $in: userIds } });
    res.status(200).json({ message: 'Users deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Permanently delete a single user by ID
export const deleteUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({ message: 'User permanently deleted', user: deletedUser });
  } catch (error) {
    next(error);
  }
};

// Block single user
export const blockUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.isDeleted) {
      res.status(404).json({ message: 'User not found or deleted' });
      return;
    }
    user.isBlocked = true;
    await user.save();
    res.status(200).json({ message: 'User blocked', user });
  } catch (error) {
    next(error);
  }
};

// Unblock single user
export const unblockUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.isDeleted) {
      res.status(404).json({ message: 'User not found or deleted' });
      return;
    }
    user.isBlocked = false;
    await user.save();
    res.status(200).json({ message: 'User unblocked', user });
  } catch (error) {
    next(error);
  }
};
