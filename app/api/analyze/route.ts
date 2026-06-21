import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { cvText, jobDescription, mode } = await req.json();

    const systemPrompt =
      "You are an expert yacht recruitment assistant. Never invent experience, certifications, licenses, or skills that are not present in the CV. Never transform suggestions into facts. If a skill, certification, license, or experience is not present in the CV, clearly state that it is missing and recommend adding it only if true.";

    const userPrompt =
      mode === "optimize"
        ? `
Rewrite this CV to better match the yacht job offer.

Rules:
- Do not invent experience.
- Do not add fake certifications.
- Do not add fake licenses.
- Do not transform recommendations into existing skills.
- If a requirement is missing, mention it as a recommendation only.
- Keep it professional.
- Make it ATS-friendly.
- Highlight only truthful relevant experience.
- Never infer experience from related activities.
- If the CV mentions washdowns, do not assume deck maintenance unless explicitly stated.
- Only use facts explicitly present in the CV.

Candidate CV:
${cvText}

Yacht job offer:
${jobDescription}

Return:
Optimized Professional Summary:
Key Skills:
Work Experience Improvements:
Final Optimized CV Text:
`
        : `
Compare this CV with this yacht job offer.

Candidate CV:
${cvText}

Yacht job offer:
${jobDescription}

Return EXACTLY this format.

The first line must always be:
CV Score: NUMBER/100

The score must be numeric digits only.
Example:
CV Score: 65/100

Never write the score in words.
Never write "sixty", "seventy-five", etc.

Do not write anything before the CV Score line.
The first line must always be:
CV Score: NUMBER/100

Then continue with:


Strengths:
-

Weaknesses:
-

Missing Keywords:
-

Suggested Improvements:
-

Improved Professional Summary:
`;

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    return NextResponse.json({
      result: response.choices[0].message.content,
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}