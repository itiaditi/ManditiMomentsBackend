const bcrypt = require("bcrypt");


require("dotenv").config();
const jwt = require('jsonwebtoken');
const { blacklistModel } = require("../models/blacklist.model");
const { StudentModel, UserModel } = require("../models/user.model");
const { MarksModel } = require("../models/marks.model");

const registerStudent = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        // Check if Student already exists
        const existingStudent = await UserModel.findOne({ email });
        if (existingStudent) {
            return res.status(409).json({ message: "Student with this email already exists" });
        }
        const Students=await StudentModel.find();
        let id=1;
        if(Students&&Students.length>0){
          Students.sort((a, b) => a.StudentId - b.StudentId)
             id=Students[Students.length-1].StudentId;
             id=id+1;
        }
    const StudentId=id;
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new Student
        const newStudent = new StudentModel({ StudentId,email, password: hashedPassword, name });
        await newStudent.save();

        // Send success response
        return res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
        // Handle errors
        console.error("Error registering Student:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await StudentModel.findOne({ email });


        if (!user) {
            return res.status(401).send("user is not found try to login");
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw new Error(err.message);
            if (result) {

                const access_token = jwt.sign(
                    { userId: user.userId, email, role: user.role },
                    "masai",
                    { expiresIn: "1h" }
                );
                const refresh_token = jwt.sign(
                    { userId: user.userId, email, role: user.role },
                    "masai",
                    { expiresIn: "1h" }
                );
                return res.json({ message: 'user login successfully', accessToken: access_token, refreshToken: refresh_token })
            } else {
                return res.status(401).json({ message: "user credential is wrong" })
            }
        })

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
const logoutStudent = async (req, res) => {
    const header = req.headers['authorization'];
    const token = header.split(" ")[1];
    try {
        if (!token) {
            return res.status(401).send("token is not provided");
        }
        const StudentToken = new blacklistModel({ token });
        await StudentToken.save();
        res.status(200).send('Student logout successfully');
    } catch (err) {
        return res.status(400).json({ message: err.message });

    }
}

const getStudentById = async (req, res) => {
    const studentId = req.params.id;
    try {
        const student = await StudentModel.findById(studentId).populate("stream").populate("subject");
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const getStudentPerformance = async (req, res) => {
    const studentId = req.params.id;
    try {
        const student = await StudentModel.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const marks = await MarksModel.find({ student: studentId }).populate("subject");
        
        let totalMarks = 0;
        marks.forEach(mark => {
            totalMarks += mark.marks;
        });

        const resultCard = {
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
            },
            marks,
            totalMarks
        };

        res.json(resultCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    registerStudent,
    loginStudent,
    logoutStudent,
    getStudentById,
    getStudentPerformance

}