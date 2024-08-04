// GOAL : LOGIN USER
import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/dbConnection/dbconfig";
import User from "@/lib/model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request:NextRequest) {
    try {
       const reqBody = await request.json()
       const {email, password} = reqBody
       if(!email || !password){
        return NextResponse.json({error: "please filled the field properly"},{status: 422})
        }   
       // check if user exists
       const user = await User.findOne({email})
       if (!user) {
        return NextResponse.json({error: "user does not exist"}, {status: 400})
       }

       //check if password is correct
       const validpassword = await bcrypt.compare(password, user.password)
       if(!validpassword){
        return NextResponse.json({error: "Invalid password"}, {status: 400})
       }

       // create token data
       const tokenData = {
        id: user._id,
        username: user.name,
        email: user.email
       }
       // create token
       const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

       const response = NextResponse.json({
        message: "Login successful",
        success: true,
        status: 200
       })

       response.cookies.set("token", token, {
        httpOnly: true
       })
        
        return response;
       
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}