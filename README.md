# SitePilot AI 🚀

**Build, customize, and share websites using AI.**

SitePilot AI is an AI-powered website builder that helps users turn their ideas into website code using natural-language prompts. Generate websites, refine them through AI-powered conversations, preview your work, and manage projects through a dashboard.

## ✨ Features

- **AI Website Generation:** Generate website code from text prompts.
- **AI-Powered Editing:** Improve generated websites using conversational instructions.
- **Live Preview:** Preview generated websites in the browser.
- **User Authentication:** Google sign-in using Firebase Authentication.
- **Dashboard:** Access and manage generated website projects.
- **Credit-Based Usage:** Track AI generation credits.
- **Pricing Plans:** View available plans.
- **Payment Integration:** Stripe billing integration.
- **Responsive Interface:** Modern user interface built with React and Tailwind CSS.

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Redux Toolkit
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### AI and Integrations
- OpenRouter API
- Firebase Authentication
- Stripe

## 📁 Project Structure

```text
SitePilot-AI/
├── client/
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       └── redux/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── utils/
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Before running the project, make sure you have:

- Node.js and npm installed
- A MongoDB database connection
- An OpenRouter API key
- A Firebase project configured for Google authentication
- Stripe credentials if using billing features

### 1. Clone the Repository

```bash
git clone https://github.com/nikishukla319-ai/SitePilot-AI.git
cd SitePilot-AI
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Configure Frontend Environment Variables

Create a `.env` file inside the `client` directory.

Add the Firebase configuration variables required by your frontend code. Use the exact variable names expected by your implementation.

### 4. Install Backend Dependencies

From the project root, run:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory and configure the required variables.

Example:

```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
OPENROUTER_API_KEY=your_openrouter_api_key
JWT_SECRET=your_long_random_secret
FRONTEND_URL=http://localhost:5173
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

Use the actual frontend URL and the exact environment variable names required by your code. Configure Stripe variables if you use billing and webhook functionality.

### 5. Run the Application

Start the backend using the development script defined in `server/package.json`. For example:

```bash
npm run dev
```

In a separate terminal, start the frontend:

```bash
cd client
npm run dev
```

Open the local URL displayed by Vite in your terminal.

## 🔐 Security

- Never commit `.env` files to GitHub.
- Never expose API keys, database credentials, JWT secrets, or Stripe secret keys.
- Keep private credentials in environment variables.
- Use appropriate environment variables and configuration for production deployments.

## 🚧 Future Improvements

- Add automated tests for core workflows.
- Improve error handling and loading states.
- Introduce additional website templates and customization options.
- Improve deployment and website publishing workflows.
- Strengthen API validation and security.

## 👩‍💻 Author

**Nikita Shukla**

- GitHub: [@nikishukla319-ai](https://github.com/nikishukla319-ai)

---

*SitePilot AI — From idea to website with AI.*
