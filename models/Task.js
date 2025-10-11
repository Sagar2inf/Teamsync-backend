import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {type: String, enum: ["todo", "in-progress", "done"], default: "todo"},
    assignee: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    dueDate: Date,
    projectId: {type: mongoose.Schema.Types.ObjectId, ref: "Project"}
}, {timestamps: true});

Task = mongoose.model("Task", taskSchema);
export default Task;