import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/dbConnection/dbconfig";
import Property from "@/lib/model/PropertyModel"
// GOAL : CREATE A LISTING
connectDB()
export async function POST(request: NextRequest){
    try {
        //fixme 
        const reqBody =  await request.json();
        const {currentOwner,title,type,description,price,sqmeters,beds,featured} = reqBody;
    
        // if(!title || !type || !description || !price || !sqmeters || !beds || !featured){
        // return NextResponse.json({error: "please filled the field properly"},{status: 422})
        // }    
        console.log(reqBody);
        const listing = new Property({currentOwner,title,type,description,price,sqmeters,beds,featured})
            
        const savedlisting = await listing.save()
        // console.log(savedUser)   

        return NextResponse.json({ 
            message: "Listing Created Successfully",
            success: true,
            // savedlisting
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 201})
    }
}