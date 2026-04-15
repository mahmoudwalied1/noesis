import { useNavigate } from 'react-router-dom';

export default function Collaboration() {
  const navigate = useNavigate();

  const collaborationFeatures = [
    {
      icon: 'ri-team-line',
      title: 'Study Rooms',
      description: 'Create or join virtual study rooms with classmates',
      path: '/study-room'
    },
    {
      icon: 'ri-share-line',
      title: 'Share Notes',
      description: 'Share your notes and flashcards with friends',
      path: '/share-notes'
    },
    {
      icon: 'ri-git-merge-line',
      title: 'Merge Notes',
      description: 'Combine notes from multiple sources intelligently',
      path: '/merge-notes'
    },
    {
      icon: 'ri-chat-3-line',
      title: 'Live Discussions',
      description: 'Discuss topics in real-time with your study group',
      path: '/live-discussions'
    },
    {
      icon: 'ri-trophy-line',
      title: 'Quiz Challenges',
      description: 'Challenge friends to quiz competitions',
      path: '/quiz-challenges'
    },
    {
      icon: 'ri-mic-line',
      title: 'Voice Chat',
      description: 'Voice chat while studying together',
      path: '/voice-chat'
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6E2BBF]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Learn <span className="bg-gradient-to-r from-[#54ACBF] to-[#FF66C4] bg-clip-text text-transparent">Together</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Collaborate with classmates, share knowledge, and grow together
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collaborationFeatures.map((feature, index) => (
            <div
              key={index}
              onClick={() => navigate(feature.path)}
              className="group p-6 rounded-2xl bg-[#0F1C3A]/60 backdrop-blur-xl border border-[#26658C]/30 hover:border-[#54ACBF]/50 transition-all cursor-pointer"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#54ACBF]/20 to-[#6E2BBF]/20 mb-4 group-hover:shadow-lg group-hover:shadow-[#6E2BBF]/30 transition-all">
                <i className={`${feature.icon} text-2xl text-[#54ACBF]`}></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}