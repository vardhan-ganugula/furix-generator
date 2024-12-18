// app/actions/generateText.js
"use server";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

const generateContentModel = (prompt: string) => {
  try {
    const { textStream } = streamText({
      prompt,
      model: google("gemini-1.5-flash"),
    });
    const encoder = new TextEncoder();
    const response = new ReadableStream({
      async start(controller) {
        try {
          for await (const text of textStream) {
            controller.enqueue(encoder.encode(text));
          }
        } catch (error) {
          console.error("Error generating text:", error);
          controller.error(error);
        }
        finally{
          controller.close();
        }
      },
    });
    return response;
  } catch (error) {
    console.error("Error generating text:", error);
    throw new Error("Failed to generate text");
  }
};

export async function ContentPlanMonthly(topic: string) {
  const prompt = `Create a 30-day content plan for a blog focused on ${topic}. List 30 blog post titles that address trending topics, frequently asked questions, and common challenges within the niche. For each post, outline the main points to be covered, such as key takeaways or steps for the reader. Include SEO keywords to target in the posts and suggest media (images, videos, infographics) that could enhance the content. Include ideas for promotional strategies, such as social media posts or email newsletters, to increase the blog's visibility. The output should be in exactly one markdown table with 4 columns: Serial Number, Post Title, Main Points, and SEO Keywords, and exactly 30 rows. Ensure the table is formatted correctly without any additional tables or content.
`;
  return generateContentModel(prompt);
}

export async function CreativeStory(topic: string) {
  const prompt = `Write a creative story that inspires content creators to keep pushing through creative blocks. The story should feature a protagonist who faces a major creative challenge, such as writer's block, lack of inspiration, or self-doubt. Through perseverance and creative problem-solving, the protagonist overcomes the challenge and experiences a breakthrough. Include elements of self-discovery, motivation, and the joy of creating. The tone should be uplifting and encouraging, leaving the reader with a sense of hope and determination. The story should be engaging and relatable, resonating with content creators of all backgrounds and experience levels. The output should be a short story of at least 500 words, written in a narrative style with vivid descriptions and emotional depth.`;
  return generateContentModel(prompt);
}

export async function EmailOutreachBloggers(niche: string){
  const prompt = `Write an email outreach template for bloggers looking to collaborate with brands in the ${niche}. Start with a friendly greeting and a brief introduction to the blogger and their audience. Explain why the collaboration would be mutually beneficial, including details such as audience reach, engagement rates, and previous successful partnerships. Provide specific ideas for collaboration, such as sponsored posts or product reviews. Close with a call-to-action inviting the brand to discuss the opportunity further. The email should be concise, professional, and personalized to the blogger's interests and needs. The output should be a complete email template with placeholders for personalization, such as the blogger's name and blog URL. The subject line should be attention-grabbing and relevant to the collaboration offer. The output should be like this example:
  <h1>Subject: creative subject line</h1>
  <div>
    <p>Hi [Blogger's Name],</p>
    content... 
  </div>
  <div>
    <p>Best regards,</p>
    <p>[Your Name]</p>
    <p> [Your Name] </p>
    <p> [Your Title] </p>
    <p> [Your Company/Agency] </p>
    <p> [Your Phone Number] </p>
    <p> [Your Email Address] </p>
    <p> [Your Website (Optional)] </p>
  </div>
  `;

  return generateContentModel(prompt);
}