import { useNavigate } from 'react-router-dom';

export default function Features() {
  const navigate = useNavigate();

  const features = [
    {
      icon: 'ri-brain-line',
      title: 'AI-Powered Explanations',
      description: 'Get complex OOP and Data Structure concepts explained in simple terms. Replay specific parts you didn\'t understand.',
      gradient: 'from-[#26658C] to-[#54ACBF]',
      path: '/virtual-tutor'
    },
    {
      icon: 'ri-file-list-3-line',
      title: 'Smart Note-Taking',
      description: 'Automatically generated notes organized by topic, date, and difficulty. Merge with your manual notes for clean summaries.',
      gradient: 'from-[#54ACBF] to-[#6E2BBF]',
      path: '/notes'
    },
    {
      icon: 'ri-question-answer-line',
      title: 'Adaptive Quizzes',
      description: 'Take quick quizzes after each explanation. Difficulty adjusts based on your performance with instant feedback.',
      gradient: 'from-[#6E2BBF] to-[#FF66C4]',
      path: '/quizzes'
    },
    {
      icon: 'ri-mic-line',
      title: 'Voice Control',
      description: 'Pause, resume, and control video explanations using your voice. Create notes hands-free while studying.',
      gradient: 'from-[#FF66C4] to-[#26658C]',
      path: '/virtual-tutor'
    },
    {
      icon: 'ri-stack-line',
      title: 'Smart Flashcards',
      description: 'AI generates flashcards from your study material. Turn mistakes into new flashcards automatically.',
      gradient: 'from-[#26658C] to-[#6E2BBF]',
      path: '/flashcards'
    },
    {
      icon: 'ri-mind-map',
      title: 'Visual Mind Maps',
      description: 'View beautiful mind maps based on your notes. Detect repetitive concepts and highlight connections.',
      gradient: 'from-[#54ACBF] to-[#FF66C4]',
      path: '/mindmaps'
    },
    {
      icon: 'ri-user-star-line',
      title: 'AI Virtual Tutor',
      description: 'Interactive AI tutor with customizable avatars and voices that explains concepts and answers your questions in real-time',
      gradient: 'from-[#6E2BBF] to-[#26658C]',
      path: '/virtual-tutor'
    },
    {
      icon: 'ri-glasses-line',
      title: 'Smart Glasses Mode',
      description: 'Experience Noēsis through AR glasses with hands-free control, voice commands, and built-in audio feedback',
      gradient: 'from-[#FF66C4] to-[#54ACBF]',
      path: '/glasses-3d'
    },
    {
      icon: 'ri-download-cloud-line',
      title: 'Export Content',
      description: 'Download your notes, flashcards, quizzes, and mind maps in multiple formats (PDF, Markdown, DOCX, HTML)',
      gradient: 'from-[#26658C] to-[#FF66C4]',
      path: '/export-notes'
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6E2BBF]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#54ACBF]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful <span className="bg-gradient-to-r from-[#54ACBF] to-[#FF66C4] bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Everything you need to master Object-Oriented Programming and Data Structures
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => navigate(feature.path)}
              className="group p-8 rounded-3xl bg-[#0F1C3A]/60 backdrop-blur-xl border border-[#26658C]/30 hover:border-[#54ACBF]/50 transition-all cursor-pointer"
            >
              <div className={`w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:shadow-lg group-hover:shadow-[#6E2BBF]/30 transition-all`}>
                <i className={`${feature.icon} text-3xl text-white`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}