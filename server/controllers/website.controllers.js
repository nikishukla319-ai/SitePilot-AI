import { generateResponse } from "../config/openRouter.js";

import Website from "../models/website.model.js";

import extractJson from "../utils/extractJson.js";

import User from "../models/user.model.js";
import { enhancePrompt } from "../utils/enhancePrompt.js";



const masterPrompt = `

YOU ARE A PRINCIPAL FRONTEND ARCHITECT

AND A SENIOR UI/UX ENGINEER

SPECIALIZED IN RESPONSIVE DESIGN SYSTEMS.



YOU BUILD HIGH-END, REAL-WORLD, PRODUCTION-GRADE WEBSITES

USING ONLY HTML, CSS, AND JAVASCRIPT

THAT WORK PERFECTLY ON ALL SCREEN SIZES.



THE OUTPUT MUST BE CLIENT-DELIVERABLE WITHOUT ANY MODIFICATION.



NO FRAMEWORKS

NO LIBRARIES

NO BASIC SITES

NO PLACEHOLDERS

NO NON-RESPONSIVE LAYOUTS



\--------------------------------------------------

USER REQUIREMENT:

{USER_PROMPT}

\--------------------------------------------------



IMPORTANT USER FUNCTIONALITY RULE:



The website MUST implement the exact functionality requested by the user.



If the user asks for a calculator, build a REAL working calculator.



The calculator must include:



\- Number buttons

\- Operator buttons

\- Clear button

\- Delete button

\- Equals button

\- Decimal button

\- Working JavaScript calculation logic

\- Display for entered numbers and results

\- Proper error handling

\- Responsive calculator layout



Do NOT replace requested functionality with a generic website.



The requested functionality must be clearly visible and usable

on the Home page.



For calculator websites:



\- Use a professional product name such as "CalcPro" or another

  relevant product name instead of simply "Calculator".

\- Show the product name/logo in the header.

\- Use a polished heading such as "Advanced Calculator".

\- Add a short professional description.

\- Keep the calculator centered and visually prominent.

\- The calculator should NOT occupy the entire first screen.

\- The surrounding page must have proper margins and whitespace.

\- The calculator must look like part of a complete professional

  product website, not a standalone coding demo.



\--------------------------------------------------

GLOBAL QUALITY BAR

WEBSITE TYPE DETECTION AND CONTENT RULES:

- First identify the website type from the user's original request.
- Never generate a generic business landing page when the user requests an online shopping or e-commerce website.
- For shopping websites, create at least 4 realistic product cards with product images, names, prices, and Add to Cart buttons.
- Use valid HTTPS image URLs relevant to the products. Do not omit product images.
- Add a working shopping cart with a visible item count and total price.
- Add functional product buttons using JavaScript click event handlers.
- For other website types, generate content and functionality appropriate to the requested purpose.
- Always include working Home, About, Services or Features, and Contact navigation.
- Every navigation link must point to an existing section.
- On mobile, provide a working hamburger menu instead of hiding navigation completely.
- Before returning the HTML, verify that all required sections, image elements, buttons, and JavaScript handlers exist.
- Do not substitute a requested functional website with a generic landing page.

\--------------------------------------------------



\- Modern premium UI
  
- Use relevant, high-quality images that match the user's website topic.
- Use real, valid HTTPS image URLs from reliable image sources such as images.unsplash.com.
- Include actual image URLs in HTML img src attributes; do not use empty src, placeholders, or broken links.
- Add a visually appealing hero image or image composition wherever appropriate.
- Use relevant images for product cards, services, portfolios, and other visual sections when suitable.
- Set object-fit: cover and appropriate image dimensions to maintain a polished layout.
- Add meaningful alt text to every image.
- Use CSS background images only when they improve the design.
- If a remote image fails to load, provide a visually appealing CSS fallback.
- Do not generate a text-only website when images are appropriate for the requested website.


\- Professional typography

\- Proper spacing

\- Responsive on mobile, tablet and desktop

\- Attractive professional header

\- Clearly visible website brand/logo/title in the header

\- Professional navigation bar

\- Navigation should contain Home, About, Services/Features and Contact

\- Header must have proper height, spacing, alignment and visual hierarchy

\- Header content should be horizontally aligned on desktop

\- Brand/logo should appear on the left

\- Navigation should appear on the right

\- On smaller screens, navigation may become a hamburger menu

\- Do NOT make the header extremely small or minimal

\- Do NOT place the website title as a large standalone heading above the navbar

\- Add a visually appealing hero section on the Home page

\- Hero section must be below the header

\- Hero section must contain a clear main heading related to the user's request

\- Hero section must contain a short professional description

\- Add appropriate CTA buttons when useful

\- The requested main functionality must appear prominently below the hero section

\- Add a relevant Features/Services section

\- Add an About section

\- Add a Contact section with a professional form

\- Add a professional footer

\- Use consistent spacing between all sections

\- Smooth animations

\- Hover effects

\- Active states

\- Good color contrast

\- Proper buttons

\- Proper forms

\- No broken functionality

\- No placeholder text

\- No lorem ipsum

\- The final website should visually look like a complete real-world production website

\- Do NOT make the website look like a small demo

\- Maintain a strong visual hierarchy throughout the website

\- Use a consistent color palette

\- Use cards, shadows, borders and spacing where appropriate

\- Avoid excessive empty space

\- Avoid extremely large components that push the rest of the website below the viewport



\--------------------------------------------------

HOME PAGE STRUCTURE

\--------------------------------------------------



The Home page MUST look like a polished real-world SaaS/product website.



The first screen MUST contain:



1. PROFESSIONAL HEADER / NAVBAR

2. HERO SECTION

3. REQUESTED MAIN FUNCTIONALITY



The header must contain:



\- Brand/logo on the LEFT

\- Navigation links on the RIGHT

\- Home

\- About

\- Services / Features

\- Contact



The header must have:

\- Proper padding

\- Proper height

\- Professional background

\- Clear typography

\- Good contrast

\- Hover states

\- Active navigation state



The hero section must contain:



\- Large professional heading

\- Supporting description

\- Optional CTA button

\- Proper vertical spacing

\- Strong visual hierarchy



For a calculator website the Home page structure MUST be:



HEADER

→ HERO SECTION

→ CALCULATOR

→ FEATURES / SERVICES

→ ABOUT

→ CONTACT

→ FOOTER



Do NOT place the calculator immediately below the navigation.



Do NOT make the header just a text heading above the navigation.



Do NOT start the page directly with the calculator.



The website must feel like a complete professional product.



\--------------------------------------------------

REQUIRED SPA PAGES

\--------------------------------------------------



Create these SPA pages/sections:



\- Home

\- About

\- Services / Features

\- Contact



Navigation must work using JavaScript without page reload.



The Home page MUST look complete and professional.



The website header, brand/title, navigation and hero section

MUST be visible immediately when the website loads.



The requested functionality should appear prominently after

the hero section.



About, Services/Features and Contact must have meaningful

content related to the requested website.



\--------------------------------------------------

SECTION REQUIREMENTS

\--------------------------------------------------



HEADER:

\- Professional brand/logo

\- Navigation

\- Responsive mobile navigation

\- Active navigation state

\- Sticky or visually strong header when appropriate



HERO:

\- Large heading

\- Supporting text

\- CTA when appropriate

\- Attractive layout

\- Professional spacing



FEATURES / SERVICES:

\- At least 3 meaningful feature cards

\- Features must relate to the requested website

\- Use icons or simple visual elements where appropriate



ABOUT:

\- Meaningful content related to the product

\- Professional layout

\- Clear heading



CONTACT:

\- Name field

\- Email field

\- Message field

\- Submit button

\- JavaScript validation

\- Friendly success message after valid submission



FOOTER:

\- Product/brand name

\- Short description

\- Navigation links

\- Copyright text



\--------------------------------------------------

FUNCTIONAL REQUIREMENTS

\--------------------------------------------------



\- Navigation must switch pages/sections using JavaScript without page reload

\- Active nav state must update

\- Forms must have JavaScript validation

\- Buttons must show hover + active states

\- Smooth section/page transitions

\- User-requested functionality must actually work
- Every visible button must have a working JavaScript click handler that performs its intended action; hover effects alone are not functionality.
- For e-commerce websites, every Add to Cart button must add the correct product to a JavaScript cart array, update the cart count immediately, and update the cart total when prices are available.
- Display a visible cart count in the header and provide a working way to view cart items.
- Prevent buttons such as Explore, Learn More, and View Details from incorrectly triggering Add to Cart.
- Connect every navigation link to an existing section or implement its intended navigation behavior.
- Before returning the HTML, verify that every button's JavaScript handler references existing HTML elements and that all required elements are present.
- Do not claim a feature works unless its JavaScript behavior is implemented.

\- All JavaScript must be included inside the HTML document

\- No JavaScript errors

\- No broken buttons

\- No dead navigation links



\--------------------------------------------------

TECHNICAL REQUIREMENTS

\--------------------------------------------------



Return ONE complete HTML document.



The HTML must contain:



\<!DOCTYPE html>

\<html>

\<head>

...

\</head>

\<body>

...

\<script>

...

\</script>

\</body>

\</html>



Use only:



\- HTML

\- CSS

\- Vanilla JavaScript



Do NOT use:



\- React

\- Vue

\- Angular

\- Tailwind

\- Bootstrap

\- External libraries

\- External frameworks



All CSS must be inside a \<style> tag.



All JavaScript must be inside a \<script> tag.



Do not depend on external files.



\--------------------------------------------------

RESPONSIVE DESIGN

\--------------------------------------------------



The website MUST work correctly on:



\- Desktop

\- Laptop

\- Tablet

\- Mobile



Use CSS media queries.



On desktop:



\- Header navigation should be visible horizontally.



On mobile:



\- Navigation should collapse into a hamburger menu.

\- Hamburger menu must work using JavaScript.

\- Content must fit within the viewport.

\- Calculator must resize properly.

\- Buttons must remain easy to tap.



\--------------------------------------------------

DESIGN QUALITY

\--------------------------------------------------



The final output should resemble a modern professional website

that could be shown in a software engineering portfolio.



Avoid:



\- Plain default HTML styling

\- Huge empty areas

\- Random colors

\- Unnecessary gradients

\- Poor alignment

\- Tiny navigation

\- Oversized calculator

\- Missing hero section

\- Missing footer

\- Generic placeholder content



Use:



\- Consistent spacing

\- Professional typography

\- Subtle shadows

\- Rounded cards where appropriate

\- Clear sections

\- Strong visual hierarchy

\- Responsive layouts

\- Polished buttons

\- Professional colors


--------------------------------------------------
PRODUCTION QUALITY AND FUNCTIONALITY VALIDATION
--------------------------------------------------

Before returning the final HTML, internally verify the
following requirements:

1. COMPLETE WEBSITE
- Return a complete HTML document with html, head and body.
- Include all CSS and JavaScript required for the website.
- Never return partial HTML, unfinished sections or TODO comments.
- Use a consistent design system across every section.
- Use realistic, business-specific text and content.

2. REAL INTERACTIONS
- Every visible button must perform its intended action.
- Every navigation link must lead to a valid section or destination.
- Search must actually filter the displayed content.
- Filters must update visible results.
- Forms must validate required fields and show success or error feedback.
- Mobile navigation must open and close correctly.
- Do not create buttons that only display hover effects.

3. ECOMMERCE FUNCTIONALITY
When generating a store:
- Render distinct products with relevant images and real-looking prices.
- Each Add to Cart button must add its correct product.
- Update the cart count immediately.
- Support increasing and decreasing item quantities.
- Support removing products.
- Recalculate subtotal and total correctly.
- Show a proper empty-cart state.
- Keep cart state synchronized with the visible cart UI.
- Persist the cart in localStorage when appropriate.
- Validate checkout fields before showing an order confirmation.
- Clearly label demo checkout as a demo.
- Never claim that real payment or order processing occurred
  without an actual backend integration.

4. IMAGES AND CONTENT
- Use relevant, valid HTTPS image URLs.
- Use different images for different products and sections.
- Add descriptive alt attributes.
- Avoid repeated images, empty image sources and placeholder content.
- Ensure text remains readable over images.
- Provide a fallback if an image cannot load.

5. DESIGN QUALITY
- Build a premium, polished website suitable for a portfolio.
- Use responsive desktop, tablet and mobile layouts.
- Include appropriate Home, About, Features/Services and Contact sections.
- Add additional sections only when relevant to the business.
- Maintain consistent spacing, typography, colors and button styles.
- Avoid generic layouts unrelated to the user's business.

6. FINAL SELF-CHECK
Before returning the response, verify that:
- All required HTML sections are present.
- All important buttons have working event handlers.
- All requested functionality has actual JavaScript logic.
- Cart calculations and quantity changes are correct when applicable.
- Navigation links point to existing sections.
- Forms validate user input.
- There are no obvious JavaScript syntax errors.
- The result is a complete HTML document.

Fix any issues you identify before returning the final output.
Do not describe the self-check in the response.
Return only the required valid JSON object.


\--------------------------------------------------

OUTPUT FORMAT

\--------------------------------------------------



RETURN ONLY VALID RAW JSON.



Do not use markdown.

Do not use code fences.



The JSON must have exactly these fields:



{

  "message": "Short professional confirmation sentence",

  "code": "\<FULL VALID HTML DOCUMENT>"

}



Make sure the JSON is valid and can be parsed using JSON.parse().



The "code" field MUST contain the COMPLETE HTML DOCUMENT.

Do not omit CSS.

Do not omit JavaScript.

Do not return partial code.

`;



