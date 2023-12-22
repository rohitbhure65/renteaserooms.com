import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/dbConnection/dbconfig";
import Property from "@/lib/model/PropertyModel"
// GOAL : GET FEATURED LISTING
connectDB()
export async function GET(request: NextRequest){
    try {
        const featured = await Property.find({featured:true}).populate('currentOwner','-password')
        // console.log(featured)
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