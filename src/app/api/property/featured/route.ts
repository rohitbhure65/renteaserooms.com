import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/dbConnection/dbconfig";
import Property from "@/lib/model/PropertyModel"
import User from "@/lib/model/UserModel";

connectDB()
export async function GET(request: NextRequest){
    try {
        const featured = await Property.find({featured:true}).populate('currentOwner','-password')
        // console.log(getalllisting)
        return NextResponse.json({ 
            message: "Successfully get all featured listings",      
            success: true,
            featured
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message},    
            {status: 500})
    }
}           