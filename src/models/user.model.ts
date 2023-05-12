import { Document, Schema, model } from "mongoose";
import { User } from "../interfaces/user.interface";

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isEnabled: {
        type: Boolean,
        required: true,
        default: false
    }
},
{ timestamps: true });

const userModel = model<User & Document>('User', userSchema);
export default userModel;