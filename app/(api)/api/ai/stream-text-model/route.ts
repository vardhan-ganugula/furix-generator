import { NextRequest, NextResponse } from "next/server";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { generateApiStream } from "@/helpers/aiHelpers";




export const POST = async (req: NextRequest) => {
    
    const stream = await generateApiStream("How to create a website");

    
    return new NextResponse(stream, {
        headers: {
            'Content-Type': 'text/plain',
            'Transfer-Encoding': 'chunk'
        }
    })
};
