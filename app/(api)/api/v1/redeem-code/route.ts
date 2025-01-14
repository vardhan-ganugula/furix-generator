import connect from "@/db/dbConfig";
import { verifyToken } from "@/lib/jwt.lib";
import redeemCodeModel from "@/models/redeemCode.model";
import redeemHistoryModel from "@/models/redeemHistory.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { code } = await req.json();
  const token = req.cookies.get("token")?.value;
  if (!code || !token || !verifyToken(token)) {
    return NextResponse.json(
      {
        status: "error",
        message: "Invalid request: missing code or token",
      },
      {
        status: 400,
      }
    );
  }
  const tokenDetails = verifyToken(token);
  connect();
  // Check if code is valid
  try {
    const response = await redeemHistoryModel.findOne({
      redeemCode: code,
      redeemBy: tokenDetails.id,
    });
    if (response) {
      return NextResponse.json(
        {
          status: "error",
          message: "Code already redeemed",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Invalid code",
        error: (error as Error).message,
      },
      {
        status: 400,
      }
    );
  }

  //   check the limit of redeem code and valid or not and expiry
  try {
    const response = await redeemCodeModel.findOne({
      code: code,
      expiryDate: { $gte: new Date() },
    });
    if (!response) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid code or code expired",
        },
        {
          status: 400,
        }
      );
    }
    if (response.redeemed >= response.limit) {
      return NextResponse.json(
        {
          status: "error",
          message: "Code limit exceeded",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Invalid code",
        error: (error as Error).message,
      },
      {
        status: 400,
      }
    );
  }

  //   update the redeem code count and add to history
  try {
    const response = await redeemCodeModel.findOneAndUpdate(
      { code: code },
      { $inc: { redeemed: 1 } }
    );
    await redeemHistoryModel.create({
      redeemCode: code,
      redeemBy: tokenDetails.id,
    });
    await User.findOneAndUpdate(
      {
        _id: tokenDetails.id,
      },
      {
        $inc: { token: response.amount },
      }
    );
    return NextResponse.json(
      {
        status: "success",
        message: "Code redeemed successfully",
        details: {
          name: response.name,
          amount: response.amount,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Invalid code",
        error: (error as Error).message,
      },
      {
        status: 400,
      }
    );
  }
};
