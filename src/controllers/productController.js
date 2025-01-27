import  product from '../models/productmodel.js';

export const getProducts = async (req, res) =>{
    try {
        const {id, name} = req.query;

        let query = {}

        //para buscar id
        if(id){
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message: "❌ id is not valid"});
            }
            query._id = id;
        }
        

            //si se busca el nombre
        if(name) {
            query.name={$regex: new RegExp(name,'i') }
        }

        const products= await product.find(query).populate("category","name description");

        if(!products || products.length===0){
            return res.status(404).json({message: "❌ products not found",error});
        }
        
        return res.status(200).json({
            message:`✅ Products Found ${products.length}`,
            products})
        

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message:"🚨 internal server error",error:error.message})
    }
   
}

export const createProduct = async (req,res) =>{
    try {
        const productData= new product(req.body);

        const {name} = productData;
        const productExist = await product.findOne({name})

        if(productExist){
            return  res.status(400).json({message:`Product ${name}, already exist`})
        }

        const saveProduct= await productData.save();
        return res.status(200).json({message:"✔️ Product create succesfully",
            product: saveProduct
        })
    } catch (error) {
        return res.status(500).json({message:"🚨 internal server error", error:error.message})  
    }
}

export const deleteProduct= async (req, res) =>{
    try {
        const _id = req.params.id;
        const productExist = await product.findOne({_id})

        if(!productExist){
            return res.status(400).json({message:"❌ Product does not exist"})
        }
        const response= await product.findByIdAndDelete(_id)
        return res.status(200).json({message:"✔️Product delete succesfully"})
    } catch (error) {
        return res.status(500).json({message:"🚨 internal server error ",error:error.message})
        
    }
}

export const updateProduct= async (req,res) =>{
    try {
        const _id= req.params.id
        const productExist= await product.findOne({_id})

        if(!productExist){
            return res.status(400).json({message:"⚠️ User you're trying to update does not exist"})

        }

        const updateProduct= await product.findByIdAndUpdate({_id}, req.body, {new:true})
        .populate("category","name")
        res.status(201).json({updateProduct})
    } catch (error) {
        return res.status(500).json({message:"🚨 internal server error",error:error.message})
    }
}