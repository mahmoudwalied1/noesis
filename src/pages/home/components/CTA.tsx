import { useNavigate } from 'react-router-dom';

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B18] via-[#0F1C3A] to-[#050B18]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6E2BBF]/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="p-12 md:p-16 rounded-3xl bg-[#0F1C3A]/60 backdrop-blur-xl border border-[#26658C]/30 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Master <span className="bg-gradient-to-r from-[#54ACBF] to-[#FF66C4] bg-clip-text text-transparent">Programming?</span>
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of students using Noesis AI to ace their OOP and Data Structures courses
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/ai-explanations')}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#54ACBF] to-[#6E2BBF] hover:shadow-2xl hover:shadow-[#6E2BBF]/50 transition-all font-semibold text-lg cursor-pointer whitespace-nowrap"
            >
              Start Learning Now
              <i className="ri-arrow-right-line ml-2"></i>
            </button>
            <button 
              onClick={() => navigate('/study-room')}
              className="px-8 py-4 rounded-full border-2 border-[#54ACBF] hover:bg-[#54ACBF]/10 transition-all font-semibold text-lg cursor-pointer whitespace-nowrap"
            >
              <i className="ri-team-line mr-2"></i>
              Join Study Room
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
