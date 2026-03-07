import { GoogleGenAI, Type } from "@google/genai";
import { Law, GeminiResponse } from "../types";

// Initialize the Google GenAI client
// Note: In this environment, process.env.GEMINI_API_KEY is injected and available.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getGeminiSuggestion(userInput: string, availableLaws: Law[]): Promise<GeminiResponse> {
  // Prepare the context with available laws
  // We only send ID, Title, and Summary to keep the prompt concise but informative
  const lawsContext = availableLaws.map(l => `- ${l.id} (${l.title}): ${l.summary}`).join('\n');

  const prompt = `
    You are a world-class UX Designer and Researcher. A user is building a screen described as: "${userInput}".
    
    Your task is to:
    1. Analyze the user's request to understand the goal, target user, and context.
    2. Formulate a core UX strategy or suggestion for this specific screen (keep it concise, max 2 sentences).
    3. Select the most relevant UX laws from the provided list below that apply to this specific context (max 5 laws).
    4. For each selected law, explain specifically HOW to apply it in the context of the user's description.

    Here is the list of available UX laws you can choose from:
    ${lawsContext}

    Return the response in strict JSON format matching the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            coreSuggestion: { 
              type: Type.STRING,
              description: "A concise, high-level UX strategy for the screen."
            },
            relevantLaws: {
              type: Type.ARRAY,
              description: "List of relevant UX laws with contextual application advice.",
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { 
                    type: Type.STRING,
                    description: "The ID of the law from the provided list."
                  },
                  contextualUsage: { 
                    type: Type.STRING,
                    description: "Specific advice on how to apply this law to the user's screen."
                  }
                },
                required: ["id", "contextualUsage"]
              }
            }
          },
          required: ["coreSuggestion", "relevantLaws"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as GeminiResponse;
    }
    
    throw new Error("Empty response from Gemini");
  } catch (error) {
    console.error("Error fetching Gemini suggestion:", error);
    throw error;
  }
}
