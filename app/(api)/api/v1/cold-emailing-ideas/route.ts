'use server'
import { NextRequest, NextResponse } from "next/server";
import aiModel from "@/helpers/aiModel";

export async function POST(req: Request, res: Response,) {


}

export async function GET() {

    const prompt = `
    You are a professional web developer looking for the clients to create a website for them. Generate a list of cold emailing ideas to reach out clients that email should be attractive and engaging subject that should attract every client. The response should be in JSON format, with each record containing a subject line and body. Example format:
    [
        {
        "subject": "Subject Line 1",
        "body": "Email body content 1"
        },
        {
        "subject": "Subject Line 2",
        "body": "Email body content 2"
        }
    ]
    `;
    const result = await aiModel().generateContent(prompt);
    let response = result.response.candidates ? result.response.candidates[0].content.parts[0].text : "";
    return NextResponse.json({ answer: response });
}