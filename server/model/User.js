import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    iss: {
        type: String,
        required: true
    },
    nbf: {
        type: Number
    },
    aud: {
        type: String
    },
    sub: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    email_verified: {
        type: Boolean
    },
    name: {
        type: String,
        required: true
    }
})

const user = mongoose.model('TaskManagerUser',userSchema)

export default user