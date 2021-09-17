const mongooose = require('mongoose')

// SQL : record - NoSQL : document

const ProductSchema = new mongooose.Schema({
    title:{
        type:String
    },
    price :{
        type:Number,
        required:true
    },
    description : {
        type:String,
        required:true
    },
    url: {
        type:String,
        default:''
    },
    thumb: {
        type:String,
        default : ''
    },
    author : {
        type:mongooose.Types.ObjectId,
        ref:'Author',
        required : true
    },
    publisher : {
        type:mongooose.Types.ObjectId,
        ref:'Publisher',
        required : true
    },
    category : {
        type:mongooose.Types.ObjectId,
        ref:'Category',
        required : true
    },
    stocks : {
        type: Number,
        required:true,
        default:0,
        validate : {
            validator: function(s) {
                return parseInt(s) >=0
            },
            message:'Stock of product must be greater than zero'
        }
    }
},{timestamps:true})

const Product = mongooose.model('Product',ProductSchema);

export default Product