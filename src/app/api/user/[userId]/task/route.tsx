import { Task } from "@/model/task";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { userId: string } }) {
    try {
        const { userId } = params;
        const result = await Task.find({ userId: userId });
        if (result.length !== 0) {
            return NextResponse.json(
                {
                    task: result,
                    status: true
                },
                {
                    status: 200,
                    statusText: "OK"
                }
            );
        } else {
            return NextResponse.json(
                {
                    message: "No tasks found",
                    status: false
                },
                {
                    status: 404,
                    statusText: "Not Found"
                }
            );
        }

    } catch (error) {
        return NextResponse.json(
            {
                message: "Failed to fetch tasks",
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
