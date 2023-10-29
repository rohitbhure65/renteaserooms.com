import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { CONNECTION_KEY, connectionOptions } from "@/app/lib/db"
import { User } from "@/app/lib/model/User"

// GET request
export async function GET() {

    let data = []
    let success = true;
    try {
        await mongoose.connect(CONNECTION_KEY, connectionOptions);
        console.log('MongoDB connected');
        data = await user.find();
    } catch (error) {
        // console.error('MongoDB connection error:', error);
        data = { result: "error" }
        success = false
    }

    return NextResponse.json({ result: data, success })
}
// POST resquest
export async function POST(request) {
    const payload = await request.json();
    await mongoose.connect(CONNECTION_KEY, connectionOptions);
    let newUser = new User(payload);
    const result = await newUser.save();
    return NextResponse.json({ result, success: true });
}