// GOAL : register user
import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/dbConnection/dbconfig";
import UserModel from "@/lib/model/User";

// HTTP response status codes
// Informational responses (100 – 199)
// Successful responses (200 – 299)
// Redirection messages (300 – 399)
// Client error responses (400 – 499)
// Server error responses (500 – 599)

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, phone, password, role, gender, city, avatar } = reqBody;

        if (!username || !email || !phone || !password || !role || !gender || !city) {
            return NextResponse.json({ error: "Please fill in all required fields." }, { status: 422 });
        }

        // Check if user already exists
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return NextResponse.json({ error: "User already exists." }, { status: 422 });
        }

        // Create a new user
        const newUser = new UserModel({
            username,
            email,
            phone,
            password,
            role,
            gender,
            city,
            avatar
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully.",
            success: true,
            status: 201,
            savedUser
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
