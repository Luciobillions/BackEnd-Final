import mongoose from 'mongoose';
import { isGoodPassword } from '../utils/validator.js';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 2,
        trim: true,
        lowercase: true,
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 2,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 6,
        trim: true,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
        min: 16,
        max: 100,
    },
    registrationDate: {
        type: Date,
        default: Date.now,
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return isGoodPassword(value);
            },
            message: "Password is not good",
        },
    },
});

userSchema.pre('save', async function(next) {
    if (this.isModified("password") || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

export default mongoose.model("user", userSchema);