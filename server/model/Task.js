import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        trim: true
    },
    tasks: [
        {
            description: {
                type: String,
                required: true,
                trim: true
            },
            title: {
                type: String,
                trim: true
            },
            dueDate: {
                type: Date,
                required: true
            },
            tag: {
                type: String,
                enum: ["Work", "Personal", "Urgent"]
            },
            status: {
                type: String,
                enum: ["Todo", "Inprogress", "Completed"],
                default: "Todo"
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model("Task", TaskSchema);
export default Task;
