
import { useEffect, useState, type FormEvent } from "react";
import "./App.css";
import astra from "./assets/astra.png";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  duration?: number;
  tokensPerSecond?: number;
}

const USER_NAME = "Nokuphiwa Shange";

const SYSTEM_MESSAGE = `
You are ASTRA, a personal AI assistant.

IDENTITY:
Your name is ASTRA.
You are an intelligent and helpful AI assistant.

USER INFORMATION:
The user's full name is ${USER_NAME}.
When asked who the user is, identify them as ${USER_NAME}.
Never confuse your identity with the user's identity.

YOUR PURPOSE:
Your purpose is to:
1. Help with programming and software development.
2. Explain code and solve programming errors.
3. Support education and learning.
4. Answer general knowledge questions.
5. Explain technology and artificial intelligence.
6. Help with problem-solving and creative thinking.
7. Provide clear, accurate, step-by-step guidance.

IDENTITY QUESTIONS:

If asked "Who are you?" or "What is your name?":
Say: "I am ASTRA, your personal AI assistant. I help with programming, learning, answering questions and solving problems."

If asked "Who am I?" or "What is my name?":
Say: "You are ${USER_NAME}, the person I am assisting."

If asked "What is your purpose?" or "What do you do?":
Explain that your purpose is to help with programming, education, technology, answering questions, explaining concepts and solving problems.

BEHAVIOUR:
- Understand the user's question before answering.
- Answer the actual question directly.
- Do not provide unrelated answers.
- Use simple and understandable language.
- Be friendly, professional and informative.
- Maintain the conversation context.
- Never invent personal information.
- If you do not know something, be honest.
- Always identify yourself as ASTRA.
`;

function App() {
  const [prompt, setPrompt] = useState("");

  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const savedMessages = localStorage.getItem("astra-chat");
      return savedMessages ? JSON.parse(savedMessages) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);

  // SAVE CONVERSATION HISTORY
  useEffect(() => {
    localStorage.setItem("astra-chat", JSON.stringify(messages));
  }, [messages]);

  // START A NEW CHAT
  const startNewChat = () => {
    if (loading) return;

    setMessages([]);
    setPrompt("");
    localStorage.removeItem("astra-chat");
  };

  // SEND MESSAGE TO OLLAMA
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!prompt.trim() || loading) return;

    const userPrompt = prompt.trim();

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: userPrompt,
    };

    setMessages((previous) => [...previous, userMessage]);
    setPrompt("");
    setLoading(true);

    // PREPARE CONVERSATION HISTORY
    const chatMessages = [
      {
        role: "system",
        content: SYSTEM_MESSAGE,
      },
      ...messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
      {
        role: "user",
        content: userPrompt,
      },
    ];

    try {
      const response = await fetch(
        "http://localhost:11434/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "qwen2.5:0.5b",
            messages: chatMessages,
            stream: false,
            options: {
              temperature: 0.2,
              num_predict: 200,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Ollama error: ${response.status}`);
      }

      const data = await response.json();

      // RESPONSE METRICS
      const duration = data.total_duration
        ? data.total_duration / 1_000_000_000
        : 0;

      const tokensPerSecond =
        data.eval_duration && data.eval_count
          ? data.eval_count /
            (data.eval_duration / 1_000_000_000)
          : 0;

      // ASTRA RESPONSE
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.message.content.trim(),
        duration,
        tokensPerSecond,
      };

      setMessages((previous) => [...previous, assistantMessage]);
    } catch (error) {
      console.error("Ollama connection error:", error);

      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "Sorry, I could not connect to Ollama. Please check that Ollama is running and try again.",
      };

      setMessages((previous) => [...previous, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="brand">
          <div className="logo">
            <img src={astra} alt="Astra Logo" />
          </div>
          <h2>ASTRA</h2>
        </div>

        <div className="navbar-actions">
          <button
            className="new-chat-btn"
            onClick={startNewChat}
            disabled={loading}
            type="button"
          >
            + New Chat
          </button>

          <span className="status">
            <span className="status-dot"></span>
            {loading ? "Thinking..." : "AI Ready"}
          </span>
        </div>
      </header>

      <main className="chat-container">
        {messages.length === 0 && (
          <section className="welcome">
            <div className="welcome-logo">
              <img src={astra} alt="ASTRA" />
            </div>

            <h1>Welcome to ASTRA</h1>
            <p>
              Your intelligent AI assistant. What can I help you with today?
            </p>
          </section>
        )}

        <section className="messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-row ${message.role}`}
            >
              <div className="message-bubble">
                <p>{message.content}</p>
              </div>

              {message.role === "assistant" &&
                message.duration !== undefined && (
                  <div className="message-metrics">
                    Duration: {message.duration.toFixed(2)} seconds
                    {" · "}
                    Tokens/sec: {message.tokensPerSecond?.toFixed(2) ?? "0"}
                  </div>
                )}
            </div>
          ))}

          {loading && (
            <div className="message-row assistant">
              <div className="message-bubble loading-bubble">
                <span className="spinner"></span>
                ASTRA is thinking...
              </div>
            </div>
          )}
        </section>

        <form className="prompt-form" onSubmit={handleSubmit}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask ASTRA anything..."
            rows={1}
            disabled={loading}
          />

          <button
            type="submit"
            disabled={!prompt.trim() || loading}
          >
            ↑
          </button>
        </form>

        <p className="disclaimer">
          ASTRA can make mistakes. Check important information.
        </p>
      </main>
    </div>
  );
}

export default App;
