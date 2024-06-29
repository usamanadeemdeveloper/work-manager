import { NextRequest, NextResponse } from "next/server";
import { findUserByEmail, validatePassword, generateToken } from "../../../helper/authHelper";
import { connectDb } from "@/helper/db";
connectDb();
export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            return NextResponse.json(
                {
                    message: 'User not found',
                    status: false,
                },
                {
                    status: 404,
                    statusText: "Not Found",
                }
            );
        }

        const isMatched = await validatePassword(password, user.password);
        if (!isMatched) {
            return NextResponse.json(
                {
                    message: 'Invalid password',
                    status: false,
                },
                {
                    status: 401,
                    statusText: "Unauthorized",
                }
            );
        }

        const token = generateToken(user);

        const response = NextResponse.json(
            {
                user,
                token,
                message: 'Log in successfully',
                status: true,
            },
            {
                status: 200,
                statusText: "OK",
            }
        );

        response.cookies.set("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60, // 1 day in seconds
        });

        return response;
    } catch (error) {
        return NextResponse.json(
            {
                message: error instanceof Error ? error.message : 'Unknown error',
                status: false,
            },
            {
                status: 500,
                statusText: "Internal Server Error",
            }
        );
    }
}
