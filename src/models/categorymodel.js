import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

    name:{
        type:  String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    description:{
        type:String,
        lowercase:true,
        minlength: 5,
        maxlength:50
    }
   
})

export default mongoose.model("category",categorySchema)