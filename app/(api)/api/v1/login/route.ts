import { NextRequest, NextResponse } from "next/server";
import connect from "@/db/dbConfig";
import User  from "@/models/user.model";
import { z } from "zod";
import bcryptjs from 'bcryptjs';
import { loginSchema } from "@/lib/schema/user";
import jwt from 'jsonwebtoken';
import { JWTtokenInfo } from "@/types/customTypes";

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
  let user;
  try {
    
    const email = userDetails.email.trim().toLowerCase();
    const password = userDetails.password;
    const rememberMe = userDetails.rememberMe;

    user = await User.findOne({email});
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

    const tokenDate:JWTtokenInfo = {
      id:user._id,
      email:user.email,
      role:user.role
    }
    if(!user.isVerified){
      const response = NextResponse.json({
        status:'unverified',
        message:'Please verify your email'
      })
      return response
    }
    const token = await jwt.sign(tokenDate, process.env.JWT_SECRET as string,{ expiresIn: rememberMe ? '7d' : '1d' });

    const response = NextResponse.json({
      status:'success',
      message:'Login successful',
      token,
    })
    response.cookies.set('token',token,{
      httpOnly:true,
      secure:true,
      expires: new Date(Date.now() + (rememberMe ? 604800000 : 86400000)),
      sameSite:'strict',});

    return response;

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {status:'error',message:'An error occured', user : {
        email: user.email,
        userName: user.username,
        tokens: user.token,
      }},
    )
  }
  
}