import express from "express";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import mongoose from "mongoose";
import { indexRoute } from "./api/v1/routes/index.js";
import { Error404 } from "./utils/middlewares/404.js";
import { createConneciton } from "./utils/db/connection.js";
import "./models/notes-model.js";

const app=express();

dotenv.config();
app.use(cors());
app.use("/files",express.static("files"));

//Upload Part
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix+file.originalname);
  }
})


const notes = mongoose.model("notes");


const upload = multer({ storage: storage });
app.post("/upload",upload.single("file") ,async(req,res)=>{
    console.log(req.file);
    const title=req.body.title;
    const fileName=req.file.filename;
    try{
        await notes.create({title:title,pdf:fileName});
        res.json({status:"Ok"});
    }
    catch(error){
        res.json({status:error});
    }
});
app.get("/get-files", async(req,res)=>{
    try {
        notes.find({approved: true}).then((data)=>{
            res.send({status:"OK",data:data});
        });
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).send({ status: "Error", message: "Could not fetch files" });
    }
})
app.get("/", async (req,res)=>{
    res.send("Success");
});

//Upload Part End + Add get-files

app.use(express.json());
app.use('/api/v1',indexRoute);

app.use(Error404)

const promise=createConneciton();
promise.then(()=>{
    const serevr = app.listen(process.env.PORT || 8888,(err)=>{
        if(err){
            console.log(chalk.redBright.bold('Server Crashed',err));
        }
        else{
            console.log(chalk.greenBright.bold('Server Up & Running', serevr.address().port));
        }
    })
}).catch(err=>{
    console.log(chalk.redBright.bold('DB Crashed'));    
})

