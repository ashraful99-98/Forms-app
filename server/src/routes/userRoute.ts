// import express from 'express';
// import {
//   blockUser,
//   deleteUser,
//   getAllUsers,
//   getUserById,
//   unblockUser
// } from '../controllers/userController';

// const router = express.Router();

// router.get('/', getAllUsers);
// router.get('/:id', getUserById);
// router.put('/block/:id', blockUser);
// router.put('/unblock/:id', unblockUser);
// router.delete('/:id', deleteUser);

// export default router;

import express from 'express';
import {
  getAllUsers,
  getUserById,
  getCurrentUser,
  blockUserById,
  unblockUserById,
  deleteUserById,
  blockUsers,
  unblockUsers,
  deleteUsers
} from '../controllers/userController';

const router = express.Router();

router.get('/', getAllUsers);

router.get('/me', getCurrentUser);

router.get('/:id', getUserById);

router.patch('/block/:id', blockUserById);

router.patch('/unblock/:id', unblockUserById);

router.delete('/:id', deleteUserById);

router.patch('/block', blockUsers);

router.patch('/unblock', unblockUsers);

router.delete('/', deleteUsers);

export default router;

