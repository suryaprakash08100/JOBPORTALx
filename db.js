import mongoose from 'mongoose';
import colors from 'colors';
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to Database'.bgRed)
    }catch(error){
        console.log('Mongoose Error ${error}'.bgRed.white)
    }
}

export default connectDB;