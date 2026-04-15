export default function Analytics() {
  const stats = [
    { label: 'Study Time', value: '24h 32m', change: '+12%', icon: 'ri-time-line' },
    { label: 'Quiz Score', value: '87%', change: '+5%', icon: 'ri-medal-line' },
    { label: 'Topics Mastered', value: '18', change: '+3', icon: 'ri-book-mark-line' },
    { label: 'Streak Days', value: '15', change: '+1', icon: 'ri-fire-line' }
  ];

  const weeklyData = [
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 4.2 },
    { day: 'Wed', hours: 2.8 },
    { day: 'Thu', hours: 5.1 },
    { day: 'Fri', hours: 3.9 },
    { day: 'Sat', hours: 6.3 },
    { day: 'Sun', hours: 4.7 }
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  return (
    <section id="analytics" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-[#26658C]/20 border border-[#26658C]/30 mb-4">
            <span className="text-sm text-[#54ACBF]">Performance Tracking</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Track Your
            <span className="bg-gradient-to-r from-[#26658C] to-[#6E2BBF] bg-clip-text text-transparent"> Progress</span>
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            Get detailed insights into your learning journey. AI analyzes your performance and suggests personalized study plans.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-[#0F1C3A]/60 backdrop-blur-xl border border-[#26658C]/30 hover:border-[#54ACBF]/50 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#26658C] to-[#6E2BBF]">
                  <i className={`${stat.icon} text-lg text-white`}></i>
                </div>
                <span className="text-xs text-[#54ACBF] font-semibold">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-[#0F1C3A]/60 backdrop-blur-xl border border-[#26658C]/30">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Weekly Activity</h3>
                <p className="text-sm text-gray-400">Your study hours this week</p>
              </div>
              <div className="px-3 py-1 rounded-full bg-[#26658C]/20 text-xs text-[#54ACBF] whitespace-nowrap">
                30.5 hours total
              </div>
            </div>

            <div className="flex items-end justify-between gap-4 h-48">
              {weeklyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-3">
                  <div className="w-full flex items-end justify-center h-full">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-[#26658C] to-[#54ACBF] transition-all hover:from-[#54ACBF] hover:to-[#6E2BBF] cursor-pointer"
                      style={{ height: `${(data.hours / maxHours) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400">{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#0F1C3A]/60 backdrop-blur-xl border border-[#26658C]/30">
            <h3 className="text-xl font-semibold text-white mb-6">AI Recommendations</h3>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#26658C]/10 border border-[#26658C]/30">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#26658C] to-[#54ACBF] flex-shrink-0">
                    <i className="ri-lightbulb-line text-sm text-white"></i>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white mb-1">Focus on Binary Trees</div>
                    <div className="text-xs text-gray-400">You scored 65% on tree traversal. Review this topic.</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#6E2BBF]/10 border border-[#6E2BBF]/30">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#6E2BBF] to-[#FF66C4] flex-shrink-0">
                    <i className="ri-star-line text-sm text-white"></i>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white mb-1">Great Progress on OOP!</div>
                    <div className="text-xs text-gray-400">You've mastered inheritance and polymorphism.</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#54ACBF]/10 border border-[#54ACBF]/30">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#54ACBF] to-[#26658C] flex-shrink-0">
                    <i className="ri-calendar-line text-sm text-white"></i>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white mb-1">Study Plan Ready</div>
                    <div className="text-xs text-gray-400">Your personalized plan for next week is available.</div>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#26658C] to-[#6E2BBF] rounded-full hover:shadow-lg hover:shadow-[#6E2BBF]/50 transition-all cursor-pointer whitespace-nowrap">
              View Full Report
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}