import { generateQuotePrompt } from "@/constants/prompts";
import { generateApiStream } from "@/helpers/aiHelpers";
import { authenticateUser, deductTokens, saveUserHistory } from "@/helpers/userHelpers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { theme } = await req.json();
    if (!theme) {
      return NextResponse.json({ status: "error", message: "Theme is required" }, { status: 401 });
    }

    const { userId } = await authenticateUser(req);
    const deduct = 50;

    await deductTokens(userId, deduct);

    const prompt = generateQuotePrompt(theme);
    const response = await generateApiStream(prompt, async (responseText) => {
      console.log("Saving history...");
      await saveUserHistory(userId, responseText, "/ai/generate-motivational-quotes", deduct, 'Motivational Quote');
    });

    return new NextResponse(response, {
      headers: { "Content-Type": "text/plain", "Transfer-Encoding": "chunked" },
    });

  } catch (error) {
    return NextResponse.json({ status: "error", message: (error as Error).message }, { status: 500 });
  }
};
