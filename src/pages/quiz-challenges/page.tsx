import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function QuizChallenges() {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);

  const challenges = [
    {
      id: '1',
      title: 'Data Structures Speed Challenge',
      creator: 'Sarah Chen',
      participants: 12,
      questions: 20,
      timeLimit: '15 min',
      difficulty: 'Intermediate',
      prize: '500 points',
      status: 'active'
    },
    {
      id: '2',
      title: 'Algorithm Master Quiz',
      creator: 'Mike Johnson',
      participants: 8,
      questions: 15,
      timeLimit: '20 min',
      difficulty: 'Advanced',
      prize: '750 points',
      status: 'active'
    },
    {
      id: '3',
      title: 'OOP Fundamentals Battle',
      creator: 'Emma Davis',
      participants: 15,
      questions: 10,
      timeLimit: '10 min',
      difficulty: 'Beginner',
      prize: '300 points',
      status: 'starting-soon'
    },
    {
      id: '4',
      title: 'System Design Challenge',
      creator: 'Alex Kumar',
      participants: 6,
      questions: 12,
      timeLimit: '25 min',
      difficulty: 'Expert',
      prize: '1000 points',
      status: 'active'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', score: 2450, badge: '🏆' },
    { rank: 2, name: 'Mike Johnson', score: 2280, badge: '🥈' },
    { rank: 3, name: 'Emma Davis', score: 2150, badge: '🥉' },
    { rank: 4, name: 'You', score: 1980, badge: '⭐' },
    { rank: 5, name: 'Alex Kumar', score: 1850, badge: '⭐' }
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
              Quiz <span className="bg-gradient-to-r from-[#22D3EE] to-[#EC4899] bg-clip-text text-transparent">Challenges</span>
            </h1>
            <p className="text-base text-gray-400 font-['Inter']">
              Compete with friends and earn points through gamified quizzes
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Leaderboard */}
            <div className="lg:col-span-1">
              <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
                <h3 className="text-xl font-semibold mb-4 font-['Montserrat']">Leaderboard</h3>
                <div className="space-y-3">
                  {leaderboard.map((player) => (
                    <div
                      key={player.rank}
                      className={`p-4 rounded-2xl transition-all ${
                        player.name === 'You'
                          ? 'bg-gradient-to-r from-[#4A9FD8] to-[#8B5CF6]'
                          : 'bg-[#0A0E27]/50 border border-[#4A9FD8]/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{player.badge}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm font-['Inter']">{player.name}</h4>
                            <span className="text-xs text-gray-400">#{player.rank}</span>
                          </div>
                          <p className="text-xs text-[#22D3EE] font-semibold">{player.score} points</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#22D3EE]/20 to-[#8B5CF6]/20 border border-[#22D3EE]/30">
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-1 font-['Inter']">Your Total Points</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-[#22D3EE] to-[#EC4899] bg-clip-text text-transparent font-['Montserrat']">
                      1,980
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Challenges */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold font-['Montserrat']">Active Challenges</h3>
                <button className="px-4 py-2 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-lg transition-all cursor-pointer whitespace-nowrap text-sm font-['Inter']">
                  Create Challenge
                </button>
              </div>

              <div className="space-y-6">
                {challenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6 hover:border-[#22D3EE]/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-bold mb-2 font-['Montserrat']">{challenge.title}</h2>
                        <p className="text-sm text-gray-400 font-['Inter']">Created by {challenge.creator}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                        challenge.status === 'active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {challenge.status === 'active' ? 'Active Now' : 'Starting Soon'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-[#0A0E27]/50 border border-[#4A9FD8]/20">
                        <p className="text-xs text-gray-400 mb-1">Participants</p>
                        <p className="text-lg font-bold text-[#22D3EE] font-['Montserrat']">{challenge.participants}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0A0E27]/50 border border-[#4A9FD8]/20">
                        <p className="text-xs text-gray-400 mb-1">Questions</p>
                        <p className="text-lg font-bold text-[#22D3EE] font-['Montserrat']">{challenge.questions}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0A0E27]/50 border border-[#4A9FD8]/20">
                        <p className="text-xs text-gray-400 mb-1">Time Limit</p>
                        <p className="text-lg font-bold text-[#22D3EE] font-['Montserrat']">{challenge.timeLimit}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0A0E27]/50 border border-[#4A9FD8]/20">
                        <p className="text-xs text-gray-400 mb-1">Prize</p>
                        <p className="text-lg font-bold text-[#EC4899] font-['Montserrat']">{challenge.prize}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        challenge.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                        challenge.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                        challenge.difficulty === 'Advanced' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {challenge.difficulty}
                      </span>
                      <button 
                        onClick={() => setSelectedChallenge(challenge.id)}
                        className="px-6 py-2 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-lg transition-all cursor-pointer whitespace-nowrap text-sm font-['Inter']"
                      >
                        Join Challenge
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
