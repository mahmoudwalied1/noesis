import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function VoiceChat() {
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const participants = [
    { id: '1', name: 'Sarah Chen', avatar: 'SC', status: 'speaking', subject: 'Data Structures' },
    { id: '2', name: 'Mike Johnson', avatar: 'MJ', status: 'listening', subject: 'Algorithms' },
    { id: '3', name: 'Emma Davis', avatar: 'ED', status: 'muted', subject: 'OOP Concepts' },
    { id: '4', name: 'Alex Kumar', avatar: 'AK', status: 'listening', subject: 'System Design' },
    { id: '5', name: 'Lisa Wang', avatar: 'LW', status: 'speaking', subject: 'Web Development' }
  ];

  const messages = [
    { user: 'Sarah Chen', message: 'Can someone explain binary search trees?', time: '2:45 PM' },
    { user: 'Mike Johnson', message: 'Sure! Let me share my notes on that', time: '2:46 PM' },
    { user: 'Emma Davis', message: 'I have a great visualization for BST', time: '2:47 PM' },
    { user: 'You', message: 'Thanks everyone! This is really helpful', time: '2:48 PM' }
  ];

  return (
    <div className="bg-[#0A0E27] text-white min-h-screen">
      <Navbar scrolled={true} />
      
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/"
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-[#151B3B]/60 border border-[#22D3EE]/30 hover:bg-[#4A9FD8]/30 transition-all cursor-pointer group"
          >
            <i className="ri-arrow-left-line text-[#22D3EE] group-hover:-translate-x-1 transition-transform"></i>
            <span className="text-sm font-['Inter'] text-gray-300">Back to Home</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Montserrat']">
              Voice <span className="bg-gradient-to-r from-[#22D3EE] to-[#EC4899] bg-clip-text text-transparent">Chat</span>
            </h1>
            <p className="text-base text-gray-400 font-['Inter']">
              Communicate with your study group in real-time
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Voice Participants */}
            <div className="lg:col-span-1">
              <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
                <h3 className="text-xl font-semibold mb-4 font-['Montserrat']">Participants (5)</h3>
                <div className="space-y-3">
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      onClick={() => setSelectedUser(participant.id)}
                      className={`p-4 rounded-2xl cursor-pointer transition-all ${
                        selectedUser === participant.id
                          ? 'bg-gradient-to-r from-[#4A9FD8] to-[#8B5CF6]'
                          : 'bg-[#0A0E27]/50 border border-[#4A9FD8]/20 hover:border-[#22D3EE]/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#22D3EE] to-[#8B5CF6] font-semibold ${
                          participant.status === 'speaking' ? 'ring-4 ring-[#22D3EE]/50 animate-pulse' : ''
                        }`}>
                          {participant.avatar}
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full border-2 border-[#151B3B] ${
                            participant.status === 'speaking' ? 'bg-[#22D3EE]' :
                            participant.status === 'muted' ? 'bg-gray-500' : 'bg-green-500'
                          }`}>
                            {participant.status === 'muted' && (
                              <i className="ri-mic-off-line text-xs"></i>
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm font-['Inter']">{participant.name}</h4>
                          <p className="text-xs text-gray-400">{participant.subject}</p>
                        </div>
                        {participant.status === 'speaking' && (
                          <div className="flex gap-1">
                            <div className="w-1 h-4 bg-[#22D3EE] rounded-full animate-pulse"></div>
                            <div className="w-1 h-6 bg-[#22D3EE] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-1 h-4 bg-[#22D3EE] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Voice Controls */}
                <div className="mt-6 pt-6 border-t border-[#4A9FD8]/30">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`w-14 h-14 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                        isMuted 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : 'bg-[#4A9FD8]/30 hover:bg-[#4A9FD8]/50'
                      }`}
                    >
                      <i className={`${isMuted ? 'ri-mic-off-line' : 'ri-mic-line'} text-xl`}></i>
                    </button>
                    <button
                      onClick={() => setIsDeafened(!isDeafened)}
                      className={`w-14 h-14 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                        isDeafened 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : 'bg-[#4A9FD8]/30 hover:bg-[#4A9FD8]/50'
                      }`}
                    >
                      <i className={`${isDeafened ? 'ri-volume-mute-line' : 'ri-volume-up-line'} text-xl`}></i>
                    </button>
                    <button className="w-14 h-14 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition-all cursor-pointer">
                      <i className="ri-phone-line text-xl"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="lg:col-span-2">
              <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6 h-[600px] flex flex-col">
                <h3 className="text-xl font-semibold mb-4 font-['Montserrat']">Text Chat</h3>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.user === 'You' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${
                        msg.user === 'You' 
                          ? 'bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6]' 
                          : 'bg-[#0A0E27]/50 border border-[#4A9FD8]/20'
                      } rounded-2xl p-4`}>
                        {msg.user !== 'You' && (
                          <p className="text-xs text-[#22D3EE] mb-1 font-semibold font-['Inter']">{msg.user}</p>
                        )}
                        <p className="text-sm font-['Inter']">{msg.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 rounded-full bg-[#0A0E27]/50 border border-[#4A9FD8]/30 focus:border-[#22D3EE] focus:outline-none text-sm font-['Inter']"
                  />
                  <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-lg transition-all cursor-pointer">
                    <i className="ri-send-plane-fill text-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
