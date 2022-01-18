const mongose=require("mongoose");
const Schema=mongose.Schema;

const commentSchema=new Schema({
    name:{type:String,required:[true,"name is required"]},
    profilePicture:{type:String,required:[true,"profilePic is Required"]},
    from:{type:String,required:[true,"from is required"]},
    to:{type:String,required:[true,"to is required"]},
    createdAt:{type:Date,default:Date.now()},


})


const replaceModel=mongose.model("comment",commentSchema);
module.exports=replaceModel;