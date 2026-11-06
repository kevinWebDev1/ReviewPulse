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
  const item = (userNotes || "").trim().replace(/[.,!]+$/, "");
  const tagsStr = selectedTags.slice(0, 3).join(" and ");

  if (rating >= 4) {
    if (item && tagsStr) {
      return [
        {
          id: "short",
          label: "Short & Punchy",
          text: `Loved the ${item} and ${tagsStr} at ${businessName}! Freshly prepared and delicious. 5 stars!`
        },
        {
          id: "detailed",
          label: "Detailed Experience",
          text: `Visited ${businessName} recently and had a great time. Tried their ${item} — cooked fresh and full of flavor. The ${tagsStr} was spot on and staff was very polite. Highly recommended!`
        },
        {
          id: "conversational",
          label: "Friendly & Warm",
          text: `Bohot badiya experience raha! Especially loved their ${item} aur sath me ${tagsStr}. Service fast thi aur ambiance bhi mast. Family ke sath zaroor try karein!`
        }
      ];
    } else if (item) {
      return [
        {
          id: "short",
          label: "Short & Punchy",
          text: `Really loved the ${item} at ${businessName}! Freshly made, delicious flavors, and prompt service. 5 stars!`
        },
        {
          id: "detailed",
          label: "Detailed Experience",
          text: `Had a wonderful meal at ${businessName}. Tried their ${item} — prepared to perfection with great hospitality and quick turnaround. Definitely visiting again!`
        },
        {
          id: "conversational",
          label: "Friendly & Warm",
          text: `Khaane me maza aa gaya, especially the ${item}! Portions generous the aur service super fast thi. Highly recommended in the area!`
        }
      ];
    } else if (tagsStr) {
      return [
        {
          id: "short",
          label: "Short & Punchy",
          text: `Had a wonderful experience at ${businessName}! Loved the ${tagsStr}. 5 stars!`
        },
        {
          id: "detailed",
          label: "Detailed Experience",
          text: `Visited ${businessName} recently and was thoroughly impressed. The ${tagsStr} were top-notch. Staff was very accommodating and courteous. Will definitely be coming back again.`
        },
        {
          id: "conversational",
          label: "Friendly & Warm",
          text: `Bohot accha experience raha! Really liked the ${tagsStr}. Service was super prompt and team was very warm. Totally worth visiting!`
        }
      ];
    } else {
      return [
        {
          id: "short",
          label: "Short & Punchy",
          text: `Great experience at ${businessName}! Quality service, great atmosphere, and courteous staff. 5 stars!`
        },
        {
          id: "detailed",
          label: "Detailed Experience",
          text: `Really satisfied with the quality and hospitality at ${businessName}. Everything was seamless, professional, and well-managed. Highly recommended!`
        },
        {
          id: "conversational",
          label: "Friendly & Warm",
          text: `Super happy with the overall experience at ${businessName}. Friendly staff, quick turnaround, and great value. 10/10 recommended!`
        }
      ];
    }
  } else {
    const feedbackSubject = item || tagsStr || "overall service";
    return [
      {
        id: "short",
        label: "Brief & Constructive",
        text: `Decent visit to ${businessName}, but there is room for improvement in ${feedbackSubject}.`
      },
      {
        id: "detailed",
        label: "Detailed Constructive Feedback",
        text: `Visited ${businessName} recently. The experience could have been better regarding ${feedbackSubject}. Hope management looks into this.`
      },
      {
        id: "conversational",
        label: "Neutral Observation",
        text: `Experience was okay at ${businessName}. Expecting better service and consistency next time.`
      }
    ];
  }
}

