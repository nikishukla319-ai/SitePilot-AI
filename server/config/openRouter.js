
const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions";

const generateResponse = async (prompt) => {
    if (!process.env.OPENROUTER_API_KEY) {
        const error = new Error(
            "OpenRouter API key is missing in server environment variables."
        );
        error.statusCode = 500;
        throw error;
    }

    const res = await fetch(openRouterUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "deepseek/deepseek-v4-flash",
            messages: [
                {
                    role: "system",
                    content:
                        "Return only one valid raw JSON object. Do not use Markdown or code fences. The JSON must contain the required fields and complete HTML. Keep the website implementation concise, complete, and responsive."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 12000,
            temperature: 0.2
        }),
    });

    if (!res.ok) {
        const err = await res.text();
        let errorData = {};

        try {
            errorData = JSON.parse(err);
        } catch {
            errorData = {};
        }

        const errorCode = errorData?.error?.code;
        const errorMessage = errorData?.error?.message || "";

        if (
            errorCode === 402 &&
            errorMessage.includes("in_flight_budget_exhausted")
        ) {
            const error = new Error(
                "AI is busy right now. Please wait 2 minutes and try again."
            );
            error.statusCode = 429;
            throw error;
        }

        if (errorCode === 402) {
            const error = new Error(
                "AI service credits are unavailable. Please check the selected model and account limits."
            );
            error.statusCode = 503;
            throw error;
        }

        if (res.status === 429) {
            const error = new Error(
                "AI request limit reached. Please wait and try again."
            );
            error.statusCode = 429;
            throw error;
        }

        console.error("OpenRouter error:", err);

        const error = new Error(
            "Website generation is temporarily unavailable. Please try again later."
        );
        error.statusCode = 503;
        throw error;
    }

    const data = await res.json();
    const choice = data?.choices?.[0];

    console.log("AI model:", data?.model);
    console.log("AI finish reason:", choice?.finish_reason);
    console.log("AI response length:", choice?.message?.content?.length ?? 0);

    if (!choice?.message?.content) {
        console.error(
            "OpenRouter returned no content:",
            JSON.stringify(data).slice(0, 1500)
        );

        const error = new Error(
            "AI returned an empty response. Please try again."
        );
        error.statusCode = 502;
        throw error;
    }

    if (choice.finish_reason === "length") {
        const error = new Error(
            "AI response was cut off. Please try a shorter website prompt."
        );
        error.statusCode = 502;
        error.code = "AI_RESPONSE_TRUNCATED";
        throw error;
    }

    return choice.message.content;
};

export { generateResponse };
