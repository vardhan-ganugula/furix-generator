import {GoogleGenerativeAI} from '@google/generative-ai';



export default function aiModel() {
    const genai = new GoogleGenerativeAI(process.env.GENAI_API_KEY!);
    const model = genai.getGenerativeModel({model: "gemini-1.5-flash"});

    return model;
}