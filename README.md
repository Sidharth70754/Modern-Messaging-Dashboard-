# Modern Messaging Dashboard

A full-stack real-time chat application with AI integration, built using React, Node.js, and Socket.IO.

Highlights:

- 🌟 Tech stack: MERN + Socket.io + TailwindCSS + Daisy UI
- 🎃 Authentication && Authorization with JWT
- 👾 Real-time messaging with Socket.io
- 🚀 Online user status
- 👌 Global state management with Zustand
- 🐞 Error handling both on the server and on the client
- 🤖 AI Chat Integration
- ⭐ Production-ready deployment
- ⏳ And much more!

## Features

- 🔐 **Authentication System**
  - User registration and login
  - JWT-based authentication
  - Secure password handling

- 💬 **Real-time Messaging**
  - Instant message delivery
  - Online/offline status indicators
  - Message history
  - Typing indicators

- 🤖 **AI Chat Assistant**
  - Floating AI chat button accessible from any page
  - Real-time AI responses
  - Context-aware conversations
  - Toggleable chat window

- 🎨 **Modern UI/UX**
  - Responsive design
  - Dark/Light theme support
  - Smooth animations
  - User-friendly interface

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- DaisyUI
- Zustand (State Management)
- Socket.IO Client
- React Router DOM
- React Icons
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Socket.IO
- JWT Authentication
- OpenAI API Integration

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- OpenAI API Key

### Setup .env file
```js
MONGODB_URI=your_mongodb_uri
PORT=5001
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

NODE_ENV=development
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/Sidharth70754/Modern-Messaging-Dashboard-.git
cd Modern-Messaging-Dashboard-
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Build the app
```bash
npm run build
```

4. Start the app
```bash
npm start
```

## Project Structure

```
Modern-Messaging-Dashboard/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── store/
    │   └── App.jsx
    └── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
