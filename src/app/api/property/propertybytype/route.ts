// GOAL : GET ALL FROM A SPECIFIC TYPE 
import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/dbConnection/dbconfig";
import Property from "@/lib/model/PropertyModel"

connectDB()
export async function GET(request: NextRequest){
    try {   
        const query = request.url
        const newurl = new URL(query);
        const type = newurl.search.split('?type=')[1]
        // console.log(type)
        // type: {'house'}              
        if(type){       
            const findByType = await Property.find({type}).populate('currentOwner','-password')
            // console.log(findByType)  
            return NextResponse.json({  
                message: "Successfully find such type",      
                success: true,
                status: 200,
                findByType    
        })} else{   
            return NextResponse.json({              
                message: "No such Type",      
                status: 402,
                success: false,
        })};    
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},    
            {status: 500})
    }
}           