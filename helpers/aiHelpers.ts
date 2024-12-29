import React from "react";
import { google } from "@ai-sdk/google";
import { streamText, generateText } from "ai";

export async function PrepareEmailText(
  divRef: React.MutableRefObject<HTMLElement | null>
) {
  const subject = divRef.current?.querySelector("h1");
  const divTags = divRef.current?.querySelectorAll("div");
  if (!divTags) {
    throw new Error("No div tags found");
  }
  const body = divTags[0];
  const footer = divTags[1];
  const response = {
    subject: subject?.textContent,
    body: body?.textContent,
    footer: footer?.textContent,
  };

  return response;
}

export const streamTextModel = (prompt: string) => {
  try {
    const { textStream } = streamText({
      prompt,
      model: google("gemini-1.5-flash"),
      seed : Math.floor(Math.random()*1000),
      temperature: 1
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

export const generateTextModel = async (prompt: string) => {
  try {
    const { text } = await generateText({
      prompt,
      model: google("gemini-1.5-flash"),
    });
    return text;
  } catch (error) {
    console.error("Error generating text:", error);
    throw new Error("Failed to generate text");
  }
};
