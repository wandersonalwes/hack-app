import { api } from "@/lib/axios";

type AskResponse = {
  answer: string;
  confidence?: number;
  sources?: string[];
};

export async function askQuestion(
  question: string,
  context?: string
): Promise<AskResponse> {
  try {
    const messages: { role: string; content: string }[] = [];

    if (context) {
      messages.push({ role: "system", content: `Contexto: ${context}` });
    }

    messages.push({ role: "user", content: question });

    const { data } = await api.post(
      "/chat/completions",
      { messages, stream: false, max_tokens: 1000 },
      { headers: { "Content-Type": "application/json" } }
    );

    const answer =
      data.choices?.[0]?.message?.content || "No response received";

    return {
      answer,
      confidence: data.confidence,
      sources: data.sources,
    };
  } catch (error) {
    console.error("askQuestion error:", error);
    throw new Error("Failed to get response from Apologist AI");
  }
}
