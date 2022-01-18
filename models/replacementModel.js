const mongose=require("mongoose");
const Schema=mongose.Schema;


const replacementSchema=new Schema({
    vendorId:{type:String,type:[true,"Vendor id Required"]},
    timeOfRequest:{
        type:Date,
        default:Date.now()
    },
    userId:{
        type:String,
        required:[true,"user id is Required"]
    },
    transactionId:{
        type:String,
        required:[true,"transaction is Required"],
    },

})
const replaceModel=mongose.model("replacement",replacementSchema)
module.exports=replaceModel;