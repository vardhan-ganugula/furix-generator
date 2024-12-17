import aiModel from "@/helpers/aiModel"
import { NextRequest, NextResponse } from "next/server";
import { google } from '@ai-sdk/google';
import {generateText, streamText} from 'ai'
export async function POST(request:NextRequest) {
    // const {messages} = await request.json();
    // if(!messages) {
    //     return NextResponse.json({ answer: "Please provide a topic" }, { status: 400 });
    // }
    // const prompt = `Create a 30-day content plan for a blog focused on ${topic}. List 30 blog post titles that address trending topics, frequently asked questions, and common challenges within the niche. For each post, outline the main points to be covered, such as key takeaways or steps for the reader. Include SEO keywords to target in the posts and suggest media (images, videos, infographics) that could enhance the content. Include ideas for promotional strategies, such as social media posts or email newsletters, to increase the blog's visibility.`;
    
    const encoder = new TextEncoder();
    const readambleStream = new ReadableStream({
        async start(controller) {
            try {
                const {textStream} = streamText({
                    prompt: 'generate a 400 words essay on the topic "The impact of technology on education"',
                    model: google('gemini-1.5-flash')
                });

                for await(const text of textStream) {
                    controller.enqueue(encoder.encode(text));
                }

                controller.close();
            } catch (error) {
                console.log('Error generating text:', error);
                controller.error(error);
                controller.close();
                
            }
        },
    })
    
    return new NextResponse(readambleStream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
        }
    });
}