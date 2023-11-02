import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/dbConnection/dbconfig";
import User from "@/lib/model/UserModel"
import { sendEmail } from "@/helpers/mailer";
import bcrypt from "bcrypt";

connectDB()

export async function POST(request: NextRequest){
    try {
       const reqBody =  await request.json();
       const {name, email, phone, password, role, city, profileImg} = reqBody;

        // console.log(reqBody);

        // check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"},{status: 400})
        }
        
        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            phone,
            role,
            city,
            profileImg,
            password: hashedPassword

        })

        const savedUser = await newUser.save()
        // console.log(savedUser)

        //send verification email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({ 
            message: "User Created Successfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 201})
    }
}