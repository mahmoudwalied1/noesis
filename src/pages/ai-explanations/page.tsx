import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function AIExplanations() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  const topics = [
    { id: 'inheritance', name: 'Inheritance', category: 'OOP', difficulty: 'Beginner' },
    { id: 'polymorphism', name: 'Polymorphism', category: 'OOP', difficulty: 'Intermediate' },
    { id: 'encapsulation', name: 'Encapsulation', category: 'OOP', difficulty: 'Beginner' },
    { id: 'abstraction', name: 'Abstraction', category: 'OOP', difficulty: 'Intermediate' },
    { id: 'binary-trees', name: 'Binary Trees', category: 'Data Structures', difficulty: 'Intermediate' },
    { id: 'graphs', name: 'Graphs', category: 'Data Structures', difficulty: 'Advanced' },
    { id: 'sorting', name: 'Sorting Algorithms', category: 'Algorithms', difficulty: 'Intermediate' },
    { id: 'dynamic-programming', name: 'Dynamic Programming', category: 'Algorithms', difficulty: 'Advanced' }
  ];

  const bookmarks = [
    { time: 45, label: 'Key Concept: Base Class' },
    { time: 120, label: 'Example: Vehicle Inheritance' },
    { time: 180, label: 'Common Mistakes' }
  ];

  const voiceCommands = [
    { command: 'Play', action: 'Start video playback', handler: () => setIsPlaying(true) },
    { command: 'Pause', action: 'Pause video', handler: () => setIsPlaying(false) },
    { command: 'Skip forward', action: 'Jump 10 seconds ahead', handler: () => setCurrentTime(prev => Math.min(prev + 10, 330)) },
    { command: 'Skip back', action: 'Go back 10 seconds', handler: () => setCurrentTime(prev => Math.max(prev - 10, 0)) },
    { command: 'Speed up', action: 'Increase playback speed', handler: () => setPlaybackSpeed(prev => Math.min(prev + 0.25, 2)) },
    { command: 'Slow down', action: 'Decrease playback speed', handler: () => setPlaybackSpeed(prev => Math.max(prev - 0.25, 0.5)) },
    { command: 'Bookmark this', action: 'Save current moment', handler: () => alert('Bookmark saved!') },
    { command: 'Explain this', action: 'Get detailed explanation', handler: () => alert('AI explanation activated!') }
  ];

  const handleVoiceControl = () => {
    setShowVoiceModal(true);
    setIsVoiceActive(true);
    
    // Simulate voice recognition
    setTimeout(() => {
      const randomCmd = voiceCommands[Math.floor(Math.random() * voiceCommands.length)];
      setVoiceCommand(randomCmd.command);
      
      setTimeout(() => {
        setIsVoiceActive(false);
        randomCmd.handler();
      }, 1500);
    }, 2000);
  };

  const executeVoiceCommand = (cmd: typeof voiceCommands[0]) => {
    setVoiceCommand(cmd.command);
    setShowVoiceModal(true);
    setIsVoiceActive(true);
    
    setTimeout(() => {
      setIsVoiceActive(false);
      cmd.handler();
      setTimeout(() => setShowVoiceModal(false), 1500);
    }, 1000);
  };

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

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Montserrat']">
              AI-Powered <span className="bg-gradient-to-r from-[#22D3EE] to-[#EC4899] bg-clip-text text-transparent">Explanations</span>
            </h1>
            <p className="text-base text-gray-400 font-['Inter']">
              Get complex concepts explained in simple terms with voice control and instant replay
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Topic Selection */}
            <div className="lg:col-span-1">
              <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
                <h3 className="text-xl font-semibold mb-4 font-['Montserrat']">Choose Your Topic</h3>
                <div className="space-y-3">
                  {topics.map((topic) => (
                    <div
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`p-4 rounded-2xl cursor-pointer transition-all ${
                        selectedTopic === topic.id
                          ? 'bg-gradient-to-r from-[#4A9FD8] to-[#8B5CF6] border-[#22D3EE]'
                          : 'bg-[#0A0E27]/50 border border-[#4A9FD8]/20 hover:border-[#22D3EE]/50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm font-['Inter']">{topic.name}</h4>
                        <span className="text-xs px-2 py-1 rounded-full bg-[#EC4899]/20 text-[#EC4899]">
                          {topic.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{topic.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Video Player */}
            <div className="lg:col-span-2">
              <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl overflow-hidden">
                {/* Video Area */}
                <div className="relative aspect-video bg-gradient-to-br from-[#4A9FD8]/20 to-[#8B5CF6]/20 flex items-center justify-center">
                  {selectedTopic ? (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img 
                          src={`https://readdy.ai/api/search-image?query=modern%20educational%20video%20about%20programming%20$%7BselectedTopic%7D%20concept%20with%20clean%20minimalist%20background%20and%20code%20snippets%20displayed%20on%20screen&width=800&height=450&seq=video-${selectedTopic}&orientation=landscape`}
                          alt="Video"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="relative z-10 w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-lg hover:shadow-[#8B5CF6]/50 transition-all cursor-pointer"
                      >
                        <i className={`${isPlaying ? 'ri-pause-line' : 'ri-play-fill'} text-3xl text-white`}></i>
                      </button>
                    </>
                  ) : (
                    <div className="text-center p-12">
                      <i className="ri-play-circle-line text-6xl text-[#22D3EE]/50 mb-4"></i>
                      <p className="text-gray-400 font-['Inter']">Select a topic to start learning</p>
                    </div>
                  )}
                </div>

                {/* Controls */}
                {selectedTopic && (
                  <div className="p-6">
                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-xs text-gray-400 mb-2 font-['Inter']">
                        <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
                        <span>5:30</span>
                      </div>
                      <div className="relative h-2 bg-[#4A9FD8]/30 rounded-full overflow-hidden cursor-pointer">
                        <div 
                          className="absolute h-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] rounded-full transition-all"
                          style={{ width: `${(currentTime / 330) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setCurrentTime(prev => Math.max(prev - 10, 0))}
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#4A9FD8]/30 hover:bg-[#4A9FD8]/50 transition-all cursor-pointer"
                        >
                          <i className="ri-skip-back-line text-lg"></i>
                        </button>
                        <button 
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-lg transition-all cursor-pointer"
                        >
                          <i className={`${isPlaying ? 'ri-pause-line' : 'ri-play-fill'} text-xl`}></i>
                        </button>
                        <button 
                          onClick={() => setCurrentTime(prev => Math.min(prev + 10, 330))}
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#4A9FD8]/30 hover:bg-[#4A9FD8]/50 transition-all cursor-pointer"
                        >
                          <i className="ri-skip-forward-line text-lg"></i>
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <button 
                          onClick={handleVoiceControl}
                          className={`w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                            isVoiceActive 
                              ? 'bg-gradient-to-r from-[#22D3EE] to-[#EC4899] shadow-lg shadow-[#22D3EE]/50 animate-pulse' 
                              : 'bg-[#4A9FD8]/30 hover:bg-[#4A9FD8]/50'
                          }`}
                        >
                          <i className="ri-mic-line text-lg"></i>
                        </button>
                        <div className="relative group">
                          <button className="px-4 py-2 rounded-full bg-[#4A9FD8]/30 hover:bg-[#4A9FD8]/50 transition-all text-sm cursor-pointer whitespace-nowrap font-['Inter']">
                            {playbackSpeed}x
                          </button>
                          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
                            <div className="bg-[#151B3B] border border-[#4A9FD8]/30 rounded-2xl p-2 space-y-1">
                              {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                                <button
                                  key={speed}
                                  onClick={() => setPlaybackSpeed(speed)}
                                  className="block w-full px-4 py-2 text-sm rounded-lg hover:bg-[#4A9FD8]/30 transition-all text-left cursor-pointer whitespace-nowrap font-['Inter']"
                                >
                                  {speed}x
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#4A9FD8]/30 hover:bg-[#4A9FD8]/50 transition-all cursor-pointer">
                          <i className="ri-bookmark-line text-lg"></i>
                        </button>
                      </div>
                    </div>

                    {/* Voice Commands Guide */}
                    <div className="mt-6 pt-6 border-t border-[#4A9FD8]/30">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold font-['Montserrat']">Voice Commands</h4>
                        <button 
                          onClick={handleVoiceControl}
                          className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-lg transition-all cursor-pointer whitespace-nowrap font-['Inter']"
                        >
                          Try Voice Control
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {voiceCommands.slice(0, 4).map((cmd, index) => (
                          <button
                            key={index}
                            onClick={() => executeVoiceCommand(cmd)}
                            className="p-3 rounded-lg bg-[#0A0E27]/50 border border-[#4A9FD8]/20 hover:border-[#22D3EE]/50 hover:bg-[#4A9FD8]/20 transition-all cursor-pointer text-left group"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <i className="ri-mic-line text-[#22D3EE] text-sm"></i>
                              <p className="text-xs font-medium text-[#22D3EE] font-['Inter']">"{cmd.command}"</p>
                            </div>
                            <p className="text-xs text-gray-400">{cmd.action}</p>
                            <div className="mt-2 flex items-center gap-1 text-xs text-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity">
                              <i className="ri-play-circle-line"></i>
                              <span>Click to try</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bookmarks */}
                    <div className="mt-6 pt-6 border-t border-[#4A9FD8]/30">
                      <h4 className="text-sm font-semibold mb-3 font-['Montserrat']">Key Moments</h4>
                      <div className="space-y-2">
                        {bookmarks.map((bookmark, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentTime(bookmark.time)}
                            className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#0A0E27]/50 hover:bg-[#4A9FD8]/20 transition-all text-left cursor-pointer"
                          >
                            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#8B5CF6]/20">
                              <i className="ri-bookmark-fill text-sm text-[#EC4899]"></i>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium font-['Inter']">{bookmark.label}</p>
                              <p className="text-xs text-gray-400">{Math.floor(bookmark.time / 60)}:{(bookmark.time % 60).toString().padStart(2, '0')}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Control Modal */}
      {showVoiceModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-6">
          <div className="bg-[#151B3B] border border-[#22D3EE]/30 rounded-3xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#EC4899] flex items-center justify-center">
                <i className={`ri-mic-line text-4xl text-white ${isVoiceActive ? 'animate-pulse' : ''}`}></i>
              </div>
              <h3 className="text-2xl font-bold mb-2 font-['Montserrat']">
                {isVoiceActive ? 'Listening...' : 'Voice Command Received'}
              </h3>
              <p className="text-gray-400 mb-6 font-['Inter']">
                {isVoiceActive ? 'Speak your command' : `"${voiceCommand}"`}
              </p>
              {!isVoiceActive && (
                <button
                  onClick={() => setShowVoiceModal(false)}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-lg transition-all cursor-pointer whitespace-nowrap font-['Inter']"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
