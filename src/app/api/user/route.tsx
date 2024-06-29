import { connectDb } from "@/helper/db";
import { User } from "@/model/user";
import { IUser } from "@/types/user";
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs";
connectDb();
// Handle GET requests
export async function GET(request: NextRequest) {
    try {
        const users: IUser[] = await User.find({});
        return NextResponse.json(users, {
            status: 200,
            statusText: "OK",
        });
    } catch (error) {
        return NextResponse.json(
            {
                message: "Failed to retrieve users",
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

// Handle POST requests
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, password, about, profilePicUrl } = body;
        const user = new User({
            name,
            email,
            password,
            about,
            profilePicUrl,
        } as IUser);
        user.password = bcrypt.hashSync(user.password, 10);
        const createdUser = await user.save();
        return NextResponse.json(createdUser, {
            status: 200,
            statusText: "OK",
        });
    } catch (error: any) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
            // MongoDB duplicate key error (E11000) for email
            return NextResponse.json(
                {
                    message: "Email address is already registered.",
                    error: error.message,
                    status: false,
                },
                {
                    status: 409, // Conflict
                    statusText: "Conflict",
                }
            );
        } else {
            // Other errors (e.g., validation errors or unexpected errors)
            return NextResponse.json(
                {
                    message: "Failed to create user",
                    error: error instanceof Error ? error.message : 'Unknown error',
                    status: false,
                },
                {
                    status: 500, // Internal Server Error
                    statusText: "Internal Server Error",
                }
            );
        }
    }
}

// Handle PUT requests
export async function PUT() {
    // Your PUT request handling code here
}

// Handle DELETE requests
export async function DELETE(request: Request) {
}
