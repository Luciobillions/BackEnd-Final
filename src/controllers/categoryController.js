import category from "../models/categorymodel.js"

export const getcategory = async (req,res) =>{
try {
    const categories = await category.find()
    if(categories.lenght === 0){
        return res.status(204).json({message:"⚠️ there are not categories"})
    }
    return res.status(200).json({categories})
} catch (error) {
    return res.status(500).json({message:"🚨 internal server error",error:error.message})
    
}
} 

export const createcategory = async (req,res) =>{
    try {
        const {name, description}= req.body
        const categoryexist= await category.findOne({name})
        if(categoryexist){
            return res.status(400).json({message:"⚠️ category already exists "})

        }
        const newcategory = new category({name,description})

        const response= await newcategory.save()
        return res.status(201).json({response})
    } catch (error) {
        return res.status(500).json({message:"🚨 internal server error", error:error.message})
    }
}

export const deletecategorys = async (req, res ) =>{
    try {
        const _id= req.params.id;
        const categoryexist= await category.findOne({_id})

        if (!categoryexist){
            return res.status(400).json({message:"❌ category does not exist "})
            
        }
        const response = await category.findByIdAndDelete(_id)
        return res.status(200).json({message:"✔️ category delete succesfully"})
    } catch (error) {
        return res.status(500).json({message:"🚨 internal server error ", error:error.message})
    }
}

export const updatecategorys= async ( req, res) =>{
    try {
        const _id = req.params.id;
        const categoryexist = await category.findOne({_id})
        if(!categoryexist){
            return res.status(400).json({message:"⚠️ Trying to update does not exist"})
        }

        const updatecategory= await category.findByIdAndUpdate({_id}, req.body, {new:true})
        return res.status(200).json({updatecategory})
    } catch (error) {
        return res.status(500).json({message:"🚨 internal server error", error:error.message})
    }
}
