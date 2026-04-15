import { useNavigate } from 'react-router-dom';

export default function SmartGlasses() {
  const navigate = useNavigate();

  const glassesFeatures = [
    {
      icon: 'ri-eye-line',
      title: 'Real-World Recognition',
      description: 'Point at text, diagrams, or objects and get instant AI explanations on your lens.'
    },
    {
      icon: 'ri-camera-line',
      title: 'Screenshot Capture',
      description: 'Capture what you see and automatically add it to your notes for later review.'
    },
    {
      icon: 'ri-calculator-line',
      title: 'Equation Solver',
      description: 'Detect equations or charts and get step-by-step solutions displayed on your lens.'
    },
    {
      icon: 'ri-hand-heart-line',
      title: 'Gesture Control',
      description: 'Control explanations with simple gestures like swipe, tap, or nod.'
    },
    {
      icon: 'ri-eye-2-line',
      title: 'Eye Tracking',
      description: 'Detects when you\'re confused or distracted and pauses explanations automatically.'
    },
    {
      icon: 'ri-wifi-off-line',
      title: 'Offline Mode',
      description: 'Access saved notes and videos even without an internet connection.'
    }
  ];

  return (
    <section id="glasses" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 mb-6">
              <span className="text-sm text-[#EC4899] font-['Inter']">Next-Gen Technology</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Montserrat']">
              Study with
              <span className="bg-gradient-to-r from-[#4A9FD8] to-[#EC4899] bg-clip-text text-transparent"> Smart Glasses</span>
            </h2>
            <p className="text-base text-gray-400 mb-8 leading-relaxed font-['Inter']">
              Experience augmented reality learning with Noesis Smart Glasses. Get real-time explanations, capture screenshots, and control your learning environment with gestures and voice commands.
            </p>

            <div className="space-y-4 mb-8">
              {glassesFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#151B3B]/40 backdrop-blur-xl border border-[#4A9FD8]/20 hover:border-[#22D3EE]/50 transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#4A9FD8] to-[#8B5CF6] flex-shrink-0">
                    <i className={`${feature.icon} text-lg text-white`}></i>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1 text-white font-['Inter']">{feature.title}</h3>
                    <p className="text-sm text-gray-400 font-['Inter']">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/glasses-preorder')}
                className="px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-[#4A9FD8] to-[#8B5CF6] rounded-full hover:shadow-2xl hover:shadow-[#8B5CF6]/50 transition-all cursor-pointer whitespace-nowrap font-['Inter']"
              >
                Pre-Order Smart Glasses
              </button>
              <button 
                onClick={() => navigate('/glasses-controls')}
                className="px-8 py-4 text-base font-semibold text-white border border-[#22D3EE]/30 rounded-full hover:border-[#22D3EE] hover:bg-[#22D3EE]/10 transition-all cursor-pointer whitespace-nowrap font-['Inter']"
              >
                Learn Controls
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/20 to-[#22D3EE]/20 rounded-3xl blur-3xl"></div>
            <div className="relative rounded-3xl overflow-hidden border border-[#4A9FD8]/30 bg-[#151B3B]/40 backdrop-blur-xl p-8">
              <div className="relative h-96 w-full">
                <img
                  src="https://readdy.ai/api/search-image?query=futuristic%20smart%20glasses%20with%20holographic%20display%20showing%20code%20and%20data%20structures%2C%20sleek%20modern%20AR%20glasses%20with%20glowing%20cyan%20and%20purple%20interface%20elements%2C%20transparent%20lens%20displaying%20digital%20information%20overlay%2C%20high-tech%20wearable%20device%20with%20minimalist%20design%20on%20dark%20background%2C%20advanced%20augmented%20reality%20eyewear%20for%20education&width=800&height=800&seq=glasses-001&orientation=squarish"
                  alt="Smart Glasses"
                  className="w-full h-full object-cover object-top rounded-2xl"
                />
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white mb-1 font-['Montserrat']">Noesis Vision</div>
                  <div className="text-sm text-gray-400 font-['Inter']">Smart AR Glasses</div>
                </div>
                <div className="px-4 py-2 rounded-full bg-gradient-to-r from-[#4A9FD8] to-[#8B5CF6] text-sm font-semibold text-white whitespace-nowrap">
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}