import { NextResponse } from "next/server";

export async function POST(req) {
  const startTime = Date.now();
  try {
    const body = await req.json();
    const {
      businessName = "This Business",
      category = "Local Business",
      rating = 5,
      selectedTags = [],
      userNotes = ""
    } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    // If Gemini API key is configured in environment, call Google Gemini 2.5 Flash
    if (apiKey) {
      try {
        const prompt = `
You are a helpful assistant for customer Google reviews in India.
Generate 3 distinct, authentic, natural-sounding Google reviews for a customer who wants to review:
Business: "${businessName}"
Category: "${category}"
Star Rating: ${rating} out of 5
Highlights they selected: ${selectedTags.length > 0 ? selectedTags.join(", ") : "Good overall experience"}
Optional customer note: "${userNotes}"

Guidelines:
1. Speak in first-person ("I", "We", "Visited with family/friends").
2. Sound completely natural, casual, and human. Avoid robotic, overly dramatic phrases like "gastronomic marvel" or "quintessential haven".
3. Option 1: "Short & Punchy" (1-2 sentences, quick to post).
4. Option 2: "Detailed & Specific" (2-3 sentences mentioning the highlights and service quality).
5. Option 3: "Conversational / Indian Context" (warm, friendly tone popular among Indian diners/customers, optionally with familiar conversational phrasing).

Return ONLY a raw JSON array of 3 objects with keys "id", "label", and "text" without any markdown formatting or backticks:
[
  {"id": "short", "label": "Short & Punchy", "text": "..."},
  {"id": "detailed", "label": "Detailed Experience", "text": "..."},
  {"id": "conversational", "label": "Friendly & Warm", "text": "..."}
]
`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 600
              }
            }),
            signal: AbortSignal.timeout(4000)
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";
          const cleanedText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(cleanedText);

          if (Array.isArray(parsed) && parsed.length >= 3) {
            return NextResponse.json({
              success: true,
              source: "gemini-2.5-flash",
              latencyMs: Date.now() - startTime,
              suggestions: parsed
            });
          }
        }
      } catch (err) {
        console.warn("Gemini API call failed or timed out, falling back to smart heuristic engine:", err);
      }
    }

    // High-fidelity fallback generator (0-latency, 100% uptime guaranteed for demo & offline)
    const fallbackSuggestions = generateSmartFallbackReviews({
      businessName,
      category,
      rating,
      selectedTags,
      userNotes
    });

    return NextResponse.json({
      success: true,
      source: apiKey ? "smart-fallback" : "smart-engine-demo",
      latencyMs: Date.now() - startTime,
      suggestions: fallbackSuggestions
    });
  } catch (error) {
    console.error("API Error in /api/ai/generate-review:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate review suggestions"
      },
      { status: 500 }
    );
  }
}

function generateSmartFallbackReviews({ businessName, category, rating, selectedTags, userNotes }) {
  const tagsStr = selectedTags.slice(0, 3).join(" and ");
  const noteSnippet = userNotes ? ` ${userNotes}.` : "";

  if (rating >= 4) {
    return [
      {
        id: "short",
        label: "Short & Punchy",
        text: tagsStr
          ? `Had a wonderful experience at ${businessName}! Loved the ${tagsStr}.${noteSnippet} 5 stars!`
          : `Great experience at ${businessName}! Highly recommended for anyone looking for quality ${category.toLowerCase()}.${noteSnippet}`
      },
      {
        id: "detailed",
        label: "Detailed Experience",
        text: tagsStr
          ? `Visited ${businessName} recently and was thoroughly impressed. The ${tagsStr} were top-notch. Staff was very accommodating and courteous.${noteSnippet} Will definitely be coming back again.`
          : `Really satisfied with the service and quality at ${businessName}. Everything was seamless, professional, and well-managed.${noteSnippet} A well-deserved 5-star rating!`
      },
      {
        id: "conversational",
        label: "Friendly & Warm",
        text: tagsStr
          ? `Bohot accha experience raha! Really liked the ${tagsStr}. Service was super prompt and team was very warm.${noteSnippet} Totally worth visiting!`
          : `Super happy with the overall experience at ${businessName}. Friendly staff, quick turnaround, and great value.${noteSnippet} 10/10 recommended!`
      }
    ];
  } else {
    return [
      {
        id: "short",
        label: "Brief & Constructive",
        text: tagsStr
          ? `Decent experience at ${businessName}, but there is room for improvement in ${tagsStr}.${noteSnippet}`
          : `Average experience at ${businessName}. A few areas need attention.${noteSnippet}`
      },
      {
        id: "detailed",
        label: "Detailed Constructive Feedback",
        text: `Visited ${businessName} recently. While the team was trying their best, the experience could have been better, especially regarding ${tagsStr || "overall wait time and service"}.${noteSnippet} Hope management looks into this.`
      },
      {
        id: "conversational",
        label: "Neutral Observation",
        text: `Experience was okay at ${businessName}. Expecting better service and consistency next time.${noteSnippet}`
      }
    ];
  }
}

