const mongoose = require("mongoose");

const marks = mongoose.Schema({
	marksId:{type:Number,unique:true},
    name : { type: String, ref: 'students'},
    streamId : { type:Number , ref: 'streams'},
    subID : { type:Number, ref: 'subjects'},
	marks : {type:Number}
},{
    versionKey:false
})

const MarksModel = mongoose.model('marks',marks);

module.exports={
    MarksModel
}