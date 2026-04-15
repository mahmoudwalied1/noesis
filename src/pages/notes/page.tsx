import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function Notes() {
  const [selectedNote, setSelectedNote] = useState<string | null>('note1');
  const [noteContent, setNoteContent] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const notes = [
    {
      id: 'note1',
      title: 'Inheritance Basics',
      category: 'OOP',
      date: '2024-01-15',
      difficulty: 'Beginner',
      content: 'Inheritance allows a class to inherit properties and methods from another class...',
      aiGenerated: true,
      tags: ['inheritance', 'oop', 'basics']
    },
    {
      id: 'note2',
      title: 'Binary Tree Traversal',
      category: 'Data Structures',
      date: '2024-01-14',
      difficulty: 'Intermediate',
      content: 'Three main types of tree traversal: In-order, Pre-order, and Post-order...',
      aiGenerated: true,
      tags: ['trees', 'traversal', 'algorithms']
    },
    {
      id: 'note3',
      title: 'Polymorphism Examples',
      category: 'OOP',
      date: '2024-01-13',
      difficulty: 'Intermediate',
      content: 'Polymorphism enables objects to take multiple forms...',
      aiGenerated: false,
      tags: ['polymorphism', 'oop', 'advanced']
    }
  ];

  const filteredNotes = filterCategory === 'all' 
    ? notes 
    : notes.filter(note => note.category === filterCategory);

  // Get the current note object safely
  const getCurrentNote = () => {
    if (!selectedNote) return null;
    return notes.find(n => n.id === selectedNote) || null;
  };

  const currentNote = getCurrentNote();
  
  // Sync noteContent with selected note
  useEffect(() => {
    if (currentNote && !noteContent) {
      setNoteContent(currentNote.content);
    }
  }, [currentNote, noteContent]);

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
                Smart <span className="bg-gradient-to-r from-[#54ACBF] to-[#FF66C4] bg-clip-text text-transparent">Notes</span>
              </h1>
              <p className="text-base text-gray-400">
                AI-generated notes organized by topic, date, and difficulty
              </p>
            </div>
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#54ACBF] to-[#6E2BBF] hover:shadow-lg hover:shadow-[#6E2BBF]/50 transition-all font-semibold text-sm cursor-pointer whitespace-nowrap">
              <i className="ri-add-line mr-2"></i>
              New Note
            </button>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#0F1C3A]/60 backdrop-blur-xl border border-[#26658C]/30 rounded-3xl p-6">
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {['all', 'OOP', 'Data Structures', 'Algorithms'].map((category) => (
                    <button
                      key={category}
                      onClick={() => setFilterCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm cursor-pointer whitespace-nowrap ${
                        filterCategory === category
                          ? 'bg-gradient-to-r from-[#26658C] to-[#6E2BBF]'
                          : 'bg-[#050B18]/50 hover:bg-[#26658C]/20'
                      }`}
                    >
                      {category === 'all' ? 'All Notes' : category}
                    </button>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-[#26658C]/30">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Link to="/merge-notes" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#050B18]/50 hover:bg-[#26658C]/20 transition-all text-sm cursor-pointer">
                      <i className="ri-merge-cells-horizontal text-[#54ACBF]"></i>
                      Merge Notes
                    </Link>
                    <Link to="/export-notes" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#050B18]/50 hover:bg-[#26658C]/20 transition-all text-sm cursor-pointer">
                      <i className="ri-download-cloud-line text-[#54ACBF]"></i>
                      Export All
                    </Link>
                    <Link to="/share-notes" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#050B18]/50 hover:bg-[#26658C]/20 transition-all text-sm cursor-pointer">
                      <i className="ri-share-line text-[#54ACBF]"></i>
                      Share Notes
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes List */}
            <div className="lg:col-span-1">
              <div className="bg-[#0F1C3A]/60 backdrop-blur-xl border border-[#26658C]/30 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 relative">
                    <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="text"
                      placeholder="Search notes..."
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#050B18]/50 border border-[#26658C]/20 focus:border-[#54ACBF]/50 outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {filteredNotes.map((note) => (
                    <div
                      key={note.id}
                      onClick={() => setSelectedNote(note.id)}
                      className={`p-4 rounded-2xl cursor-pointer transition-all ${
                        selectedNote === note.id
                          ? 'bg-gradient-to-r from-[#26658C]/30 to-[#6E2BBF]/30 border border-[#54ACBF]/50'
                          : 'bg-[#050B18]/50 border border-[#26658C]/20 hover:border-[#54ACBF]/30'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm flex-1">{note.title}</h4>
                        {note.aiGenerated && (
                          <span className="text-xs px-2 py-1 rounded-full bg-[#6E2BBF]/20 text-[#FF66C4] whitespace-nowrap ml-2">
                            AI
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mb-2">{note.content.substring(0, 60)}...</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{note.date}</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-[#54ACBF]/20 text-[#54ACBF]">
                          {note.difficulty}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Note Editor */}
            <div className="lg:col-span-2">
              <div className="bg-[#0F1C3A]/60 backdrop-blur-xl border border-[#26658C]/30 rounded-3xl p-6">
                {currentNote ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">
                          {currentNote.title}
                        </h2>
                        <div className="flex items-center gap-3">
                          {currentNote.tags.map((tag, index) => (
                            <span key={index} className="text-xs px-3 py-1 rounded-full bg-[#26658C]/20 text-[#54ACBF]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#26658C]/30 hover:bg-[#26658C]/50 transition-all cursor-pointer">
                          <i className="ri-volume-up-line"></i>
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#26658C]/30 hover:bg-[#26658C]/50 transition-all cursor-pointer">
                          <i className="ri-share-line"></i>
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#26658C]/30 hover:bg-[#26658C]/50 transition-all cursor-pointer">
                          <i className="ri-more-2-line"></i>
                        </button>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-4">
                        <button className="px-3 py-2 rounded-lg bg-[#26658C]/30 hover:bg-[#26658C]/50 transition-all cursor-pointer">
                          <i className="ri-bold"></i>
                        </button>
                        <button className="px-3 py-2 rounded-lg bg-[#26658C]/30 hover:bg-[#26658C]/50 transition-all cursor-pointer">
                          <i className="ri-italic"></i>
                        </button>
                        <button className="px-3 py-2 rounded-lg bg-[#26658C]/30 hover:bg-[#26658C]/50 transition-all cursor-pointer">
                          <i className="ri-list-unordered"></i>
                        </button>
                        <button className="px-3 py-2 rounded-lg bg-[#26658C]/30 hover:bg-[#26658C]/50 transition-all cursor-pointer">
                          <i className="ri-code-line"></i>
                        </button>
                        <button className="px-3 py-2 rounded-lg bg-[#26658C]/30 hover:bg-[#26658C]/50 transition-all cursor-pointer">
                          <i className="ri-mark-pen-line"></i>
                        </button>
                      </div>
                      <textarea
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        className="w-full h-96 p-4 rounded-2xl bg-[#050B18]/50 border border-[#26658C]/20 focus:border-[#54ACBF]/50 outline-none text-sm resize-none"
                        placeholder="Start typing your notes..."
                      ></textarea>
                    </div>

                    <div className="flex items-center justify-between">
                      <button className="px-6 py-3 rounded-full bg-[#26658C]/30 hover:bg-[#26658C]/50 transition-all text-sm cursor-pointer whitespace-nowrap">
                        <i className="ri-mic-line mr-2"></i>
                        Voice Note
                      </button>
                      <button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#54ACBF] to-[#6E2BBF] hover:shadow-lg hover:shadow-[#6E2BBF]/50 transition-all font-semibold text-sm cursor-pointer whitespace-nowrap">
                        Save Changes
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <i className="ri-file-text-line text-6xl text-[#54ACBF]/50 mb-4"></i>
                      <p className="text-gray-400">Select a note to view or edit</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
