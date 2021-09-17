import User from "../../models/User"
import bcrypt from 'bcrypt'
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import {SERVER_RESPONSE_CONSTANTS} from '../../constant'

import {registerValidation} from '../../middlewares/validationMiddleware'
import { transporter,registerUserTemplate }
  from '../../middlewares/emailMiddleware'

const SECRET_KEY = 'YOUR_SECRET_KEY';
const JWT_OPTIONS = {
  expiresIn:'7d'
}

const GetListUser=async(req,res)=>{
    try{
        const {id}=req.params
        const data=await User.findOne({_id:id})
        return(
            res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE).send({
                status:SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
                data:data
            })
        )
    }catch(err){
        res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send({
            status:SERVER_RESPONSE_CONSTANTS.SEVER_ERROR_CONTENT,
            error:err
        })
    }
}
const RegisterNewAccount = async (req,res) => {
   // Validation req.body send from user
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE)
      .send({
        error: SERVER_RESPONSE_CONSTANTS.SEVER_ERROR_CONTENT,
        message: error.details[0].message,
      })
  }

  const emailHasExist = await User.findOne({ email: req.body.email });
  if (emailHasExist) {
    return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE)
      .send({
        error: SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_data,
        message: 'Your email are already exists'
      })
  }

  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  const user = new User({
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    password: hashedPassword,
    phone: '',
    address: '',
    profilePicture: '',
  });

  const sendEmail = (u) => {
    const { from, to, subject, html } = registerUserTemplate(u)
    transporter
      .sendMail({ from, to, subject, html })
      .then((info) => console.log(`**Email sent**`, info))
      .catch((e) => res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE))
  };

  const userSaved = await user.save();

  sendEmail(userSaved)

  return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE).send({
    status: "Success",
    message: "Register account successfully",
    data: userSaved
  })



}




const Login = async (req,res) => {
    const {email,password} = req.body;

    const user = await User.findOne({email});
    const isMatching = brcrypt.compareSync(password,user.password);

    const token = jwt.sign({userID:user._id},SECRET_KEY,JWT_OPTIONS)


    if(!isMatching){
        return res.json({
            data:null,
            status:"Failed"
        })
    }
    return res.json({
        status:"Success",
        token:token
    })
}


export {
    RegisterNewAccount,
    Login,
    GetListUser
}
