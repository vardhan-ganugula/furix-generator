export function generateQuotePrompt(theme: string): string {
  const prompt = `Generate 10 unique motivational quotes based on the theme of ${theme}. Make sure the quote is short, powerful, and inspiring. It should resonate with [Target Audience, e.g., content creators, students, entrepreneurs, procrastinators], and be phrased in a way that encourages them to keep pushing forward despite challenges. The tone should be uplifting and energizing, and the quote should evoke a sense of hope and determination. The output should be a markdown list of 10 quotes, each on a separate line, formatted as plain markdown.`;
  return prompt;
}

export function generateCreativePrompt(userInput?: string): string {
  const basePrompt = `Write a creative story that inspires content creators to keep pushing through creative blocks. The story should feature a protagonist who faces a major creative challenge, such as writer's block, lack of inspiration, or self-doubt. Through perseverance and creative problem-solving, the protagonist overcomes the challenge and experiences a breakthrough. Include elements of self-discovery, motivation, and the joy of creating. The tone should be uplifting and encouraging, leaving the reader with a sense of hope and determination. The story should be engaging and relatable, resonating with content creators of all backgrounds and experience levels. use random names and places to make the story more engaging.`;

  const userPrompt = (userInput?: string) =>
    `${basePrompt}${
      userInput
        ? ` The topic is: ${userInput}. Using this topic, create a unique and creative story.`
        : ""
    }`;
  return userPrompt(userInput);
}

export function ContentPlanMonthly(topic: string): string {
  const prompt = `Create a 30-day content plan for a blog focused on ${topic}. List 30 blog post titles that address trending topics, frequently asked questions, and common challenges within the niche. For each post, outline the main points to be covered, such as key takeaways or steps for the reader. Include SEO keywords to target in the posts and suggest media (images, videos, infographics) that could enhance the content. Include ideas for promotional strategies, such as social media posts or email newsletters, to increase the blog's visibility. The output should be in exactly one markdown table with 4 columns: Serial Number, Post Title, Main Points, and SEO Keywords, and exactly 30 rows. Ensure the table is formatted correctly without any additional tables or content.
`;
  return prompt;
}

export function EmailOutreachBloggers(niche: string, userPrompt?: string) {
  const prompt = `Write an email outreach template for bloggers looking to collaborate with brands in the ${niche}. Start with a friendly greeting and a brief introduction to the blogger and their audience. Explain why the collaboration would be mutually beneficial, including details such as audience reach, engagement rates, and previous successful partnerships. Provide specific ideas for collaboration, such as sponsored posts or product reviews. Close with a call-to-action inviting the brand to discuss the opportunity further. The email should be concise, professional, and personalized to the blogger's interests and needs. The output should be a complete email template with placeholders for personalization, such as the blogger's name and blog URL. The subject line should be attention-grabbing and relevant to the collaboration offer. ${userPrompt} The output should be like this example:
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

  return prompt;
}