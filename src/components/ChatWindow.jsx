import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/ask", { question: input });
      const botMsg = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Failed to fetch response." },
      ]);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 w-80 background-color: rgba(19, 7, 48, 1) border-[rgba(137,77,143,1)] text-black border rounded-xl shadow-lg p-4 max-h-[500px] flex flex-col z-50">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-lg text-white ">💬 Assistant</h2>
        <button onClick={onClose} className="text-red-500 font-bold text-sm">✖</button>
      </div>

      <div className="scrollbar-purple flex-1 overflow-y-auto flex flex-col gap-2 mb-2 background-color: rgba(19, 7, 48, 1) text-black">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-sm px-3 py-2 rounded-md max-w-[85%] whitespace-pre-wrap break-words ${
              msg.sender === "user"
                ? "bg-purple-600 text-white self-end"
                : " text-white self-start border-1 border-purple-600"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 mt-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border text-white border-purple-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Ask me anything..."
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-md text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}
