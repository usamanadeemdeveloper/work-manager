import { connectDb } from "@/helper/db";
import jwt from "jsonwebtoken";
import { Task } from "@/model/task";
import { ITask } from "@/types/task";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
connectDb();
// Get all tasks
export async function GET(request: NextRequest) {
    try {
        const taskList: ITask[] = await Task.find();
        return NextResponse.json(taskList, {
            status: 200,
            statusText: "OK",
        });
    } catch (error) {
        return NextResponse.json(
            {
                message: "Failed to fetch tasks",
                error: error instanceof Error ? error.message : 'Unknown error',
                status: false,
            },
            {
                status: 500,
                statusText: "Internal Server Error",
            }
        );
    }
}

// Create a new task
export async function POST(request: NextRequest) {
    const body = await request.json();
    const { title, content } = body;
    const authToken = request.cookies.get('authToken')?.value;
    try {
        const data = jwt.verify(authToken!, process.env.JWT_TOKEN!) as JwtPayload;
        const userId = data._id;
        const task = new Task({
            title,
            content,
            userId
        } as ITask);

        const createdTask = await task.save();
        return NextResponse.json(createdTask, {
            status: 200,
            statusText: "OK",
        });
    } catch (error) {
        return NextResponse.json(
            {
                message: "Failed to create task",
                error: error instanceof Error ? error.message : 'Unknown error',
                status: false,
            },
            {
                status: 500,
                statusText: "Internal Server Error",
            }
        )
    }
}

