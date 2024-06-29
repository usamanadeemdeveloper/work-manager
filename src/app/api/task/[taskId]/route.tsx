import { connectDb } from "@/helper/db";
import { Task } from "@/model/task";
import { ITask } from "@/types/task";
import { NextResponse } from "next/server";
connectDb();
// Get By Id
export async function GET(request: Request, { params }: { params: { taskId: string } }) {
    try {
        const { taskId } = params;
        const task = await Task.findById(taskId);

        if (!task) {
            return NextResponse.json(
                {
                    message: `task not found with ID: ${taskId}`,
                    status: false
                },
                {
                    status: 404,
                    statusText: "Not Found"
                }
            );
        }

        return NextResponse.json(
            {
                task,
                status: true
            },
            {
                status: 200,
                statusText: "OK"
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Failed to fetch task",
                error: error instanceof Error ? error.message : "Unknown error",
                status: false
            },
            {
                status: 500,
                statusText: "Internal Server Error"
            }
        );
    }
}

// Update Task
export async function PUT(request: Request, { params }: { params: { taskId: string } }) {

    try {
        const { taskId } = params;
        const existingTask = await Task.findById(taskId);

        // Check if task exists
        if (!existingTask) {
            return NextResponse.json(
                {
                    message: `Task not found with ID: ${taskId}`,
                    status: false
                },
                {
                    status: 404,
                    statusText: "Not Found"
                }
            );
        }
        const body = await request.json();
        // Update task fields from request JSON
        const { title, content, status } = body;

        // Update only if fields are present in the request
        if (title) existingTask.title = title;
        if (content) existingTask.content = content;
        if (status) existingTask.status = status;

        // Save updated task
        const updatedTask = await existingTask.save();

        return NextResponse.json(
            {
                message: "Task updated successfully",
                task: updatedTask,
                status: true
            },
            {
                status: 200,
                statusText: "OK"
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Failed to update task",
                error: error instanceof Error ? error.message : "Unknown error",
                status: false
            },
            {
                status: 500,
                statusText: "Internal Server Error"
            }
        );
    }
}
export async function PATCH(request: Request, { params }: { params: { taskId: string } }) {
    try {
        const { taskId } = params;
        const existingTask = await Task.findById(taskId);

        if (!existingTask) {
            return NextResponse.json(
                {
                    message: `Task not found with ID: ${taskId}`,
                    status: false
                },
                {
                    status: 404
                }
            );
        }

        const { status } = await request.json();
        if (status) existingTask.status = status;

        const updatedTask = await existingTask.save();

        return NextResponse.json(
            {
                message: "Task updated successfully",
                task: updatedTask,
                status: true
            },
            {
                status: 200
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Failed to update task",
                error: error instanceof Error ? error.message : "Unknown error",
                status: false
            },
            {
                status: 500
            }
        );
    }
}


// Delete Task
export async function DELETE(request: Request, { params }: { params: { taskId: string } }) {

    try {
        const { taskId } = params;
        const result = await Task.deleteOne({ _id: taskId });
        if (result.deletedCount === 0) {
            return NextResponse.json(
                {
                    message: "Task not found on id => " + taskId,
                    status: false
                },
                {
                    status: 404,
                    statusText: "Not Found"
                }
            );
        }
        return NextResponse.json(
            {
                message: "Task deleted successfully",
                status: true
            },
            {
                status: 200,
                statusText: "OK"
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Failed to delete task",
                error: error instanceof Error ? error.message : "Unknown error",
                status: false
            },
            {
                status: 500,
                statusText: "Internal Server Error"
            }
        );
    }
}