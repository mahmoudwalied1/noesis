import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import CreateRoomModal from './components/CreateRoomModal';
import RoomCard from './components/RoomCard';
import ActiveRoom from './components/ActiveRoom';

// Mock data for team members
const teamMembers = [
  { id: 1, name: 'Malak Alamir', avatar: 'https://readdy.ai/api/search-image?query=professional%20female%20student%20portrait%20with%20simple%20clean%20background%20friendly%20smile%20modern%20lighting&width=200&height=200&seq=malak001&orientation=squarish', status: 'online' },
  { id: 2, name: 'Abdelrahman Amin', avatar: 'https://readdy.ai/api/search-image?query=professional%20male%20student%20portrait%20with%20simple%20clean%20background%20confident%20expression%20modern%20lighting&width=200&height=200&seq=amin002&orientation=squarish', status: 'online' },
  { id: 3, name: 'Belal El Sirty', avatar: 'https://readdy.ai/api/search-image?query=professional%20male%20student%20portrait%20with%20simple%20clean%20background%20friendly%20demeanor%20modern%20lighting&width=200&height=200&seq=belal003&orientation=squarish', status: 'away' },
  { id: 4, name: 'Abdelrahman Tarek', avatar: 'https://readdy.ai/api/search-image?query=professional%20male%20student%20portrait%20with%20simple%20clean%20background%20smart%20appearance%20modern%20lighting&width=200&height=200&seq=tarek004&orientation=squarish', status: 'online' },
  { id: 5, name: 'Mahmoud Walied', avatar: 'https://readdy.ai/api/search-image?query=professional%20male%20student%20portrait%20with%20simple%20clean%20background%20focused%20expression%20modern%20lighting&width=200&height=200&seq=mahmoud005&orientation=squarish', status: 'offline' },
  { id: 6, name: 'Nouran Magdy', avatar: 'https://readdy.ai/api/search-image?query=professional%20female%20student%20portrait%20with%20simple%20clean%20background%20intelligent%20look%20modern%20lighting&width=200&height=200&seq=nouran006&orientation=squarish', status: 'online' }
];

// Mock study rooms
const initialRooms = [
  {
    id: 1,
    name: 'Alpha',
    topic: 'Object-Oriented Programming',
    host: teamMembers[0],
    members: [teamMembers[0], teamMembers[1], teamMembers[3]],
    maxMembers: 4,
    createdAt: new Date('2024-01-15T10:30:00'),
    isActive: true
  },
  {
    id: 2,
    name: 'Beta Study Group',
    topic: 'Data Structures & Algorithms',
    host: teamMembers[1],
    members: [teamMembers[1], teamMembers[2], teamMembers[4], teamMembers[5]],
    maxMembers: 6,
    createdAt: new Date('2024-01-15T09:00:00'),
    isActive: true
  },
  {
    id: 3,
    name: 'Gamma Learning',
    topic: 'Machine Learning Basics',
    host: teamMembers[5],
    members: [teamMembers[5], teamMembers[3]],
    maxMembers: 5,
    createdAt: new Date('2024-01-15T14:20:00'),
    isActive: true
  }
];

export default function StudyRoom() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [rooms, setRooms] = useState(initialRooms);
  const [activeRoom, setActiveRoom] = useState<typeof initialRooms[0] | null>(null);
  const [currentUser] = useState(teamMembers[0]); // Default to Malak Alamir

  const handleCreateRoom = (roomData: { name: string; topic: string; maxMembers: number }) => {
    const newRoom = {
      id: rooms.length + 1,
      name: roomData.name,
      topic: roomData.topic,
      host: currentUser,
      members: [currentUser],
      maxMembers: roomData.maxMembers,
      createdAt: new Date(),
      isActive: true
    };
    setRooms([newRoom, ...rooms]);
    setShowCreateModal(false);
    setActiveRoom(newRoom);
  };

  const handleJoinRoom = (roomId: number) => {
    const room = rooms.find(r => r.id === roomId);
    if (room && room.members.length < room.maxMembers) {
      const updatedRooms = rooms.map(r => {
        if (r.id === roomId && !r.members.find(m => m.id === currentUser.id)) {
          return { ...r, members: [...r.members, currentUser] };
        }
        return r;
      });
      setRooms(updatedRooms);
      setActiveRoom(updatedRooms.find(r => r.id === roomId) || null);
    }
  };

  const handleLeaveRoom = () => {
    if (activeRoom) {
      const updatedRooms = rooms.map(r => {
        if (r.id === activeRoom.id) {
          const updatedMembers = r.members.filter(m => m.id !== currentUser.id);
          return { ...r, members: updatedMembers, isActive: updatedMembers.length > 0 };
        }
        return r;
      }).filter(r => r.isActive);
      setRooms(updatedRooms);
      setActiveRoom(null);
    }
  };

  return (
    <div className="bg-[#050B18] text-white min-h-screen">
      <Navbar scrolled={true} />
      
      <div className="pt-32 pb-20 px-safe">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold font-montserrat mb-6 bg-gradient-to-r from-stellar-aqua via-nebula-purple to-pink-bright bg-clip-text text-transparent">
              Collaborative Study Rooms
            </h1>
            <p className="text-xl text-gray-300 font-inter max-w-3xl mx-auto">
              Join or create study rooms with your classmates. Learn together, share notes, and challenge each other!
            </p>
          </div>

          {activeRoom ? (
            <ActiveRoom 
              room={activeRoom} 
              currentUser={currentUser}
              onLeave={handleLeaveRoom}
              teamMembers={teamMembers}
            />
          ) : (
            <>
              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
                <div className="flex items-center gap-4">
                  <div className="glass-card px-6 py-3 rounded-full">
                    <span className="text-sm font-inter text-gray-300">
                      <strong className="text-stellar-aqua">{rooms.length}</strong> Active Rooms
                    </span>
                  </div>
                  <div className="glass-card px-6 py-3 rounded-full">
                    <span className="text-sm font-inter text-gray-300">
                      <strong className="text-nebula-purple">{teamMembers.filter(m => m.status === 'online').length}</strong> Online
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-stellar-aqua to-nebula-purple hover:shadow-neon-cyan transition-all duration-300 font-semibold font-inter text-sm cursor-pointer whitespace-nowrap flex items-center gap-2 group"
                >
                  <i className="ri-add-circle-line text-xl group-hover:rotate-90 transition-transform duration-300"></i>
                  Create Study Room
                </button>
              </div>

              {/* Study Rooms Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map(room => (
                  <RoomCard 
                    key={room.id} 
                    room={room} 
                    currentUser={currentUser}
                    onJoin={handleJoinRoom}
                  />
                ))}
              </div>

              {rooms.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full glass-card flex items-center justify-center">
                    <i className="ri-team-line text-6xl text-stellar-aqua"></i>
                  </div>
                  <h3 className="text-2xl font-bold font-montserrat mb-4">No Active Rooms</h3>
                  <p className="text-gray-400 font-inter mb-8">Be the first to create a study room!</p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-stellar-aqua to-nebula-purple hover:shadow-neon-cyan transition-all duration-300 font-semibold font-inter text-sm cursor-pointer whitespace-nowrap"
                  >
                    Create Your First Room
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />

      {/* Create Room Modal */}
      {showCreateModal && (
        <CreateRoomModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateRoom}
        />
      )}
    </div>
  );
}
