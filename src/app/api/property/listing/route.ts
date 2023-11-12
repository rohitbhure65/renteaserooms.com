import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/dbConnection/dbconfig";
import Property from "@/lib/model/PropertyModel"
// GOAL : GET INDIVIDUAL PROPERTY
// FIXME
connectDB()
export async function GET(request: NextRequest){
    try {
        const propertyId =  await request.json();
        const property = await Property.findById({propertyId}).populate('currentOwner', '-password')
        // console.log(property)

        if (!property) {
            throw new Error("No Such property with this id")
        } else {
            return NextResponse.json({ 
                message: "property Found",
                data: property
            })
        }

    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}           