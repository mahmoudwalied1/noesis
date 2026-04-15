import { useState } from 'react';
import ChatPanel from './ChatPanel';
import MembersPanel from './MembersPanel';
import SharedResources from './SharedResources';

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

interface ActiveRoomProps {
  room: Room;
  currentUser: Member;
  onLeave: () => void;
  teamMembers: Member[];
}

export default function ActiveRoom({ room, currentUser, onLeave, teamMembers }: ActiveRoomProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'members' | 'resources'>('chat');

  return (
    <div className="space-y-6">
      {/* Room Header */}
      <div className="glass-card rounded-2xl p-6 border border-stellar-aqua/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold font-montserrat bg-gradient-to-r from-stellar-aqua to-nebula-purple bg-clip-text text-transparent">
                {room.name}
              </h2>
              <div className="flex items-center gap-2 glass-card px-3 py-1 rounded-full border border-green-500/30">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-semibold text-green-400">Live</span>
              </div>
            </div>
            <p className="text-gray-400 font-inter flex items-center gap-2">
              <i className="ri-book-open-line text-nebula-purple"></i>
              {room.topic}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="glass-card px-4 py-2 rounded-full border border-stellar-aqua/30">
              <span className="text-sm font-inter text-gray-300">
                <strong className="text-stellar-aqua">{room.members.length}</strong>/{room.maxMembers} Members
              </span>
            </div>
            <button
              onClick={onLeave}
              className="px-6 py-3 rounded-xl glass-card border border-red-500/30 hover:bg-red-500/20 transition-all duration-300 font-semibold font-inter text-sm cursor-pointer whitespace-nowrap text-red-400 hover:text-red-300 flex items-center gap-2"
            >
              <i className="ri-logout-box-line text-lg"></i>
              Leave Room
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="glass-card rounded-2xl p-2 border border-stellar-aqua/20 flex gap-2">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 px-6 py-3 rounded-xl font-semibold font-inter text-sm cursor-pointer whitespace-nowrap transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === 'chat'
              ? 'bg-gradient-to-r from-stellar-aqua to-nebula-purple shadow-neon-cyan'
              : 'hover:bg-white/5'
          }`}
        >
          <i className="ri-chat-3-line text-lg"></i>
          Chat
        </button>
        <button
          onClick={() => setActiveTab('members')}
          className={`flex-1 px-6 py-3 rounded-xl font-semibold font-inter text-sm cursor-pointer whitespace-nowrap transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === 'members'
              ? 'bg-gradient-to-r from-stellar-aqua to-nebula-purple shadow-neon-cyan'
              : 'hover:bg-white/5'
          }`}
        >
          <i className="ri-team-line text-lg"></i>
          Members
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={`flex-1 px-6 py-3 rounded-xl font-semibold font-inter text-sm cursor-pointer whitespace-nowrap transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === 'resources'
              ? 'bg-gradient-to-r from-stellar-aqua to-nebula-purple shadow-neon-cyan'
              : 'hover:bg-white/5'
          }`}
        >
          <i className="ri-folder-shared-line text-lg"></i>
          Resources
        </button>
      </div>

      {/* Tab Content */}
      <div className="glass-card rounded-2xl border border-stellar-aqua/20 overflow-hidden">
        {activeTab === 'chat' && <ChatPanel room={room} currentUser={currentUser} />}
        {activeTab === 'members' && <MembersPanel room={room} currentUser={currentUser} teamMembers={teamMembers} />}
        {activeTab === 'resources' && <SharedResources room={room} currentUser={currentUser} />}
      </div>
    </div>
  );
}
