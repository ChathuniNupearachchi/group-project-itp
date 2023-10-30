const express =require("express");
const router = express.Router();
<<<<<<< HEAD
const { registerUser, loginUser, logout, getUser, loginStates, updateUser, updatePassword, fogotPassword, resetPassword, registerStff, getAllUser, getUserByid, ChangeActiveStatus, RemoveUser  } = require("../controllers/userController")
=======
const { registerUser, loginUser, logout, getUser, loginStates, updateUser, updatePassword, fogotPassword, resetPassword, registerStff, getAllUser, getUserByid, ChangeActiveStatus, RemoveUser, getAllremoveUser  } = require("../controllers/userController")
>>>>>>> 29d9edd9d06f978860b945f048a27ea99a678ca2
const protect = require("../middleWare/authMiddleware")

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/logout",logout)
router.get("/getUser",protect, getUser)
router.get("/loggedin", loginStates)
router.patch("/updateuser",protect, updateUser)
router.patch("/updatpassword",protect, updatePassword)
router.post("/registerstaff",registerStff)
router.get("/AllUsers",getAllUser)
router.get("/Userdetalis/:userId",getUserByid)
router.post("/forgotpassword", fogotPassword)
router.put("/resetpassword/:resetToken", resetPassword)
router.patch("/ChangeActiveStatus/:userId",ChangeActiveStatus);
router.delete("/removeUser/:userId",RemoveUser)
<<<<<<< HEAD
=======
router.get("/getremoveUser",getAllremoveUser)
>>>>>>> 29d9edd9d06f978860b945f048a27ea99a678ca2





module.exports = router;