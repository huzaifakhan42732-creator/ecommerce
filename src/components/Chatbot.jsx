import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./chatbot.css";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const boxRef = useRef(null);

  useEffect(() => {
    if (boxRef.current)
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [messages]);

  const send = async () => {
    if (!text.trim()) return;

    const userMessage = { role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setText("");

    try {
      const API_KEY = "AIzaSyBOHBecIq9t6D04V215hulBGzeObOqxHBw"; // 👈 Replace this only

      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              role: "user",
              parts: [{ text }],
            },
          ],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const reply =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ No response from AI.";

      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "❌ Error: Could not connect to AI API." },
      ]);
    }
  };

  return (
    <div className={`chatbot-root ${open ? "open" : ""}`}>
      {!open && (
        <div className="chat-toggle" onClick={() => setOpen(true)}>
          💬 Chat
        </div>
      )}

      {open && (
        <div className="chat-panel">
          <div className="chat-header">
            AI Assistant 🤖
            <button className="close-btn" onClick={() => setOpen(false)}>
              ✖
            </button>
          </div>

          <div className="chat-body" ref={boxRef}>
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>
                <div className="bubble">{m.text}</div>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button onClick={send}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
