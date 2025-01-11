import connect from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { token } = await req.json();
  if (!token) {
    return NextResponse.json({
      status: "error",
      message: "Token is required",
    });
  }

  try {
    connect();
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid or expired token",
        },
        {
          status: 498,
        }
      );
    }
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Unable to verify email",
      error: (error as Error).message,
    });
  }
  try {
    await User.findOneAndUpdate(
      { verificationToken: token },
      {
        $set: {
          isVerified: true,
          verificationToken: '',
          verificationTokenExpires: Date.now(),
        },
      }
    );
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Unable to verify email",
      error: (error as Error).message,
    });
  }

  return NextResponse.json({
    status: "success",
    message: "Email verified successfully",
  });
};
