import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../lib/auth';

interface NavbarProps {
  scrolled?: boolean;
}

export default function Navbar({ scrolled: initialScrolled = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(initialScrolled);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialScrolled) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialScrolled]);

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'AI Tutor', path: '/virtual-tutor' },
    { name: 'Notes', path: '/notes' },
    { name: 'Quizzes', path: '/quizzes' },
    { name: 'Flashcards', path: '/flashcards' },
    { name: 'Mind Maps', path: '/mindmaps' },
    { name: 'Study Rooms', path: '/study-room' },
    { name: 'Smart Glasses', path: '/glasses-3d' }
  ];

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    logout(navigate);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-card shadow-glass border-b border-stellar-aqua/20'
          : 'bg-gradient-to-b from-deep-space/90 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-safe">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <img 
                src="https://static.readdy.ai/image/191210b2d9d804b66b88f0f961093c0f/8714477945622bb0444713d1550621b3.webp" 
                alt="Noesis" 
                className="h-12 w-auto drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-stellar-aqua/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="text-2xl font-bold font-montserrat bg-gradient-to-r from-stellar-aqua via-nebula-purple to-pink-bright bg-clip-text text-transparent">
              NOĒSIS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium font-inter transition-all duration-300 cursor-pointer whitespace-nowrap relative group ${
                  location.pathname === link.path || (link.path === '/virtual-tutor' && location.pathname === '/ai-explanations')
                    ? 'text-stellar-aqua'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-stellar-aqua to-nebula-purple transition-all duration-300 ${
                  location.pathname === link.path || (link.path === '/virtual-tutor' && location.pathname === '/ai-explanations') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              to="/virtual-tutor"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-stellar-aqua to-nebula-purple hover:shadow-neon-cyan transition-all duration-300 font-semibold font-inter text-sm cursor-pointer whitespace-nowrap relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-nebula-purple to-stellar-aqua opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="px-5 py-3 rounded-full border border-stellar-aqua/30 bg-white/5 hover:bg-plasma-glow/20 hover:border-plasma-glow/50 transition-all duration-300 font-semibold font-inter text-sm cursor-pointer whitespace-nowrap text-gray-200"
            >
              <i className="ri-logout-box-r-line mr-2"></i>
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full glass-card hover:bg-stellar-aqua/20 transition-all duration-300 cursor-pointer"
          >
            <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl text-stellar-aqua`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-card border-t border-stellar-aqua/20 animate-in slide-in-from-top duration-300">
          <div className="max-w-7xl mx-auto px-safe py-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 px-4 rounded-2xl transition-all duration-300 cursor-pointer font-inter ${
                  location.pathname === link.path || (link.path === '/virtual-tutor' && location.pathname === '/ai-explanations')
                    ? 'bg-gradient-to-r from-stellar-aqua/20 to-nebula-purple/20 text-white border border-stellar-aqua/30'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/virtual-tutor"
              className="block w-full px-6 py-3 rounded-full bg-gradient-to-r from-stellar-aqua to-nebula-purple hover:shadow-neon-cyan transition-all duration-300 font-semibold font-inter text-sm cursor-pointer whitespace-nowrap text-center mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="block w-full px-6 py-3 rounded-full border border-stellar-aqua/30 bg-white/5 hover:bg-plasma-glow/20 hover:border-plasma-glow/50 transition-all duration-300 font-semibold font-inter text-sm cursor-pointer whitespace-nowrap text-center mt-3 text-gray-200"
            >
              <i className="ri-logout-box-r-line mr-2"></i>
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
