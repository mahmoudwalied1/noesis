import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function MindMaps() {
  const [selectedTopic, setSelectedTopic] = useState('oop');

  const topics = [
    { id: 'oop', name: 'Object-Oriented Programming', nodes: 12 },
    { id: 'trees', name: 'Tree Data Structures', nodes: 8 },
    { id: 'sorting', name: 'Sorting Algorithms', nodes: 10 }
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

          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Visual <span className="bg-gradient-to-r from-[#54ACBF] to-[#FF66C4] bg-clip-text text-transparent">Mind Maps</span>
              </h1>
              <p className="text-base text-gray-400">
                Beautiful mind maps based on your notes with concept connections
              </p>
            </div>
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#54ACBF] to-[#6E2BBF] hover:shadow-lg hover:shadow-[#6E2BBF]/50 transition-all font-semibold text-sm cursor-pointer whitespace-nowrap">
              <i className="ri-add-line mr-2"></i>
              Generate Map
            </button>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#0F1C3A]/60 backdrop-blur-xl border border-[#26658C]/30 rounded-3xl p-6">
                <h3 className="text-lg font-semibold mb-4">Your Mind Maps</h3>
                <div className="space-y-3">
                  {topics.map((topic) => (
                    <div
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`p-4 rounded-2xl cursor-pointer transition-all ${
                        selectedTopic === topic.id
                          ? 'bg-gradient-to-r from-[#26658C] to-[#6E2BBF]'
                          : 'bg-[#050B18]/50 hover:bg-[#26658C]/20'
                      }`}
                    >
                      <h4 className="font-semibold text-sm mb-2">{topic.name}</h4>
                      <p className="text-xs text-gray-400">{topic.nodes} concepts</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-[#26658C]/30">
                  <h3 className="text-lg font-semibold mb-4">Options</h3>
                  <div className="space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#050B18]/50 hover:bg-[#26658C]/20 transition-all text-sm cursor-pointer">
                      <i className="ri-download-line text-[#54ACBF]"></i>
                      Export as PNG
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#050B18]/50 hover:bg-[#26658C]/20 transition-all text-sm cursor-pointer">
                      <i className="ri-share-line text-[#54ACBF]"></i>
                      Share Map
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#050B18]/50 hover:bg-[#26658C]/20 transition-all text-sm cursor-pointer">
                      <i className="ri-refresh-line text-[#54ACBF]"></i>
                      Regenerate
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mind Map Canvas */}
            <div className="lg:col-span-3">
              <div className="bg-[#0F1C3A]/60 backdrop-blur-xl border border-[#26658C]/30 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Object-Oriented Programming</h2>
                  <div className="flex items-center gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#26658C]/30 hover:bg-[#26658C]/50 transition-all cursor-pointer">
                      <i className="ri-zoom-in-line"></i>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#26658C]/30 hover:bg-[#26658C]/50 transition-all cursor-pointer">
                      <i className="ri-zoom-out-line"></i>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#26658C]/30 hover:bg-[#26658C]/50 transition-all cursor-pointer">
                      <i className="ri-fullscreen-line"></i>
                    </button>
                  </div>
                </div>

                {/* Mind Map Visualization */}
                <div className="relative h-[600px] rounded-2xl bg-[#050B18]/50 border border-[#26658C]/20 overflow-hidden">
                  {/* Central Node */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-48 h-48 flex items-center justify-center rounded-full bg-gradient-to-br from-[#26658C] to-[#6E2BBF] shadow-lg shadow-[#6E2BBF]/50">
                      <div className="text-center">
                        <i className="ri-code-box-line text-4xl mb-2"></i>
                        <h3 className="text-lg font-bold">OOP</h3>
                      </div>
                    </div>
                  </div>

                  {/* Branch Nodes */}
                  {[
                    { label: 'Inheritance', angle: 0, color: 'from-[#54ACBF] to-[#26658C]' },
                    { label: 'Polymorphism', angle: 72, color: 'from-[#6E2BBF] to-[#54ACBF]' },
                    { label: 'Encapsulation', angle: 144, color: 'from-[#FF66C4] to-[#6E2BBF]' },
                    { label: 'Abstraction', angle: 216, color: 'from-[#26658C] to-[#FF66C4]' },
                    { label: 'Classes', angle: 288, color: 'from-[#54ACBF] to-[#6E2BBF]' }
                  ].map((node, index) => {
                    const radius = 250;
                    const x = Math.cos((node.angle * Math.PI) / 180) * radius;
                    const y = Math.sin((node.angle * Math.PI) / 180) * radius;
                    
                    return (
                      <div key={index}>
                        {/* Connection Line */}
                        <svg
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                          style={{ width: '100%', height: '100%' }}
                        >
                          <line
                            x1="50%"
                            y1="50%"
                            x2={`calc(50% + ${x}px)`}
                            y2={`calc(50% + ${y}px)`}
                            stroke="url(#gradient)"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                          />
                          <defs>
                            <linearGradient id="gradient">
                              <stop offset="0%" stopColor="#54ACBF" stopOpacity="0.5" />
                              <stop offset="100%" stopColor="#6E2BBF" stopOpacity="0.5" />
                            </linearGradient>
                          </defs>
                        </svg>

                        {/* Node */}
                        <div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                          style={{
                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                          }}
                        >
                          <div className={`w-32 h-32 flex items-center justify-center rounded-2xl bg-gradient-to-br ${node.color} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all`}>
                            <div className="text-center">
                              <i className="ri-node-tree text-2xl mb-1"></i>
                              <p className="text-sm font-semibold">{node.label}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-6 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#54ACBF] to-[#6E2BBF]"></div>
                    <span className="text-sm text-gray-400">Core Concepts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#FF66C4] to-[#6E2BBF]"></div>
                    <span className="text-sm text-gray-400">Related Topics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-[#54ACBF]/50"></div>
                    <span className="text-sm text-gray-400">Connections</span>
                  </div>
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
