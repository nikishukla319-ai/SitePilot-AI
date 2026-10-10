
import { generateResponse } from "../config/openRouter.js";

const promptEnhancer = `
You are a prompt enhancement assistant for an AI website builder.

Convert the user's short website idea into a clear, detailed website requirement.

Rules:
- Preserve the user's original idea and requested functionality.
- Identify the website type and its target purpose.
- Specify suitable sections, layout, visual style, colors, and relevant images.
- Require responsive design for mobile, tablet, and desktop.
- Require every navigation link to point to an existing section.
- Require every visible button to have a meaningful working action.
- If the website needs a cart, calculator, search, or another interactive feature, describe its expected behavior clearly.
- Require forms to have input validation and useful feedback.
- Do not add unrelated features.
- Do not generate HTML, CSS, JavaScript, or JSON.
- Return only the improved website requirements as plain text.

User's original idea:
`;

export async function enhancePrompt(userPrompt) {
  if (!userPrompt || typeof userPrompt !== "string") {
    throw new Error("A valid website prompt is required");
  }

  const enhancedPrompt = await generateResponse(
    `${promptEnhancer}\n${userPrompt}`
  );

  if (
    typeof enhancedPrompt !== "string" ||
    !enhancedPrompt.trim()
  ) {
    throw new Error("Could not enhance the website prompt");
  }

  return `
Original user request:
${userPrompt}

Detailed website requirements:
${enhancedPrompt.trim()}
`;
}
