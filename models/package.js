const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const packageSchema=new Schema({
    packageId:{
        type: String,
        required:true,
    },
    location:{
        type: String,
        required:false,
    },
    numberOfPieces:{
        type: Number,
        required:false,
    },
    features:{
        type: String,
        required:false,
    }
},{timestamps:true});

const Package = mongoose.model('Package',packageSchema);
module.exports=Package;