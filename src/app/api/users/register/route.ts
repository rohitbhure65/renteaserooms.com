// GOAL : register user
import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/dbConnection/dbconfig";
import User from "@/lib/model/UserModel"
import { sendEmail } from "@/helpers/mailer";

// HTTP response status codes
// Informational responses (100 – 199)
// Successful responses (200 – 299)
// Redirection messages (300 – 399)
// Client error responses (400 – 499)
// Server error responses (500 – 599)

connectDB()
export async function POST(request: NextRequest){
    try {
        const reqBody =  await request.json();
        const {name, email, phone, password, role, gender, city, profileImg} = reqBody;
    
        if(!name || !email|| !phone|| !password|| !role|| !gender || !city){
        return NextResponse.json({error: "please filled the field properly"},{status: 422})
        }   
        // console.log(reqBody);

        // check if user already exists
        const userExists = await User.findOne({email})
        if(userExists){
            return NextResponse.json({error: "User already exists"},{status: 422})
        } else {
                const newUser = new User({name,email,phone,role,gender,city,profileImg,password})
            
                const savedUser = await newUser.save()
                // console.log(savedUser)   

                // send verification email
                await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

                return NextResponse.json({ 
                    message: "User Created Successfully",
                    success: true,
                    status: 201,
                    savedUser
                })
        }
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}