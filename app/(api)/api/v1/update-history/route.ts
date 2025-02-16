import { NextRequest, NextResponse } from "next/server";
import userHistoryModel from "@/models/userHistory.model";
import { verifyToken } from "@/lib/jwt.lib";

export const POST = async (req:NextRequest) => {

    const { url, tokens, content, userId} = await req.json();

    let userDetails;
    try {
        userDetails = await verifyToken(userId);
    } catch (error) {
        return NextResponse.json({
            status: "error",
            message: "Unauthorized"
        }, {status: 401})
    }

    try {
        await userHistoryModel.create({
            userId: userDetails.id,
            name: userDetails.name,
            response: content,
            url,
            tokens
        })
        
    } catch (error) {
        return NextResponse.json({
            status: "error",
            message: "database error",
            error: (error as Error).message
        }, {status: 500})
        
    }

    return NextResponse.json({
        status: "success",
        message: "History updated successfully",
        url,
        tokens,
        content
    })


}