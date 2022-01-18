const mongose=require("mongoose");
const Schema=mongose.Schema;

const cartSchema=new Schema({
      userId:{type:String,required:[true,"user Id is required"]},
      wishlist:{type:[String]},
      products:{type:String}

})

const cart=mongose.model("cart",cartSchema)
module.exports=cart;