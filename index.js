const express = require("express");
const app= express();
const cors = require("cors");
const { connectToDb } = require("./connectToDb/databaseConnection");
const { studentRouter } = require("./routes/user.route");
const { adminRouter } = require("./routes/admin.route");
require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use('/admin', adminRouter);
app.use('/student', studentRouter);

app.listen(PORT,async()=>{
    await connectToDb();
    console.log(`server is running at ${PORT}`);
})