export const generateWebsite = async (req, res) => {

  try {

    const { prompt } = req.body;



    if (!prompt) {

      return res.status(400).json({

        message: "prompt is required"

      });

    }



    const user = await User.findById(req.user._id);



    console.log("USER:", user);



    if (!user) {

      return res.status(400).json({

        message: "user not found"

      });

    }



    if (user.credits < 50) {

      return res.status(400).json({

        message: "you have not enough credits to generate a website"

      });

    }



    const enhancedPrompt = await enhancePrompt(prompt);

const finalPrompt = masterPrompt.replace(
  "{USER_PROMPT}",
  enhancedPrompt
);



    let raw = "";

    let parsed = null;



    for (let i = 0; i < 2 && !parsed; i++) {

      raw = await generateResponse(finalPrompt);



      console.log("AI RAW RESPONSE:", raw);



      parsed = await extractJson(raw);



      if (!parsed) {

        raw = await generateResponse(

          finalPrompt + "\n\nRETURN ONLY RAW JSON."

        );



        console.log("AI SECOND RESPONSE:", raw);



        parsed = await extractJson(raw);

      }



      console.log("PARSED RESPONSE:", parsed);

    }



    if (
  !parsed ||
  typeof parsed.code !== "string" ||
  !parsed.code.trim()
) {
  console.log("AI RETURNED INVALID RESPONSE");

  return res.status(400).json({
    message: "AI returned an invalid response. Please try again."
  });
}

const generatedHtml = parsed.code.trim();

const requiredHtmlTags = [
  /<html\b/i,
  /<\/html\s*>/i,
  /<head\b/i,
  /<\/head\s*>/i,
  /<body\b/i,
  /<\/body\s*>/i
];

const isCompleteHtml = requiredHtmlTags.every((tag) =>
  tag.test(generatedHtml)
);

if (!isCompleteHtml) {
  console.log("AI RETURNED INCOMPLETE HTML");

  return res.status(400).json({
    message: "AI generated incomplete HTML. Please try again."
  });
}

parsed.code = generatedHtml;



    console.log("ABOUT TO CREATE WEBSITE");



    const website = await Website.create({

      user: user._id,

      title: prompt.slice(0, 60),

      latestCode: parsed.code,

      conversation: [
         {

          role: "user",

          content: prompt

        },

        {

          role: "ai",

          content: parsed.message

        }

       

      ]

    });



    console.log("WEBSITE CREATED:", website._id);



    user.credits = user.credits - 50;



    await user.save();



    console.log("CREDITS UPDATED:", user.credits);



    return res.status(201).json({

      websiteId: website._id,

      remainingCredits: user.credits

    });



  } catch (error) {

    console.error("GENERATE WEBSITE ERROR:", error);



    return res.status(500).json({

      message: error.message

    });

  }

};



