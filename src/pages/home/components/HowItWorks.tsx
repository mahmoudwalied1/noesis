export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Topic',
      description: 'Select from OOP concepts like inheritance, polymorphism, or Data Structures like trees, graphs, and algorithms.',
      icon: 'ri-book-open-line'
    },
    {
      number: '02',
      title: 'Watch AI Explanations',
      description: 'Get personalized video explanations with voice control. Pause, replay, and adjust the pace to match your learning style.',
      icon: 'ri-play-circle-line'
    },
    {
      number: '03',
      title: 'Take Smart Notes',
      description: 'AI automatically generates organized notes. Add your own annotations and highlights for a complete study guide.',
      icon: 'ri-edit-box-line'
    },
    {
      number: '04',
      title: 'Practice & Master',
      description: 'Test your knowledge with adaptive quizzes, flashcards, and instant practice activities. Track your progress in real-time.',
      icon: 'ri-trophy-line'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#6E2BBF]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#54ACBF]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-[#26658C]/20 border border-[#26658C]/30 mb-4">
            <span className="text-sm text-[#54ACBF]">Simple Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How <span className="bg-gradient-to-r from-[#26658C] to-[#6E2BBF] bg-clip-text text-transparent">Noesis AI</span> Works
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            Four simple steps to transform your learning experience and master complex programming concepts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-[#54ACBF] to-transparent -translate-x-4"></div>
              )}
              <div className="relative p-8 rounded-3xl bg-[#0F1C3A]/60 backdrop-blur-xl border border-[#26658C]/30 hover:border-[#54ACBF]/50 transition-all group cursor-pointer">
                <div className="text-6xl font-bold text-[#26658C]/20 mb-4">{step.number}</div>
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#26658C] to-[#6E2BBF] mb-6 group-hover:shadow-lg group-hover:shadow-[#6E2BBF]/40 transition-all">
                  <i className={`${step.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}