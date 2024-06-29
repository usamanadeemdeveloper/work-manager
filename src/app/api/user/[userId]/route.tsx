import { User } from "@/model/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params;

    try {
        const user = await User.findById(userId);

        if (!user) {
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
    } catch (error) {
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
}

export async function DELETE(request: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params;
    try {
        const result = await User.deleteOne({ _id: userId });
        if (result.deletedCount === 0) {
            return NextResponse.json(
                {
                    message: "User not found on id => " + userId,
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
                message: "User deleted successfully",
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
                message: "Failed to delete user",
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

export async function PUT(request: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params;

    try {
        // Check if user exists
        const existingUser = await User.findById(userId);

        if (!existingUser) {
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
        const body = await request.json();
        // Update user fields from request JSON
        const { name, email, password, about, profilePicUrl } = body;

        // Update only if fields are present in the request
        if (name) existingUser.name = name;
        if (email) existingUser.email = email;
        if (password) existingUser.password = password;
        if (about) existingUser.about = about;
        if (profilePicUrl) existingUser.profilePicUrl = profilePicUrl;

        // Save updated user
        const updatedUser = await existingUser.save();

        return NextResponse.json(
            {
                message: "User updated successfully",
                user: updatedUser,
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
                message: "Failed to update user",
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