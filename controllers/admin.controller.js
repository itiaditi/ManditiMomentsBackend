const { MarksModel } = require("../models/marks.model");
const { StreamModel } = require("../models/stream.model");
const { StudentModel } = require("../models/student.model");
const { SubjectModel } = require("../models/subject.model");
const { UserModel } = require("../models/user.model");

//stream
const addStream = async (req, res) => {
    try {
        const { name } = req.body;
        const streams = await StreamModel.find();
        let id = 1;

        if (streams && streams.length > 0) {
            streams.sort((a, b) => a.streamId - b.streamId);
            id = streams[streams.length - 1].streamId + 1;
        }

        const stream = new StreamModel({ streamId: id, name });
        await stream.save();
        res.status(201).json({ message: 'Stream added successfully', stream });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const updateStream = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const stream = await StreamModel.findByIdAndUpdate(id, { name }, { new: true });
        if (!stream) {
            return res.status(404).json({ message: 'Stream not found' });
        }
        res.json({ message: 'Stream updated successfully', stream });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const deleteStream = async (req, res) => {
    try {
        const { id } = req.params;
        const stream = await StreamModel.findByIdAndDelete(id);
        if (!stream) {
            return res.status(404).json({ message: 'Stream not found' });
        }
        res.json({ message: 'Stream deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
const getStreams = async (req, res) => {
    try {
        const streams = await StreamModel.find();
        res.status(200).json(streams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


const getSubjects = async (req, res) => {
    try {
        const subjects = await SubjectModel.find();
        res.status(200).json(subjects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const addMark = async (req, res) => {
    try {
        const { name, streamId, subID, marks } = req.body;
        const marksData=await MarksModel.find();
        let id=1;
        if(marksData&&marksData.length>0){
          marksData.sort((a, b) => a.marksId - b.marksId)
             id=marksData[marksData.length-1].marksId;
             id=id+1;
        }
        const report = new MarksModel({ name, streamId, subID, marks,marksId:id });
        await report.save();
        res.status(201).json({ message: "Marks added successfully", report });
    } catch (error) {
        console.error("Error adding marks:", error);
        res.status(500).json({ message: "Internal server error"});
    }
};

const addSubject = async (req, res) => {
    try {
        const { name, streamId } = req.body;
        const subjects = await SubjectModel.find();
        let id = 1;
        if (subjects && subjects.length > 0) {
            subjects.sort((a, b) => a.subID - b.subID);
            id = subjects[subjects.length - 1].subID + 1;
        }
    
        const subject = new SubjectModel({ subID: id, name, streamId });
        await subject.save();
        res.status(201).json({ message: 'Subject added successfully', subject });
    } catch (error) {
        console.error('Error adding subject:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const updateSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const { names } = req.body;
        const subject = await SubjectModel.findByIdAndUpdate(id, { name: names }, { new: true });
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        res.json({ message: 'Subject updated successfully', subject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const deleteSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const subject = await SubjectModel.findByIdAndDelete(id);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        res.json({ message: 'Subject deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


//marks
const getMark = async (req, res) => {
    try {
        const students = await MarksModel.find();
        res.status(200).json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


const updateMark = async (req, res) => {
    try {
        const { id } = req.params;
        const { marks } = req.body;
        const mark = await MarksModel.findByIdAndUpdate(id, { marks }, { new: true });
        if (!mark) {
            return res.status(404).json({ message: 'Mark not found' });
        }
        res.status(200).json({ message: 'Mark updated successfully', mark });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
const deleteMark = async (req, res) => {
    try {
        const { id } = req.params;
        const mark = await MarksModel.findByIdAndDelete(id);
        if (!mark) {
            return res.status(404).json({ message: 'Mark not found' });
        }
        res.json({ message: 'Mark deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
//studentList
const getStudentList = async (req, res) => {
    try {
        const students = await UserModel.find({ role: 'student' });
        res.status(200).json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports={
    getStreams,
    addStream,
    updateStream,
    deleteStream,
    getSubjects,
    addSubject,
    updateSubject,
    deleteSubject,
    getMark,
    addMark,
    updateMark,
    deleteMark,
    getStudentList
}