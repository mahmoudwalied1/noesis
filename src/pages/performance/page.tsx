import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function Performance() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const myStats = {
    totalPoints: 1980,
    quizzesCompleted: 45,
    studyHours: 32,
    rank: 4
  };

  const peers = [
    { name: 'Sarah Chen', points: 2450, quizzes: 58, hours: 42, trend: 'up' },
    { name: 'Mike Johnson', points: 2280, quizzes: 52, hours: 38, trend: 'up' },
    { name: 'Emma Davis', points: 2150, quizzes: 48, hours: 35, trend: 'down' },
    { name: 'You', points: 1980, quizzes: 45, hours: 32, trend: 'up' },
    { name: 'Alex Kumar', points: 1850, quizzes: 41, hours: 28, trend: 'up' }
  ];

  const subjects = [
    { name: 'Data Structures', yourScore: 85, avgScore: 72, color: '#22D3EE' },
    { name: 'Algorithms', yourScore: 78, avgScore: 75, color: '#8B5CF6' },
    { name: 'OOP Concepts', yourScore: 92, avgScore: 80, color: '#EC4899' },
    { name: 'System Design', yourScore: 68, avgScore: 70, color: '#F472B6' }
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
              Compare <span className="bg-gradient-to-r from-[#22D3EE] to-[#EC4899] bg-clip-text text-transparent">Performance</span>
            </h1>
            <p className="text-base text-gray-400 font-['Inter']">
              Track your progress and compare with your study group
            </p>
          </div>

          {/* Period Selector */}
          <div className="flex gap-3 mb-8">
            {['week', 'month', 'all-time'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-6 py-2 rounded-full transition-all cursor-pointer whitespace-nowrap text-sm font-['Inter'] ${
                  selectedPeriod === period
                    ? 'bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6]'
                    : 'bg-[#151B3B]/60 border border-[#4A9FD8]/30 hover:border-[#22D3EE]/50'
                }`}
              >
                {period === 'week' ? 'This Week' : period === 'month' ? 'This Month' : 'All Time'}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* My Stats Cards */}
            <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-gray-400 font-['Inter']">Total Points</h3>
                <i className="ri-trophy-line text-[#22D3EE]"></i>
              </div>
              <p className="text-3xl font-bold bg-gradient-to-r from-[#22D3EE] to-[#EC4899] bg-clip-text text-transparent font-['Montserrat']">
                {myStats.totalPoints}
              </p>
            </div>

            <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-gray-400 font-['Inter']">Quizzes Completed</h3>
                <i className="ri-file-list-3-line text-[#8B5CF6]"></i>
              </div>
              <p className="text-3xl font-bold text-white font-['Montserrat']">{myStats.quizzesCompleted}</p>
            </div>

            <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-gray-400 font-['Inter']">Study Hours</h3>
                <i className="ri-time-line text-[#EC4899]"></i>
              </div>
              <p className="text-3xl font-bold text-white font-['Montserrat']">{myStats.studyHours}h</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Peer Comparison */}
            <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
              <h3 className="text-xl font-semibold mb-6 font-['Montserrat']">Study Group Ranking</h3>
              <div className="space-y-4">
                {peers.map((peer, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-2xl transition-all ${
                      peer.name === 'You'
                        ? 'bg-gradient-to-r from-[#4A9FD8] to-[#8B5CF6]'
                        : 'bg-[#0A0E27]/50 border border-[#4A9FD8]/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-[#22D3EE] font-['Montserrat']">#{index + 1}</span>
                        <div>
                          <h4 className="font-semibold text-sm font-['Inter']">{peer.name}</h4>
                          <p className="text-xs text-gray-400">{peer.points} points</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1 ${
                        peer.trend === 'up' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        <i className={`ri-arrow-${peer.trend}-line`}></i>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-2 rounded-lg bg-[#0A0E27]/30">
                        <p className="text-xs text-gray-400 font-['Inter']">Quizzes</p>
                        <p className="text-sm font-bold text-[#22D3EE] font-['Montserrat']">{peer.quizzes}</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-[#0A0E27]/30">
                        <p className="text-xs text-gray-400 font-['Inter']">Hours</p>
                        <p className="text-sm font-bold text-[#22D3EE] font-['Montserrat']">{peer.hours}h</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Performance */}
            <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
              <h3 className="text-xl font-semibold mb-6 font-['Montserrat']">Subject Performance</h3>
              <div className="space-y-6">
                {subjects.map((subject, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold font-['Inter']">{subject.name}</h4>
                      <span className="text-xs text-gray-400">
                        You: {subject.yourScore}% | Avg: {subject.avgScore}%
                      </span>
                    </div>
                    <div className="relative h-3 bg-[#0A0E27]/50 rounded-full overflow-hidden">
                      <div
                        className="absolute h-full rounded-full transition-all"
                        style={{
                          width: `${subject.yourScore}%`,
                          backgroundColor: subject.color
                        }}
                      ></div>
                      <div
                        className="absolute h-full border-l-2 border-white/50"
                        style={{ left: `${subject.avgScore}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 font-['Inter']">
                      {subject.yourScore > subject.avgScore 
                        ? `${subject.yourScore - subject.avgScore}% above average` 
                        : `${subject.avgScore - subject.yourScore}% below average`}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#22D3EE]/20 to-[#8B5CF6]/20 border border-[#22D3EE]/30">
                <div className="flex items-center gap-3">
                  <i className="ri-lightbulb-line text-2xl text-[#22D3EE]"></i>
                  <div>
                    <p className="text-sm font-semibold font-['Inter']">Improvement Tip</p>
                    <p className="text-xs text-gray-400">Focus on System Design to catch up with your peers</p>
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
