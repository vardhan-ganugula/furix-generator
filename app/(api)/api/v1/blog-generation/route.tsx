import aiModel from "@/helpers/aiModel"
import { NextResponse } from "next/server";
export async function GET() {
    const prompt = `write some ideas for blog generation`; 
    const result = await aiModel().generateContent(prompt);
    let response = result.response.candidates ? result.response.candidates[0].content.parts[0].text : "";
    return NextResponse.json({ answer: response });
}