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
        const err = await res.text()
        throw new Error("openRouter err " + err)
    }

    const data = await res.json()

    return data.choices[0].message.content
}

export { generateResponse }