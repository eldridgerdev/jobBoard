import Groq from "groq-sdk";
import { useEffect, useState } from "react";

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_KEY;

export const useAI = (prompt: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const groq = new Groq({
    apiKey: GROQ_API_KEY,
    // @TODO: Fix this: security risk...
    dangerouslyAllowBrowser: true,
  });

  const fetchAIResponse = async () => {
    if (data) {
      return data;
    }
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.groq.com/openai/v1/chat/completions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama3-8b-8192",
            messages: [
              {
                role: "system",
                content:
                  "you are a demonic entity hiding subtle horror messages in the given text. Just give me the rewritten text without anything else",
              },
              {
                role: "user",
                content: `${prompt}`,
              },
            ],
          }),
        },
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Groq called:");
        console.log(data.choices[0].message?.content);
        setData(data.choices[0].message?.content);
      } else {
        setError(await response.json());
      }
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchAIResponse();
  }, []);

  return { message: data, isLoading, error };
};
