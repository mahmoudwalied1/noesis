import { useState } from 'react';

interface CreateRoomModalProps {
  onClose: () => void;
  onCreate: (data: { name: string; topic: string; maxMembers: number }) => void;
}

export default function CreateRoomModal({ onClose, onCreate }: CreateRoomModalProps) {
  const [roomName, setRoomName] = useState('');
  const [topic, setTopic] = useState('');
  const [maxMembers, setMaxMembers] = useState(4);
  const [errors, setErrors] = useState<{ name?: string; topic?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; topic?: string } = {};
    
    if (!roomName.trim()) {
      newErrors.name = 'Room name is required';
    } else if (roomName.length < 3) {
      newErrors.name = 'Room name must be at least 3 characters';
    }
    
    if (!topic.trim()) {
      newErrors.topic = 'Topic is required';
    } else if (topic.length < 3) {
      newErrors.topic = 'Topic must be at least 3 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onCreate({ name: roomName, topic, maxMembers });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="glass-card rounded-3xl p-8 max-w-md w-full border border-stellar-aqua/30 shadow-neon-cyan animate-in zoom-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-montserrat bg-gradient-to-r from-stellar-aqua to-nebula-purple bg-clip-text text-transparent">
            Create Study Room
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full glass-card hover:bg-red-500/20 transition-all duration-300 flex items-center justify-center cursor-pointer group"
          >
            <i className="ri-close-line text-xl text-gray-400 group-hover:text-red-400 transition-colors"></i>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Room Name */}
          <div>
            <label className="block text-sm font-semibold font-inter text-gray-300 mb-2">
              Room Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="e.g., Alpha Study Group"
              className={`w-full px-4 py-3 rounded-xl glass-card border ${
                errors.name ? 'border-red-500/50' : 'border-stellar-aqua/30'
              } bg-deep-space/50 text-white placeholder-gray-500 focus:outline-none focus:border-stellar-aqua transition-all duration-300 text-sm font-inter`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-2 font-inter flex items-center gap-1">
                <i className="ri-error-warning-line"></i>
                {errors.name}
              </p>
            )}
          </div>

          {/* Topic */}
          <div>
            <label className="block text-sm font-semibold font-inter text-gray-300 mb-2">
              Topic <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Object-Oriented Programming"
              className={`w-full px-4 py-3 rounded-xl glass-card border ${
                errors.topic ? 'border-red-500/50' : 'border-stellar-aqua/30'
              } bg-deep-space/50 text-white placeholder-gray-500 focus:outline-none focus:border-stellar-aqua transition-all duration-300 text-sm font-inter`}
            />
            {errors.topic && (
              <p className="text-red-400 text-xs mt-2 font-inter flex items-center gap-1">
                <i className="ri-error-warning-line"></i>
                {errors.topic}
              </p>
            )}
          </div>

          {/* Max Members */}
          <div>
            <label className="block text-sm font-semibold font-inter text-gray-300 mb-2">
              Max Members
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="2"
                max="10"
                value={maxMembers}
                onChange={(e) => setMaxMembers(Number(e.target.value))}
                className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #14B8A6 0%, #14B8A6 ${((maxMembers - 2) / 8) * 100}%, rgba(255,255,255,0.1) ${((maxMembers - 2) / 8) * 100}%, rgba(255,255,255,0.1) 100%)`
                }}
              />
              <div className="glass-card px-4 py-2 rounded-xl border border-stellar-aqua/30 min-w-[80px] text-center">
                <span className="text-stellar-aqua font-bold text-lg">{maxMembers}</span>
                <span className="text-gray-400 text-xs ml-1">members</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl glass-card border border-gray-600 hover:border-gray-500 transition-all duration-300 font-semibold font-inter text-sm cursor-pointer whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-stellar-aqua to-nebula-purple hover:shadow-neon-cyan transition-all duration-300 font-semibold font-inter text-sm cursor-pointer whitespace-nowrap"
            >
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
