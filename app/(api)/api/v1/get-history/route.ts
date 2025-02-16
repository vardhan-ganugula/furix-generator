import { NextResponse, NextRequest } from "next/server";
import connect from "@/db/dbConfig";
import userHistoryModel from "@/models/userHistory.model";
import { authenticateUser } from "@/helpers/userHelpers";
connect();

export const POST = async (req: NextRequest) => {
    const {start} = await req.json();
    const count = 10;
    const {userId} = await authenticateUser(req);
    console.log(userId);
    const history = await userHistoryModel.find({userId}).sort({createdAt: -1}).limit(count).skip(start);

    return NextResponse.json({status: "success", data: history});
}