import { NextRequest, NextResponse } from "next/server";
import connect from "@/db/dbConfig";
import User  from "@/models/user.model";
import { z } from "zod";
import bcryptjs from 'bcryptjs';
import { loginSchema } from "@/lib/schema/user";
import jwt from 'jsonwebtoken';

connect();
export async function POST(request:NextRequest) {
  const userDetails : z.infer<typeof loginSchema> = await request.json();
  const parsedValse = loginSchema.safeParse(userDetails);
  if(parsedValse.success === false){
    return NextResponse.json({
      status:'error',
      message:parsedValse.error.errors[0].message
    })
  }
  try {
    
    const email = userDetails.email.trim().toLowerCase();
    const password = userDetails.password;
    const rememberMe = userDetails.rememberMe;

    const user = await User.findOne({email});
    if(!user){
      return NextResponse.json({
        status:'error',
        message:'User not found'
      })
    }

    const validPassword = await bcryptjs.compare(password,user.password);
    if(!validPassword){
      return NextResponse.json({
        status:'error',
        message:'Invalid password'
      })
    }

    const tokenDate = {
      id:user._id,
      email:user.email,
      role:user.role
    }
    console.log(rememberMe)
    const token = await jwt.sign(tokenDate, process.env.JWT_SECRET as string,{ expiresIn: rememberMe ? '7d' : '1d' });

    const response = NextResponse.json({
      status:'success',
      message:'Login successful',
      token
    })
    response.cookies.set('token',token,{
      httpOnly:true,
      secure:true,
      sameSite:'strict',});

    return response;

  } catch (error:any) {
    return NextResponse.json(
      {status:'error',message:'An error occured ' + error.message},
    )
  }
  
}