import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { cvText, jobDescription } = await req.json();

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert yacht recruitment assistant. Compare a candidate CV with a yacht job offer. Give a clear score, strengths, weaknesses, missing keywords, and practical improvements. Never invent experience, certifications, licenses, or skills that are not present in the CV. If something is missing, say it is missing and suggest adding it only if true.",
        },
        {
          role: "user",
          content: `
Candidate CV:
${cvText}

Yacht job offer:
${jobDescription}

Return the answer in this format:

CV Score: __/100

Strengths:
-

Weaknesses:
-

Missing Keywords:
-

Suggested Improvements:
-

Improved Professional Summary:
`,
        },
      ],
    });

    return NextResponse.json({
      result: response.choices[0].message.content,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong while analyzing the CV." },
      { status: 500 }
    );
  }
}