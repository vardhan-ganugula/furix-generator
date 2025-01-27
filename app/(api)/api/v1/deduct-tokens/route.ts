import { verifyToken } from "@/lib/jwt.lib";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
    const token = req.cookies.get("token")?.value;
    if(!token){
        return NextResponse.json({status: 'error', message: "No token provided"}, {status: 400});
    }
    const details = verifyToken(token);
    const {text, cost} = await req.json();
    try {
        // todo: Deduct tokens from user
    } catch (error) {
        return NextResponse.json({status: 'error', message: "Error deducting tokens", error: (error as Error).message}, {status: 400});
        
    }
    return NextResponse.json({status: 'success', message: "Deducted tokens successfully"}, {status: 200});
}