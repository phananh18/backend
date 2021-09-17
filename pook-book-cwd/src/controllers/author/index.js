import Author from "../../models/Author"
import {SERVER_RESPONSE_CONSTANTS} from '../../constant'
const GetListAuthors = async (req, res) => {
    try{
        const {id}=req.params
        const data=await Author.findOne({_id:id})
        return(
            res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE).send({
                status:SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
                data:data
            })
        )
    }catch(err){
        res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send({
            status:SERVER_RESPONSE_CONSTANTS.SEVER_ERROR_CONTENT
        })
    }
}

const CreateNewAuthor = async (req, res) => {
    const { name } = req.body
    try {
        const nAuthor = new Author({ name });
        const savedAuthor = await nAuthor.save();
        return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE).send({
            status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
            data: savedAuthor
        })
    } catch (e) {
        return res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send({
            status: SERVER_RESPONSE_CONSTANTS.SEVER_ERROR_CONTENT,
            error: e
        })
    }
}

const UpdateNewAuthor = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    Author
        .findByIdAndUpdate(id, { name }, { new: true }).exec()
        .then((data) => res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE).send({
            status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_STATUS,
            data: data
        }))
        .catch((e) => res.status(400).send({
            status: SERVER_RESPONSE_CONSTANTS.SEVER_ERROR_CONTENT
        }))




}

const DeleteNewAuthor = async (req, res) => {
    try{
        const {id}=req.params
        const data=await Author.deleteOne({_id:id})
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

export { GetListAuthors, CreateNewAuthor, DeleteNewAuthor, UpdateNewAuthor }