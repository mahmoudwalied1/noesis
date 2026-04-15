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

interface MembersPanelProps {
  room: Room;
  currentUser: Member;
  teamMembers: Member[];
}

export default function MembersPanel({ room, currentUser, teamMembers }: MembersPanelProps) {
  const availableMembers = teamMembers.filter(
    member => !room.members.some(m => m.id === member.id)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'away': return 'Away';
      default: return 'Offline';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Current Members */}
      <div>
        <h3 className="text-lg font-bold font-montserrat text-white mb-4 flex items-center gap-2">
          <i className="ri-team-line text-stellar-aqua"></i>
          Room Members ({room.members.length}/{room.maxMembers})
        </h3>
        <div className="space-y-3">
          {room.members.map((member) => {
            const isHost = member.id === room.host.id;
            const isCurrentUser = member.id === currentUser.id;
            
            return (
              <div
                key={member.id}
                className="glass-card rounded-xl p-4 border border-stellar-aqua/20 hover:border-stellar-aqua/40 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-stellar-aqua/50">
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-deep-space ${getStatusColor(member.status)}`}></div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-white font-inter">
                        {member.name}
                        {isCurrentUser && <span className="text-stellar-aqua ml-1">(You)</span>}
                      </h4>
                      {isHost && (
                        <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-stellar-aqua to-nebula-purple text-xs font-semibold">
                          Host
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 font-inter">{getStatusText(member.status)}</p>
                  </div>

                  {/* Actions */}
                  {!isCurrentUser && (
                    <button className="w-8 h-8 rounded-full glass-card hover:bg-stellar-aqua/20 transition-all duration-300 flex items-center justify-center cursor-pointer group">
                      <i className="ri-message-3-line text-gray-400 group-hover:text-stellar-aqua transition-colors"></i>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Available to Invite */}
      {availableMembers.length > 0 && room.members.length < room.maxMembers && (
        <div>
          <h3 className="text-lg font-bold font-montserrat text-white mb-4 flex items-center gap-2">
            <i className="ri-user-add-line text-nebula-purple"></i>
            Available to Invite
          </h3>
          <div className="space-y-3">
            {availableMembers.map((member) => (
              <div
                key={member.id}
                className="glass-card rounded-xl p-4 border border-white/10 hover:border-nebula-purple/40 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-600">
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-deep-space ${getStatusColor(member.status)}`}></div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white font-inter mb-1">
                      {member.name}
                    </h4>
                    <p className="text-xs text-gray-400 font-inter">{getStatusText(member.status)}</p>
                  </div>

                  {/* Invite Button */}
                  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-stellar-aqua to-nebula-purple hover:shadow-neon-cyan transition-all duration-300 font-semibold font-inter text-xs cursor-pointer whitespace-nowrap">
                    Invite
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Room Full Message */}
      {room.members.length >= room.maxMembers && (
        <div className="glass-card rounded-xl p-6 border border-yellow-500/30 bg-yellow-500/5">
          <div className="flex items-center gap-3">
            <i className="ri-information-line text-2xl text-yellow-400"></i>
            <div>
              <h4 className="text-sm font-semibold text-yellow-400 font-inter mb-1">Room is Full</h4>
              <p className="text-xs text-gray-400 font-inter">
                This room has reached its maximum capacity of {room.maxMembers} members.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
