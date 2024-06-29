// pages/api/user/[userId]/task
import { connectDb } from "@/helper/db";
import { Task } from "@/model/task";
import { NextRequest, NextResponse } from "next/server";
connectDb();
export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const { userId } = params;
        console.log(userId);
        const result = await Task.find({ userId });
        if (result.length > 0) {
            return NextResponse.json(result);
        } else {
            return NextResponse.json({ message: "No tasks found", status: false }, { status: 404 });
        }
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({
            message: "Failed to fetch tasks",
            error: error instanceof Error ? error.message : "Unknown error",
            status: false
        }, { status: 500 });
    }
}
