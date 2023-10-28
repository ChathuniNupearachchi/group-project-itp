const { error } = require("console");
const User = require("../models/UserModel")
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const TokenModel = require("../models/tokenModel")
const crypto = require("crypto")
const sendEmail = require("../utils/sendEmail");
const DeleteUser = require("../models/DeleteUser");


const genarateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
}


//registering user
const registerUser = asyncHandler (async(req,res) =>{
    const {name, Email, password,phone,UserRole} = req.body
    //validation
    if(!name || !Email || !password){
        res.status(400)
        throw new Error("Pleace fill in all required filds")
    }
    if(password.length<6){
        res.status(400)
        throw new Error("Password must be up to 6")
    }
    if(phone.length!==10){
        res.status(400)
        throw new Error ("Pleace enter Correct mobile Number")
    }

    //check user email alrady exist
    const userExist = await User.findOne({Email})
    if(userExist){
        res.status(400)
        throw new Error("E mail alrady use")
    }

    //create new user
    const user = await User.create(
        {
            name,
            Email,
            password,
            phone,
            UserRole,

    })

     //Genarate token
     const token = genarateToken(user._id)

     //sent HTTP-only cookie
     res.cookie("token", token, {
        path:"/",
        httpOnly:true,
        expires: new Date(Date.now()+1000*86400), //1day
        sameSite:"none",
        secure:true

     })

    if(user){
        const {_id, name, Email, password,photo,phone,ActiveStatus,UserRole} =user
        res.status(201).json(
            {
                _id,
                name,
                Email,
                password,
                photo,
                phone,
                ActiveStatus,
                UserRole,
                token,
                
            }
        )
    }else {
        res.status(400)
        throw new Error ("Inavalid user data")
    }
});



//login user
const loginUser = asyncHandler(
    async(req,res) =>{
        const{Email, password} = req.body
        //validate
        if(!Email || !password){
            res.status(400)
            throw new Error("Fill this filds")
        }

        //if exist user
        const user = await User.findOne({Email})
        if(!user){
            res.status(400)
            throw new Error("User not exist")
        }

        if(user.ActiveStatus===false){
            res.status(400)
            throw new Error("User not exist")
        }

        //user exist check pwd
        const passwordIsCorrect = await bcrypt.compare(password, user.password)

        //Genarate token
        const token = genarateToken(user._id)

        //sent HTTP-only cookie
        res.cookie("token", token, {
            path:"/",
            httpOnly:true,
            expires: new Date(Date.now()+1000*86400), //1day
            sameSite:"none",
            secure:true

        })

        if(user &&  passwordIsCorrect){
            const {_id, name, Email, password,photo,phone,ActiveStatus,UserRole} =user
            res.status(200).json(
            {
                _id,
                name,
                Email,
                password,
                photo,
                phone,
                ActiveStatus,
                UserRole,
                token,
                
            }
        )
            
        }else{
            res.status(400)
            throw new Error ("Password incorrect") 
        }


    }
)


//logout iser
const logout = asyncHandler (async(req,res)=>{
    res.cookie("token", "", {
        path:"/",
        httpOnly:true,
        expires: new Date(0), //expire
        sameSite:"none",
        secure:true

    })
    return res.status(200).json({message: "Successfuly log out"});

})


//user profile
const getUser =asyncHandler(async(req,res) =>{
    const user = await User.findById(req.user._id)

    if(user){
        const {_id, name, Email, password,photo,phone,ActiveStatus,UserRole} =user
        res.status(200).json(
            {
                _id,
                name,
                Email,
                password,
                photo,
                phone,
                ActiveStatus,
                UserRole,
                
            }
        )
    }else{
        res.status(400)
        throw new Error ("User not found")
    }

})




//login status
const loginStates = asyncHandler(async(req, res) =>{
    const token = req.cookies.token

    if(!token){
        return res.json(false)
    }


    //verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if(verified){
        return res.json(true)
    }

    return res.json(false)


   
})


//update user
const updateUser = asyncHandler (async(req,res)=>{
    const user = await User.findById(req.user._id)

    if(user){
        const { name, Email, photo,phone} =user
        user.Email = Email
        user.phone = req.body.phone || phone
        user.name = req.body.name || name
        user.photo = req.body.photo || photo

        const updatedUser = await user.save()
        res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                Email: updatedUser.Email,
                password: updatedUser.password,
                photo: updatedUser.photo,
                phone: updatedUser.phone,
                bio: updatedUser.bio,
        })
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }
})


