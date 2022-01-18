const Schema=mongoose.Scehma;

const accessLogSchema=new Schema({
    accessType:{
        type:String,
        required:trur[true,'accessType is required'],
    },
    visitTime:{
       type:Date,
       required:[true,'accessTime is required'],
       default:Date.now()
    },
    visitorId:{
        type:String,
        required:[true,'visitorId is required']
    },
    visitorName:{
        type:String
    }
})

module.exports=mongoose.model("accessLogs",accessLogSchema);