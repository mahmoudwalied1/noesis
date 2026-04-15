import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function LiveDiscussions() {
  const [currentTime, setCurrentTime] = useState(145);
  const [isPlaying, setIsPlaying] = useState(true);

  const participants = [
    { id: '1', name: 'Sarah Chen', avatar: 'SC', isWatching: true },
    { id: '2', name: 'Mike Johnson', avatar: 'MJ', isWatching: true },
    { id: '3', name: 'Emma Davis', avatar: 'ED', isWatching: false },
    { id: '4', name: 'You', avatar: 'YO', isWatching: true }
  ];

  const comments = [
    { user: 'Sarah Chen', time: 120, message: 'This part is confusing, can someone explain?', timestamp: '2:00' },
    { user: 'Mike Johnson', time: 125, message: 'Sure! The key concept here is...', timestamp: '2:05' },
    { user: 'You', time: 145, message: 'Great explanation! Makes sense now', timestamp: '2:25' },
    { user: 'Emma Davis', time: 150, message: 'Can we rewind to the previous section?', timestamp: '2:30' }
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
              Live <span className="bg-gradient-to-r from-[#22D3EE] to-[#EC4899] bg-clip-text text-transparent">Discussions</span>
            </h1>
            <p className="text-base text-gray-400 font-['Inter']">
              Watch and discuss concepts together in real-time
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl overflow-hidden">
                {/* Video Area */}
                <div className="relative aspect-video bg-gradient-to-br from-[#4A9FD8]/20 to-[#8B5CF6]/20 flex items-center justify-center">
                  <img 
                    src="https://readdy.ai/api/search-image?query=modern%20educational%20programming%20tutorial%20video%20showing%20code%20editor%20with%20data%20structures%20and%20algorithms%20on%20dark%20background%20with%20syntax%20highlighting%20and%20clean%20interface&width=800&height=450&seq=live-video-001&orientation=landscape"
                    alt="Video"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="absolute z-10 w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-lg hover:shadow-[#8B5CF6]/50 transition-all cursor-pointer"
                  >
                    <i className={`${isPlaying ? 'ri-pause-line' : 'ri-play-fill'} text-3xl text-white`}></i>
                  </button>

                  {/* Live Indicator */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-red-500 flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold font-['Inter']">LIVE</span>
                  </div>

                  {/* Watching Count */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm flex items-center gap-2">
                    <i className="ri-eye-line text-sm"></i>
                    <span className="text-xs font-semibold font-['Inter']">{participants.filter(p => p.isWatching).length} watching</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-2 font-['Inter']">
                      <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
                      <span>5:30</span>
                    </div>
                    <div className="relative h-2 bg-[#4A9FD8]/30 rounded-full overflow-hidden">
                      <div 
                        className="absolute h-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] rounded-full transition-all"
                        style={{ width: `${(currentTime / 330) * 100}%` }}
                      ></div>
                      {/* Comment markers */}
                      {comments.map((comment, index) => (
                        <div
                          key={index}
                          className="absolute top-0 w-1 h-full bg-[#EC4899] cursor-pointer hover:w-2 transition-all"
                          style={{ left: `${(comment.time / 330) * 100}%` }}
                          title={comment.message}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#4A9FD8]/30 hover:bg-[#4A9FD8]/50 transition-all cursor-pointer">
                        <i className="ri-skip-back-line text-lg"></i>
                      </button>
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-lg transition-all cursor-pointer"
                      >
                        <i className={`${isPlaying ? 'ri-pause-line' : 'ri-play-fill'} text-xl`}></i>
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#4A9FD8]/30 hover:bg-[#4A9FD8]/50 transition-all cursor-pointer">
                        <i className="ri-skip-forward-line text-lg"></i>
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="px-4 py-2 rounded-full bg-[#4A9FD8]/30 hover:bg-[#4A9FD8]/50 transition-all cursor-pointer whitespace-nowrap text-sm font-['Inter']">
                        Sync with Group
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Discussion Panel */}
            <div className="lg:col-span-1">
              <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6 h-[600px] flex flex-col">
                {/* Participants */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-3 font-['Montserrat']">Watching Now</h3>
                  <div className="flex -space-x-2">
                    {participants.filter(p => p.isWatching).map((participant) => (
                      <div
                        key={participant.id}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#22D3EE] to-[#8B5CF6] border-2 border-[#151B3B] font-semibold text-xs"
                        title={participant.name}
                      >
                        {participant.avatar}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comments */}
                <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                  {comments.map((comment, index) => (
                    <div key={index} className="p-3 rounded-xl bg-[#0A0E27]/50 border border-[#4A9FD8]/20">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-xs font-semibold text-[#22D3EE] font-['Inter']">{comment.user}</p>
                        <button
                          onClick={() => setCurrentTime(comment.time)}
                          className="text-xs text-gray-400 hover:text-[#22D3EE] transition-all cursor-pointer"
                        >
                          {comment.timestamp}
                        </button>
                      </div>
                      <p className="text-sm text-gray-300 font-['Inter']">{comment.message}</p>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 rounded-full bg-[#0A0E27]/50 border border-[#4A9FD8]/30 focus:border-[#22D3EE] focus:outline-none text-sm font-['Inter']"
                  />
                  <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-lg transition-all cursor-pointer">
                    <i className="ri-send-plane-fill"></i>
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
