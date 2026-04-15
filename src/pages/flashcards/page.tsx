import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function Flashcards() {
  const [flipped, setFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);

  const flashcardSets = [
    {
      id: 1,
      title: 'OOP Fundamentals',
      cards: 24,
      mastered: 18,
      category: 'OOP',
      color: 'from-[#26658C] to-[#54ACBF]'
    },
    {
      id: 2,
      title: 'Tree Algorithms',
      cards: 16,
      mastered: 10,
      category: 'Data Structures',
      color: 'from-[#54ACBF] to-[#6E2BBF]'
    },
    {
      id: 3,
      title: 'Sorting Methods',
      cards: 12,
      mastered: 8,
      category: 'Algorithms',
      color: 'from-[#6E2BBF] to-[#FF66C4]'
    }
  ];

  const cards = [
    {
      front: 'What is Encapsulation?',
      back: 'Encapsulation is the bundling of data and methods that operate on that data within a single unit (class), restricting direct access to some components.',
      difficulty: 'Beginner',
      mastered: false
    },
    {
      front: 'Define Polymorphism',
      back: 'Polymorphism allows objects of different classes to be treated as objects of a common parent class, enabling methods to behave differently based on the object type.',
      difficulty: 'Intermediate',
      mastered: true
    }
  ];

  const handleNext = () => {
    setFlipped(false);
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const handlePrevious = () => {
    setFlipped(false);
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
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

          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Smart <span className="bg-gradient-to-r from-[#54ACBF] to-[#FF66C4] bg-clip-text text-transparent">Flashcards</span>
              </h1>
              <p className="text-base text-gray-400">
                AI-generated flashcards from your study material
              </p>
            </div>
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#54ACBF] to-[#6E2BBF] hover:shadow-lg hover:shadow-[#6E2BBF]/50 transition-all font-semibold text-sm cursor-pointer whitespace-nowrap">
              <i className="ri-add-line mr-2"></i>
              Generate Cards
            </button>
          </div>

          {/* Flashcard Sets */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {flashcardSets.map((set) => (
              <div
                key={set.id}
                className="group p-6 rounded-3xl bg-[#0F1C3A]/60 backdrop-blur-xl border border-[#26658C]/30 hover:border-[#54ACBF]/50 transition-all cursor-pointer"
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br ${set.color} mb-4`}>
                  <i className="ri-stack-line text-xl text-white"></i>
                </div>
                <h3 className="text-lg font-semibold mb-2">{set.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{set.category}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Total Cards:</span>
                    <span className="text-white font-semibold">{set.cards}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Mastered:</span>
                    <span className="text-[#54ACBF] font-semibold">{set.mastered}</span>
                  </div>
                  <div className="relative h-2 bg-[#26658C]/30 rounded-full overflow-hidden mt-3">
                    <div 
                      className={`absolute h-full bg-gradient-to-r ${set.color} rounded-full`}
                      style={{ width: `${(set.mastered / set.cards) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Flashcard Viewer */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#0F1C3A]/60 backdrop-blur-xl border border-[#26658C]/30 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-semibold">OOP Fundamentals</h3>
                  <p className="text-sm text-gray-400">Card {currentCard + 1} of {cards.length}</p>
                </div>
                <span className="px-4 py-2 rounded-full bg-[#FF66C4]/20 text-[#FF66C4] text-sm">
                  {cards[currentCard].difficulty}
                </span>
              </div>

              {/* Card */}
              <div
                onClick={() => setFlipped(!flipped)}
                className="relative h-96 mb-8 cursor-pointer"
                style={{ perspective: '1000px' }}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-500 cursor-pointer`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front */}
                  <div
                    className="absolute w-full h-full rounded-3xl bg-gradient-to-br from-[#26658C]/30 to-[#6E2BBF]/30 border-2 border-[#54ACBF]/50 flex items-center justify-center p-12"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="text-center">
                      <i className="ri-question-line text-5xl text-[#54ACBF] mb-6"></i>
                      <h2 className="text-2xl font-bold">{cards[currentCard].front}</h2>
                      <p className="text-sm text-gray-400 mt-4">Click to reveal answer</p>
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute w-full h-full rounded-3xl bg-gradient-to-br from-[#6E2BBF]/30 to-[#FF66C4]/30 border-2 border-[#FF66C4]/50 flex items-center justify-center p-12"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="text-center">
                      <i className="ri-lightbulb-flash-line text-5xl text-[#FF66C4] mb-6"></i>
                      <p className="text-lg leading-relaxed">{cards[currentCard].back}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrevious}
                  className="px-6 py-3 rounded-full bg-[#26658C]/30 hover:bg-[#26658C]/50 transition-all text-sm cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-arrow-left-line mr-2"></i>
                  Previous
                </button>

                <div className="flex items-center gap-3">
                  <button className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500/20 hover:bg-red-500/30 transition-all cursor-pointer">
                    <i className="ri-close-line text-xl text-red-400"></i>
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#54ACBF]/20 hover:bg-[#54ACBF]/30 transition-all cursor-pointer">
                    <i className="ri-check-line text-xl text-[#54ACBF]"></i>
                  </button>
                </div>

                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#54ACBF] to-[#6E2BBF] hover:shadow-lg hover:shadow-[#6E2BBF]/50 transition-all font-semibold text-sm cursor-pointer whitespace-nowrap"
                >
                  Next
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
