# ASTRA – AI Chatbot

ASTRA is a simple AI-powered chatbot built with React and Ollama. It allows users to interact with a locally running AI model directly through a web-based chat interface.

The application demonstrates how to integrate a locally hosted Large Language Model (LLM) into a React application, creating a chatbot experience without relying on external AI APIs.

## 🚀 Features

- **AI-Powered Conversations:** Chat with an AI model running locally through Ollama.
- **Interactive Chat Interface:** User messages and AI responses are displayed in a conversational layout.
- **Loading Indicator:** Displays a loading spinner while waiting for the AI response.
- **Response Duration:** Displays the total time taken by the AI to generate a response.
- **Tokens Per Second:** Shows the AI model's generation speed.
- **System Message:** Defines ASTRA's identity, purpose, and the user it assists.
- **Conversation History:** Saves chat messages in browser localStorage.
- **Persistent Conversations:** Restores previous messages after refreshing the page.
- **Local AI Processing:** Uses Ollama to run the language model locally.

## 🛠️ Technologies Used

- React
- TypeScript
- Vite
- CSS
- Ollama
- TinyLlama AI Model
- Browser localStorage
- Ollama REST API

## 📋 Prerequisites

Before running ASTRA, make sure you have installed:

- [Node.js](https://nodejs.org/)
- [Ollama](https://ollama.com/download/windows)
- npm (included with Node.js)

## ⚙️ Installation and Setup

### 1. Clone the Repository


git clone YOUR_GITHUB_REPOSITORY_URL


Navigate into the project folder:


cd astra-ai


### 2. Install Dependencies


npm install


### 3. Install Ollama

Download and install Ollama from:

https://ollama.com/download/windows

### 4. Download the AI Model

This project uses TinyLlama, a lightweight AI model.


ollama pull tinyllama


To verify that the model has been downloaded:


ollama list


### 5. Run Ollama

Make sure Ollama is running in the background.

The application communicates with Ollama through:


http://localhost:11434/api/generate


### 6. Start the React Application

Run:


npm run dev


Open the local development URL displayed in your terminal, usually:


localhost:5175/


## 🧠 System Message

ASTRA uses a system message to define its role and behaviour.

Example:


const systemMessage =
  "You are ASTRA, a helpful AI assistant designed to assist the user with questions, learning, and everyday tasks.";


The system message is included in requests sent to Ollama.

## 🔌 Ollama API Integration

ASTRA sends requests to Ollama using the following endpoint:

```text
POST http://localhost:11434/api/generate
```

Example request:

```json
{
  "model": "tinyllama",
  "system": "You are ASTRA, a helpful AI assistant.",
  "prompt": "What is React?",
  "stream": false
}
```

Ollama processes the prompt and returns an AI-generated response together with performance information.

## 📊 Performance Information

ASTRA displays two performance measurements beneath AI responses:

- **Total Duration:** The total time taken to generate the response.
- **Tokens Per Second:** The number of tokens generated per second.

These values are calculated using Ollama's API response.

## 💾 LocalStorage

ASTRA uses browser localStorage to save conversation history.

This allows users to:

- Save their chat messages.
- Restore previous conversations after refreshing the page.
- Continue conversations without losing previously displayed messages.

## 📁 Project Structure

astra-ai/
│
├── public/
│   ├── astra-logo.svg
│   ├── astra-icon.svg
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── Chat/
│   │   ├── ChatMessage/
│   │   └── LoadingSpinner/
│   │
│   ├── services/
│   │   └── ollama.ts
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
│
├── index.html
├── package.json
└── README.md


## 📚 Learning Objectives

This project demonstrates practical experience with:

1. Integrating React with a locally hosted AI model.
2. Working with REST APIs and asynchronous requests.
3. Managing application state in React.
4. Implementing loading indicators.
5. Calculating AI response performance metrics.
6. Using system messages to control AI behaviour.
7. Persisting application data using localStorage.

## 👩‍💻 Author

**Your Name**

ASTRA – AI Chatbot Project


*Built with React, TypeScript, and Ollama.*