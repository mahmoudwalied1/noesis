import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStart = () => {
    navigate('/home');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050B18]">
      {/* Galactic Background */}
      <div className="absolute inset-0">
        <img 
          src="https://readdy.ai/api/search-image?query=stunning%20deep%20space%20galaxy%20nebula%20with%20vibrant%20blue%20cyan%20and%20purple%20cosmic%20clouds%20stars%20scattered%20across%20dark%20navy%20background%20ethereal%20glowing%20gas%20formations%20cosmic%20dust%20particles%20mystical%20atmosphere%20ultra%20detailed%20space%20photography%20style%20dreamy%20celestial%20scene%20with%20soft%20luminous%20blue%20tones%20and%20sparkling%20starlight%20creating%20peaceful%20cosmic%20ambiance%20perfect%20for%20splash%20screen&width=1920&height=1080&seq=splash-galactic-bg-001&orientation=landscape" 
          alt="Galactic Background" 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B18]/80 via-[#0F1C3A]/60 to-[#050B18]/90"></div>
      </div>

      {/* Animated Cosmic Particles */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(84, 172, 191, ${Math.random() * 0.5 + 0.3})`
            }}
          />
        ))}
      </div>

      {/* Plasma Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#54ACBF]/20 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#6E2BBF]/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Rotating Orbit Ring */}
        <div className="relative w-[500px] h-[500px] flex items-center justify-center">
          <div className="absolute inset-0 animate-spin-slow">
            <svg className="w-full h-full" viewBox="0 0 500 500">
              <circle
                cx="250"
                cy="250"
                r="240"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeDasharray="10 20"
                opacity="0.6"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#54ACBF" />
                  <stop offset="50%" stopColor="#6E2BBF" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Floating Chip on Orbit */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="relative w-full h-full">
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-[#54ACBF] to-[#6E2BBF] rounded-lg shadow-lg animate-float"
                style={{
                  boxShadow: '0 0 30px rgba(84, 172, 191, 0.8), 0 0 60px rgba(110, 43, 191, 0.5)'
                }}
              >
                <div className="absolute inset-0.5 bg-[#050B18] rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-gradient-to-br from-[#54ACBF] to-[#6E2BBF] rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Card with Logo */}
          <div 
            className={`relative glass-card-light rounded-3xl p-12 shadow-2xl transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(84, 172, 191, 0.3)',
              boxShadow: '0 0 60px rgba(84, 172, 191, 0.3), 0 0 100px rgba(110, 43, 191, 0.2)'
            }}
          >
            {/* Logo */}
            <div className="text-center mb-8">
              <h1 className="text-8xl font-bold font-montserrat mb-4 bg-gradient-to-r from-[#54ACBF] via-[#6E2BBF] to-[#EC4899] bg-clip-text text-transparent animate-in fade-in duration-1000">
                Noēsis
              </h1>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-12 h-1 bg-gradient-to-r from-transparent via-[#54ACBF] to-transparent"></div>
                <div className="w-2 h-2 bg-[#54ACBF] rounded-full animate-pulse"></div>
                <div className="w-12 h-1 bg-gradient-to-r from-transparent via-[#54ACBF] to-transparent"></div>
              </div>
            </div>

            {/* Slogan */}
            <p 
              className={`text-2xl text-[#54ACBF] font-semibold font-montserrat text-center mb-12 tracking-wide transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              From sight to thought, clarity is caught.
            </p>

            {/* Start Button */}
            <div 
              className={`flex justify-center transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button
                onClick={handleStart}
                className="group relative px-12 py-5 rounded-full bg-gradient-to-r from-[#54ACBF] via-[#6E2BBF] to-[#EC4899] font-bold font-inter text-xl cursor-pointer whitespace-nowrap overflow-hidden transition-all duration-300 hover:scale-105"
                style={{
                  boxShadow: '0 0 40px rgba(84, 172, 191, 0.5), 0 0 80px rgba(110, 43, 191, 0.3)'
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Your Journey
                  <i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-2"></i>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#EC4899] to-[#54ACBF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Indicator */}
        <div 
          className={`mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#54ACBF] rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-[#6E2BBF] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-[#EC4899] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#54ACBF]/10 rounded-full blur-3xl animate-pulse-glow pointer-events-none"></div>
    </div>
  );
}
