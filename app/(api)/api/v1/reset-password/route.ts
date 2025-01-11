import connect from "@/db/dbConfig";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { token, password } = await request.json();
  if (!token || !password) {
    return NextResponse.json(
      {
        status: "error",
        message: "Token and password are required",
      },
      { status: 400 }
    );
  }

  connect();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.findOneAndUpdate(
      {
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      },
      {
        resetPasswordToken: '',
        resetPasswordExpires: Date.now(),
        password: hashedPassword,
      }
    );
    if (!user) {
      return NextResponse.json(
        {
          status: "error",
          message: "Token is invalid",
        },
        { status: 400 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        status: "error",
        message: "Invalid token or Expired token",
        error: (err as Error).message,
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    status: "success",
    message: "Password updated successfully",
  });
};
