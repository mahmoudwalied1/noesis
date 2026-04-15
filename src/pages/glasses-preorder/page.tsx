import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function GlassesPreorder() {
  const [selectedColor, setSelectedColor] = useState('cosmic-black');
  const [quantity, setQuantity] = useState(1);

  const colors = [
    { id: 'cosmic-black', name: 'Cosmic Black', hex: '#0A0E27' },
    { id: 'nebula-blue', name: 'Nebula Blue', hex: '#22D3EE' },
    { id: 'stellar-purple', name: 'Stellar Purple', hex: '#8B5CF6' }
  ];

  const features = [
    { icon: 'ri-eye-line', title: 'Real-World Recognition', desc: 'Point at text, diagrams, or objects for instant AI explanations' },
    { icon: 'ri-camera-line', title: 'Screenshot Capture', desc: 'Capture what you see and add to your notes automatically' },
    { icon: 'ri-calculator-line', title: 'Equation Solver', desc: 'Detect equations and get step-by-step solutions on your lens' },
    { icon: 'ri-hand-heart-line', title: 'Gesture Control', desc: 'Control with simple gestures like swipe, tap, or nod' },
    { icon: 'ri-eye-2-line', title: 'Eye Tracking', desc: 'Pauses when you\'re confused or distracted automatically' },
    { icon: 'ri-wifi-off-line', title: 'Offline Mode', desc: 'Access saved notes and videos without internet' }
  ];

  const specs = [
    { label: 'Display', value: 'Micro-OLED, 1080p per eye' },
    { label: 'Field of View', value: '50° diagonal' },
    { label: 'Battery Life', value: 'Up to 8 hours' },
    { label: 'Weight', value: '48g (ultra-lightweight)' },
    { label: 'Connectivity', value: 'Bluetooth 5.2, Wi-Fi 6' },
    { label: 'Sensors', value: 'Eye tracking, gesture recognition, IMU' }
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
              Pre-Order <span className="bg-gradient-to-r from-[#22D3EE] to-[#EC4899] bg-clip-text text-transparent">Noesis Vision</span>
            </h1>
            <p className="text-base text-gray-400 font-['Inter']">
              The future of learning is here. Reserve your smart glasses today.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-8 mb-6">
                <div className="relative h-96 w-full mb-6">
                  <img
                    src="https://readdy.ai/api/search-image?query=futuristic%20smart%20AR%20glasses%20with%20holographic%20display%20showing%20educational%20interface%2C%20sleek%20modern%20augmented%20reality%20eyewear%20with%20glowing%20cyan%20and%20purple%20accents%2C%20transparent%20lens%20with%20digital%20overlay%2C%20high-tech%20wearable%20device%20on%20dark%20cosmic%20background&width=800&height=800&seq=glasses-preorder-001&orientation=squarish"
                    alt="Noesis Vision Smart Glasses"
                    className="w-full h-full object-cover object-top rounded-2xl"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] text-xs font-semibold whitespace-nowrap">
                    Coming Q2 2025
                  </div>
                </div>

                {/* Color Selection */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-3 font-['Montserrat']">Choose Color</h3>
                  <div className="flex gap-3">
                    {colors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color.id)}
                        className={`flex-1 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                          selectedColor === color.id
                            ? 'border-[#22D3EE] bg-[#22D3EE]/10'
                            : 'border-[#4A9FD8]/30 hover:border-[#22D3EE]/50'
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-full mx-auto mb-2"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <p className="text-xs font-['Inter']">{color.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-3 font-['Montserrat']">Quantity</h3>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#4A9FD8]/30 hover:bg-[#4A9FD8]/50 transition-all cursor-pointer"
                    >
                      <i className="ri-subtract-line"></i>
                    </button>
                    <span className="text-2xl font-bold font-['Montserrat']">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#4A9FD8]/30 hover:bg-[#4A9FD8]/50 transition-all cursor-pointer"
                    >
                      <i className="ri-add-line"></i>
                    </button>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-[#22D3EE]/20 to-[#8B5CF6]/20 border border-[#22D3EE]/30 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-400 font-['Inter']">Pre-Order Price</p>
                      <p className="text-3xl font-bold font-['Montserrat']">$499</p>
                      <p className="text-xs text-gray-400 line-through">Regular: $699</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400 font-['Inter']">Total</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-[#22D3EE] to-[#EC4899] bg-clip-text text-transparent font-['Montserrat']">
                        ${499 * quantity}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Link
                      to="/glasses-3d"
                      className="block w-full px-8 py-4 rounded-full glass-card hover:bg-stellar-aqua/20 transition-all font-semibold text-base cursor-pointer whitespace-nowrap text-center font-inter border border-stellar-aqua/30"
                    >
                      <i className="ri-3d-view mr-2"></i>
                      View in 3D
                    </Link>
                    <button
                      onClick={() => navigate('/glasses-controls')}
                      className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-2xl hover:shadow-[#8B5CF6]/50 transition-all cursor-pointer whitespace-nowrap font-semibold font-['Inter']"
                    >
                      Reserve Now - $50 Deposit
                    </button>
                    <p className="text-xs text-center text-gray-400 mt-3 font-['Inter']">
                      Pay remaining $449 upon shipping. Cancel anytime for full refund.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-400 font-['Inter']">
                  <div className="flex items-center gap-2">
                    <i className="ri-shield-check-line text-[#22D3EE]"></i>
                    <span>2-Year Warranty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-truck-line text-[#22D3EE]"></i>
                    <span>Free Shipping</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div>
              {/* Features */}
              <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6 mb-6">
                <h3 className="text-2xl font-bold mb-6 font-['Montserrat']">Key Features</h3>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl bg-[#0A0E27]/50 border border-[#4A9FD8]/20"
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#22D3EE] to-[#8B5CF6] flex-shrink-0">
                        <i className={`${feature.icon} text-lg`}></i>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-1 font-['Inter']">{feature.title}</h4>
                        <p className="text-xs text-gray-400">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specs */}
              <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
                <h3 className="text-2xl font-bold mb-6 font-['Montserrat']">Technical Specifications</h3>
                <div className="space-y-3">
                  {specs.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#0A0E27]/50"
                    >
                      <span className="text-sm text-gray-400 font-['Inter']">{spec.label}</span>
                      <span className="text-sm font-semibold text-white font-['Inter']">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate('/glasses-controls')}
                  className="w-full mt-6 px-6 py-3 rounded-full border border-[#22D3EE]/30 hover:border-[#22D3EE] hover:bg-[#22D3EE]/10 transition-all cursor-pointer whitespace-nowrap font-['Inter']"
                >
                  Learn About Controls
                  <i className="ri-arrow-right-line ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
