# SitePilot AI 🚀

**Build, customize, and share websites using AI.**

SitePilot AI is an AI-powered website builder that helps users turn their ideas into website code using natural-language prompts. Users can generate websites, refine them through AI-powered conversations, preview their work, and manage their projects through a dashboard.

## ✨ Features

- **AI Website Generation** — Generate website code from text prompts.
- **AI-Powered Editing** — Improve generated websites using conversational instructions.
- **Live Preview** — Preview website output in the browser.
- **User Authentication** — Sign in using Google authentication.
- **Dashboard** — Access and manage generated website projects.
- **Credit-Based Usage** — Track AI generation credits.
- **Pricing Plans** — View available plans.
- **Payment Integration** — Stripe integration for billing.
- **Responsive Interface** — A modern interface built with React and Tailwind CSS.

## 🛠️ Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- Redux Toolkit
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

**AI & Integrations**
- OpenRouter API
- Firebase Authentication
- Stripe

## 📁 Project Structure

```text
SitePilot-AI/
├── client/          # React frontend
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       └── redux/
├── server/          # Express backend
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

- Node.js and npm
- MongoDB connection
- OpenRouter API key
- Firebase project configured for Google authentication
- Stripe credentials if using payment features

### 1. Clone the repository

```bash
git clone https://github.com/nikishukla319-ai/SitePilot-AI.git
cd SitePilot-AI
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Configure frontend environment variables

Create a `.env` file inside `client/` and add the environment variable names required by your frontend Firebase configuration.

### 4. Install backend dependencies

Open another terminal at the project root:

```bash
cd server
npm install
```

Create a `.env` file inside `server/` and configure the variables required by the backend, such as:

```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
OPENROUTER_API_KEY=your_openrouter_api_key
```

Add any additional Firebase or Stripe variables required by your implementation. Use the exact variable names expected by your code.

**Security:** Never commit `.env` files, API keys, database credentials, or Stripe secret keys to GitHub.

### 5. Run the application

Start the backend using the script configured in `server/package.json`, for example:

```bash
npm run dev
```

Start the frontend in a separate terminal:

```bash
cd client
npm run dev
```

Open the local URL printed by Vite in your terminal.

## 🔐 Environment Variables

The application may require configuration for:

- MongoDB connection
- OpenRouter API
- Firebase authentication
- Stripe billing and webhooks

Set these variables locally. Do not publish their secret values.

## 🚧 Future Improvements

- Add automated tests for core workflows.
- Improve error handling and loading states.
- Add more website templates and customization options.
- Improve deployment and website publishing workflows.
- Strengthen API validation and security.

## 👩‍💻 Author

**Nikita Shukla**

- GitHub: [@nikishukla319-ai](https://github.com/nikishukla319-ai)

---

*SitePilot AI — From idea to website with AI.*