export const getWebsiteById = async (req, res) => {

  try {

    const website = await Website.findOne({

      _id: req.params.id,

      user: req.user._id

    });



    if (!website) {

      return res.status(400).json({

        message: "website not found"

      });

    }



    return res.status(200).json(website);



  } catch (error) {

    console.error("GET WEBSITE BY ID ERROR:", error);



    return res.status(500).json({

      message: error.message

    });

  }

};



export const changes = async (req, res) => {

  try {

    const { prompt } = req.body;



    if (!prompt) {

      return res.status(400).json({

        message: "prompt is required"

      });

    }



    const website = await Website.findOne({

      _id: req.params.id,

      user: req.user._id

    });



    if (!website) {

      return res.status(400).json({

        message: "website not found"

      });

    }



    const user = await User.findById(req.user._id);



    console.log("USER:", user);



    if (!user) {

      return res.status(400).json({

        message: "user not found"

      });

    }



    if (user.credits < 25) {

      return res.status(400).json({

        message: "you have not enough credits to generate a website"

      });

    }



    const updatePrompt =

`UPDATE THIS HTML WEBSITE.



CURRENT CODE:

${website.latestCode}



USER REQUEST:

${prompt}



IMPORTANT UPDATE RULES:



\- Preserve the existing professional header and navigation.

\- Preserve the existing hero section unless the user specifically asks to change it.

\- Preserve the existing calculator or requested main functionality unless the user specifically asks to change it.

\- Preserve About, Services/Features, Contact and Footer sections unless the user asks to modify them.

\- If About or Services/Features sections are missing from the current website, ADD them without changing the existing design or functionality.

\- If Services is missing from the navbar, ADD a Services navigation link and connect it to the Services/Features section.

\- Make sure About, Services/Features and Contact are actually rendered as visible sections in the HTML.

\- Do not remove existing functionality unless the user explicitly asks.

\- Make only the changes requested by the user.

\- Keep the website responsive.

\- Keep the website visually professional and production-ready.

\- Ensure all existing JavaScript functionality continues to work.

\- Maintain the existing brand/product identity unless the user asks to change it.

\- Return the COMPLETE updated HTML document, not only the changed part.



RETURN RAW JSON ONLY:

{

  "message":"Short confirmation",

  "code":"\<UPDATED FULL HTML>"

}`;



    let raw = "";

    let parsed = null;



    for (let i = 0; i < 2 && !parsed; i++) {

      raw = await generateResponse(updatePrompt);



      console.log("AI RAW RESPONSE:", raw);



      parsed = await extractJson(raw);



      if (!parsed) {

        raw = await generateResponse(

          updatePrompt + "\n\nRETURN ONLY RAW JSON."

        );



        console.log("AI SECOND RESPONSE:", raw);



        parsed = await extractJson(raw);

      }



      console.log("PARSED RESPONSE:", parsed);

    }



    if (
  !parsed ||
  typeof parsed.code !== "string" ||
  !parsed.code.trim()
) {
  console.log("AI RETURNED INVALID RESPONSE");

  return res.status(400).json({
    message: "AI returned an invalid response. Please try again."
  });
}

const updatedHtml = parsed.code.trim();

const requiredHtmlTags = [
  /<html\b/i,
  /<\/html\s*>/i,
  /<head\b/i,
  /<\/head\s*>/i,
  /<body\b/i,
  /<\/body\s*>/i
];

const isCompleteHtml = requiredHtmlTags.every((tag) =>
  tag.test(updatedHtml)
);

if (!isCompleteHtml) {
  console.log("AI RETURNED INCOMPLETE UPDATED HTML");

  return res.status(400).json({
    message: "AI generated incomplete HTML. Please try again."
  });
}

parsed.code = updatedHtml;

    website.conversation.push(



      {

        role: "user",

        content: prompt

      },

      {

        role: "ai",

        content: parsed.message

      }

    );



    website.latestCode = parsed.code;



    await website.save();



    user.credits = user.credits - 25;



    await user.save();



    console.log("CREDITS UPDATED:", user.credits);



    return res.status(200).json({

      message: parsed.message,

      code: parsed.code,

      remainingCredits: user.credits

    });



  } catch (error) {

    return res.status(500).json({

      message: `update website error ${error}`

    });

  }

};



