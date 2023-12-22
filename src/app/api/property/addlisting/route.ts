import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/dbConnection/dbconfig";
import Property from "@/lib/model/PropertyModel"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/lib/model/UserModel";
// GOAL : CREATE A LISTING  
connectDB()
export async function POST(request: NextRequest){
    try {
        const reqBody =  await request.json();  
        const {title,type,description,price,sqmeters,beds,featured} = reqBody;

        const currentOwnerId = await getDataFromToken(request);
        const currentOwner = await User.findOne({_id: currentOwnerId}).select("-password")
        
        // if(!title || !type || !description || !price || !sqmeters || !beds || !featured){
        // return NextResponse.json({error: "please filled the field properly"},{status: 422})
        // }    

        console.log(reqBody);
        const listing = new Property({currentOwner,title,type,description,price,sqmeters,beds,featured})
            
        const savedlisting = await listing.save()
        console.log(savedlisting)   
        
        return NextResponse.json({ 
            message: "Listing Created Successfully",
            success: true,
            status: 201,
            savedlisting
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}