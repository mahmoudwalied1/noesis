import { useNavigate } from 'react-router-dom';

export default function StudyTools() {
  const navigate = useNavigate();

  const tools = [
    {
      icon: 'ri-stack-line',
      title: 'Flashcard Generator',
      description: 'AI creates flashcards from your study material. Export to other apps or practice within Noesis.',
      gradient: 'from-[#26658C] to-[#54ACBF]',
      path: '/flashcards'
    },
    {
      icon: 'ri-volume-up-line',
      title: 'Audio Notes',
      description: 'Listen to your notes in audio format. Perfect for learning on the go or during commutes.',
      gradient: 'from-[#54ACBF] to-[#6E2BBF]',
      path: '/notes'
    },
    {
      icon: 'ri-book-open-line',
      title: 'Follow-up Resources',
      description: 'AI suggests relevant textbooks, articles, and learning resources after each session.',
      gradient: 'from-[#6E2BBF] to-[#FF66C4]',
      path: '/virtual-tutor'
    },
    {
      icon: 'ri-dashboard-line',
      title: 'Performance Dashboard',
      description: 'Track study time, quiz scores, and progress. Get AI feedback on weak areas to improve efficiently.',
      gradient: 'from-[#FF66C4] to-[#26658C]',
      path: '/performance'
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#26658C]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF66C4]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Advanced <span className="bg-gradient-to-r from-[#54ACBF] to-[#FF66C4] bg-clip-text text-transparent">Study Tools</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Enhance your learning experience with powerful AI-driven tools
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {tools.map((tool, index) => (
            <div
              key={index}
              onClick={() => navigate(tool.path)}
              className="group p-8 rounded-3xl bg-[#0F1C3A]/60 backdrop-blur-xl border border-[#26658C]/30 hover:border-[#54ACBF]/50 transition-all cursor-pointer"
            >
              <div className={`w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br ${tool.gradient} mb-6 group-hover:shadow-lg group-hover:shadow-[#6E2BBF]/30 transition-all`}>
                <i className={`${tool.icon} text-3xl text-white`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">{tool.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}