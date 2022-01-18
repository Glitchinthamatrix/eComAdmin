const mongose=require("mongoose");
const Schema=mongose.Schema;

const userSchema=new Schema({
    venderId:{
        type:String,
        unique:true,
        required:[true,"Id Required"]
    },
    name:{
        type:String,
        required:[true,"Name is Required"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Email is Required"]
    },
    mobileNumber:{
        type:Number,
        unique:true,
        required:[true,"Mobile Number is Required"]
    },
    address:{
        type:String,
        required:[true,"Address Required"]
    },
    profilePic:{
        type:String,
        required:[true,"Profile Picture is Required"]
    },
    gender:{
        type:String,
        required:[true,"Gender is Required"]
    },
    dob:{
        type:Date,
        required:[true,"Date of Birth Required"]
    },
    prodCatagory:{
        type:[String],
        required:[true,"product catogary is required"],
    },
    verified:{
        type:Boolean,
    },
    choosenPlan:{
        type:String,
        required:[true,"plan is Required"]
    },


})