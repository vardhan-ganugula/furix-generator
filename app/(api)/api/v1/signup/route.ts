import { NextRequest, NextResponse } from "next/server";
import connect from "@/db/dbConfig";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import { signupSchema } from "@/lib/schema/user";
import { z } from "zod";

connect();

export async function POST(request: NextRequest) {
  const userDetails: z.infer<typeof signupSchema> = await request.json();
  const parsedValue = signupSchema.safeParse(userDetails);
  if (parsedValue.success === false) {
    return NextResponse.json({
      status: "error",
      message: parsedValue.error.errors[0].message,
    });
  }
  try {
    
    const username = userDetails.username.trim().toLowerCase();
    const email = userDetails.email.trim().toLowerCase();
    const password = userDetails.password;
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if(user){
      return NextResponse.json({
        status: "error",
        message: "Email or Username already exists",
      });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    })
    return NextResponse.json({
      status: "success",
      message: "User created successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
        isVerified: newUser.isVerified,
        id : newUser._id
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: "error",
      message: "something went wrong"
    });
  }
}
