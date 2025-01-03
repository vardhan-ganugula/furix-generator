import { NextResponse } from "next/server";


export async function GET() {
    try {
        const response = NextResponse.json({ message: "logout successful",
            status: 'success'
         }, { status: 200 });

        response.cookies.set('token', '', {
            httpOnly: true,
            expires: new Date(0)
        })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "logout failed" }, { status: 500 });
    }
}