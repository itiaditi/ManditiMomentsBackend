require("dotenv").config();
const mongoose = require("mongoose");
async function connectToDb(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
    }catch(e){
        console.log(e);
        process.exit(1);
    }
}

module.exports={
    connectToDb
}