import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

interface Avatar {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface Voice {
  id: string;
  name: string;
  type: 'soft' | 'harsh' | 'narrative' | 'energetic' | 'calm';
  description: string;
}

interface SavedSession {
  id: string;
  topic: string;
  avatar: string;
  date: string;
  duration: string;
}

interface StudyMaterial {
  id: string;
  name: string;
  size: number;
  type: string;
}

const supportedMaterialTypes = [
  '.pdf',
  '.txt',
  '.doc',
  '.docx',
  '.ppt',
  '.pptx',
  'image/*'
];

function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function VirtualTutor() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('professor');
  const [selectedVoice, setSelectedVoice] = useState<string>('narrative');
  const [uploadedMaterials, setUploadedMaterials] = useState<StudyMaterial[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [videoGenerated, setVideoGenerated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTutorActive, setIsTutorActive] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'tutor'; text: string; time: string }>>([]);
  const [userInput, setUserInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [sessionSaved, setSessionSaved] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [isGlassesMode, setIsGlassesMode] = useState(false);
  const [savedSessions, setSavedSessions] = useState<SavedSession[]>([
    { id: '1', topic: 'Object-Oriented Programming', avatar: 'professor', date: '2024-01-15', duration: '45 min' },
    { id: '2', topic: 'Binary Trees', avatar: 'robot', date: '2024-01-14', duration: '32 min' },
    { id: '3', topic: 'Graph Theory', avatar: 'scientist', date: '2024-01-13', duration: '38 min' }
  ]);
  const [showSavedSessions, setShowSavedSessions] = useState(false);

  const avatars: Avatar[] = [
    { id: 'professor', name: 'Professor', image: 'wise elderly professor with glasses and academic robes in a library setting with books and chalkboard', description: 'Wise and experienced educator' },
    { id: 'robot', name: 'AI Robot', image: 'friendly futuristic AI robot tutor with glowing blue circuits and holographic displays', description: 'Advanced AI assistant' },
    { id: 'fairy', name: 'Magical Fairy', image: 'enchanting fairy tutor with sparkling wings and magical wand surrounded by glowing particles', description: 'Whimsical and inspiring' },
    { id: 'woman', name: 'Modern Teacher', image: 'professional young woman teacher with tablet and modern classroom background', description: 'Contemporary educator' },
    { id: 'princess', name: 'Royal Princess', image: 'elegant princess tutor in royal attire with crown and castle library background', description: 'Regal and graceful' },
    { id: 'king', name: 'Wise King', image: 'majestic king with crown and royal robes in throne room with ancient scrolls', description: 'Authoritative and knowledgeable' },
    { id: 'knight', name: 'Noble Knight', image: 'honorable knight in shining armor with sword and shield in medieval study', description: 'Brave and disciplined' },
    { id: 'scientist', name: 'Scientist', image: 'brilliant scientist in lab coat with beakers and scientific equipment', description: 'Analytical and precise' },
    { id: 'astronaut', name: 'Space Explorer', image: 'astronaut in space suit with stars and planets in cosmic background', description: 'Adventurous and curious' },
    { id: 'wizard', name: 'Ancient Wizard', image: 'wise wizard with long beard and magical staff surrounded by floating books', description: 'Mystical and powerful' }
  ];

  const voices: Voice[] = [
    { id: 'soft', name: 'Soft & Gentle', type: 'soft', description: 'Calm and soothing voice' },
    { id: 'harsh', name: 'Firm & Direct', type: 'harsh', description: 'Strong and authoritative' },
    { id: 'narrative', name: 'Storyteller', type: 'narrative', description: 'Engaging and descriptive' },
    { id: 'energetic', name: 'Energetic & Fun', type: 'energetic', description: 'Upbeat and enthusiastic' },
    { id: 'calm', name: 'Calm & Professional', type: 'calm', description: 'Clear and composed' },
    { id: 'friendly', name: 'Friendly & Warm', type: 'soft', description: 'Approachable and kind' },
    { id: 'motivational', name: 'Motivational', type: 'energetic', description: 'Inspiring and encouraging' }
  ];

  const topics = [
    'Object-Oriented Programming',
    'Data Structures & Algorithms',
    'Binary Trees',
    'Graph Theory',
    'Dynamic Programming',
    'Sorting Algorithms',
    'Polymorphism',
    'Inheritance',
    'Encapsulation',
    'Recursion'
  ];

  const bookmarks = [
    { time: 45, label: 'Key Concept: Base Class' },
    { time: 120, label: 'Example: Vehicle Inheritance' },
    { time: 180, label: 'Common Mistakes' }
  ];

  const voiceCommands = [
    { command: 'Play', action: 'Start video playback', handler: () => setIsPlaying(true) },
    { command: 'Pause', action: 'Pause video', handler: () => setIsPlaying(false) },
    { command: 'Skip forward', action: 'Jump 10 seconds ahead', handler: () => setCurrentTime(prev => Math.min(prev + 10, 330)) },
    { command: 'Skip back', action: 'Go back 10 seconds', handler: () => setCurrentTime(prev => Math.max(prev - 10, 0)) },
    { command: 'Speed up', action: 'Increase playback speed', handler: () => setPlaybackSpeed(prev => Math.min(prev + 0.25, 2)) },
    { command: 'Slow down', action: 'Decrease playback speed', handler: () => setPlaybackSpeed(prev => Math.max(prev - 0.25, 0.5)) },
    { command: 'Bookmark this', action: 'Save current moment', handler: () => alert('Bookmark saved!') },
    { command: 'Explain this', action: 'Get detailed explanation', handler: () => alert('AI explanation activated!') }
  ];

  const handleGenerateVideo = () => {
    if (!selectedTopic) {
      alert('Please select a topic first');
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    setVideoGenerated(false);

    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsGenerating(false);
            setVideoGenerated(true);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const handleUploadMaterials = (files: FileList | null) => {
    if (!files?.length) return;

    const materials = Array.from(files).map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      name: file.name,
      size: file.size,
      type: file.type || file.name.split('.').pop()?.toUpperCase() || 'Material'
    }));

    setUploadedMaterials((current) => {
      const existingIds = new Set(current.map((material) => material.id));
      return [
        ...current,
        ...materials.filter((material) => !existingIds.has(material.id))
      ];
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveMaterial = (materialId: string) => {
    setUploadedMaterials((current) => current.filter((material) => material.id !== materialId));
  };

  const handleStartNewSession = () => {
    setVideoGenerated(false);
    setIsTutorActive(false);
    setMessages([]);
    setSessionSaved(false);
    setUploadedMaterials([]);
  };

  const handleStartTutor = () => {
    setIsTutorActive(true);
    setIsPlaying(true);
    
    setTimeout(() => {
      const materialContext = uploadedMaterials.length
        ? ` I also reviewed ${uploadedMaterials.length} uploaded material${uploadedMaterials.length > 1 ? 's' : ''}: ${uploadedMaterials.map((material) => material.name).join(', ')}.`
        : '';
      const greeting = `Hello! I'm your ${avatars.find(a => a.id === selectedAvatar)?.name} tutor. I'm here to help you understand ${selectedTopic}.${materialContext} Feel free to ask me anything during our session!`;
      setMessages([{ role: 'tutor', text: greeting, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newMessage = {
      role: 'user' as const,
      text: userInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setUserInput('');

    setTimeout(() => {
      const materialContext = uploadedMaterials.length
        ? ` I will connect this answer to your uploaded material where it helps.`
        : '';
      const responses = [
        `Great question about ${selectedTopic}!${materialContext} Let me explain that in detail. ${selectedTopic} is a fundamental concept that helps us understand how to structure and organize code effectively. The key principle here is...`,
        `Excellent observation!${materialContext} Here's what you need to know about this aspect of ${selectedTopic}. When we look at real-world applications, we can see how this concept is used in...`,
        `I understand your confusion about this part.${materialContext} Let's break ${selectedTopic} down step by step. First, we need to understand the basic foundation, then we'll build upon that...`,
        `That's an important concept in ${selectedTopic}!${materialContext} Let me clarify that for you with a practical example. Imagine you're building an application where...`,
        `Good thinking!${materialContext} Here's how we can approach this problem in ${selectedTopic}. The best practice is to start by identifying the core components and then...`
      ];
      
      const tutorResponse = {
        role: 'tutor' as const,
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, tutorResponse]);
    }, 1500);
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    
    setTimeout(() => {
      setIsListening(false);
      const voiceQuestions = [
        "Can you explain this concept in simpler terms?",
        "What are some real-world examples of this?",
        "How does this relate to what we learned before?",
        "Can you show me a practical implementation?",
        "What are common mistakes to avoid?"
      ];
      setUserInput(voiceQuestions[Math.floor(Math.random() * voiceQuestions.length)]);
    }, 2000);
  };

  const handleVoiceControl = () => {
    setShowVoiceModal(true);
    setIsVoiceActive(true);
    
    setTimeout(() => {
      const randomCmd = voiceCommands[Math.floor(Math.random() * voiceCommands.length)];
      setVoiceCommand(randomCmd.command);
      
      setTimeout(() => {
        setIsVoiceActive(false);
        randomCmd.handler();
      }, 1500);
    }, 2000);
  };

  const executeVoiceCommand = (cmd: typeof voiceCommands[0]) => {
    setVoiceCommand(cmd.command);
    setShowVoiceModal(true);
    setIsVoiceActive(true);
    
    setTimeout(() => {
      setIsVoiceActive(false);
      cmd.handler();
      setTimeout(() => setShowVoiceModal(false), 1500);
    }, 1000);
  };

  const handleGenerateSummary = () => {
    setShowSummary(true);
  };

  const handleSaveSession = () => {
    const newSession: SavedSession = {
      id: Date.now().toString(),
      topic: selectedTopic,
      avatar: selectedAvatar,
      date: new Date().toISOString().split('T')[0],
      duration: `${Math.floor(Math.random() * 30 + 20)} min`
    };
    setSavedSessions([newSession, ...savedSessions]);
    setSessionSaved(true);
    setTimeout(() => setSessionSaved(false), 3000);
  };

  const handleShareSession = () => {
    setShowShareModal(true);
  };

  const handleDownloadVideo = () => {
    setIsDownloading(true);
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = `https://readdy.ai/api/search-image?query=${avatars.find(a => a.id === selectedAvatar)?.image} teaching ${selectedTopic}&width=1920&height=1080&seq=download-video&orientation=landscape`;
      link.download = `${selectedTopic}-tutorial.mp4`;
      link.click();
      setIsDownloading(false);
    }, 2000);
  };

  const handleDownloadSummary = () => {
    const summaryContent = `
Session Summary - ${selectedTopic}
Generated: ${new Date().toLocaleString()}
Tutor: ${avatars.find(a => a.id === selectedAvatar)?.name}
Voice: ${voices.find(v => v.id === selectedVoice)?.name}

KEY POINTS:
• Understanding the fundamental concepts and principles
• Practical applications and real-world examples
• Common mistakes and how to avoid them
• Best practices and optimization techniques

NEXT STEPS:
Practice with exercises, review the examples, and try implementing the concepts in your own projects.
    `;
    
    const blob = new Blob([summaryContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedTopic}-summary.txt`;
    link.click();
  };

  const handleSaveToNotes = () => {
    alert(`Summary saved to your notes! You can find it in the Notes section.`);
    setShowSummary(false);
  };

  const handleLoadSession = (session: SavedSession) => {
    setSelectedTopic(session.topic);
    setSelectedAvatar(session.avatar);
    setShowSavedSessions(false);
    setVideoGenerated(false);
    setIsTutorActive(false);
    setMessages([]);
  };

  const handleDeleteSession = (sessionId: string) => {
    setSavedSessions(savedSessions.filter(s => s.id !== sessionId));
  };

  const handleActivateGlasses = () => {
    setIsGlassesMode(true);
    setTimeout(() => {
      alert('Smart Glasses Connected! You can now use the AI Tutor hands-free with audio feedback.');
    }, 1000);
  };

  return (
    <div className="bg-[#0A0E27] text-white min-h-screen">
      <Navbar scrolled={true} />
      
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Back Button & Actions */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <button 
              onClick={() => navigate('/home')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151B3B]/60 border border-[#22D3EE]/30 hover:bg-[#4A9FD8]/30 transition-all cursor-pointer group"
            >
              <i className="ri-arrow-left-line text-[#22D3EE] group-hover:-translate-x-1 transition-transform"></i>
              <span className="text-sm font-['Inter'] text-gray-300">Back to Home</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleActivateGlasses}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all cursor-pointer ${
                  isGlassesMode
                    ? 'bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] shadow-lg shadow-[#22D3EE]/50'
                    : 'bg-[#151B3B]/60 border border-[#22D3EE]/30 hover:bg-[#4A9FD8]/30'
                }`}
              >
                <i className="ri-glasses-line text-white"></i>
                <span className="text-sm font-['Inter'] text-white">
                  {isGlassesMode ? 'Glasses Active' : 'Activate Glasses'}
                </span>
                {isGlassesMode && <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>}
              </button>

              <button
                onClick={() => setShowSavedSessions(!showSavedSessions)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151B3B]/60 border border-[#22D3EE]/30 hover:bg-[#4A9FD8]/30 transition-all cursor-pointer"
              >
                <i className="ri-history-line text-[#22D3EE]"></i>
                <span className="text-sm font-['Inter'] text-gray-300">Saved ({savedSessions.length})</span>
              </button>
            </div>
          </div>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-['Montserrat'] mb-4">
              AI Virtual <span className="bg-gradient-to-r from-[#22D3EE] to-[#EC4899] bg-clip-text text-transparent">Tutor</span>
            </h1>
            <p className="text-base text-gray-400 font-['Inter']">
              Interactive AI-powered tutor with customizable avatars, voice control, and smart glasses integration
            </p>
          </div>

          {/* Glasses Mode Indicator */}
          {isGlassesMode && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#22D3EE]/20 to-[#8B5CF6]/20 border border-[#22D3EE]/50 flex items-center gap-3 animate-fade-in">
              <i className="ri-glasses-line text-2xl text-[#22D3EE] animate-pulse"></i>
              <div className="flex-1">
                <span className="font-['Inter'] font-semibold">Smart Glasses Mode Active</span>
                <p className="text-sm text-gray-400 font-['Inter']">Audio feedback enabled • Voice commands ready • Hands-free control</p>
              </div>
              <button
                onClick={() => setIsGlassesMode(false)}
                className="px-4 py-2 rounded-full bg-[#0A0E27]/50 hover:bg-[#0A0E27] transition-all text-sm cursor-pointer whitespace-nowrap font-['Inter']"
              >
                Disconnect
              </button>
            </div>
          )}

          {/* Success Message */}
          {sessionSaved && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#22D3EE]/20 to-[#8B5CF6]/20 border border-[#22D3EE]/50 flex items-center gap-3 animate-fade-in">
              <i className="ri-checkbox-circle-fill text-2xl text-[#22D3EE]"></i>
              <span className="font-['Inter']">Session saved successfully!</span>
            </div>
          )}

          {/* Saved Sessions Panel */}
          {showSavedSessions && (
            <div className="mb-8 bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold font-['Montserrat']">Your Saved Sessions</h2>
                <button
                  onClick={() => setShowSavedSessions(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0A0E27]/50 hover:bg-[#0A0E27] transition-all cursor-pointer"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedSessions.map((session) => (
                  <div key={session.id} className="p-4 rounded-2xl bg-[#0A0E27]/50 border border-[#22D3EE]/20 hover:border-[#22D3EE]/50 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1 font-['Montserrat']">{session.topic}</h3>
                        <p className="text-xs text-gray-400 font-['Inter']">
                          {avatars.find(a => a.id === session.avatar)?.name}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteSession(session.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#EC4899]/20 hover:bg-[#EC4899]/30 transition-all cursor-pointer"
                      >
                        <i className="ri-delete-bin-line text-[#EC4899]"></i>
                      </button>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 font-['Inter']">
                      <span><i className="ri-calendar-line mr-1"></i>{session.date}</span>
                      <span><i className="ri-time-line mr-1"></i>{session.duration}</span>
                    </div>
                    <button
                      onClick={() => handleLoadSession(session)}
                      className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-[#22D3EE]/20 to-[#8B5CF6]/20 border border-[#22D3EE]/30 hover:border-[#22D3EE]/50 transition-all text-sm cursor-pointer whitespace-nowrap font-['Inter']"
                    >
                      Load Session
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!videoGenerated ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Setup Panel */}
              <div className="space-y-6">
                {/* Topic Selection */}
                <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
                  <h2 className="text-xl font-bold font-['Montserrat'] mb-4">Select Topic</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {topics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => setSelectedTopic(topic)}
                        className={`px-4 py-3 rounded-xl text-sm cursor-pointer transition-all font-['Inter'] ${
                          selectedTopic === topic
                            ? 'bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] shadow-lg shadow-[#22D3EE]/30'
                            : 'bg-[#0A0E27]/50 border border-[#22D3EE]/10 hover:border-[#22D3EE]/30'
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Material Upload */}
                <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-xl font-bold font-['Montserrat']">Upload Material</h2>
                      <p className="text-sm text-gray-400 font-['Inter'] mt-1">
                        Add slides, notes, PDFs, or images for this tutor session.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-lg hover:shadow-[#22D3EE]/40 transition-all text-sm cursor-pointer whitespace-nowrap font-['Inter']"
                    >
                      <i className="ri-upload-cloud-2-line"></i>
                      Upload
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={supportedMaterialTypes.join(',')}
                    onChange={(event) => handleUploadMaterials(event.target.files)}
                    className="hidden"
                  />

                  {uploadedMaterials.length > 0 ? (
                    <div className="space-y-2">
                      {uploadedMaterials.map((material) => (
                        <div
                          key={material.id}
                          className="flex items-center gap-3 rounded-xl bg-[#0A0E27]/50 border border-[#22D3EE]/10 px-4 py-3"
                        >
                          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#22D3EE]/15">
                            <i className="ri-file-text-line text-[#22D3EE]"></i>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold font-['Inter'] truncate">{material.name}</p>
                            <p className="text-xs text-gray-400 font-['Inter']">
                              {material.type || 'Material'} &bull; {formatFileSize(material.size)}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveMaterial(material.id)}
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#EC4899]/15 hover:bg-[#EC4899]/25 transition-all cursor-pointer"
                            aria-label={`Remove ${material.name}`}
                          >
                            <i className="ri-close-line text-[#EC4899]"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-[#22D3EE]/25 bg-[#0A0E27]/40 px-4 py-5 text-sm text-gray-400 font-['Inter']">
                      No material attached yet. The tutor can still generate a session from the selected topic.
                    </div>
                  )}
                </div>

                {/* Voice Selection */}
                <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
                  <h2 className="text-xl font-bold font-['Montserrat'] mb-4">Choose Voice Style</h2>
                  <div className="space-y-2">
                    {voices.map((voice) => (
                      <button
                        key={voice.id}
                        onClick={() => setSelectedVoice(voice.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm cursor-pointer transition-all font-['Inter'] ${
                          selectedVoice === voice.id
                            ? 'bg-gradient-to-r from-[#22D3EE]/20 to-[#8B5CF6]/20 border border-[#22D3EE]'
                            : 'bg-[#0A0E27]/50 border border-[#22D3EE]/10 hover:border-[#22D3EE]/30'
                        }`}
                      >
                        <div className="text-left">
                          <div className="font-semibold">{voice.name}</div>
                          <div className="text-xs text-gray-400">{voice.description}</div>
                        </div>
                        <i className="ri-volume-up-line text-[#22D3EE]"></i>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Avatar Selection */}
              <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
                <h2 className="text-xl font-bold font-['Montserrat'] mb-4">Choose Your Tutor Avatar</h2>
                <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
                  {avatars.map((avatar) => (
                    <div
                      key={avatar.id}
                      onClick={() => setSelectedAvatar(avatar.id)}
                      className={`cursor-pointer rounded-2xl overflow-hidden transition-all border-2 ${
                        selectedAvatar === avatar.id
                          ? 'border-[#22D3EE] shadow-lg shadow-[#22D3EE]/30 scale-105'
                          : 'border-[#22D3EE]/10 hover:border-[#22D3EE]/30'
                      }`}
                    >
                      <div className="aspect-square relative">
                        <img
                          src={`https://readdy.ai/api/search-image?query=$%7Bavatar.image%7D&width=300&height=300&seq=avatar-${avatar.id}&orientation=squarish`}
                          alt={avatar.name}
                          className="w-full h-full object-cover"
                        />
                        {selectedAvatar === avatar.id && (
                          <div className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-[#22D3EE]">
                            <i className="ri-check-line text-[#0A0E27]"></i>
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-[#0A0E27]/80">
                        <h3 className="font-semibold text-sm font-['Montserrat']">{avatar.name}</h3>
                        <p className="text-xs text-gray-400 font-['Inter']">{avatar.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Generate Button */}
                <div className="mt-6 pt-6 border-t border-[#22D3EE]/20">
                  {isGenerating ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm font-['Inter']">
                        <span>Generating AI Video...</span>
                        <span className="text-[#22D3EE]">{generationProgress}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#0A0E27]/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] transition-all duration-300"
                          style={{ width: `${generationProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-400 font-['Inter']">
                        Creating personalized explanation with {avatars.find(a => a.id === selectedAvatar)?.name}
                        {uploadedMaterials.length ? ` using ${uploadedMaterials.length} uploaded material${uploadedMaterials.length > 1 ? 's' : ''}` : ''}...
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={handleGenerateVideo}
                      disabled={!selectedTopic}
                      className="w-full px-6 py-4 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-lg hover:shadow-[#22D3EE]/50 transition-all font-semibold cursor-pointer whitespace-nowrap font-['Inter'] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <i className="ri-video-add-line mr-2"></i>
                      {uploadedMaterials.length ? 'Generate From Material' : 'Generate AI Explanation Video'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Video & Tutor Panel */}
              <div className="lg:col-span-2 space-y-6">
                {/* Video Player */}
                <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl overflow-hidden">
                  <div className="relative aspect-video bg-gradient-to-br from-[#4A9FD8]/20 to-[#8B5CF6]/20">
                    <img
                      src={`https://readdy.ai/api/search-image?query=${avatars.find(a => a.id === selectedAvatar)?.image} teaching ${selectedTopic} with educational diagrams and explanations&width=800&height=450&seq=tutor-video-${selectedAvatar}&orientation=landscape`}
                      alt="Tutor"
                      className="w-full h-full object-cover"
                    />
                    {!isTutorActive && (
                      <button
                        onClick={handleStartTutor}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-all cursor-pointer"
                      >
                        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-lg hover:shadow-[#22D3EE]/50 transition-all">
                          <i className="ri-play-fill text-3xl text-white"></i>
                        </div>
                      </button>
                    )}
                    {isTutorActive && (
                      <div className="absolute bottom-4 left-4 right-4">
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-white mb-2 font-['Inter']">
                            <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
                            <span>5:30</span>
                          </div>
                          <div className="relative h-2 bg-black/50 rounded-full overflow-hidden cursor-pointer">
                            <div 
                              className="absolute h-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] rounded-full transition-all"
                              style={{ width: `${(currentTime / 330) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => setCurrentTime(prev => Math.max(prev - 10, 0))}
                              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0A0E27]/80 backdrop-blur-sm hover:bg-[#0A0E27] transition-all cursor-pointer"
                            >
                              <i className="ri-skip-back-line text-lg"></i>
                            </button>
                            <button
                              onClick={() => setIsPlaying(!isPlaying)}
                              className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0A0E27]/80 backdrop-blur-sm hover:bg-[#0A0E27] transition-all cursor-pointer"
                            >
                              <i className={`${isPlaying ? 'ri-pause-line' : 'ri-play-fill'} text-xl text-white`}></i>
                            </button>
                            <button 
                              onClick={() => setCurrentTime(prev => Math.min(prev + 10, 330))}
                              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0A0E27]/80 backdrop-blur-sm hover:bg-[#0A0E27] transition-all cursor-pointer"
                            >
                              <i className="ri-skip-forward-line text-lg"></i>
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <button 
                              onClick={handleVoiceControl}
                              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                                isVoiceActive 
                                  ? 'bg-gradient-to-r from-[#22D3EE] to-[#EC4899] shadow-lg shadow-[#22D3EE]/50 animate-pulse' 
                                  : 'bg-[#0A0E27]/80 backdrop-blur-sm hover:bg-[#0A0E27]'
                              }`}
                            >
                              <i className="ri-mic-line text-lg"></i>
                            </button>
                            <div className="relative group">
                              <button className="px-4 py-2 rounded-full bg-[#0A0E27]/80 backdrop-blur-sm hover:bg-[#0A0E27] transition-all text-sm cursor-pointer whitespace-nowrap font-['Inter']">
                                {playbackSpeed}x
                              </button>
                              <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
                                <div className="bg-[#151B3B] border border-[#4A9FD8]/30 rounded-2xl p-2 space-y-1">
                                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                                    <button
                                      key={speed}
                                      onClick={() => setPlaybackSpeed(speed)}
                                      className="block w-full px-4 py-2 text-sm rounded-lg hover:bg-[#4A9FD8]/30 transition-all text-left cursor-pointer whitespace-nowrap font-['Inter']"
                                    >
                                      {speed}x
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={handleGenerateSummary}
                              className="px-4 py-2 rounded-full bg-[#0A0E27]/80 backdrop-blur-sm hover:bg-[#0A0E27] transition-all text-sm cursor-pointer whitespace-nowrap font-['Inter']"
                            >
                              <i className="ri-file-list-line mr-2"></i>
                              Summary
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Voice Commands Guide */}
                  {isTutorActive && (
                    <div className="p-6 border-t border-[#4A9FD8]/30">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold font-['Montserrat']">Voice Commands</h4>
                        <button 
                          onClick={handleVoiceControl}
                          className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-lg transition-all cursor-pointer whitespace-nowrap font-['Inter']"
                        >
                          Try Voice Control
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {voiceCommands.slice(0, 4).map((cmd, index) => (
                          <button
                            key={index}
                            onClick={() => executeVoiceCommand(cmd)}
                            className="p-3 rounded-lg bg-[#0A0E27]/50 border border-[#4A9FD8]/20 hover:border-[#22D3EE]/50 hover:bg-[#4A9FD8]/20 transition-all cursor-pointer text-left group"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <i className="ri-mic-line text-[#22D3EE] text-sm"></i>
                              <p className="text-xs font-medium text-[#22D3EE] font-['Inter']">"{cmd.command}"</p>
                            </div>
                            <p className="text-xs text-gray-400">{cmd.action}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bookmarks */}
                  {isTutorActive && (
                    <div className="p-6 border-t border-[#4A9FD8]/30">
                      <h4 className="text-sm font-semibold mb-3 font-['Montserrat']">Key Moments</h4>
                      <div className="space-y-2">
                        {bookmarks.map((bookmark, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentTime(bookmark.time)}
                            className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#0A0E27]/50 hover:bg-[#4A9FD8]/20 transition-all text-left cursor-pointer"
                          >
                            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#8B5CF6]/20">
                              <i className="ri-bookmark-fill text-sm text-[#EC4899]"></i>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium font-['Inter']">{bookmark.label}</p>
                              <p className="text-xs text-gray-400">{Math.floor(bookmark.time / 60)}:{(bookmark.time % 60).toString().padStart(2, '0')}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Interactive Chat */}
                {isTutorActive && (
                  <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
                    <h3 className="text-lg font-bold font-['Montserrat'] mb-4">Ask Questions Anytime</h3>
                    
                    {/* Messages */}
                    <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto pr-2">
                      {messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                            <div className={`px-4 py-3 rounded-2xl ${
                              msg.role === 'user'
                                ? 'bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6]'
                                : 'bg-[#0A0E27]/50 border border-[#22D3EE]/20'
                            }`}>
                              <p className="text-sm font-['Inter']">{msg.text}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 px-2 font-['Inter']">{msg.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Input */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleVoiceInput}
                        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                          isListening
                            ? 'bg-gradient-to-r from-[#22D3EE] to-[#EC4899] animate-pulse'
                            : 'bg-[#0A0E27]/50 border border-[#22D3EE]/20 hover:border-[#22D3EE]/50'
                        }`}
                      >
                        <i className="ri-mic-line text-xl"></i>
                      </button>
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask a question or request clarification..."
                        className="flex-1 px-4 py-3 rounded-full bg-[#0A0E27]/50 border border-[#22D3EE]/20 focus:border-[#22D3EE]/50 outline-none text-sm font-['Inter']"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-lg hover:shadow-[#22D3EE]/50 transition-all cursor-pointer"
                      >
                        <i className="ri-send-plane-fill text-xl"></i>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Info Panel */}
              <div className="lg:col-span-1 space-y-6">
                {/* Session Info */}
                <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
                  <h3 className="text-lg font-bold font-['Montserrat'] mb-4">Session Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <i className="ri-book-line text-[#22D3EE]"></i>
                      <div>
                        <p className="text-xs text-gray-400 font-['Inter']">Topic</p>
                        <p className="text-sm font-semibold font-['Inter']">{selectedTopic}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="ri-user-line text-[#22D3EE]"></i>
                      <div>
                        <p className="text-xs text-gray-400 font-['Inter']">Tutor</p>
                        <p className="text-sm font-semibold font-['Inter']">{avatars.find(a => a.id === selectedAvatar)?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="ri-volume-up-line text-[#22D3EE]"></i>
                      <div>
                        <p className="text-xs text-gray-400 font-['Inter']">Voice</p>
                        <p className="text-sm font-semibold font-['Inter']">{voices.find(v => v.id === selectedVoice)?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="ri-attachment-2 text-[#22D3EE]"></i>
                      <div>
                        <p className="text-xs text-gray-400 font-['Inter']">Materials</p>
                        <p className="text-sm font-semibold font-['Inter']">
                          {uploadedMaterials.length ? `${uploadedMaterials.length} attached` : 'None attached'}
                        </p>
                      </div>
                    </div>
                    {isGlassesMode && (
                      <div className="flex items-center gap-3">
                        <i className="ri-glasses-line text-[#22D3EE]"></i>
                        <div>
                          <p className="text-xs text-gray-400 font-['Inter']">Mode</p>
                          <p className="text-sm font-semibold font-['Inter']">Smart Glasses</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {uploadedMaterials.length > 0 && (
                  <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
                    <h3 className="text-lg font-bold font-['Montserrat'] mb-4">Attached Materials</h3>
                    <div className="space-y-2">
                      {uploadedMaterials.map((material) => (
                        <div
                          key={material.id}
                          className="flex items-center gap-3 rounded-xl bg-[#0A0E27]/50 border border-[#22D3EE]/10 px-3 py-2"
                        >
                          <i className="ri-file-text-line text-[#22D3EE]"></i>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold font-['Inter'] truncate">{material.name}</p>
                            <p className="text-xs text-gray-400 font-['Inter']">{formatFileSize(material.size)}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveMaterial(material.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#EC4899]/15 hover:bg-[#EC4899]/25 transition-all cursor-pointer"
                            aria-label={`Remove ${material.name}`}
                          >
                            <i className="ri-close-line text-[#EC4899]"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="bg-[#151B3B]/60 backdrop-blur-xl border border-[#22D3EE]/30 rounded-3xl p-6">
                  <h3 className="text-lg font-bold font-['Montserrat'] mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={handleSaveSession}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0A0E27]/50 border border-[#22D3EE]/10 hover:border-[#22D3EE]/30 transition-all text-sm cursor-pointer font-['Inter']"
                    >
                      <i className="ri-bookmark-line text-[#22D3EE]"></i>
                      Save This Session
                    </button>
                    <button 
                      onClick={handleShareSession}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0A0E27]/50 border border-[#22D3EE]/10 hover:border-[#22D3EE]/30 transition-all text-sm cursor-pointer font-['Inter']"
                    >
                      <i className="ri-share-line text-[#22D3EE]"></i>
                      Share with Friends
                    </button>
                    <button 
                      onClick={handleDownloadVideo}
                      disabled={isDownloading}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0A0E27]/50 border border-[#22D3EE]/10 hover:border-[#22D3EE]/30 transition-all text-sm cursor-pointer font-['Inter'] disabled:opacity-50"
                    >
                      <i className={`${isDownloading ? 'ri-loader-4-line animate-spin' : 'ri-download-line'} text-[#22D3EE]`}></i>
                      {isDownloading ? 'Downloading...' : 'Download Video'}
                    </button>
                    <button 
                      onClick={handleStartNewSession}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0A0E27]/50 border border-[#22D3EE]/10 hover:border-[#22D3EE]/30 transition-all text-sm cursor-pointer font-['Inter']">
                      <i className="ri-restart-line text-[#22D3EE]"></i>
                      Start New Session
                    </button>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-gradient-to-br from-[#22D3EE]/10 to-[#8B5CF6]/10 border border-[#22D3EE]/30 rounded-3xl p-6">
                  <h3 className="text-lg font-bold font-['Montserrat'] mb-3">💡 Pro Tips</h3>
                  <ul className="space-y-2 text-sm text-gray-300 font-['Inter']">
                    <li className="flex items-start gap-2">
                      <i className="ri-check-line text-[#22D3EE] mt-0.5"></i>
                      <span>Pause anytime to ask questions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-check-line text-[#22D3EE] mt-0.5"></i>
                      <span>Use voice input for hands-free learning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-check-line text-[#22D3EE] mt-0.5"></i>
                      <span>Activate glasses mode for immersive experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-check-line text-[#22D3EE] mt-0.5"></i>
                      <span>Generate summary at the end</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary Modal */}
      {showSummary && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-6">
          <div className="bg-[#151B3B] border border-[#22D3EE]/30 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-['Montserrat']">Session Summary</h2>
              <button
                onClick={() => setShowSummary(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0A0E27]/50 hover:bg-[#0A0E27] transition-all cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0A0E27]/50 border border-[#22D3EE]/20">
                <h3 className="font-semibold mb-2 font-['Montserrat']">Topic Covered</h3>
                <p className="text-sm text-gray-300 font-['Inter']">{selectedTopic}</p>
              </div>
              
              <div className="p-4 rounded-xl bg-[#0A0E27]/50 border border-[#22D3EE]/20">
                <h3 className="font-semibold mb-2 font-['Montserrat']">Key Points</h3>
                <ul className="space-y-2 text-sm text-gray-300 font-['Inter']">
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-[#22D3EE] mt-0.5"></i>
                    <span>Understanding the fundamental concepts and principles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-[#22D3EE] mt-0.5"></i>
                    <span>Practical applications and real-world examples</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-[#22D3EE] mt-0.5"></i>
                    <span>Common mistakes and how to avoid them</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-[#22D3EE] mt-0.5"></i>
                    <span>Best practices and optimization techniques</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-4 rounded-xl bg-[#0A0E27]/50 border border-[#22D3EE]/20">
                <h3 className="font-semibold mb-2 font-['Montserrat']">Next Steps</h3>
                <p className="text-sm text-gray-300 font-['Inter']">
                  Practice with exercises, review the examples, and try implementing the concepts in your own projects.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={handleDownloadSummary}
                  className="flex-1 px-6 py-3 rounded-full bg-[#0A0E27]/50 border border-[#22D3EE]/20 hover:border-[#22D3EE]/50 transition-all text-sm cursor-pointer whitespace-nowrap font-['Inter']"
                >
                  <i className="ri-download-line mr-2"></i>
                  Download Summary
                </button>
                <button 
                  onClick={handleSaveToNotes}
                  className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-lg hover:shadow-[#22D3EE]/50 transition-all text-sm cursor-pointer whitespace-nowrap font-['Inter']"
                >
                  <i className="ri-save-line mr-2"></i>
                  Save to Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-6">
          <div className="bg-[#151B3B] border border-[#22D3EE]/30 rounded-3xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-['Montserrat']">Share Session</h2>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0A0E27]/50 hover:bg-[#0A0E27] transition-all cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={() => {
                  alert('Shared via Email!');
                  setShowShareModal(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0A0E27]/50 border border-[#22D3EE]/20 hover:border-[#22D3EE]/50 transition-all cursor-pointer font-['Inter']"
              >
                <i className="ri-mail-line text-[#22D3EE]"></i>
                <span>Share via Email</span>
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                  setShowShareModal(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0A0E27]/50 border border-[#22D3EE]/20 hover:border-[#22D3EE]/50 transition-all cursor-pointer font-['Inter']"
              >
                <i className="ri-link text-[#22D3EE]"></i>
                <span>Copy Link</span>
              </button>
              <button 
                onClick={() => {
                  alert('Shared on WhatsApp!');
                  setShowShareModal(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0A0E27]/50 border border-[#22D3EE]/20 hover:border-[#22D3EE]/50 transition-all cursor-pointer font-['Inter']"
              >
                <i className="ri-whatsapp-line text-[#22D3EE]"></i>
                <span>Share on WhatsApp</span>
              </button>
              <button 
                onClick={() => {
                  alert('Shared on Twitter!');
                  setShowShareModal(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0A0E27]/50 border border-[#22D3EE]/20 hover:border-[#22D3EE]/50 transition-all cursor-pointer font-['Inter']"
              >
                <i className="ri-twitter-x-line text-[#22D3EE]"></i>
                <span>Share on Twitter</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Voice Control Modal */}
      {showVoiceModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-6">
          <div className="bg-[#151B3B] border border-[#22D3EE]/30 rounded-3xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#EC4899] flex items-center justify-center">
                <i className={`ri-mic-line text-4xl text-white ${isVoiceActive ? 'animate-pulse' : ''}`}></i>
              </div>
              <h3 className="text-2xl font-bold mb-2 font-['Montserrat']">
                {isVoiceActive ? 'Listening...' : 'Voice Command Received'}
              </h3>
              <p className="text-gray-400 mb-6 font-['Inter']">
                {isVoiceActive ? 'Speak your command' : `"${voiceCommand}"`}
              </p>
              {!isVoiceActive && (
                <button
                  onClick={() => setShowVoiceModal(false)}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] hover:shadow-lg transition-all cursor-pointer whitespace-nowrap font-['Inter']"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