//change password
const updatePassword = asyncHandler (async(req,res) =>{
    const user = await User.findById(req.user._id)
    
    const {oldPassword, password} = req.body

    if(!user){
        res.status(400)
        throw new Error(" user not found pleace signup")
    }

    //validate
    if(!oldPassword || !password){
        res.status(400)
        throw new Error(" pleace add old and new password")
    }

    //check  password correct
    const passwordIsCorrect = await bcrypt.compare(oldPassword,user.password)

    //save new password
    if(user && passwordIsCorrect){
        user.password =password
        await user.save()
        res.status(200).send("Password Change success ful")
    }
    else{
        res.status(400)
        throw new Error(" Old password is incorrect")
    }

})


//register staff
const registerStff = asyncHandler (async(req,res) =>{
    const {name, Email, password,phone,UserRole} = req.body
    //validation
    if(!name || !Email || !password){
        res.status(400)
        throw new Error("Pleace fill in all required filds")
    }
    if(password.length<6){
        res.status(400)
        throw new Error("Password must be up to 6")
    }
    if(phone.length!==10){
        res.status(400)
        throw new Error ("Pleace enter Correct mobile Number")
    }

    //check user email alrady exist
    const userExist = await User.findOne({Email})
    if(userExist){
        res.status(400)
        throw new Error("E mail alrady use")
    }

    //create new user
    const user = await User.create(
        {
            name,
            Email,
            password,
            phone,
            UserRole,

    })


});


//get All users
const getAllUser = asyncHandler(async(req, res) =>{
    const user = await User.find()
    res.status(200).json(user)
})


//get user by Id
const getUserByid = asyncHandler(async(req,res)=>{
    try{
        const userId= req.params.userId;
        const user = await User.findById(userId)

        res.json(user)

    }catch(error){
        res.status(500).json({message:"Does not have details"})
    }
})


//fogot password
const fogotPassword = asyncHandler(async(req,res) =>{
    const {Email}=req.body
    const user = await User.findOne({Email})

    if(!user){
        res.status(404)
        throw new Error ("User does not exist")
    }

    //deletre token if it exist 
    let token = await TokenModel.findOne({userId: user._id})
    if(token){
        await token.deleteOne()
    }

    //create reset token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id
    console.log(resetToken)

    //hash token before saving to DB
    const  hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    //save token
    await new TokenModel({
        userId: user._id,
        token: hashedToken,
        CreatedAt: Date.now(),
        expirsAt: Date.now() + 30*(60*1000)

    }).save()

    //construct reset url
    const  resetUrl =`${process.env.FRONTEND_URL}/resetpassword/${resetToken}`

    //reset emaol
    const message = `
        <h2> Hello ${user.name}</h2>
        <p>Pleace use the url below to reset Your password</p>
        <p>this reset link is for only <b>15 minutes</b></p>

        <a href =${resetUrl} clicktracking=off> ${resetUrl}</a>

        <p>Arrow company p.v.t</p>
    `

    const subject = "Password Reset request"
    const send_to = user.Email
    const sent_from = process.env.EMAIL_USER

    try{
        await sendEmail(subject, message, send_to, sent_from, )
        res.status(200).json({success:true, message:"Reset email sent"})

    }catch(error){
        res.status(500)
        throw new Error ("Email not send , Pleace try again")

    }
})


//reset password
const resetPassword = asyncHandler (async(req,res) => {
    const {password} = req.body
    const {resetToken} = req.params

    //hash token, then comapire to token in DB
    const  hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    //find token in DB
    const userToken = await TokenModel.findOne({
        token:hashedToken,
        expirsAt:{$gt: Date.now()},

    })

    if(!userToken){
        res.status(404)
        throw new Error("Inbvalid or expire token")

    }

    //find user 
    const  user =  await User.findOne({_id: userToken.userId})
    user.password = password
    await user.save()
    res.status(200).json({
        message:"Password reset successful, Pleace login"
    })





})




//Change Active status
const ChangeActiveStatus = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.ActiveStatus = !user.ActiveStatus; // Toggle ActiveStatus
  
      await user.save();
  
      res.status(200).json({ message: 'ActiveStatus toggled successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error toggling ActiveStatus' });
    }
  });


  //delete user
  const RemoveUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const deletedUser = new DeleteUser({
        name: user.name,
        Email: user.Email,
        Phone:user.phone,
        UserRole:user.UserRole,
        ID:user._id
        
      });

      await deletedUser.save()

      await User.findByIdAndRemove(userId)

      res.status(200).json({ message: 'User deleted successfully' });
  
    try {
      
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error ...' });
    }
  });


// get all delete users
const getAllremoveUser = asyncHandler(async(req, res) =>{
    const user = await DeleteUser.find()
    res.status(200).json(user)
})








module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
    loginStates,
    updateUser,
    updatePassword,
    fogotPassword,
    registerStff,
    getAllUser,
    getUserByid,
    resetPassword,
    ChangeActiveStatus,
    RemoveUser,
    getAllremoveUser
}



//error hadler npm i express-async-handler