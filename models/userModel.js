const mongose=require("mongoose");
const Schema=mongose.Schema;

const userSchema=new Schema({
    general:{
            userId:{
                type:String,
                unique:true,
                required:[true,"Id Required"]
            },
            name:{
                type:String,
                required:[true,"Name is Required"]
            },
            gender:{
                type:String,
                required:[true,"Gender is Required"]
            },
            dob:{
                type:Date,
                required:[true,"Date of Birth Required"]
            },
            verified:{
                type:Boolean,
            },
            profilePic:{
                type:String,
                required:[true,"Profile Picture is Required"]
            },
            cartId:{
                type:String,
                unique:true,
                required:[true,"cart ID is Required"]
            },
            likedProducts:{
                type:[String]
            }
    },
    contact:{
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
            billingAddress:{
                type:String,
                required:[true,"Address Required"]
            },
            shippingAddress:{
                type:String,
            }
    },
    ticket:{
        type:[String]
    },
    review:{
        type:[String]
    },
    comments:{
        type:[String]
    }
})
const user=mongose.model("user",userSchema);
module.exports=user;