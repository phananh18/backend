import Product from '../../models/Product'

const GetListProducts = (req, res) => {
  // localhost:3000/api/v1/products?page=2&limit=10
    let page = parseInt(req.query.page) || 0;
    let limit = parseInt(req.query.limit) || 0;
  
    Product
      .find()
      .populate('author')
      .populate('publisher')
      .populate('category')
      .sort((page * limit).toString())
      .skip(page * limit)
      .limit(limit)
      .exec()
      .then((data) => {    
        Product
          .countDocuments()
          .exec()
          .then((countResult) => {
            return res.status(200).json({
              total: countResult,
              page: page,
              pageSize: data.length,
              data: data,
              status: 'OK'
            })
          })
          .catch((countErr) => {
            return res.json(countErr)
          })
      })
      .catch(err => {
        return res.status(400).send({
          status: 'FAILED',
          message: err.message,
          
        })
      })
  
  }
  



const CreateNewProduct = async (req,res) => {
    const filePath = req.file.path.replace('//','/');
    const thumbPath = req.file.path.replace('//','/').replace('productImages\\','productImages\\256x144-')


  
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        url: filePath,
        thumb: thumbPath,
        author: req.body.authorId,
        category: req.body.categoryId,
        publisher: req.body.publisherId,
        stocks : req.body.stocks
    })

    try {
        const savedProduct = await product.save()
        return res.status(200).send({
            status:'ok',
            data:savedProduct

        })
      } catch (e) {
        return res.status(400).send({
          message: e.message,
          status:'error'
        });
      }
}

const DeleteProduct=async(req,res)=>{
  try{
    const {id}=req.params
    const data=await Product.deleteOne({_id:id})
    return(
      res.status(200).send({
        status:'Delete Product Successfully',
        data:data
      })
    )
  }
  catch(err){
    return res.status(400).send({
      status:'Somethings Went Wrongs',
      error:err
    })
  }
}

export {
    CreateNewProduct,GetListProducts,DeleteProduct
}