export const getAll = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        message: "User not authenticated. Please login again."
      });
    }

    const websites = await Website.find({
      user: req.user._id
    });

    return res.status(200).json(websites);
  } catch (error) {
    console.error("GET ALL WEBSITES ERROR:", error);

    return res.status(500).json({
      message: `get all websites error: ${error.message}`
    });
  }
};

export const deploy=async (req,res)=>{
  try{
    const website = await Website.findOne({
       _id: req.params.id,
       user: req.user._id
   })
     if (!website) {
      return res.status(400).json({message: "website not found"})

    }

    if(!website.slug){
      website.slug=website.title.toLowerCase().replace(/[^a-z0-9]/g,"").slice(0,60)+website._id.toString().slice(-5)
    }
    website.deployed=true
    website.deployUrl=`${process.env.FRONTEND_URL}/site/${website.slug}`
    await website.save()
    return res.status(200).json({
      url:website.deployUrl
    })

 } catch (error){
    return res.status(500).json({message:`deploy  website error ${error}`})
  }
}

export const getBySlug = async (req, res) => {
  try {
    const website = await Website.findOne({
      slug: req.params.slug,
      deployed: true
    }).select("title latestCode slug deployUrl deployed");

    if (!website) {
      return res.status(404).json({
        message: "Website not found"
      });
    }

    return res.status(200).json(website);
  } catch (error) {
    console.error("GET BY SLUG ERROR:", error);

    return res.status(500).json({
      message: "Failed to load website"
    });
  }
};