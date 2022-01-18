const mongose=require("mongoose");
const Schema=mongose.Schema;

const complaintSchema=new Schema({
    title:{
        type:String,
        required:[true,"Title is Required"]
    },
    timeofcomplainy:{
        type:Date,
        default:Date.now();
    },
    description:{
      type:String,
      required:[true,"Description is Required"]
    },
    userId:{
        type:String,
        required:[true,"userId is Required"]
    },
    productId:{
        type:String,
        required:[true,"Product is Required"]
    },

})
const complaint=mongose.model("complaint",complaintSchema);
module.exports=complaint;