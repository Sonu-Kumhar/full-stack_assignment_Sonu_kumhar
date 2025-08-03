import { useState } from "react";
import ChatWindow from "./ChatWindow";
import { BotIcon } from "lucide-react";

export default function Assistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="bg-purple-700 hover:bg-purple-800 text-white p-4 rounded-full shadow-lg animate-bounce"
        >
          <BotIcon size={24} />
        </button>
      </div>

      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </>
  );
}
