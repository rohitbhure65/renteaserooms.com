import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse,NextRequest } from "next/server";
import User from "@/lib/model/UserModel";
import connectDB from "@/lib/dbConnection/dbconfig";

connectDB();

export async function GET(request: NextRequest) {
    try {
       const userId = await getDataFromToken(request);
       const user = await User.findOne({_id: userId}).select("-password")
       
       return NextResponse.json({
        message: "User Found",
        data: user
       })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}