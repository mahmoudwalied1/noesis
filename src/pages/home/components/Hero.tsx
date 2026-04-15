export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Galactic Bluish Space Background */}
      <div className="absolute inset-0">
        <img 
          src="https://readdy.ai/api/search-image?query=stunning%20deep%20space%20galaxy%20nebula%20with%20vibrant%20blue%20cyan%20and%20purple%20cosmic%20clouds%20stars%20scattered%20across%20dark%20navy%20background%20ethereal%20glowing%20gas%20formations%20cosmic%20dust%20particles%20mystical%20atmosphere%20ultra%20detailed%20space%20photography%20style%20dreamy%20celestial%20scene%20with%20soft%20luminous%20blue%20tones%20and%20sparkling%20starlight%20creating%20peaceful%20cosmic%20ambiance&width=1920&height=1080&seq=hero-galactic-bg-001&orientation=landscape" 
          alt="Galactic Space Background" 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space/80 via-space-navy/60 to-deep-space/90"></div>
      </div>

      {/* Animated Cosmic Particles */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(34, 211, 238, ${Math.random() * 0.5 + 0.3})`
            }}
          />
        ))}
      </div>
      
      {/* Plasma Gradient Orbs - Updated Colors */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-stellar-aqua/20 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-deep/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-bright/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '3s' }}></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-safe text-center w-full">
        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold font-montserrat mb-6 leading-tight animate-in fade-in slide-in-from-bottom duration-1000">
          Learn <span className="bg-gradient-to-r from-stellar-aqua via-nebula-purple to-pink-bright bg-clip-text text-transparent">Smarter</span> with
          <br />
          <span className="bg-gradient-to-r from-pink-bright via-violet-deep to-galactic-blue bg-clip-text text-transparent">AI-Powered</span> Education
        </h1>

        {/* Slogan */}
        <p className="text-2xl md:text-3xl text-stellar-aqua mb-8 font-semibold font-montserrat tracking-wide animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
          From sight to thought, clarity is caught.
        </p>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-inter animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
          AI-powered learning assistant with voice control, smart notes, adaptive quizzes, and collaborative study rooms
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
          <a 
            href="/ai-explanations"
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-stellar-aqua via-galactic-blue to-nebula-purple hover:shadow-neon-cyan transition-all duration-300 font-semibold font-inter text-lg cursor-pointer whitespace-nowrap relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Learning Free
              <i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-1"></i>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-nebula-purple to-stellar-aqua opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          <a 
            href="/ai-explanations"
            className="group px-8 py-4 rounded-full glass-card border-2 border-stellar-aqua hover:bg-stellar-aqua/10 hover:shadow-neon-cyan transition-all duration-300 font-semibold font-inter text-lg cursor-pointer whitespace-nowrap"
          >
            <i className="ri-play-circle-line mr-2 transition-transform duration-300 group-hover:scale-110"></i>
            Watch Demo
          </a>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom duration-1000 delay-700">
          {[
            { icon: 'ri-mic-line', text: 'Voice Control', link: '/ai-explanations' },
            { icon: 'ri-brain-line', text: 'AI Explanations', link: '/ai-explanations' },
            { icon: 'ri-file-list-3-line', text: 'Smart Notes', link: '/notes' },
            { icon: 'ri-question-answer-line', text: 'Adaptive Quizzes', link: '/quizzes' },
            { icon: 'ri-team-line', text: 'Study Together', link: '/study-room' }
          ].map((feature, index) => (
            <a
              key={index}
              href={feature.link}
              className="group px-5 py-3 rounded-full glass-card border border-stellar-aqua/30 hover:border-stellar-aqua/60 hover:bg-stellar-aqua/10 transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${800 + index * 100}ms` }}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className={`${feature.icon} text-stellar-aqua transition-transform duration-300 group-hover:scale-110`}></i>
                </div>
                <span className="text-sm font-medium font-inter">{feature.text}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full glass-card border border-stellar-aqua/30 flex items-end justify-center pb-2">
          <div className="w-1.5 h-3 bg-gradient-to-b from-stellar-aqua to-transparent rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
