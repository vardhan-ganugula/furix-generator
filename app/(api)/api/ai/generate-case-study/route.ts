import { generateCaseStudy } from "@/constants/prompts";
import { generateApiStream } from "@/helpers/aiHelpers";
import { authenticateUser, deductTokens, saveUserHistory } from "@/helpers/userHelpers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { brand, strategy } = await req.json();
    if (!brand || !strategy) {
      return NextResponse.json({ status: "error", message: "insufficient parameters" }, { status: 404 });
    }

    const { userId } = await authenticateUser(req);
    const deduct = 50;

    await deductTokens(userId, deduct);

    const prompt = generateCaseStudy(brand, strategy);
    const response = await generateApiStream(prompt, async (responseText) => {
      console.log("Saving history...");
      await saveUserHistory(userId, responseText, "/ai/case-study-marketing", deduct, 'Brand Case Study');
    });

    return new NextResponse(response, {
      headers: { "Content-Type": "text/plain", "Transfer-Encoding": "chunked" },
    });

  } catch (error) {
    return NextResponse.json({ status: "error", message: (error as Error).message }, { status: 500 });
  }
};
