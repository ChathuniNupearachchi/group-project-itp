const express =require("express");
const router = express.Router();
const { registerUser, loginUser, logout, getUser, loginStates, updateUser, updatePassword, fogotPassword, resetPassword, registerStff, getAllUser, getUserByid, ChangeActiveStatus, RemoveUser, getAllremoveUser  } = require("../controllers/userController")
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
router.get("/getremoveUser",getAllremoveUser)





module.exports = router;