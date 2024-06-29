import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { userId: number; postId: number; } }) {
    const { userId, postId } = params;
    return NextResponse.json(params);
}