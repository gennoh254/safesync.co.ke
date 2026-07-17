import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send } from 'lucide-react';
import { useState } from 'react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    { sender: 'bot', text: 'Hello! I am Nuru, your SafeSync AI assistant. I am here to help you navigate emergencies, provide first aid guidance, and answer any questions about SafeSync’s services. How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }, { sender: 'bot', text: '' }]);
    setInput('');
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      
      if (!res.ok) {
        if (res.status === 403) {
            setMessages((prev) => [...prev.slice(0, -1), { sender: 'bot', text: 'The AI assistant service is currently unavailable. Please check your Gemini API key in the project settings.' }]);
        } else {
            setMessages((prev) => [...prev.slice(0, -1), { sender: 'bot', text: 'Sorry, I am having trouble connecting right now.' }]);
        }
        return;
      }
      
      if (!res.body) return;
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const textChunk = decoder.decode(value, { stream: true });
        
        setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1].text += textChunk;
            return next;
        });
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev.slice(0, -1), { sender: 'bot', text: 'Sorry, I am having trouble connecting right now.' }]);
    }
  };

  return (
    <>
      <motion.button
        className="fixed bottom-32 left-8 z-[9999] bg-primary text-white p-3 shadow-xl hover:bg-primary-dark transition-all duration-300 rounded-full ring-4 ring-primary/30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
      >
        <Bot className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-32 left-8 w-80 h-96 bg-white shadow-2xl rounded-2xl z-[10000] flex flex-col overflow-hidden border border-outline-variant"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="bg-primary p-4 text-white flex justify-between items-center">
                <span className="font-bold">Nuru</span>
                <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto text-sm text-on-surface flex flex-col gap-2">
                {messages.map((m, i) => (
                    <div key={i} className={`p-2 rounded-lg ${m.sender === 'user' ? 'bg-primary/10 self-end' : 'bg-surface-variant self-start'}`}>
                        {m.text}
                    </div>
                ))}
            </div>
            <div className="p-4 border-t border-outline-variant flex gap-2">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type message..." 
                    className="flex-1 p-2 border border-outline-variant text-sm rounded-lg" 
                />
                <button onClick={handleSend} className="bg-primary text-white p-2 rounded-lg"><Send className="w-4 h-4" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
