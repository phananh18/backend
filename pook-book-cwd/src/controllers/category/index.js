import Category from '../../models/Category'
import { SERVER_RESPONSE_CONSTANTS } from '../../constant'

const GetListCategories = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Category.findOne({ _id: id })
        return (
            res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE).send({
                status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
                data: data
            })
        )
    } catch (err) {
        res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send({
            status: SERVER_RESPONSE_CONSTANTS.SEVER_ERROR_STATUS
        })
    }
}

const CreateNewCategories = async (req, res) => {
    const { name, code } = req.body;

    try {
        const category = new Category({ name, code })
        const savedCategory = await category.save();
        return (
            res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE).send({
                status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
                data: savedCategory
            })
        )
    } catch (err) {
        res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send({
            status: SERVER_RESPONSE_CONSTANTS.SEVER_ERROR_CONTENT
        })
    }
}

const UpdateListCategories = async (req, res) => {
    const { id } = req.params
    const { name, code } = req.body
    Category.findByIdAndUpdate(id, { name, code }, { new: true }).exec()
        .then((data) => res.status(200).send({
            status: 'OKE',
            data: data
        }))
        .catch((err) => res.status(400).send({
            status: 'Somethings Error',
            error: err
        }))
}

const DeleteListCategories = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Category.deleteOne({ _id: id })
        return (
            res.status(SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CODE).send({
                status: SERVER_RESPONSE_CONSTANTS.SERVER_SUCCESS_CONTENT,
                data: data
            })
        )
    } catch (err) {
        res.status(SERVER_RESPONSE_CONSTANTS.SERVER_ERROR_CODE).send({
            status: SERVER_RESPONSE_CONSTANTS.SEVER_ERROR_STATUS
        })
    }
}

export { GetListCategories, CreateNewCategories, UpdateListCategories, DeleteListCategories }