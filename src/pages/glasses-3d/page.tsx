import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function Glasses3D() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [selectedColor, setSelectedColor] = useState('cosmic-black');
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [isARMode, setIsARMode] = useState(false);
  const [selectedView, setSelectedView] = useState('dashboard');
  const [brightness, setBrightness] = useState(80);
  const [fontSize, setFontSize] = useState(16);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    if (!isAutoRotate) return;

    const interval = setInterval(() => {
      setRotation(prev => ({
        x: prev.x,
        y: (prev.y + 0.5) % 360
      }));
    }, 30);

    return () => clearInterval(interval);
  }, [isAutoRotate]);

  useEffect(() => {
    if (!isARMode) return;

    const interval = setInterval(() => {
      setAudioLevel(Math.random() * 100);
    }, 100);

    return () => clearInterval(interval);
  }, [isARMode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isAutoRotate) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 60;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 60;
    
    setRotation({ x, y });
  };

  const colors = [
    { id: 'cosmic-black', name: 'Cosmic Black', color: '#1A1A2E', neon: '#22D3EE' },
    { id: 'nebula-blue', name: 'Nebula Blue', color: '#1E3A8A', neon: '#60A5FA' },
    { id: 'stellar-purple', name: 'Stellar Purple', color: '#581C87', neon: '#C084FC' }
  ];

  const currentColor = colors.find(c => c.id === selectedColor);

  const features = [
    {
      id: 'display',
      name: 'Holographic Display',
      position: { top: '30%', left: '20%' },
      description: 'Ultra-bright holographic projection with real-time data overlay',
      icon: 'ri-tv-line'
    },
    {
      id: 'camera',
      name: 'AI Vision',
      position: { top: '15%', left: '50%' },
      description: 'Advanced AI-powered camera with object recognition',
      icon: 'ri-camera-line'
    },
    {
      id: 'sensor',
      name: 'Neural Interface',
      position: { top: '30%', left: '80%' },
      description: 'Direct neural connection for seamless control',
      icon: 'ri-eye-line'
    }
  ];

  const views = [
    { id: 'dashboard', name: 'Dashboard', icon: 'ri-dashboard-line' },
    { id: 'notes', name: 'Notes', icon: 'ri-file-text-line' },
    { id: 'flashcards', name: 'Flashcards', icon: 'ri-stack-line' },
    { id: 'ai-tutor', name: 'AI Tutor', icon: 'ri-robot-line' },
    { id: 'study-room', name: 'Study Room', icon: 'ri-team-line' }
  ];

  const gestures = [
    { gesture: 'Swipe Right', action: 'Next Page', icon: 'ri-arrow-right-line' },
    { gesture: 'Swipe Left', action: 'Previous Page', icon: 'ri-arrow-left-line' },
    { gesture: 'Pinch', action: 'Zoom', icon: 'ri-zoom-in-line' },
    { gesture: 'Double Tap', action: 'Select', icon: 'ri-hand-coin-line' }
  ];

  if (isARMode) {
    return (
      <div className="bg-[#0A0E27] text-white min-h-screen">
        <Navbar scrolled={true} />
        
        <div className="pt-24 px-6 pb-12">
          <div className="max-w-7xl mx-auto">
            {/* AR Mode Header */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#22D3EE]/20 to-[#8B5CF6]/20 border border-[#22D3EE]/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="ri-glasses-line text-2xl text-[#22D3EE] animate-pulse"></i>
                <div>
                  <span className="font-['Montserrat'] font-semibold">AR Mode Active</span>
                  <p className="text-sm text-gray-400 font-['Inter']">Experiencing Noesis Smart Glasses Interface</p>
                </div>
              </div>
              <button
                onClick={() => setIsARMode(false)}
                className="px-4 py-2 rounded-full bg-[#EC4899]/20 hover:bg-[#EC4899]/30 border border-[#EC4899]/50 transition-all text-sm cursor-pointer whitespace-nowrap font-['Inter']"
              >
                <i className="ri-close-line mr-2"></i>
                Exit AR Mode
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* AR Control Panel */}
              <div className="lg:col-span-1 space-y-6">
                {/* Navigation */}
                <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
                  <h3 className="text-lg font-bold font-['Montserrat'] mb-4">Navigation</h3>
                  <div className="space-y-2">
                    {views.map((view) => (
                      <button
                        key={view.id}
                        onClick={() => setSelectedView(view.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer font-['Inter'] ${
                          selectedView === view.id
                            ? 'bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] shadow-lg'
                            : 'bg-[#0A0E27]/50 border border-[#22D3EE]/10 hover:border-[#22D3EE]/30'
                        }`}
                      >
                        <i className={`${view.icon} text-lg`}></i>
                        <span className="text-sm">{view.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Audio Controls */}
                <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
                  <h3 className="text-lg font-bold font-['Montserrat'] mb-4">Audio Controls</h3>
                  <div className="space-y-4">
                    <button
                      onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all cursor-pointer font-['Inter'] ${
                        isVoiceEnabled
                          ? 'bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6]'
                          : 'bg-[#0A0E27]/50 border border-[#22D3EE]/10'
                      }`}
                    >
                      <span className="text-sm">Voice Assistant</span>
                      <i className={`ri-mic-line text-lg ${isVoiceEnabled ? 'animate-pulse' : ''}`}></i>
                    </button>
                    
                    {isVoiceEnabled && (
                      <div className="p-4 rounded-xl bg-[#0A0E27]/50 border border-[#22D3EE]/20">
                        <p className="text-xs text-gray-400 mb-2 font-['Inter']">Audio Level</p>
                        <div className="flex gap-1 h-12 items-end">
                          {[...Array(20)].map((_, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-t transition-all"
                              style={{
                                height: `${Math.min(audioLevel + Math.random() * 20, 100)}%`,
                                background: audioLevel > i * 5 ? currentColor?.neon : '#1A1A2E'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Display Settings */}
                <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
                  <h3 className="text-lg font-bold font-['Montserrat'] mb-4">Display Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2 font-['Inter']">
                        <span>Brightness</span>
                        <span className="text-[#22D3EE]">{brightness}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={brightness}
                        onChange={(e) => setBrightness(Number(e.target.value))}
                        className="w-full h-2 rounded-full appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, ${currentColor?.neon} 0%, ${currentColor?.neon} ${brightness}%, #1A1A2E ${brightness}%, #1A1A2E 100%)`
                        }}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2 font-['Inter']">
                        <span>Font Size</span>
                        <span className="text-[#22D3EE]">{fontSize}px</span>
                      </div>
                      <input
                        type="range"
                        min="12"
                        max="24"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="w-full h-2 rounded-full appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, ${currentColor?.neon} 0%, ${currentColor?.neon} ${((fontSize - 12) / 12) * 100}%, #1A1A2E ${((fontSize - 12) / 12) * 100}%, #1A1A2E 100%)`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Virtual Display */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold font-['Montserrat']">
                      Virtual Display - {views.find(v => v.id === selectedView)?.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse"></div>
                      <span className="text-sm text-gray-400 font-['Inter']">Live</span>
                    </div>
                  </div>

                  {/* Display Content */}
                  <div 
                    className="aspect-video rounded-2xl border-2 p-8 relative overflow-hidden"
                    style={{ 
                      borderColor: currentColor?.neon,
                      background: `linear-gradient(135deg, ${currentColor?.neon}10, transparent)`,
                      opacity: brightness / 100
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#22D3EE]/5 via-transparent to-[#8B5CF6]/5"></div>
                    
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <i className={`${views.find(v => v.id === selectedView)?.icon} text-3xl`} style={{ color: currentColor?.neon }}></i>
                          <h3 className="text-2xl font-bold font-['Montserrat']" style={{ fontSize: `${fontSize + 8}px` }}>
                            {views.find(v => v.id === selectedView)?.name}
                          </h3>
                        </div>
                        <div className="text-sm text-gray-400 font-['Inter']" style={{ fontSize: `${fontSize - 2}px` }}>
                          {new Date().toLocaleTimeString()}
                        </div>
                      </div>

                      <div className="flex-1 grid grid-cols-2 gap-4">
                        {[...Array(4)].map((_, i) => (
                          <div 
                            key={i}
                            className="p-4 rounded-xl border"
                            style={{ 
                              borderColor: `${currentColor?.neon}30`,
                              background: `${currentColor?.neon}10`
                            }}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <div 
                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ background: `${currentColor?.neon}20` }}
                              >
                                <i className="ri-file-line" style={{ color: currentColor?.neon }}></i>
                              </div>
                              <span className="font-semibold font-['Inter']" style={{ fontSize: `${fontSize}px` }}>
                                Item {i + 1}
                              </span>
                            </div>
                            <div className="space-y-2">
                              {[...Array(3)].map((_, j) => (
                                <div 
                                  key={j}
                                  className="h-2 rounded-full"
                                  style={{ 
                                    width: `${60 + Math.random() * 40}%`,
                                    background: `${currentColor?.neon}40`
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Voice Command Indicator */}
                  {isVoiceEnabled && (
                    <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#22D3EE]/20 to-[#8B5CF6]/20 border border-[#22D3EE]/50 flex items-center gap-3">
                      <i className="ri-mic-line text-2xl text-[#22D3EE] animate-pulse"></i>
                      <div className="flex-1">
                        <p className="font-semibold font-['Inter']">Voice Assistant Active</p>
                        <p className="text-sm text-gray-400 font-['Inter']">Say "Hey Noesis" to give commands</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Gesture Controls */}
                <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
                  <h3 className="text-lg font-bold font-['Montserrat'] mb-4">Gesture Controls</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {gestures.map((item, index) => (
                      <div 
                        key={index}
                        className="p-4 rounded-xl bg-[#0A0E27]/50 border border-[#22D3EE]/20 hover:border-[#22D3EE]/50 transition-all"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ background: `${currentColor?.neon}20` }}
                          >
                            <i className={`${item.icon} text-lg`} style={{ color: currentColor?.neon }}></i>
                          </div>
                          <div>
                            <p className="text-sm font-semibold font-['Inter']">{item.gesture}</p>
                            <p className="text-xs text-gray-400 font-['Inter']">{item.action}</p>
                          </div>
                        </div>
                      </div>
                    ))}
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

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold font-montserrat mb-4">
              Explore in <span className="bg-gradient-to-r from-[#22D3EE] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">3D</span>
            </h1>
            <p className="text-lg text-gray-400 font-inter max-w-2xl mx-auto">
              Interact with the Noesis Smart Glasses in stunning 3D. Rotate, zoom, and discover every detail.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 3D Viewer */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-3xl p-8 border border-[#22D3EE]/20 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#22D3EE]/5 via-transparent to-[#8B5CF6]/5"></div>
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#22D3EE]/10 rounded-full blur-3xl animate-pulse-glow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>

                {/* 3D Container */}
                <div 
                  className="relative h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsAutoRotate(false)}
                  onMouseLeave={() => setIsAutoRotate(true)}
                >
                  {/* 3D Glasses Model - Neon Outline Style */}
                  <div 
                    className="relative w-full max-w-3xl transition-transform duration-100"
                    style={{
                      transform: `perspective(1200px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                      
                      {/* Main Frame Outline - Neon Glow */}
                      <svg 
                        viewBox="0 0 800 300" 
                        className="w-full h-auto"
                        style={{ 
                          transform: 'translateZ(0px)',
                          filter: `drop-shadow(0 0 20px ${currentColor?.neon}) drop-shadow(0 0 40px ${currentColor?.neon})`
                        }}
                      >
                        {/* Left Lens Frame */}
                        <rect 
                          x="50" 
                          y="80" 
                          width="280" 
                          height="160" 
                          rx="40" 
                          fill="none" 
                          stroke={currentColor?.neon} 
                          strokeWidth="4"
                          className="animate-pulse-glow"
                        />
                        
                        {/* Right Lens Frame */}
                        <rect 
                          x="470" 
                          y="80" 
                          width="280" 
                          height="160" 
                          rx="40" 
                          fill="none" 
                          stroke={currentColor?.neon} 
                          strokeWidth="4"
                          className="animate-pulse-glow"
                        />
                        
                        {/* Bridge */}
                        <path 
                          d="M 330 160 Q 400 140 470 160" 
                          fill="none" 
                          stroke={currentColor?.neon} 
                          strokeWidth="4"
                          className="animate-pulse-glow"
                        />
                        
                        {/* Left Temple */}
                        <line 
                          x1="50" 
                          y1="160" 
                          x2="10" 
                          y2="160" 
                          stroke={currentColor?.neon} 
                          strokeWidth="4"
                          className="animate-pulse-glow"
                        />
                        
                        {/* Right Temple */}
                        <line 
                          x1="750" 
                          y1="160" 
                          x2="790" 
                          y2="160" 
                          stroke={currentColor?.neon} 
                          strokeWidth="4"
                          className="animate-pulse-glow"
                        />

                        {/* Corner Accents - Left Lens */}
                        <circle cx="90" cy="120" r="8" fill={currentColor?.neon} className="animate-pulse" />
                        <circle cx="290" cy="120" r="8" fill={currentColor?.neon} className="animate-pulse" style={{ animationDelay: '0.3s' }} />
                        <circle cx="90" cy="200" r="8" fill={currentColor?.neon} className="animate-pulse" style={{ animationDelay: '0.6s' }} />
                        <circle cx="290" cy="200" r="8" fill={currentColor?.neon} className="animate-pulse" style={{ animationDelay: '0.9s' }} />

                        {/* Corner Accents - Right Lens */}
                        <circle cx="510" cy="120" r="8" fill={currentColor?.neon} className="animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <circle cx="710" cy="120" r="8" fill={currentColor?.neon} className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                        <circle cx="510" cy="200" r="8" fill={currentColor?.neon} className="animate-pulse" style={{ animationDelay: '0.8s' }} />
                        <circle cx="710" cy="200" r="8" fill={currentColor?.neon} className="animate-pulse" style={{ animationDelay: '1.1s' }} />
                      </svg>

                      {/* Holographic Display Overlays */}
                      <div 
                        className="absolute top-1/2 left-[12%] w-[30%] h-[45%] -translate-y-1/2"
                        style={{ 
                          transform: 'translateY(-50%) translateZ(20px)',
                          transformStyle: 'preserve-3d'
                        }}
                      >
                        {/* Left Display Content */}
                        <div className="w-full h-full relative">
                          {/* Holographic Grid */}
                          <div className="absolute inset-0 opacity-40">
                            <div className="grid grid-cols-4 grid-rows-3 gap-2 h-full p-4">
                              {[...Array(12)].map((_, i) => (
                                <div 
                                  key={i} 
                                  className="rounded-lg animate-pulse"
                                  style={{ 
                                    background: `linear-gradient(135deg, ${currentColor?.neon}40, transparent)`,
                                    animationDelay: `${i * 0.1}s`
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                          
                          {/* Data Visualization */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
                            {/* Globe Icon */}
                            <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center" style={{ borderColor: currentColor?.neon }}>
                              <i className="ri-global-line text-2xl" style={{ color: currentColor?.neon }}></i>
                            </div>
                            
                            {/* Stats Bars */}
                            <div className="w-full space-y-1">
                              {[80, 60, 90].map((width, i) => (
                                <div key={i} className="h-1 rounded-full" style={{ 
                                  width: `${width}%`,
                                  background: currentColor?.neon,
                                  boxShadow: `0 0 10px ${currentColor?.neon}`
                                }} />
                              ))}
                            </div>

                            {/* Chart Icon */}
                            <div className="flex gap-1 items-end">
                              {[40, 70, 50, 90, 60].map((height, i) => (
                                <div 
                                  key={i} 
                                  className="w-2 rounded-t"
                                  style={{ 
                                    height: `${height}%`,
                                    background: currentColor?.neon,
                                    boxShadow: `0 0 8px ${currentColor?.neon}`
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Display */}
                      <div 
                        className="absolute top-1/2 right-[12%] w-[30%] h-[45%] -translate-y-1/2"
                        style={{ 
                          transform: 'translateY(-50%) translateZ(20px)',
                          transformStyle: 'preserve-3d'
                        }}
                      >
                        {/* Right Display Content */}
                        <div className="w-full h-full relative">
                          {/* Holographic Grid */}
                          <div className="absolute inset-0 opacity-40">
                            <div className="grid grid-cols-4 grid-rows-3 gap-2 h-full p-4">
                              {[...Array(12)].map((_, i) => (
                                <div 
                                  key={i} 
                                  className="rounded-lg animate-pulse"
                                  style={{ 
                                    background: `linear-gradient(135deg, ${currentColor?.neon}40, transparent)`,
                                    animationDelay: `${i * 0.1 + 0.5}s`
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                          
                          {/* Data Visualization */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
                            {/* User Icon */}
                            <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center" style={{ borderColor: currentColor?.neon }}>
                              <i className="ri-user-line text-2xl" style={{ color: currentColor?.neon }}></i>
                            </div>
                            
                            {/* Progress Circles */}
                            <div className="flex gap-2">
                              {[70, 85, 60].map((percent, i) => (
                                <div 
                                  key={i}
                                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                                  style={{ 
                                    borderColor: currentColor?.neon,
                                    color: currentColor?.neon,
                                    boxShadow: `0 0 10px ${currentColor?.neon}`
                                  }}
                                >
                                  {percent}
                                </div>
                              ))}
                            </div>

                            {/* Notification Icons */}
                            <div className="flex gap-2">
                              {['ri-notification-line', 'ri-message-line', 'ri-calendar-line'].map((icon, i) => (
                                <div 
                                  key={i}
                                  className="w-6 h-6 flex items-center justify-center animate-pulse"
                                  style={{ animationDelay: `${i * 0.3}s` }}
                                >
                                  <i className={`${icon} text-sm`} style={{ color: currentColor?.neon }}></i>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Center Camera Module */}
                      <div 
                        className="absolute top-[15%] left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ 
                          transform: 'translateX(-50%) translateZ(40px)',
                          background: `radial-gradient(circle, ${currentColor?.neon}80, transparent)`,
                          boxShadow: `0 0 30px ${currentColor?.neon}, inset 0 0 20px ${currentColor?.neon}`
                        }}
                      >
                        <div 
                          className="w-10 h-10 rounded-full border-2 flex items-center justify-center animate-pulse"
                          style={{ borderColor: currentColor?.neon }}
                        >
                          <div 
                            className="w-6 h-6 rounded-full"
                            style={{ 
                              background: currentColor?.neon,
                              boxShadow: `0 0 20px ${currentColor?.neon}`
                            }}
                          />
                        </div>
                      </div>

                      {/* LED Status Indicators */}
                      <div className="absolute top-[12%] right-[15%] flex gap-3">
                        <div 
                          className="w-3 h-3 rounded-full animate-pulse"
                          style={{ 
                            background: currentColor?.neon,
                            boxShadow: `0 0 15px ${currentColor?.neon}`,
                            transform: 'translateZ(35px)'
                          }}
                        />
                        <div 
                          className="w-3 h-3 rounded-full animate-pulse"
                          style={{ 
                            background: '#EC4899',
                            boxShadow: '0 0 15px #EC4899',
                            transform: 'translateZ(35px)',
                            animationDelay: '0.5s'
                          }}
                        />
                      </div>

                      {/* Feature Hotspots */}
                      {features.map((feature) => (
                        <button
                          key={feature.id}
                          className="absolute w-10 h-10 rounded-full backdrop-blur-xl flex items-center justify-center cursor-pointer hover:scale-125 transition-all group"
                          style={{ 
                            top: feature.position.top, 
                            left: feature.position.left,
                            transform: 'translateZ(50px)',
                            background: `${currentColor?.neon}20`,
                            border: `2px solid ${currentColor?.neon}`,
                            boxShadow: `0 0 20px ${currentColor?.neon}`
                          }}
                          onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
                        >
                          <div 
                            className="absolute inset-0 rounded-full animate-ping"
                            style={{ background: `${currentColor?.neon}50` }}
                          />
                          <i className={`${feature.icon} text-lg relative z-10`} style={{ color: currentColor?.neon }}></i>
                          
                          {/* Feature Tooltip */}
                          {activeFeature === feature.id && (
                            <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-64 p-4 glass-card rounded-2xl border z-50"
                              style={{ 
                                transform: 'translateX(-50%) translateZ(0)',
                                borderColor: `${currentColor?.neon}30`
                              }}
                            >
                              <h4 className="font-bold text-sm mb-2 font-montserrat" style={{ color: currentColor?.neon }}>
                                {feature.name}
                              </h4>
                              <p className="text-xs text-gray-400 font-inter">{feature.description}</p>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="relative flex items-center justify-center gap-4 mt-6">
                  <button
                    onClick={() => setIsAutoRotate(!isAutoRotate)}
                    className={`px-6 py-3 rounded-full transition-all text-sm cursor-pointer whitespace-nowrap font-inter ${
                      isAutoRotate 
                        ? 'bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] text-white' 
                        : 'glass-card hover:bg-[#22D3EE]/20'
                    }`}
                  >
                    <i className={`${isAutoRotate ? 'ri-pause-line' : 'ri-play-line'} mr-2`}></i>
                    {isAutoRotate ? 'Pause' : 'Auto Rotate'}
                  </button>
                  <button
                    onClick={() => setRotation({ x: 0, y: 0 })}
                    className="px-6 py-3 rounded-full glass-card hover:bg-[#22D3EE]/20 transition-all text-sm cursor-pointer whitespace-nowrap font-inter"
                  >
                    <i className="ri-refresh-line mr-2"></i>
                    Reset View
                  </button>
                </div>
              </div>
            </div>

            {/* Customization Panel */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-3xl p-6 border border-[#22D3EE]/20 sticky top-24">
                <h2 className="text-xl font-bold font-montserrat mb-6">
                  Customize
                </h2>

                {/* Color Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-4 font-inter">
                    Choose Color
                  </label>
                  <div className="space-y-3">
                    {colors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer ${
                          selectedColor === color.id
                            ? 'border-2'
                            : 'glass-card border hover:border-[#22D3EE]/30'
                        }`}
                        style={{
                          background: selectedColor === color.id 
                            ? `linear-gradient(to right, ${color.neon}20, ${color.neon}10)`
                            : undefined,
                          borderColor: selectedColor === color.id ? color.neon : '#22D3EE10'
                        }}
                      >
                        <div 
                          className="w-12 h-12 rounded-xl border-2"
                          style={{ 
                            background: `linear-gradient(135deg, ${color.color}, ${color.neon}40)`,
                            borderColor: color.neon,
                            boxShadow: `0 0 20px ${color.neon}40`
                          }}
                        />
                        <span className="font-medium font-inter">{color.name}</span>
                        {selectedColor === color.id && (
                          <i className="ri-check-line ml-auto" style={{ color: color.neon }}></i>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Specifications */}
                <div className="space-y-4 mb-8">
                  <h3 className="text-lg font-bold font-montserrat">Specifications</h3>
                  {[
                    { icon: 'ri-eye-line', label: 'Display', value: 'Holographic AR' },
                    { icon: 'ri-camera-line', label: 'Camera', value: '12MP AI Vision' },
                    { icon: 'ri-battery-charge-line', label: 'Battery', value: 'Up to 8 hours' },
                    { icon: 'ri-weight-line', label: 'Weight', value: 'Only 45g' }
                  ].map((spec, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl glass-card">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#22D3EE]/20 to-[#8B5CF6]/20 flex items-center justify-center">
                        <i className={`${spec.icon} text-[#22D3EE]`}></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 font-inter">{spec.label}</p>
                        <p className="text-sm font-semibold font-inter">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="space-y-3">
                  <button
                    onClick={() => setIsARMode(true)}
                    className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-2xl hover:shadow-[#22D3EE]/50 transition-all font-semibold text-sm cursor-pointer whitespace-nowrap text-center font-inter"
                  >
                    <i className="ri-glasses-line mr-2"></i>
                    Activate AR Mode
                  </button>
                  <Link
                    to="/glasses-preorder"
                    className="block w-full px-6 py-3 rounded-full glass-card hover:bg-[#22D3EE]/20 transition-all text-sm cursor-pointer whitespace-nowrap text-center font-inter"
                  >
                    Pre-order Now - $499
                  </Link>
                  <Link
                    to="/glasses-controls"
                    className="block w-full px-6 py-3 rounded-full glass-card hover:bg-[#22D3EE]/20 transition-all text-sm cursor-pointer whitespace-nowrap text-center font-inter"
                  >
                    Learn Controls
                  </Link>
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