const mongose=require("mongoose");
const Schema=mongose.Schema;

const otpSchema=new Schema({
      name:{type:String,required:[true,"name is Required"]},
      email:{type:String,required:[true,"email is required"]},
      mobile:{type:String,required:[true,"mobilenumber is Required"]},
      emailOtp:{type:String,required:[true,"email is Required"]},
      mobileOtp:{type:String,required:[true,"otp is required"]}

})

const replaceModel=mongose.model("otp",otpSchema)
module.exports=replaceModel;