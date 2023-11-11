import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/dbConnection/dbconfig";
import Property from "@/lib/model/PropertyModel"

connectDB()
export async function GET(request: NextRequest){
    try {
        const getalllisting = await Property.find({})
        // console.log(getalllisting)
        return NextResponse.json({ 
            message: "Successfully get all listings",
            success: true,
            getalllisting
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}           