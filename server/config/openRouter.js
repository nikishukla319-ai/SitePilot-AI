const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions"

const generateResponse = async (prompt) => {
    const res = await fetch(openRouterUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "deepseek/deepseek-chat",

            models: [
                "deepseek/deepseek-chat",
                "google/gemini-2.5-flash",
                "openai/gpt-5-mini"
            ],

            messages: [
                {
                    role: "system",
                    content: "You must return only valid raw JSON."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 6000,
            temperature: 0.2
        }),
    })

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
            "AI service credits are temporarily unavailable. Please try again later."
        );
        error.statusCode = 503;
        throw error;
    }

    if (res.status === 429) {
        const error = new Error(
            "Too many requests right now. Please wait a moment and try again."
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

    const data = await res.json()

    return data.choices[0].message.content
}

export { generateResponse }