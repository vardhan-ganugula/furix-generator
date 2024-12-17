// app/actions/generateText.js
'use server';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';


const model = (prompt : string) => {
  try {
    const {textStream} = streamText({
      prompt,
      model : google('gemini-1.5-flash')
    });
    const encoder = new TextEncoder();
    const response = new ReadableStream({
        async start(controller) {
            try {
            for await (const text of textStream) {
                controller.enqueue(encoder.encode(text));
            }
            controller.close();
            } catch (error) {
            console.error('Error generating text:', error);
            controller.error(error);
            controller.close();
            }
        },
        });
    return response;
  } catch (error) {
    console.error('Error generating text:', error);
    throw new Error('Failed to generate text');
  }
}
export async function generateTextAction(topic:string) {
    const prompt = `Create a 30-day content plan for a blog focused on ${topic}. List 30 blog post titles that address trending topics, frequently asked questions, and common challenges within the niche. For each post, outline the main points to be covered, such as key takeaways or steps for the reader. Include SEO keywords to target in the posts and suggest media (images, videos, infographics) that could enhance the content. Include ideas for promotional strategies, such as social media posts or email newsletters, to increase the blog's visibility. The output should be in exactly one markdown table with 4 columns: Serial Number, Post Title, Main Points, and SEO Keywords, and exactly 30 rows. Ensure the table is formatted correctly without any additional tables or content.
`;
  return model(prompt);
  
}
