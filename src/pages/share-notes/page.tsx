import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function ShareNotes() {
  const [selectedNote, setSelectedNote] = useState<string | null>(null);

  const sharedNotes = [
    {
      id: '1',
      title: 'Binary Search Trees - Complete Guide',
      author: 'Sarah Chen',
      subject: 'Data Structures',
      date: 'Today',
      likes: 24,
      comments: 8,
      preview: 'A binary search tree is a node-based binary tree data structure...'
    },
    {
      id: '2',
      title: 'OOP Principles Explained',
      author: 'Mike Johnson',
      subject: 'Object-Oriented Programming',
      date: 'Yesterday',
      likes: 18,
      comments: 5,
      preview: 'The four main principles of OOP are: Encapsulation, Abstraction...'
    },
    {
      id: '3',
      title: 'Dynamic Programming Patterns',
      author: 'Emma Davis',
      subject: 'Algorithms',
      date: '2 days ago',
      likes: 32,
      comments: 12,
      preview: 'Common DP patterns include: Fibonacci, Knapsack, Longest Common...'
    },
    {
      id: '4',
      title: 'Graph Algorithms Cheat Sheet',
      author: 'Alex Kumar',
      subject: 'Data Structures',
      date: '3 days ago',
      likes: 45,
      comments: 15,
      preview: 'BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall algorithms...'
    }
  ];

  const myNotes = [
    { id: '1', title: 'Sorting Algorithms', subject: 'Algorithms', lastEdited: '1 hour ago' },
    { id: '2', title: 'Hash Tables', subject: 'Data Structures', lastEdited: '3 hours ago' },
    { id: '3', title: 'Recursion Examples', subject: 'Programming', lastEdited: 'Yesterday' }
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
              Share <span className="bg-gradient-to-r from-[#22D3EE] to-[#EC4899] bg-clip-text text-transparent">Notes</span>
            </h1>
            <p className="text-base text-gray-400 font-['Inter']">
              Collaborate and learn from your study group's notes
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* My Notes Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold font-['Montserrat']">My Notes</h3>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-lg transition-all cursor-pointer">
                    <i className="ri-add-line text-lg"></i>
                  </button>
                </div>
                <div className="space-y-3">
                  {myNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-4 rounded-2xl bg-[#0A0E27]/50 border border-[#4A9FD8]/20 hover:border-[#22D3EE]/50 transition-all cursor-pointer"
                    >
                      <h4 className="font-semibold text-sm mb-1 font-['Inter']">{note.title}</h4>
                      <p className="text-xs text-gray-400 mb-2">{note.subject}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{note.lastEdited}</span>
                        <button className="text-[#22D3EE] hover:text-[#06B6D4] transition-all cursor-pointer">
                          <i className="ri-share-line text-sm"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 px-4 py-3 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-lg transition-all cursor-pointer whitespace-nowrap font-['Inter']">
                  Share New Note
                </button>
              </div>
            </div>

            {/* Shared Notes Feed */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {sharedNotes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6 hover:border-[#22D3EE]/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#22D3EE] to-[#8B5CF6] font-semibold">
                          {note.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-semibold font-['Inter']">{note.author}</h3>
                          <p className="text-xs text-gray-400">{note.date}</p>
                        </div>
                      </div>
                      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#4A9FD8]/30 hover:bg-[#4A9FD8]/50 transition-all cursor-pointer">
                        <i className="ri-more-2-fill"></i>
                      </button>
                    </div>

                    <h2 className="text-xl font-bold mb-2 font-['Montserrat']">{note.title}</h2>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#8B5CF6]/20 text-[#EC4899] text-xs mb-3">
                      {note.subject}
                    </span>
                    <p className="text-sm text-gray-400 mb-4 font-['Inter']">{note.preview}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-[#4A9FD8]/30">
                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 text-gray-400 hover:text-[#22D3EE] transition-all cursor-pointer">
                          <i className="ri-heart-line"></i>
                          <span className="text-sm font-['Inter']">{note.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-400 hover:text-[#22D3EE] transition-all cursor-pointer">
                          <i className="ri-chat-3-line"></i>
                          <span className="text-sm font-['Inter']">{note.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-400 hover:text-[#22D3EE] transition-all cursor-pointer">
                          <i className="ri-bookmark-line"></i>
                        </button>
                      </div>
                      <button 
                        onClick={() => setSelectedNote(note.id)}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-lg transition-all cursor-pointer whitespace-nowrap text-sm font-['Inter']"
                      >
                        View Full Note
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
