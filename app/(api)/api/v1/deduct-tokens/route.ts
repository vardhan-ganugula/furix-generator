import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
    const token = req.cookies.get("token")?.value;
    if(token) console.log(token);
    console.log('hittitng')
    return NextResponse.json({status: 'success', message: "Deducted tokens successfully"}, {status: 200});
}