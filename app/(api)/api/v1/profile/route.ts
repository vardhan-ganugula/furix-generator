import { NextRequest, NextResponse } from "next/server";
import connect from "@/db/dbConfig";
import jwt from "jsonwebtoken";
import User from "@/models/user.model";
import { JWTtokenInfo } from "@/types/customTypes";
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
