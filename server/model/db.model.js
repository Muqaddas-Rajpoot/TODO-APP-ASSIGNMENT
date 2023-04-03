const mongoose=require("mongoose");

module.exports=function(){
    const db="mongodb+srv://muqaddasbsse3655:mernbootcamp@cluster0.pg8xh0x.mongodb.net/test"

    mongoose.set("strictQuery",false);
    mongoose.connect(db,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });

    mongoose.connection.on("connected",function(){
        console.log("Mongoose is connected to" + db);
    })

    mongoose.connection.on("error",function(err){
        console.log("Mongoose Connection error"+err);
    })

    mongoose.connection.on("disconnected",function(){
        console.log("Mongoose disconnected");
    })
}
