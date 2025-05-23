import { generateCreativePrompt } from "@/constants/prompts";
import { generateApiStream } from "@/helpers/aiHelpers";
import { saveUserHistory } from "@/helpers/userHelpers";
import { verifyToken } from "@/lib/jwt.lib";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const deduct = 50;
  const token = req.cookies.get("token")?.value;
  const { story } = await req.json();
  if (!token) {
    return NextResponse.json(
      {
        status: "error",
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }
  const id = verifyToken(token).id;
  const prompt = generateCreativePrompt(story || "unique and inspiring story");
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return NextResponse.json(
        {
          status: "error",
          message: "User not found",
        },
        { status: 404 }
      );
    }
    if (user.token < deduct) {
      return NextResponse.json(
        {
          status: "error",
          message: "Insufficient tokens",
        },
        { status: 402 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "database error",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }

  try {
    await User.findOneAndUpdate({ _id: id }, { $inc: { token: -deduct } });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Error: " + (error as Error).message,
      },
      { status: 500 }
    );
  }
  const response = await generateApiStream(prompt, async (responseText) => {
    console.log("Saving history...");
    await saveUserHistory(
      id,
      responseText,
      "/ai/creative-story-generation",
      deduct,
      "Creative Story Generation"
    );
  });
  return new NextResponse(response, {
    headers: {
      "Content-Type": "text/plain",
      "Transfer-Encoding": "chunk",
    },
  });
};
