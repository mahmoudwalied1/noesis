
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F1C3A] border-t border-[#26658C]/30">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://static.readdy.ai/image/191210b2d9d804b66b88f0f961093c0f/8714477945622bb0444713d1550621b3.webp" 
                alt="Noesis Logo" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-[#54ACBF] to-[#6E2BBF] bg-clip-text text-transparent">
                Noesis
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              AI-powered learning platform designed to help students master any subject with intelligent tools and collaborative features.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/ai-explanations" className="text-sm text-gray-400 hover:text-[#54ACBF] transition-colors cursor-pointer">
                  AI Explanations
                </Link>
              </li>
              <li>
                <Link to="/notes" className="text-sm text-gray-400 hover:text-[#54ACBF] transition-colors cursor-pointer">
                  Smart Notes
                </Link>
              </li>
              <li>
                <Link to="/quizzes" className="text-sm text-gray-400 hover:text-[#54ACBF] transition-colors cursor-pointer">
                  Adaptive Quizzes
                </Link>
              </li>
              <li>
                <Link to="/flashcards" className="text-sm text-gray-400 hover:text-[#54ACBF] transition-colors cursor-pointer">
                  Smart Flashcards
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold mb-4">Study Tools</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/mindmaps" className="text-sm text-gray-400 hover:text-[#54ACBF] transition-colors cursor-pointer">
                  Mind Maps
                </Link>
              </li>
              <li>
                <Link to="/study-room" className="text-sm text-gray-400 hover:text-[#54ACBF] transition-colors cursor-pointer">
                  Study Rooms
                </Link>
              </li>
              <li>
                <Link to="/ai-explanations" className="text-sm text-gray-400 hover:text-[#54ACBF] transition-colors cursor-pointer">
                  Voice Control
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-[#54ACBF] transition-colors cursor-pointer">
                  Performance Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex items-center gap-3 mb-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#26658C]/30 hover:bg-[#26658C]/50 transition-all cursor-pointer">
                <i className="ri-twitter-x-line"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#26658C]/30 hover:bg-[#26658C]/50 transition-all cursor-pointer">
                <i className="ri-linkedin-line"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#26658C]/30 hover:bg-[#26658C]/50 transition-all cursor-pointer">
                <i className="ri-github-line"></i>
              </a>
            </div>
            <p className="text-sm text-gray-400">
              Join our community of learners mastering their studies together.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#26658C]/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} Noesis. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-400 hover:text-[#54ACBF] transition-colors cursor-pointer">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-[#54ACBF] transition-colors cursor-pointer">
              Terms of Service
            </a>
            <a href="https://readdy.ai/?origin=logo" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-[#54ACBF] transition-colors cursor-pointer">
              Powered by Readdy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
