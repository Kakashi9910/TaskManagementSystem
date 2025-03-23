import mongoose from "mongoose";

export const  dbConnection =async()=> {
    const accessString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.szmrh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    try {
        await mongoose.connect(accessString)
        console.log('db connected successfully')
    } catch (error) {
        console.log(error)
    }
}