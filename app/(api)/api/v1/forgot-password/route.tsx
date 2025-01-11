import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";
import User from "@/models/user.model";
import sendEmail from "@/lib/mails/mailing";

export const POST = async (req: NextRequest) => {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json(
      { status: "error", message: "Email is required" },
      { status: 400 }
    );
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "User not found" },
        { status: 404 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        status: "error",
        message: "Something went wrong",
        error: (err as Error).message,
      },
      { status: 500 }
    );
  }

  const token = crypto.randomBytes(15).toString("hex");
  try {
    await User.updateOne(
      { email },
      {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 15 * 60 * 1000, // 5 minutes
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        status: "error",
        message: "Something went wrong",
        error: (err as Error).message,
      },
      { status: 500 }
    );
  }
  await sendEmail(email,token, "reset");
  return NextResponse.json({
    status: "success",
    message: "Reset Password Link is sent to mail",
  });
};
