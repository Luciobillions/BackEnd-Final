import mongoose from "mongoose";

export const StatusEnum= ["AVAILABLE", "NOT AVAILABLE", "DISCTONITUED"]

const productSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, "name is required"],
        minlength: 4,
        maxlength: 20,
        trim: true,
        lowercase: true,
        unique:true,
    },

    price:{
        type:Number,
        required:[true, "Price field is required"],
        min:[0, "Price field has to be a number"],
    },

  
    description:{
        type:String,
        minlength: 5,
        maxlength:100
    },

    status:{
        type: String,
        quantity: Number,
        status:{
            type:String,
            validate:{
                validator: function(status){
                    return StatusEnum.includes(status);
                },
                message: props => `${props.value} is not a valid status`
            },
            required:true,
            enum: StatusEnum,
            
        },
    },

    category:{type: mongoose.Schema.Types.ObjectId, ref:"category"},


    creationDate:{
        type: Date,
        default: Date.now(),
    },

    stock:{
        type: Number,
        default:0,
    },




})

export default mongoose.model("product", productSchema)