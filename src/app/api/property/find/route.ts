import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/dbConnection/dbconfig";
import Property from "@/lib/model/PropertyModel"

// GOAL : GET ALL FROM A SPECIFIC TYPE   
connectDB()
export async function GET(request: NextRequest){
    try {   
        const type =  await request.json();
        // type: {'house'}      
        if(type){
            const find = await Property.find(type).populate('currentOwner','-password')
            // console.log(find)
            return NextResponse.json({  
                message: "Successfully find such type",      
                success: true,
                find
        })} else{   
            return NextResponse.json({              
                message: "No such Type",      
                success: false,
                
        })};
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},    
            {status: 500})
    }
}           