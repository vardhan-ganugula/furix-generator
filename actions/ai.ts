// app/actions/generateText.js
"use server";
import { google } from "@ai-sdk/google";
import { streamText, generateText  } from "ai";


const streamTextModel = (prompt: string) => {
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
        } finally {
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

const generateTextModel = async (prompt: string) => {
  try {
    const {text} = await generateText({
      prompt,
      model: google("gemini-1.5-flash"),
    });
    return text;
  } catch (error) {
    console.error("Error generating text:", error);
    throw new Error("Failed to generate text");
  }
}

export async function ContentPlanMonthly(topic: string) {
  const prompt = `Create a 30-day content plan for a blog focused on ${topic}. List 30 blog post titles that address trending topics, frequently asked questions, and common challenges within the niche. For each post, outline the main points to be covered, such as key takeaways or steps for the reader. Include SEO keywords to target in the posts and suggest media (images, videos, infographics) that could enhance the content. Include ideas for promotional strategies, such as social media posts or email newsletters, to increase the blog's visibility. The output should be in exactly one markdown table with 4 columns: Serial Number, Post Title, Main Points, and SEO Keywords, and exactly 30 rows. Ensure the table is formatted correctly without any additional tables or content.
`;
  return streamTextModel(prompt);
}

export async function CreativeStory(topic: string) {
  const prompt = `Write a creative story that inspires content creators to keep pushing through creative blocks. The story should feature a protagonist who faces a major creative challenge, such as writer's block, lack of inspiration, or self-doubt. Through perseverance and creative problem-solving, the protagonist overcomes the challenge and experiences a breakthrough. Include elements of self-discovery, motivation, and the joy of creating. The tone should be uplifting and encouraging, leaving the reader with a sense of hope and determination. The story should be engaging and relatable, resonating with content creators of all backgrounds and experience levels. The output should be a short story of at least 500 words, written in a narrative style with vivid descriptions and emotional depth.`;
  return streamTextModel(prompt);
}

export async function EmailOutreachBloggers(niche: string) {
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

  return streamTextModel(prompt);
}

export async function SocialMediaCalendar(niche: string) {
  const prompt = `Create a social media content calendar for a brand in the ${niche} niche. The calendar should cover a 7-day period and include daily posts on platforms such as Instagram, Facebook, and Twitter. Each post should be tailored to the platform's audience and engagement style, with a mix of promotional, informative, and engaging content. Include relevant hashtags, captions, and media (images, videos, infographics) for each post. The calendar should also outline the posting schedule, including the date, time, and platform for each post. The goal is to increase brand visibility, engagement, and follower growth through strategic social media content. The output should be a detailed calendar with 30 entries, one for each day, organized by date and platform. Ensure the content is varied, engaging, and aligned with the brand's voice and values. The output should conatins a markdown table with 4 columns: Date, Platform,Time,Post Type, Content, Captions, Hastags and Media, and exactly have 7days content in the rows it should definately cover weekly shedule it should not contains any extra text and information it should only contains the table. The Date should starts from today's date i.e ${new Date()} and ends after 7 days.`;
  return streamTextModel(prompt);
}

export async function PersonalizedMotivationalQuote(theme:string){
  const prompt = `Generate 10 motivational quotes based on the theme of ${theme}, such as perseverance, creativity, or success. Make sure the quote is short, powerful, and inspiring. It should resonate with [Target Audience, e.g., content creators, students, entrepreneurs], and be phrased in a way that encourages them to keep pushing forward despite challenges. The tone should be uplifting and energizing, and the quote should evoke a sense of hope and determination. The output should be a markdown list of 10 quotes, each on a separate line, formatted as plain markdown.`;
  return streamTextModel(prompt);
}

export async function BrandCaseStudy(brand: string, strategy: string){
  const prompt = `Write a detailed case study about how ${brand} successfully used ${strategy} to achieve results. Begin with an overview of the company and the challenge they were facing. Provide detailed information about the marketing strategy that was implemented, including the goals, target audience, tactics, and timeline. Highlight the results achieved, such as increased sales, higher engagement, or improved brand awareness. Use statistics and data to support the case study, and conclude with key takeaways for other marketers.
  `
  return streamTextModel(prompt);
}