import { useState } from 'react';

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

interface Resource {
  id: number;
  name: string;
  type: 'note' | 'quiz' | 'flashcard' | 'mindmap' | 'file';
  sharedBy: Member;
  sharedAt: Date;
  size?: string;
}

interface SharedResourcesProps {
  room: Room;
  currentUser: Member;
}

export default function SharedResources({ room, currentUser }: SharedResourcesProps) {
  const [resources] = useState<Resource[]>([
    {
      id: 1,
      name: 'OOP Fundamentals Notes',
      type: 'note',
      sharedBy: room.host,
      sharedAt: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      name: 'Inheritance Quiz',
      type: 'quiz',
      sharedBy: room.members[1] || room.host,
      sharedAt: new Date(Date.now() - 7200000)
    },
    {
      id: 3,
      name: 'Polymorphism Flashcards',
      type: 'flashcard',
      sharedBy: currentUser,
      sharedAt: new Date(Date.now() - 10800000)
    },
    {
      id: 4,
      name: 'Class Diagram Mind Map',
      type: 'mindmap',
      sharedBy: room.members[2] || room.host,
      sharedAt: new Date(Date.now() - 14400000)
    }
  ]);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'note': return 'ri-file-text-line';
      case 'quiz': return 'ri-question-answer-line';
      case 'flashcard': return 'ri-stack-line';
      case 'mindmap': return 'ri-mind-map';
      case 'file': return 'ri-file-line';
      default: return 'ri-file-line';
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'note': return 'text-stellar-aqua';
      case 'quiz': return 'text-nebula-purple';
      case 'flashcard': return 'text-pink-bright';
      case 'mindmap': return 'text-yellow-400';
      case 'file': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Upload Section */}
      <div className="glass-card rounded-xl p-6 border border-stellar-aqua/30 bg-gradient-to-br from-stellar-aqua/5 to-nebula-purple/5">
        <h3 className="text-lg font-bold font-montserrat text-white mb-4 flex items-center gap-2">
          <i className="ri-upload-cloud-line text-stellar-aqua"></i>
          Share Resources
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="glass-card rounded-xl p-4 border border-stellar-aqua/30 hover:border-stellar-aqua hover:bg-stellar-aqua/10 transition-all duration-300 cursor-pointer group">
            <i className="ri-file-text-line text-3xl text-stellar-aqua mb-2 group-hover:scale-110 transition-transform"></i>
            <p className="text-xs font-semibold font-inter text-white">Share Note</p>
          </button>
          <button className="glass-card rounded-xl p-4 border border-nebula-purple/30 hover:border-nebula-purple hover:bg-nebula-purple/10 transition-all duration-300 cursor-pointer group">
            <i className="ri-question-answer-line text-3xl text-nebula-purple mb-2 group-hover:scale-110 transition-transform"></i>
            <p className="text-xs font-semibold font-inter text-white">Share Quiz</p>
          </button>
          <button className="glass-card rounded-xl p-4 border border-pink-bright/30 hover:border-pink-bright hover:bg-pink-bright/10 transition-all duration-300 cursor-pointer group">
            <i className="ri-stack-line text-3xl text-pink-bright mb-2 group-hover:scale-110 transition-transform"></i>
            <p className="text-xs font-semibold font-inter text-white">Share Cards</p>
          </button>
          <button className="glass-card rounded-xl p-4 border border-yellow-400/30 hover:border-yellow-400 hover:bg-yellow-400/10 transition-all duration-300 cursor-pointer group">
            <i className="ri-upload-2-line text-3xl text-yellow-400 mb-2 group-hover:scale-110 transition-transform"></i>
            <p className="text-xs font-semibold font-inter text-white">Upload File</p>
          </button>
        </div>
      </div>

      {/* Resources List */}
      <div>
        <h3 className="text-lg font-bold font-montserrat text-white mb-4 flex items-center gap-2">
          <i className="ri-folder-shared-line text-nebula-purple"></i>
          Shared Resources ({resources.length})
        </h3>
        
        {resources.length > 0 ? (
          <div className="space-y-3">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="glass-card rounded-xl p-4 border border-white/10 hover:border-stellar-aqua/40 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl glass-card border border-white/10 flex items-center justify-center ${getResourceColor(resource.type)} group-hover:scale-110 transition-transform`}>
                    <i className={`${getResourceIcon(resource.type)} text-2xl`}></i>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white font-inter mb-1 group-hover:text-stellar-aqua transition-colors">
                      {resource.name}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-inter">
                      <span className="flex items-center gap-1">
                        <img 
                          src={resource.sharedBy.avatar} 
                          alt={resource.sharedBy.name}
                          className="w-4 h-4 rounded-full"
                        />
                        {resource.sharedBy.id === currentUser.id ? 'You' : resource.sharedBy.name}
                      </span>
                      <span>•</span>
                      <span>{formatTimeAgo(resource.sharedAt)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="w-9 h-9 rounded-lg glass-card hover:bg-stellar-aqua/20 transition-all duration-300 flex items-center justify-center cursor-pointer group/btn">
                      <i className="ri-eye-line text-gray-400 group-hover/btn:text-stellar-aqua transition-colors"></i>
                    </button>
                    <button className="w-9 h-9 rounded-lg glass-card hover:bg-nebula-purple/20 transition-all duration-300 flex items-center justify-center cursor-pointer group/btn">
                      <i className="ri-download-line text-gray-400 group-hover/btn:text-nebula-purple transition-colors"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glass-card rounded-xl border border-white/10">
            <i className="ri-folder-open-line text-5xl text-gray-600 mb-4"></i>
            <p className="text-gray-400 font-inter">No resources shared yet</p>
            <p className="text-sm text-gray-500 font-inter mt-2">Be the first to share study materials!</p>
          </div>
        )}
      </div>
    </div>
  );
}
