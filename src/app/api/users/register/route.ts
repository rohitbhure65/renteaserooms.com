import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/dbConnection/dbconfig";
import User from "@/lib/model/UserModel"
import { sendEmail } from "@/helpers/mailer";


connectDB()
export async function POST(request: NextRequest){
    try {
        const reqBody =  await request.json();
        const {name, email, phone, password, role, city, profileImg} = reqBody;
    
        if(!name || !email|| !phone|| !password|| !role|| !city){
        return NextResponse.json({error: "please filled the field properly"},{status: 422})
        }   
        // console.log(reqBody);

        // check if user already exists
        const userExists = await User.findOne({email})
        if(userExists){
            //fixme message not showing on screen
            return NextResponse.json({error: "User already exists"},{status: 422})
        } else {
                const newUser = new User({name,email,phone,role,city,profileImg,password})
            
                const savedUser = await newUser.save()
                // console.log(savedUser)   

                // send verification email
                await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

                return NextResponse.json({ 
                    message: "User Created Successfully",
                    success: true,
                    savedUser
                })
        }
        
       

    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 201})
    }
}