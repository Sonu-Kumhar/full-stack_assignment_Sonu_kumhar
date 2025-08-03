🧠 iTask – AI-Powered To-Do & Query Assistant
iTask is a smart and responsive full-stack task management web application powered by AI integration. Built with React, Tailwind CSS, and Express.js, it enables users to create, manage, and interact with tasks effortlessly. AI on the backend provides smart suggestions and automation for task-related actions.

🔧 Features
✅ Create, update, and delete tasks

🤖 AI-powered suggestions and interactions

💾 Persistent storage using MongoDB or local storage

⚡ Fast, optimized UI with responsive design

🌐 Full-stack integration: React frontend + Node/Express backend

💻 Tech Stack
Frontend:
React.js

Tailwind CSS

UUID (for unique task IDs)

Vite (for fast development and build)

Backend:
Node.js

Express.js

dotenv (for managing environment variables)

AI integration (e.g., OpenAI API or custom ML logic)

📁 Folder Structure
bash
Copy
Edit
iTask/
├── backend/              # Express server + AI integration
│   ├── routes/           # API routes
│   ├── controllers/      # Logic for task handling and AI
│   └── server.js         # Entry point
│
├── frontend/             # React app (created with Vite)
│   ├── components/       # Reusable React components
│   ├── assets/           # Icons, sounds, images
│   ├── App.jsx           # Main React component
│   └── main.jsx          # Vite entry file
│
├── .env                  # Environment variables
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
🚀 Getting Started
1. Clone the repo
bash
Copy
Edit
git clone https://github.com/Sonu-Kumhar/full-stack_assignment_Sonu_kumhar.git
cd iTask
2. Install dependencies
bash
Copy
Edit
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
3. Run the app
bash
Copy
Edit
# Start backend
cd backend
npm run dev

# Start frontend (in another terminal)
cd frontend
npm run dev
🙌 Contribution
Feel free to fork, raise issues, or contribute!

