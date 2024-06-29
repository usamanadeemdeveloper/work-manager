import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@/model/user";

async function getUser(userId: string) {
    return await User.findById(userId).select("-password");
}

function handleUserNotFound(userId: string) {
    return NextResponse.json(
        {
            message: `User not found with ID: ${userId}`,
            status: false
        },
        {
            status: 404,
            statusText: "Not Found"
        }
    );
}

function handleSuccessResponse(user: any) {
    return NextResponse.json(
        {
            user,
            status: true
        },
        {
            status: 200,
            statusText: "OK"
        }
    );
}

function handleErrorResponse(error: any) {
    return NextResponse.json(
        {
            message: "Failed to fetch user",
            error: error instanceof Error ? error.message : "Unknown error",
            status: false
        },
        {
            status: 500,
            statusText: "Internal Server Error"
        }
    );
}

export async function GET(req: NextRequest) {
    const authToken = req.cookies.get('authToken')?.value;

    try {
        const data = jwt.verify(authToken!, process.env.JWT_TOKEN!) as JwtPayload;
        const userId = data._id;
        const user = await getUser(userId);
        if (!user) {
            return handleUserNotFound(userId);
        }
        return handleSuccessResponse(user);
    } catch (error) {
        return handleErrorResponse(error);
    }
}
