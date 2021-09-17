import Publisher from '../../models/Publisher'
import {SERVER_RESPONSE_CONSTANTS} from '../../constant'
const GetPublisher= async(req,res)=>{
    try{
        const {id}=req.params;
        const data= await Publisher.findOne({_id:id});
        return(
            res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE).send({
                status:SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
                data:data
            })
        )
    }
    catch(err){
        res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send({
            status:SERVER_RESPONSE_CONSTANTS.SEVER_ERROR_CONTENT,
            error:err
        })
    }
}

const CreateNewPublisher=async(req,res)=>{
    const {name}=req.body;
    try{
        const publisher=new Publisher({name});
        const savedPublisher=await publisher.save();
        return(
            res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE).send({
                status:SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
                data:savedPublisher
            })
        )
    }catch(err){
        return(
            res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send({
                status:SERVER_RESPONSE_CONSTANTS.SEVER_ERROR_CONTENT,
                error:err
            })
        )
    }
}
const UpdatePublisher=async(req,res)=>{
    const {id}=req.params;
    const {name}=req.body;
    Publisher.findByIdAndUpdate(id,{name},{new:true}).exec()
    .then((data)=>res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE).send({
        status:SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
        data:data
    }))
    .catch((err)=>res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send({
        status:SERVER_RESPONSE_CONSTANTS.SEVER_ERROR_CONTENT,
        error:err,
    }))
}
const DeletePublisher=async(req,res)=>{
    try{
        const {id}=req.params;
        const data= await Publisher.deleteOne({_id:id});
        return(
            res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE).send({
                status:SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
                data:data
            })
        )
    }
    catch(err){
        res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send({
            status:SERVER_RESPONSE_CONSTANTS.SEVER_ERROR_CONTENT,
            error:err
        })
    }
}
export {GetPublisher,DeletePublisher,UpdatePublisher,CreateNewPublisher}