import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

interface Note {
  id: string;
  title: string;
  category: string;
  date: string;
  selected: boolean;
  type: 'note' | 'flashcard' | 'quiz' | 'mindmap';
}

export default function ExportNotes() {
  const [notes, setNotes] = useState<Note[]>([
    { id: 'note1', title: 'Inheritance Basics', category: 'OOP', date: '2024-01-15', selected: false, type: 'note' },
    { id: 'note2', title: 'Binary Tree Traversal', category: 'Data Structures', date: '2024-01-14', selected: false, type: 'note' },
    { id: 'note3', title: 'Polymorphism Examples', category: 'OOP', date: '2024-01-13', selected: false, type: 'flashcard' },
    { id: 'note4', title: 'Graph Algorithms Quiz', category: 'Algorithms', date: '2024-01-12', selected: false, type: 'quiz' },
    { id: 'note5', title: 'Sorting Techniques', category: 'Algorithms', date: '2024-01-11', selected: false, type: 'note' },
    { id: 'note6', title: 'Hash Tables Mind Map', category: 'Data Structures', date: '2024-01-10', selected: false, type: 'mindmap' },
    { id: 'note7', title: 'OOP Fundamentals Flashcards', category: 'OOP', date: '2024-01-09', selected: false, type: 'flashcard' },
    { id: 'note8', title: 'Tree Algorithms Quiz', category: 'Data Structures', date: '2024-01-08', selected: false, type: 'quiz' }
  ]);

  const [exportFormat, setExportFormat] = useState<'pdf' | 'markdown' | 'docx' | 'html' | 'json'>('pdf');
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [includeImages, setIncludeImages] = useState(true);
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'note' | 'flashcard' | 'quiz' | 'mindmap'>('all');

  const toggleNoteSelection = (id: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, selected: !note.selected } : note
    ));
  };

  const selectAll = () => {
    const filtered = filterType === 'all' ? notes : notes.filter(n => n.type === filterType);
    setNotes(notes.map(note => 
      filtered.some(f => f.id === note.id) ? { ...note, selected: true } : note
    ));
  };

  const deselectAll = () => {
    setNotes(notes.map(note => ({ ...note, selected: false })));
  };

  const selectedNotes = notes.filter(note => note.selected);
  const filteredNotes = filterType === 'all' ? notes : notes.filter(n => n.type === filterType);

  const handleExport = () => {
    if (selectedNotes.length === 0) {
      alert('Please select at least one item to export');
      return;
    }

    setIsExporting(true);
    setExportProgress(0);

    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExporting(false);
            
            // Simulate file download
            const blob = new Blob([`Exported ${selectedNotes.length} items`], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `noesis-export-${Date.now()}.${exportFormat}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            alert(`Successfully exported ${selectedNotes.length} items as ${exportFormat.toUpperCase()}!`);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document', icon: 'ri-file-pdf-line', color: 'text-red-400' },
    { value: 'markdown', label: 'Markdown', icon: 'ri-markdown-line', color: 'text-blue-400' },
    { value: 'docx', label: 'Word Document', icon: 'ri-file-word-line', color: 'text-blue-500' },
    { value: 'html', label: 'HTML Page', icon: 'ri-html5-line', color: 'text-orange-400' },
    { value: 'json', label: 'JSON Data', icon: 'ri-file-code-line', color: 'text-green-400' }
  ];

  const typeIcons = {
    note: 'ri-file-text-line',
    flashcard: 'ri-stack-line',
    quiz: 'ri-question-answer-line',
    mindmap: 'ri-mind-map'
  };

  return (
    <div className="bg-[#0A0E27] text-white min-h-screen">
      <Navbar scrolled={true} />
      
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/home"
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-[#151B3B]/60 border border-[#22D3EE]/30 hover:bg-[#4A9FD8]/30 transition-all cursor-pointer group"
          >
            <i className="ri-arrow-left-line text-[#22D3EE] group-hover:-translate-x-1 transition-transform"></i>
            <span className="text-sm font-['Inter'] text-gray-300">Back to Home</span>
          </Link>

          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-['Montserrat'] mb-4">
                Export <span className="bg-gradient-to-r from-[#22D3EE] to-[#EC4899] bg-clip-text text-transparent">Your Content</span>
              </h1>
              <p className="text-base text-gray-400 font-['Inter']">
                Download your notes, flashcards, quizzes, and mind maps in multiple formats
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={selectAll}
                className="px-5 py-2.5 rounded-full bg-[#151B3B]/60 border border-[#22D3EE]/30 hover:bg-[#4A9FD8]/30 transition-all text-sm cursor-pointer whitespace-nowrap font-['Inter']"
              >
                Select All
              </button>
              <button 
                onClick={deselectAll}
                className="px-5 py-2.5 rounded-full bg-[#151B3B]/60 border border-[#22D3EE]/30 hover:bg-[#4A9FD8]/30 transition-all text-sm cursor-pointer whitespace-nowrap font-['Inter']"
              >
                Deselect All
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
            {[
              { value: 'all', label: 'All Content', icon: 'ri-apps-line' },
              { value: 'note', label: 'Notes', icon: 'ri-file-text-line' },
              { value: 'flashcard', label: 'Flashcards', icon: 'ri-stack-line' },
              { value: 'quiz', label: 'Quizzes', icon: 'ri-question-answer-line' },
              { value: 'mindmap', label: 'Mind Maps', icon: 'ri-mind-map' }
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFilterType(filter.value as any)}
                className={`px-5 py-2.5 rounded-full transition-all text-sm cursor-pointer whitespace-nowrap font-['Inter'] flex items-center gap-2 ${
                  filterType === filter.value
                    ? 'bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] shadow-lg shadow-[#22D3EE]/30'
                    : 'bg-[#151B3B]/60 border border-[#22D3EE]/30 hover:bg-[#4A9FD8]/30'
                }`}
              >
                <i className={filter.icon}></i>
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Content Selection */}
            <div className="lg:col-span-2">
              <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold font-['Montserrat']">
                    Select Content to Export
                  </h2>
                  <span className="text-sm text-gray-400 font-['Inter']">
                    {selectedNotes.length} selected
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
                  {filteredNotes.map((note) => (
                    <div
                      key={note.id}
                      onClick={() => toggleNoteSelection(note.id)}
                      className={`p-5 rounded-2xl cursor-pointer transition-all border-2 ${
                        note.selected
                          ? 'bg-gradient-to-r from-[#22D3EE]/20 to-[#8B5CF6]/20 border-[#22D3EE] shadow-lg shadow-[#22D3EE]/30'
                          : 'bg-[#0A0E27]/50 border-[#22D3EE]/10 hover:border-[#22D3EE]/30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          note.selected 
                            ? 'bg-[#22D3EE] border-[#22D3EE]' 
                            : 'border-gray-500'
                        }`}>
                          {note.selected && (
                            <i className="ri-check-line text-[#0A0E27] text-sm"></i>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <i className={`${typeIcons[note.type]} text-[#22D3EE]`}></i>
                            <h3 className="font-semibold text-sm font-['Montserrat']">{note.title}</h3>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs px-2 py-1 rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] font-['Inter']">
                              {note.category}
                            </span>
                            <span className="text-xs text-gray-500 font-['Inter']">{note.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Export Settings */}
            <div className="lg:col-span-1">
              <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6 sticky top-24">
                <h2 className="text-xl font-bold font-['Montserrat'] mb-6">
                  Export Settings
                </h2>

                <div className="space-y-6">
                  {/* Format Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-3 font-['Inter']">
                      Export Format
                    </label>
                    <div className="space-y-2">
                      {formatOptions.map((format) => (
                        <button
                          key={format.value}
                          onClick={() => setExportFormat(format.value as any)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm cursor-pointer font-['Inter'] ${
                            exportFormat === format.value
                              ? 'bg-gradient-to-r from-[#22D3EE]/20 to-[#8B5CF6]/20 border border-[#22D3EE]'
                              : 'bg-[#0A0E27]/50 border border-[#22D3EE]/10 hover:border-[#22D3EE]/30'
                          }`}
                        >
                          <i className={`${format.icon} ${format.color} text-xl`}></i>
                          <span>{format.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Export Options */}
                  <div>
                    <label className="block text-sm font-medium mb-3 font-['Inter']">
                      Export Options
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeMetadata}
                          onChange={(e) => setIncludeMetadata(e.target.checked)}
                          className="w-5 h-5 rounded border-[#22D3EE]/30 bg-[#0A0E27]/50 text-[#22D3EE] focus:ring-[#22D3EE] cursor-pointer"
                        />
                        <span className="text-sm font-['Inter']">Include metadata (date, category, tags)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeImages}
                          onChange={(e) => setIncludeImages(e.target.checked)}
                          className="w-5 h-5 rounded border-[#22D3EE]/30 bg-[#0A0E27]/50 text-[#22D3EE] focus:ring-[#22D3EE] cursor-pointer"
                        />
                        <span className="text-sm font-['Inter']">Include images and diagrams</span>
                      </label>
                    </div>
                  </div>

                  {/* File Size Estimate */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-[#22D3EE]/10 to-[#8B5CF6]/10 border border-[#22D3EE]/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium font-['Inter']">Estimated Size</span>
                      <span className="text-sm font-bold text-[#22D3EE] font-['Inter']">
                        {(selectedNotes.length * 0.5).toFixed(1)} MB
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400 font-['Inter']">
                      <span>{selectedNotes.length} items</span>
                      <span>{exportFormat.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Export Progress */}
                  {isExporting && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm font-['Inter']">
                        <span>Exporting...</span>
                        <span className="text-[#22D3EE]">{exportProgress}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#0A0E27]/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] transition-all duration-300"
                          style={{ width: `${exportProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Export Button */}
                  <button
                    onClick={handleExport}
                    disabled={selectedNotes.length === 0 || isExporting}
                    className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-lg hover:shadow-[#22D3EE]/50 transition-all font-semibold text-sm cursor-pointer whitespace-nowrap font-['Inter'] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="ri-download-cloud-line mr-2"></i>
                    {isExporting ? 'Exporting...' : `Export ${selectedNotes.length} Items`}
                  </button>

                  {/* Quick Export Presets */}
                  <div className="pt-4 border-t border-[#22D3EE]/20">
                    <label className="block text-sm font-medium mb-3 font-['Inter']">
                      Quick Export
                    </label>
                    <div className="space-y-2">
                      <button 
                        onClick={() => {
                          setNotes(notes.map(n => ({ ...n, selected: n.category === 'OOP' })));
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#0A0E27]/50 border border-[#22D3EE]/10 hover:bg-[#4A9FD8]/20 transition-all text-sm cursor-pointer font-['Inter']"
                      >
                        <span>All OOP Content</span>
                        <i className="ri-arrow-right-line text-[#22D3EE]"></i>
                      </button>
                      <button 
                        onClick={() => {
                          setNotes(notes.map(n => ({ ...n, selected: n.type === 'flashcard' })));
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#0A0E27]/50 border border-[#22D3EE]/10 hover:bg-[#4A9FD8]/20 transition-all text-sm cursor-pointer font-['Inter']"
                      >
                        <span>All Flashcards</span>
                        <i className="ri-arrow-right-line text-[#22D3EE]"></i>
                      </button>
                      <button 
                        onClick={() => {
                          const today = new Date();
                          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                          setNotes(notes.map(n => ({ 
                            ...n, 
                            selected: new Date(n.date) >= weekAgo 
                          })));
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#0A0E27]/50 border border-[#22D3EE]/10 hover:bg-[#4A9FD8]/20 transition-all text-sm cursor-pointer font-['Inter']"
                      >
                        <span>This Week's Content</span>
                        <i className="ri-arrow-right-line text-[#22D3EE]"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
