import { useState, useRef, useEffect } from 'react';

interface Member {
  id: number;
  name: string;
  avatar: string;
  status: string;
}

interface Room {
  id: number;
  name: string;
  topic: string;
  host: Member;
  members: Member[];
  maxMembers: number;
  createdAt: Date;
  isActive: boolean;
}

interface Message {
  id: number;
  sender: Member;
  content: string;
  timestamp: Date;
  type: 'text' | 'system';
}

interface ChatPanelProps {
  room: Room;
  currentUser: Member;
}

export default function ChatPanel({ room, currentUser }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: room.host,
      content: `Welcome to ${room.name}! Let's study ${room.topic} together.`,
      timestamp: new Date(Date.now() - 300000),
      type: 'text'
    },
    {
      id: 2,
      sender: room.members[1] || room.host,
      content: 'Hey everyone! Ready to dive into this topic?',
      timestamp: new Date(Date.now() - 240000),
      type: 'text'
    },
    {
      id: 3,
      sender: currentUser,
      content: 'Yes! I have some questions about the concepts.',
      timestamp: new Date(Date.now() - 180000),
      type: 'text'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: currentUser,
        content: newMessage,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[600px]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => {
          const isCurrentUser = message.sender.id === currentUser.id;
          
          return (
            <div
              key={message.id}
              className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-stellar-aqua/30">
                  <img 
                    src={message.sender.avatar} 
                    alt={message.sender.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Message Content */}
              <div className={`flex-1 max-w-[70%] ${isCurrentUser ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold font-inter ${
                    isCurrentUser ? 'text-stellar-aqua' : 'text-gray-400'
                  }`}>
                    {isCurrentUser ? 'You' : message.sender.name}
                  </span>
                  <span className="text-xs text-gray-600 font-inter">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <div className={`px-4 py-3 rounded-2xl ${
                  isCurrentUser
                    ? 'bg-gradient-to-r from-stellar-aqua to-nebula-purple text-white rounded-tr-sm'
                    : 'glass-card border border-white/10 rounded-tl-sm'
                }`}>
                  <p className="text-sm font-inter leading-relaxed">{message.content}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-white/10 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 rounded-xl glass-card border border-stellar-aqua/30 bg-deep-space/50 text-white placeholder-gray-500 focus:outline-none focus:border-stellar-aqua transition-all duration-300 text-sm font-inter"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-stellar-aqua to-nebula-purple hover:shadow-neon-cyan transition-all duration-300 font-semibold font-inter text-sm cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <i className="ri-send-plane-fill text-lg"></i>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
