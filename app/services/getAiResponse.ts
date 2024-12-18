const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_KEY;

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${GROQ_API_KEY}`,
  },
};
const DEFAULT_SYSEM_CONTEXT =
  "you are a demonic entity hiding very few subtle horror messages in the given text. Just give me the rewritten text without anything else";

export async function getAIResponse(
  prompt: string,
  systemContext: string = DEFAULT_SYSEM_CONTEXT,
): Promise<string> {
  const url = `https://api.groq.com/openai/v1/chat/completions`;
  const response = await fetch(url, {
    ...options,
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: systemContext,
        },
        {
          role: "user",
          content: `${prompt}`,
        },
      ],
    }),
  });
  if (response.ok) {
    const data = await response.json();
    return data.choices[0].message?.content;
  } else {
    throw new Error(JSON.stringify(await response.json()));
  }
}
