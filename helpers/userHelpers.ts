import User from "@/models/user.model";
import userHistoryModel from "@/models/userHistory.model";
import { verifyToken } from "@/lib/jwt.lib";
import { NextRequest } from "next/server";

export const authenticateUser = async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;
  if (!token) throw new Error("Unauthorized");

  const { id } = verifyToken(token);
  const user = await User.findOne({ _id: id });
  if (!user) throw new Error("User not found");

  return { user, userId: id };
};

export const deductTokens = async (userId: string, requiredTokens: number) => {
  const user = await User.findOne({ _id: userId });

  if (!user) throw new Error("User not found");
  if (user.token < requiredTokens) throw new Error("Insufficient tokens");

  await User.findOneAndUpdate({ _id: userId }, { $inc: { token: -requiredTokens } });
};

export const saveUserHistory = async (userId: string, responseText: string, url: string, tokens: number, name:string) => {
  try {
    await userHistoryModel.create({
      userId,
      name,
      response: responseText,
      url,
      tokens,
    });
  } catch (error) {
    console.error("Error saving history", error);
  }
};
