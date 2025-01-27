import connect from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import sendEmail from "@/lib/mails/mailing";

const validateEmail = (email: string): boolean => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(email.toLocaleLowerCase().trim());
};
export const POST = async (req: NextRequest) => {
  // get email from request body
  const body = await req.json();
  if (!body || !body.email || !validateEmail(body.email)) {
    return NextResponse.json({
      status: 'error',
      message: "Email is required" ,
    });
  }
  const email = body.email.toLocaleLowerCase().trim();
  // check if email is valid or user exists
  connect();
  try {
    const userRecord = await User.findOne({
      email,
    });
    if (!userRecord) {
      return NextResponse.json({
        status: "error",
        message: "User not found, please create an account",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Invalid Email",
      error: (error as Error).message,
    });
  }

  try {
      const existingToken = await User.findOne({
        email,
        verificationTokenExpires: { $gt: Date.now() },
      });
      if (existingToken) {
        return NextResponse.json({
          status: "error",
          message: "Token already sent, please check your email or wait for 5 minutes",
        });
      }
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Error: " + (error as Error).message,
    });
    
  }

  // send generated token to user email
  const token = crypto.randomBytes(15).toString("hex");
  try {
    await User.updateOne(
      {
        email,
      },
      {
        $set: {
          verificationToken: token,
          verificationTokenExpires: Date.now() + 5 * 60 * 1000, // 5 minutes
        },
      }
    );
  } catch (err) {
    return NextResponse.json({
      status: "error",
      message: "Error: " + (err as Error).message,
    });
  }

  try {
    const resp = await sendEmail(email, token, "verify");
    console.log(`Verification email sent to ${email} with token`);
  } catch (err) {
    console.error(`Failed to send verification email to ${email}: ${(err as Error).message}`);
    return NextResponse.json({
      status: "error",
      message: "Error: " + (err as Error).message,
    });
  }

  return NextResponse.json({
    status: "success",
    message: "Email sent Successfully",
  });
};
