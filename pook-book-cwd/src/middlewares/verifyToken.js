import {verify} from 'jsonwebtoken';

const auth=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        return res.status(401).send({
            err:'Cannot Authorized! You maybe forgot to provide a token'
        })
    }
    try{
        verify(token,process.env.SECRET_TOKEN);
        next();
    }catch(err){
        res.status(400).send({err:"Token Expired or Invalid Token"})
    }
}

export default auth;