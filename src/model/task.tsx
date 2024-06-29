import mongoose, { Model, Schema } from "mongoose";
import { TaskStatus } from "@/enums/status";
import { ITask } from "@/types/task";

const TaskSchema: Schema<ITask> = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    addedDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        enum: Object.values(TaskStatus),
        default: TaskStatus.Pending
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

export const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);
