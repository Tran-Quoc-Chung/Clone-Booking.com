import express from 'express';
import {createUser, updateUser,getAllUser,getUser,deleteUser} from '../controllers/user.js'
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';
const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("Hello user, you are logged in");
// });
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Hello user, you are logged in and can you delete all account");
// });

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.get("/:id", getUser);

router.get("/", getAllUser);
// router.put("/:id",verifyUser, updateUser);

// router.delete("/:id",verifyUser, deleteUser);

// router.get("/:id",verifyUser, getUser);

// router.get("/", getAllUser);
//router.get("/",verifyUser, getAllUser);

export default router;