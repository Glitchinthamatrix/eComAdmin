const mongose=require("mongoose");
const Schema=mongose.Schema;

const transactionSchema=new Schema({
    amount:{
        type:String,
        required:[true,"Amount is Required!"]
    },
    transactionId:{
        type:String,
    },
    userId:{
        type:String,
        required:[true,"Userid is Required"]
    },
    vendorId:{
        type:String,
        required:[true,"Vendor is Required"]
    },
    orderId:{
        type:String,
        required:[true,"OrderID is Required"]
    },
    transaction:{
        type:String,
        required:[true,"transaction is required"]
    }
    
})
const transaction=mongose.model("transaction",transactionSchema);
module.exports=transaction;