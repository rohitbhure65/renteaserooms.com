// GOAL : GET INDIVIDUAL PROPERTY
import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/dbConnection/dbconfig";
import Property from "@/lib/model/PropertyModel"

connectDB()
export async function GET(request: NextRequest){
    try {
        const id = request.url.split("listing/")[1];
        // const id = request.url
        // console.log(id)
        const property = await Property.findById(id).populate('currentOwner', '-password')
        // console.log(property)    

        if (!property) {        
            throw new Error("No Such property with this id")
        } else {
            return NextResponse.json({      
                message: "property Found",
                status: 200,    
                data: property
            })  
        }   

    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}           