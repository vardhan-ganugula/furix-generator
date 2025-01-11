import { NextRequest, NextResponse } from "next/server";
import connect from "@/db/dbConfig";
import jwt from "jsonwebtoken";
import User from "@/models/user.model";
import { JWTtokenInfo } from "@/types/customTypes";
import { userInfoSchema } from "@/lib/schema/user";

connect();


export async function GET(request: NextRequest) {
  const userToken = request.cookies.get("token")?.value || "";
  if (!userToken) {
    return NextResponse.json(
      { message: "Unauthorized", status: "error" },
      { status: 401 }
    );
  }
  const tokenInfo = jwt.verify(userToken, process.env.JWT_SECRET as string) as JWTtokenInfo;
  const userInfo = await User.findOne({
    _id: tokenInfo["id"],
  }).select("-password");
  return NextResponse.json({ message: "user fetched successfully", status: "success", data: userInfo });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const userToken = request.cookies.get("token")?.value || "";
  if (!userToken) {
    return NextResponse.json(
      { message: "Unauthorized", status: "error" },
      { status: 401 }
    );
  }
  const parsedData = userInfoSchema.safeParse(data);
  if (!parsedData.success) {
    return NextResponse.json(
      { message: "Invalid data", status: "error", data: parsedData.error },
      { status: 400 }
    );
  }
  let tokenInfo:JWTtokenInfo;
  try{
    tokenInfo = jwt.verify(userToken, process.env.JWT_SECRET as string) as JWTtokenInfo;
  }
  catch(err){
    return NextResponse.json(
      { message: "Invalid Token", status: "error", error: err },
      { status: 401 }
    );
  }
  let response;
  try{
    response = await User.findOneAndUpdate({ _id: tokenInfo.id},parsedData.data);
  }
  catch(err){
    console.log(err);
    return NextResponse.json(
      { message: "Unable to update the profile", status: "error" },
      { status: 500 }
    );
  }
  finally{
    return NextResponse.json({ message: "Profile updated successfully", status: "success" , response});
  }
  
}