import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/dbConnection/dbconfig";
import Property from "@/lib/model/PropertyModel"

// GOAL : GET COUNT OF TYPES
connectDB()
export async function GET(request: NextRequest){
    try {   
        const type = request.url
        // console.log(type)     
        if(type){
            const HouseType = await Property.countDocuments({type: 'House'})
            const ApartmentType = await Property.countDocuments({type: 'Apartment'})
            const VillaType = await Property.countDocuments({type: 'Villa'})
            const MansionType = await Property.countDocuments({type: 'Mansion'})

            return NextResponse.json({  
                message: "Successfully find such type",      
                success: true,  
                status: 200,
                House: HouseType,
                Apartment: ApartmentType,
                Villa: VillaType,
                Mansion: MansionType,   
        })
        } else{   
            return NextResponse.json({              
                message: "No such Type",      
                success: false,
                
        })
        };
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},    
            {status: 500})
    }
}           