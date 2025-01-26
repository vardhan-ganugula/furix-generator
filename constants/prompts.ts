export function generateQuotePrompt(theme:string):string {
    const prompt = `Generate 10 unique motivational quotes based on the theme of ${theme}. Make sure the quote is short, powerful, and inspiring. It should resonate with [Target Audience, e.g., content creators, students, entrepreneurs, procrastinators], and be phrased in a way that encourages them to keep pushing forward despite challenges. The tone should be uplifting and energizing, and the quote should evoke a sense of hope and determination. The output should be a markdown list of 10 quotes, each on a separate line, formatted as plain markdown.`;
    return prompt;
}

export function generateCreativePrompt(userInput?: string): string {
    const basePrompt = `Write a creative story that inspires content creators to keep pushing through creative blocks. The story should feature a protagonist who faces a major creative challenge, such as writer's block, lack of inspiration, or self-doubt. Through perseverance and creative problem-solving, the protagonist overcomes the challenge and experiences a breakthrough. Include elements of self-discovery, motivation, and the joy of creating. The tone should be uplifting and encouraging, leaving the reader with a sense of hope and determination. The story should be engaging and relatable, resonating with content creators of all backgrounds and experience levels. use random names and places to make the story more engaging.`;

    const userPrompt = (userInput?:string) => 
        `${basePrompt}${userInput ? ` The topic is: ${userInput}. Using this topic, create a unique and creative story.` : ''}`;
    return userPrompt(userInput);
}