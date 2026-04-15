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

interface RoomCardProps {
  room: Room;
  currentUser: Member;
  onJoin: (roomId: number) => void;
}

export default function RoomCard({ room, currentUser, onJoin }: RoomCardProps) {
  const isMember = room.members.some(m => m.id === currentUser.id);
  const isFull = room.members.length >= room.maxMembers;
  const canJoin = !isMember && !isFull;

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-stellar-aqua/20 hover:border-stellar-aqua/40 transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold font-montserrat text-white mb-2 group-hover:text-stellar-aqua transition-colors">
            {room.name}
          </h3>
          <p className="text-sm text-gray-400 font-inter flex items-center gap-2">
            <i className="ri-book-open-line text-nebula-purple"></i>
            {room.topic}
          </p>
        </div>
        <div className="glass-card px-3 py-1 rounded-full border border-stellar-aqua/30">
          <span className="text-xs font-semibold text-stellar-aqua">
            {room.members.length}/{room.maxMembers}
          </span>
        </div>
      </div>

      {/* Host Info */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-stellar-aqua/50">
            <img 
              src={room.host.avatar} 
              alt={room.host.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-deep-space ${
            room.host.status === 'online' ? 'bg-green-500' : 
            room.host.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
          }`}></div>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white font-inter">{room.host.name}</p>
          <p className="text-xs text-gray-500 font-inter">Host • {getTimeAgo(room.createdAt)}</p>
        </div>
      </div>

      {/* Members Preview */}
      <div className="mb-4">
        <p className="text-xs text-gray-400 font-inter mb-2">Members</p>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {room.members.slice(0, 4).map((member) => (
              <div 
                key={member.id}
                className="w-8 h-8 rounded-full overflow-hidden border-2 border-deep-space relative group/avatar"
                title={member.name}
              >
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[8px] text-white font-inter">{member.name.split(' ')[0]}</span>
                </div>
              </div>
            ))}
          </div>
          {room.members.length > 4 && (
            <div className="w-8 h-8 rounded-full glass-card border border-stellar-aqua/30 flex items-center justify-center">
              <span className="text-xs text-stellar-aqua font-semibold">+{room.members.length - 4}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => canJoin && onJoin(room.id)}
        disabled={!canJoin}
        className={`w-full px-6 py-3 rounded-xl font-semibold font-inter text-sm cursor-pointer whitespace-nowrap transition-all duration-300 flex items-center justify-center gap-2 ${
          isMember
            ? 'bg-stellar-aqua/20 text-stellar-aqua border border-stellar-aqua/30'
            : isFull
            ? 'glass-card text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-stellar-aqua to-nebula-purple hover:shadow-neon-cyan'
        }`}
      >
        {isMember ? (
          <>
            <i className="ri-check-line text-lg"></i>
            Already Joined
          </>
        ) : isFull ? (
          <>
            <i className="ri-lock-line text-lg"></i>
            Room Full
          </>
        ) : (
          <>
            <i className="ri-login-box-line text-lg"></i>
            Join Room
          </>
        )}
      </button>
    </div>
  );
}
