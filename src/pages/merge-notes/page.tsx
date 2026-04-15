import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

interface Note {
  id: string;
  title: string;
  category: string;
  date: string;
  content: string;
  selected: boolean;
}

export default function MergeNotes() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 'note1',
      title: 'Inheritance Basics',
      category: 'OOP',
      date: '2024-01-15',
      content: 'Inheritance allows a class to inherit properties and methods from another class. This promotes code reusability and establishes a relationship between parent and child classes.',
      selected: false
    },
    {
      id: 'note2',
      title: 'Binary Tree Traversal',
      category: 'Data Structures',
      date: '2024-01-14',
      content: 'Three main types of tree traversal: In-order (Left-Root-Right), Pre-order (Root-Left-Right), and Post-order (Left-Right-Root). Each serves different purposes in tree operations.',
      selected: false
    },
    {
      id: 'note3',
      title: 'Polymorphism Examples',
      category: 'OOP',
      date: '2024-01-13',
      content: 'Polymorphism enables objects to take multiple forms. Method overloading and overriding are key concepts that allow the same method name to behave differently.',
      selected: false
    },
    {
      id: 'note4',
      title: 'Graph Algorithms',
      category: 'Algorithms',
      date: '2024-01-12',
      content: 'Common graph algorithms include BFS, DFS, Dijkstra\'s shortest path, and Kruskal\'s minimum spanning tree. Each has specific use cases and time complexities.',
      selected: false
    }
  ]);

  const [mergedTitle, setMergedTitle] = useState('');
  const [mergeStrategy, setMergeStrategy] = useState<'chronological' | 'category' | 'custom'>('chronological');
  const [showPreview, setShowPreview] = useState(false);

  const toggleNoteSelection = (id: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, selected: !note.selected } : note
    ));
  };

  const selectAll = () => {
    setNotes(notes.map(note => ({ ...note, selected: true })));
  };

  const deselectAll = () => {
    setNotes(notes.map(note => ({ ...note, selected: false })));
  };

  const selectedNotes = notes.filter(note => note.selected);

  const getMergedContent = () => {
    let sorted = [...selectedNotes];
    
    if (mergeStrategy === 'chronological') {
      sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (mergeStrategy === 'category') {
      sorted.sort((a, b) => a.category.localeCompare(b.category));
    }

    return sorted.map(note => `## ${note.title}\n**Category:** ${note.category} | **Date:** ${note.date}\n\n${note.content}\n\n---\n\n`).join('');
  };

  const handleMerge = () => {
    if (selectedNotes.length < 2) {
      alert('Please select at least 2 notes to merge');
      return;
    }
    if (!mergedTitle.trim()) {
      alert('Please enter a title for the merged note');
      return;
    }
    // Simulate merge success
    alert(`Successfully merged ${selectedNotes.length} notes into "${mergedTitle}"!`);
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

          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <Link to="/notes" className="inline-flex items-center gap-2 text-stellar-aqua hover:text-stellar-aqua/80 transition-colors mb-4 cursor-pointer">
                <i className="ri-arrow-left-line"></i>
                Back to Notes
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">
                Merge <span className="bg-gradient-to-r from-stellar-aqua to-nebula-purple bg-clip-text text-transparent">Notes</span>
              </h1>
              <p className="text-base text-gray-400 font-inter">
                Combine multiple notes into a single comprehensive document
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={selectAll}
                className="px-5 py-2.5 rounded-full glass-card hover:bg-stellar-aqua/20 transition-all text-sm cursor-pointer whitespace-nowrap font-inter"
              >
                Select All
              </button>
              <button 
                onClick={deselectAll}
                className="px-5 py-2.5 rounded-full glass-card hover:bg-stellar-aqua/20 transition-all text-sm cursor-pointer whitespace-nowrap font-inter"
              >
                Deselect All
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Notes Selection */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-3xl p-6 border border-stellar-aqua/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold font-montserrat">
                    Select Notes to Merge
                  </h2>
                  <span className="text-sm text-gray-400 font-inter">
                    {selectedNotes.length} selected
                  </span>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      onClick={() => toggleNoteSelection(note.id)}
                      className={`p-5 rounded-2xl cursor-pointer transition-all border-2 ${
                        note.selected
                          ? 'bg-gradient-to-r from-stellar-aqua/20 to-nebula-purple/20 border-stellar-aqua shadow-neon-cyan'
                          : 'glass-card border-stellar-aqua/10 hover:border-stellar-aqua/30'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          note.selected 
                            ? 'bg-stellar-aqua border-stellar-aqua' 
                            : 'border-gray-500'
                        }`}>
                          {note.selected && (
                            <i className="ri-check-line text-deep-space text-sm"></i>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-base font-montserrat">{note.title}</h3>
                            <span className="text-xs px-3 py-1 rounded-full bg-nebula-purple/20 text-nebula-purple whitespace-nowrap ml-2 font-inter">
                              {note.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mb-3 font-inter line-clamp-2">
                            {note.content}
                          </p>
                          <span className="text-xs text-gray-500 font-inter">{note.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Merge Settings */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-3xl p-6 border border-stellar-aqua/20 sticky top-24">
                <h2 className="text-xl font-bold font-montserrat mb-6">
                  Merge Settings
                </h2>

                <div className="space-y-6">
                  {/* Title Input */}
                  <div>
                    <label className="block text-sm font-medium mb-2 font-inter">
                      Merged Note Title
                    </label>
                    <input
                      type="text"
                      value={mergedTitle}
                      onChange={(e) => setMergedTitle(e.target.value)}
                      placeholder="Enter title..."
                      className="w-full px-4 py-3 rounded-xl bg-deep-space/50 border border-stellar-aqua/20 focus:border-stellar-aqua/50 outline-none text-sm font-inter"
                    />
                  </div>

                  {/* Merge Strategy */}
                  <div>
                    <label className="block text-sm font-medium mb-3 font-inter">
                      Merge Strategy
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'chronological', label: 'Chronological Order', icon: 'ri-time-line' },
                        { value: 'category', label: 'Group by Category', icon: 'ri-folder-line' },
                        { value: 'custom', label: 'Custom Order', icon: 'ri-drag-move-line' }
                      ].map((strategy) => (
                        <button
                          key={strategy.value}
                          onClick={() => setMergeStrategy(strategy.value as any)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm cursor-pointer font-inter ${
                            mergeStrategy === strategy.value
                              ? 'bg-gradient-to-r from-stellar-aqua/20 to-nebula-purple/20 border border-stellar-aqua'
                              : 'glass-card border border-stellar-aqua/10 hover:border-stellar-aqua/30'
                          }`}
                        >
                          <i className={`${strategy.icon} text-stellar-aqua`}></i>
                          {strategy.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* AI Enhancement */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-nebula-purple/10 to-plasma-glow/10 border border-nebula-purple/30">
                    <div className="flex items-start gap-3">
                      <i className="ri-magic-line text-plasma-glow text-xl"></i>
                      <div>
                        <h4 className="font-semibold text-sm mb-1 font-montserrat">AI Enhancement</h4>
                        <p className="text-xs text-gray-400 font-inter">
                          Let AI reorganize and improve the merged content
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      disabled={selectedNotes.length < 2}
                      className="w-full px-6 py-3 rounded-full glass-card hover:bg-stellar-aqua/20 transition-all text-sm cursor-pointer whitespace-nowrap font-inter disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <i className="ri-eye-line mr-2"></i>
                      Preview Merged Note
                    </button>
                    <button
                      onClick={handleMerge}
                      disabled={selectedNotes.length < 2 || !mergedTitle.trim()}
                      className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-stellar-aqua to-nebula-purple hover:shadow-neon-cyan transition-all font-semibold text-sm cursor-pointer whitespace-nowrap font-inter disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <i className="ri-merge-cells-horizontal mr-2"></i>
                      Merge Notes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Modal */}
          {showPreview && selectedNotes.length >= 2 && (
            <div className="fixed inset-0 bg-deep-space/90 backdrop-blur-xl z-50 flex items-center justify-center p-6">
              <div className="glass-card rounded-3xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-stellar-aqua/30">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold font-montserrat">
                    Preview: {mergedTitle || 'Untitled Merged Note'}
                  </h2>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full glass-card hover:bg-stellar-aqua/20 transition-all cursor-pointer"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-gray-300 font-inter leading-relaxed">
                    {getMergedContent()}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
