const mongoose = require("mongoose");

const subjectsSchema = mongoose.Schema({
    subID: { type: Number, unique: true },
    name: { type: String, unique: true },
    streamId: { type: Number, ref: 'streams' }
}, { versionKey: false });

const SubjectModel = mongoose.model('subjects', subjectsSchema);

module.exports = { SubjectModel };