import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Link } from 'react-router-dom';

export default function GlassesControls() {
  const navigate = useNavigate();
  const [selectedControl, setSelectedControl] = useState('gestures');

  const gestureControls = [
    { gesture: 'Swipe Right', action: 'Next explanation or slide', icon: 'ri-arrow-right-line' },
    { gesture: 'Swipe Left', action: 'Previous explanation or slide', icon: 'ri-arrow-left-line' },
    { gesture: 'Tap (Single)', action: 'Pause/Resume explanation', icon: 'ri-hand-coin-line' },
    { gesture: 'Tap (Double)', action: 'Bookmark current moment', icon: 'ri-bookmark-line' },
    { gesture: 'Pinch', action: 'Zoom in/out on content', icon: 'ri-zoom-in-line' },
    { gesture: 'Nod Up', action: 'Scroll up content', icon: 'ri-arrow-up-line' },
    { gesture: 'Nod Down', action: 'Scroll down content', icon: 'ri-arrow-down-line' },
    { gesture: 'Head Shake', action: 'Close current overlay', icon: 'ri-close-line' }
  ];

  const voiceCommands = [
    { command: 'Hey Noesis', action: 'Activate voice assistant', example: '"Hey Noesis, explain this"' },
    { command: 'Explain this', action: 'Get AI explanation of what you\'re looking at', example: '"Explain this equation"' },
    { command: 'Take screenshot', action: 'Capture current view to notes', example: '"Take screenshot"' },
    { command: 'Bookmark', action: 'Save current moment', example: '"Bookmark this section"' },
    { command: 'Solve equation', action: 'Detect and solve math problems', example: '"Solve this equation"' },
    { command: 'Translate', action: 'Translate text in view', example: '"Translate to Spanish"' },
    { command: 'Read aloud', action: 'Text-to-speech for visible text', example: '"Read this paragraph"' },
    { command: 'Show notes', action: 'Display your saved notes', example: '"Show my notes"' }
  ];

  const eyeTracking = [
    { feature: 'Focus Detection', desc: 'Highlights what you\'re looking at for context-aware help' },
    { feature: 'Confusion Detection', desc: 'Pauses and offers help when you seem confused' },
    { feature: 'Reading Speed', desc: 'Adjusts content pace based on your reading speed' },
    { feature: 'Attention Monitoring', desc: 'Detects when you\'re distracted and pauses content' },
    { feature: 'Hands-Free Navigation', desc: 'Look at buttons to select them (dwell-time activation)' },
    { feature: 'Fatigue Detection', desc: 'Suggests breaks when eye strain is detected' }
  ];

  const physicalControls = [
    { control: 'Power Button', location: 'Right temple', actions: ['Press: Wake/Sleep', 'Hold 3s: Power on/off'] },
    { control: 'Volume Rocker', location: 'Right temple', actions: ['Up/Down: Adjust volume', 'Press both: Mute'] },
    { control: 'Action Button', location: 'Left temple', actions: ['Press: Take screenshot', 'Hold: Start recording'] },
    { control: 'Touch Pad', location: 'Right temple', actions: ['Swipe: Navigate', 'Tap: Select', 'Hold: Context menu'] }
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

          <div className="text-center mb-12">
            <Link to="/glasses-preorder" className="inline-flex items-center gap-2 text-stellar-aqua hover:text-stellar-aqua/80 transition-colors mb-6 cursor-pointer">
              <i className="ri-arrow-left-line"></i>
              Back to Pre-order
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold font-montserrat mb-4">
              Control Your <span className="bg-gradient-to-r from-stellar-aqua via-nebula-purple to-plasma-glow bg-clip-text text-transparent">Smart Glasses</span>
            </h1>
            <p className="text-lg text-gray-400 font-inter max-w-2xl mx-auto mb-8">
              Master intuitive gestures, voice commands, and eye tracking to control your Noesis experience
            </p>
            <Link
              to="/glasses-3d"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-stellar-aqua to-nebula-purple hover:shadow-neon-cyan transition-all font-semibold text-base cursor-pointer whitespace-nowrap font-inter"
            >
              <i className="ri-3d-view"></i>
              View in 3D
            </Link>
          </div>

          {/* Control Type Selector */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { id: 'gestures', label: 'Gesture Controls', icon: 'ri-hand-heart-line' },
              { id: 'voice', label: 'Voice Commands', icon: 'ri-mic-line' },
              { id: 'eye', label: 'Eye Tracking', icon: 'ri-eye-2-line' },
              { id: 'physical', label: 'Physical Buttons', icon: 'ri-remote-control-line' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedControl(type.id)}
                className={`px-6 py-3 rounded-full transition-all cursor-pointer whitespace-nowrap font-['Inter'] flex items-center gap-2 ${
                  selectedControl === type.id
                    ? 'bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6]'
                    : 'bg-[#151B3B]/60 border border-[#4A9FD8]/30 hover:border-[#22D3EE]/50'
                }`}
              >
                <i className={type.icon}></i>
                {type.label}
              </button>
            ))}
          </div>

          {/* Gesture Controls */}
          {selectedControl === 'gestures' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-8">
                <div className="relative h-96 w-full mb-6">
                  <img
                    src="https://readdy.ai/api/search-image?query=hand%20gesture%20controls%20for%20smart%20AR%20glasses%20showing%20swipe%20tap%20pinch%20movements%20with%20glowing%20cyan%20trails%20on%20dark%20background%2C%20futuristic%20gesture%20recognition%20interface%20with%20motion%20lines%20and%20digital%20effects&width=600&height=600&seq=gesture-controls-001&orientation=squarish"
                    alt="Gesture Controls"
                    className="w-full h-full object-cover object-top rounded-2xl"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2 font-['Montserrat']">Natural Gestures</h3>
                <p className="text-sm text-gray-400 font-['Inter']">
                  Control your glasses with intuitive hand movements detected by advanced sensors
                </p>
              </div>

              <div className="space-y-4">
                {gestureControls.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-2xl p-4 hover:border-[#22D3EE]/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#8B5CF6] flex-shrink-0">
                        <i className={`${item.icon} text-xl`}></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1 font-['Inter']">{item.gesture}</h4>
                        <p className="text-sm text-gray-400">{item.action}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Voice Commands */}
          {selectedControl === 'voice' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-8">
                <div className="relative h-96 w-full mb-6">
                  <img
                    src="https://readdy.ai/api/search-image?query=voice%20control%20interface%20for%20smart%20glasses%20with%20sound%20waves%20and%20voice%20recognition%20visualization%2C%20glowing%20cyan%20and%20purple%20audio%20waveforms%20on%20dark%20background%2C%20futuristic%20voice%20assistant%20display%20with%20microphone%20icon&width=600&height=600&seq=voice-controls-001&orientation=squarish"
                    alt="Voice Commands"
                    className="w-full h-full object-cover object-top rounded-2xl"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2 font-['Montserrat']">Voice Assistant</h3>
                <p className="text-sm text-gray-400 font-['Inter']">
                  Hands-free control with natural language voice commands powered by AI
                </p>
              </div>

              <div className="space-y-4">
                {voiceCommands.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-2xl p-4 hover:border-[#22D3EE]/50 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#22D3EE] to-[#8B5CF6] flex-shrink-0 mt-1">
                        <i className="ri-mic-line text-lg"></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1 text-[#22D3EE] font-['Inter']">"{item.command}"</h4>
                        <p className="text-sm text-gray-300 mb-2">{item.action}</p>
                        <p className="text-xs text-gray-500 italic">{item.example}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Eye Tracking */}
          {selectedControl === 'eye' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-8">
                <div className="relative h-96 w-full mb-6">
                  <img
                    src="https://readdy.ai/api/search-image?query=eye%20tracking%20technology%20visualization%20with%20glowing%20cyan%20eye%20scan%20pattern%20and%20focus%20points%2C%20futuristic%20iris%20recognition%20interface%20on%20dark%20background%2C%20advanced%20eye%20movement%20detection%20display%20with%20digital%20overlay&width=600&height=600&seq=eye-tracking-001&orientation=squarish"
                    alt="Eye Tracking"
                    className="w-full h-full object-cover object-top rounded-2xl"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2 font-['Montserrat']">Advanced Eye Tracking</h3>
                <p className="text-sm text-gray-400 font-['Inter']">
                  Intelligent gaze detection that understands your focus and adapts to your needs
                </p>
              </div>

              <div className="space-y-4">
                {eyeTracking.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-2xl p-6 hover:border-[#22D3EE]/50 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#8B5CF6] flex-shrink-0">
                        <i className="ri-eye-2-line text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 font-['Inter']">{item.feature}</h4>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Physical Controls */}
          {selectedControl === 'physical' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-8">
                <div className="relative h-96 w-full mb-6">
                  <img
                    src="https://readdy.ai/api/search-image?query=smart%20glasses%20physical%20buttons%20and%20controls%20diagram%20showing%20temple%20buttons%20and%20touch%20pad%20locations%2C%20sleek%20AR%20glasses%20with%20labeled%20control%20points%20in%20cyan%20and%20purple%20highlights%20on%20dark%20background&width=600&height=600&seq=physical-controls-001&orientation=squarish"
                    alt="Physical Controls"
                    className="w-full h-full object-cover object-top rounded-2xl"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2 font-['Montserrat']">Physical Buttons</h3>
                <p className="text-sm text-gray-400 font-['Inter']">
                  Tactile controls for quick access to essential functions
                </p>
              </div>

              <div className="space-y-4">
                {physicalControls.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-2xl p-6 hover:border-[#22D3EE]/50 transition-all"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#8B5CF6] flex-shrink-0">
                        <i className="ri-remote-control-line text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 font-['Inter']">{item.control}</h4>
                        <p className="text-xs text-[#22D3EE]">{item.location}</p>
                      </div>
                    </div>
                    <div className="space-y-2 pl-16">
                      {item.actions.map((action, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]"></div>
                          <p className="text-sm text-gray-400 font-['Inter']">{action}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/glasses-preorder')}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-2xl hover:shadow-[#8B5CF6]/50 transition-all cursor-pointer whitespace-nowrap font-semibold text-lg font-['Inter']"
            >
              Pre-Order Noesis Vision
              <i className="ri-arrow-right-line ml-2"></i>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
