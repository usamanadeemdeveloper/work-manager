import { Document } from "mongoose";
import { TaskStatus } from "@/enums/status";

export interface ITask extends Document {
    title: string;
    content: string;
    addedDate: Date;
    status: TaskStatus;
    userId: ObjectId;
}
