import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function Quizzes() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  const quizzes = [
    {
      id: 1,
      topic: 'Inheritance',
      difficulty: 'Beginner',
      questions: 10,
      timeLimit: '15 min',
      icon: 'ri-parent-line'
    },
    {
      id: 2,
      topic: 'Binary Trees',
      difficulty: 'Intermediate',
      questions: 12,
      timeLimit: '20 min',
      icon: 'ri-node-tree'
    },
    {
      id: 3,
      topic: 'Polymorphism',
      difficulty: 'Intermediate',
      questions: 8,
      timeLimit: '12 min',
      icon: 'ri-shapes-line'
    }
  ];

  const questions = [
    {
      question: 'What is inheritance in Object-Oriented Programming?',
      options: [
        'A way to hide data from other classes',
        'A mechanism where a class acquires properties from another class',
        'A method to create multiple instances',
        'A way to delete objects'
      ],
      correctAnswer: 1,
      explanation: 'Inheritance allows a class to inherit properties and methods from a parent class, promoting code reusability.'
    },
    {
      question: 'Which keyword is used to inherit a class in most OOP languages?',
      options: ['implements', 'extends', 'inherits', 'derives'],
      correctAnswer: 1,
      explanation: 'The "extends" keyword is commonly used in languages like Java and JavaScript to inherit from a parent class.'
    }
  ];

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
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

          {!quizStarted ? (
            <>
              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Adaptive <span className="bg-gradient-to-r from-[#54ACBF] to-[#FF66C4] bg-clip-text text-transparent">Quizzes</span>
                </h1>
                <p className="text-base text-gray-400">
                  Test your knowledge with AI-powered quizzes that adapt to your performance
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="group p-8 rounded-3xl bg-[#0F1C3A]/60 backdrop-blur-xl border border-[#26658C]/30 hover:border-[#54ACBF]/50 transition-all cursor-pointer"
                  >
                    <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#26658C] to-[#6E2BBF] mb-6 group-hover:shadow-lg group-hover:shadow-[#6E2BBF]/30 transition-all">
                      <i className={`${quiz.icon} text-2xl text-white`}></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{quiz.topic}</h3>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Difficulty:</span>
                        <span className="px-3 py-1 rounded-full bg-[#FF66C4]/20 text-[#FF66C4] text-xs">
                          {quiz.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Questions:</span>
                        <span className="text-white">{quiz.questions}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Time Limit:</span>
                        <span className="text-white">{quiz.timeLimit}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setQuizStarted(true)}
                      className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-[#54ACBF] to-[#6E2BBF] hover:shadow-lg hover:shadow-[#6E2BBF]/50 transition-all font-semibold text-sm cursor-pointer whitespace-nowrap"
                    >
                      Start Quiz
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* Quiz Header */}
              <div className="bg-[#0F1C3A]/60 backdrop-blur-xl border border-[#26658C]/30 rounded-3xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">Inheritance Quiz</h2>
                    <p className="text-sm text-gray-400">Question {currentQuestion + 1} of {questions.length}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#54ACBF]">12:45</div>
                    <p className="text-xs text-gray-400">Time Remaining</p>
                  </div>
                </div>
                <div className="relative h-2 bg-[#26658C]/30 rounded-full overflow-hidden">
                  <div 
                    className="absolute h-full bg-gradient-to-r from-[#54ACBF] to-[#6E2BBF] rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="bg-[#0F1C3A]/60 backdrop-blur-xl border border-[#26658C]/30 rounded-3xl p-8 mb-6">
                <h3 className="text-xl font-semibold mb-8">{questions[currentQuestion].question}</h3>
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => !showFeedback && handleAnswerSelect(index)}
                      disabled={showFeedback}
                      className={`w-full text-left p-5 rounded-2xl transition-all cursor-pointer ${
                        showFeedback
                          ? index === questions[currentQuestion].correctAnswer
                            ? 'bg-gradient-to-r from-[#26658C]/50 to-[#6E2BBF]/50 border-2 border-[#54ACBF]'
                            : selectedAnswer === index
                            ? 'bg-red-500/20 border-2 border-red-500'
                            : 'bg-[#050B18]/50 border border-[#26658C]/20'
                          : selectedAnswer === index
                          ? 'bg-gradient-to-r from-[#26658C]/30 to-[#6E2BBF]/30 border-2 border-[#54ACBF]'
                          : 'bg-[#050B18]/50 border border-[#26658C]/20 hover:border-[#54ACBF]/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold ${
                          showFeedback && index === questions[currentQuestion].correctAnswer
                            ? 'bg-[#54ACBF] text-white'
                            : showFeedback && selectedAnswer === index
                            ? 'bg-red-500 text-white'
                            : 'bg-[#26658C]/30'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="flex-1">{option}</span>
                        {showFeedback && index === questions[currentQuestion].correctAnswer && (
                          <i className="ri-check-line text-2xl text-[#54ACBF]"></i>
                        )}
                        {showFeedback && selectedAnswer === index && index !== questions[currentQuestion].correctAnswer && (
                          <i className="ri-close-line text-2xl text-red-500"></i>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {showFeedback && (
                  <div className="mt-6 p-5 rounded-2xl bg-[#26658C]/20 border border-[#54ACBF]/30">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#54ACBF]/20">
                        <i className="ri-lightbulb-line text-[#54ACBF]"></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">Explanation</h4>
                        <p className="text-sm text-gray-300">{questions[currentQuestion].explanation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setQuizStarted(false)}
                  className="px-6 py-3 rounded-full bg-[#26658C]/30 hover:bg-[#26658C]/50 transition-all text-sm cursor-pointer whitespace-nowrap"
                >
                  Exit Quiz
                </button>
                {showFeedback && (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#54ACBF] to-[#6E2BBF] hover:shadow-lg hover:shadow-[#6E2BBF]/50 transition-all font-semibold text-sm cursor-pointer whitespace-nowrap"
                  >
                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    <i className="ri-arrow-right-line ml-2"></i>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
