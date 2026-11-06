
import { useState } from "react";
import "./App.css";
import astra from "./assets/astra.png";

function App() {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    console.log("User prompt:", prompt);
    setPrompt("");
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

        <span className="status">
          <span className="status-dot"></span>
          AI Ready
        </span>
      </header>

      <main className="chat-container">
        <section className="welcome">
          <div className="welcome-logo">
            <img src={astra} alt="ASTRA" />
          </div>

          <h1>Welcome to ASTRA</h1>
          <p>Your intelligent AI assistant. What can I help you with today?</p>
        </section>

        <section className="messages">
          {/* Chat messages will appear here */}
        </section>

        <form className="prompt-form" onSubmit={handleSubmit}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask ASTRA anything..."
            rows={1}
          />

          <button type="submit" disabled={!prompt.trim()}>
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
