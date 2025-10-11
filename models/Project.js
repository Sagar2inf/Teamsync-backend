import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    teamId: {type: mongoose.Schema.Types.ObjectId, ref: "Team"},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    tasks: {type: mongoose.Schema.Types.ObjectId, ref: "Task"}
}, {timestamps: true});

const Project = mongoose.model("Project", projectSchema);
export default Project;