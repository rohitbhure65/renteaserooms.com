import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { CONNECTION_KEY, connectionOptions } from "@/app/lib/db"
import { Property } from "@/app/lib/model/Property"

// GET request
export async function GET() {

    let data = []
    let success = true;
    try {
        await mongoose.connect(CONNECTION_KEY, connectionOptions);
        console.log('MongoDB connected');
        data = await Property.find();
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
    let newProperty = new Property(payload);
    const result = await newProperty.save();
    return NextResponse.json({ result, success: true });
}