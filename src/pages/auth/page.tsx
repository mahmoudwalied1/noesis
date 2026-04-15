import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AuthMode = 'login' | 'signup' | 'forgot';

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6 && mode !== 'forgot') {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'forgot') {
        setSuccess('Password reset link sent to your email!');
        setTimeout(() => setMode('login'), 2000);
      } else {
        navigate('/splash');
      }
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      setIsLoading(false);
      navigate('/splash');
    }, 1000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050B18]">
      {/* Galactic Background */}
      <div className="absolute inset-0">
        <img 
          src="https://readdy.ai/api/search-image?query=stunning%20deep%20space%20galaxy%20nebula%20with%20vibrant%20blue%20cyan%20and%20purple%20cosmic%20clouds%20stars%20scattered%20across%20dark%20navy%20background%20ethereal%20glowing%20gas%20formations%20cosmic%20dust%20particles%20mystical%20atmosphere%20ultra%20detailed%20space%20photography%20style%20dreamy%20celestial%20scene%20with%20soft%20luminous%20blue%20tones%20and%20sparkling%20starlight%20creating%20peaceful%20cosmic%20ambiance%20perfect%20for%20authentication%20screen&width=1920&height=1080&seq=auth-galactic-bg-001&orientation=landscape" 
          alt="Galactic Background" 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B18]/80 via-[#0F1C3A]/60 to-[#050B18]/90"></div>
      </div>

      {/* Animated Cosmic Particles */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(84, 172, 191, ${Math.random() * 0.5 + 0.3})`
            }}
          />
        ))}
      </div>

      {/* Plasma Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#54ACBF]/20 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#6E2BBF]/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo & Slogan */}
        <div className="text-center mb-8">
          <img 
            src="https://static.readdy.ai/image/191210b2d9d804b66b88f0f961093c0f/8714477945622bb0444713d1550621b3.webp" 
            alt="Noesis" 
            className="h-16 w-auto mx-auto mb-4 drop-shadow-lg"
          />
          <h1 className="text-5xl font-bold font-montserrat mb-3 bg-gradient-to-r from-[#54ACBF] via-[#6E2BBF] to-[#EC4899] bg-clip-text text-transparent">
            Noēsis
          </h1>
          <p className="text-lg text-[#54ACBF] font-semibold font-montserrat tracking-wide">
            From sight to thought, clarity is caught.
          </p>
        </div>

        {/* Auth Card */}
        <div 
          className="glass-card-light rounded-3xl p-8 shadow-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(84, 172, 191, 0.3)',
            boxShadow: '0 0 60px rgba(84, 172, 191, 0.3), 0 0 100px rgba(110, 43, 191, 0.2)'
          }}
        >
          {/* Mode Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => {
                setMode('login');
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-3 px-4 rounded-full font-semibold font-inter text-sm transition-all duration-300 cursor-pointer whitespace-nowrap ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-[#54ACBF] to-[#6E2BBF] text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-3 px-4 rounded-full font-semibold font-inter text-sm transition-all duration-300 cursor-pointer whitespace-nowrap ${
                mode === 'signup'
                  ? 'bg-gradient-to-r from-[#54ACBF] to-[#6E2BBF] text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-inter">
              <i className="ri-error-warning-line mr-2"></i>
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-inter">
              <i className="ri-checkbox-circle-line mr-2"></i>
              {success}
            </div>
          )}

          {mode === 'forgot' ? (
            /* Forgot Password Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-inter">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none w-10 h-full justify-center">
                    <i className="ri-mail-line text-[#54ACBF] text-lg"></i>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#54ACBF] focus:ring-2 focus:ring-[#54ACBF]/20 transition-all duration-300 font-inter text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#54ACBF] to-[#6E2BBF] hover:shadow-lg font-semibold font-inter text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="ri-loader-4-line animate-spin"></i>
                    Sending...
                  </span>
                ) : (
                  'Send Reset Link'
                )}
              </button>

              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full text-center text-sm text-[#54ACBF] hover:text-white transition-colors duration-300 font-inter cursor-pointer"
              >
                Back to Log In
              </button>
            </form>
          ) : (
            /* Login/Signup Form */
            <>
              <form onSubmit={handleSubmit} className="space-y-5">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 font-inter">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none w-10 h-full justify-center">
                        <i className="ri-user-line text-[#54ACBF] text-lg"></i>
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Enter your full name"
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#54ACBF] focus:ring-2 focus:ring-[#54ACBF]/20 transition-all duration-300 font-inter text-sm"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 font-inter">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none w-10 h-full justify-center">
                      <i className="ri-mail-line text-[#54ACBF] text-lg"></i>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#54ACBF] focus:ring-2 focus:ring-[#54ACBF]/20 transition-all duration-300 font-inter text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 font-inter">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none w-10 h-full justify-center">
                      <i className="ri-lock-line text-[#54ACBF] text-lg"></i>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#54ACBF] focus:ring-2 focus:ring-[#54ACBF]/20 transition-all duration-300 font-inter text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer w-10 h-full justify-center"
                    >
                      <i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-gray-400 hover:text-[#54ACBF] transition-colors duration-300 text-lg`}></i>
                    </button>
                  </div>
                </div>

                {mode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 font-inter">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none w-10 h-full justify-center">
                        <i className="ri-lock-line text-[#54ACBF] text-lg"></i>
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm your password"
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#54ACBF] focus:ring-2 focus:ring-[#54ACBF]/20 transition-all duration-300 font-inter text-sm"
                      />
                    </div>
                  </div>
                )}

                {mode === 'login' && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-white/10 bg-white/5 text-[#54ACBF] focus:ring-[#54ACBF] focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="text-sm text-gray-400 font-inter">Remember me</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-sm text-[#54ACBF] hover:text-white transition-colors duration-300 font-inter cursor-pointer whitespace-nowrap"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                {mode === 'signup' && (
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      className="w-4 h-4 mt-0.5 rounded border-white/10 bg-white/5 text-[#54ACBF] focus:ring-[#54ACBF] focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-sm text-gray-400 font-inter">
                      I agree to the <span className="text-[#54ACBF] hover:text-white transition-colors duration-300">Terms and Conditions</span> and <span className="text-[#54ACBF] hover:text-white transition-colors duration-300">Privacy Policy</span>
                    </span>
                  </label>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#54ACBF] to-[#6E2BBF] hover:shadow-lg font-semibold font-inter text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-loader-4-line animate-spin"></i>
                      {mode === 'login' ? 'Logging in...' : 'Creating account...'}
                    </span>
                  ) : (
                    mode === 'login' ? 'Log In' : 'Create Account'
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-gray-400 font-inter">Or continue with</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-3 text-white font-inter text-sm font-medium">
                    <i className="ri-google-fill text-lg"></i>
                    Continue with Google
                  </span>
                </button>

                <button
                  onClick={() => handleSocialLogin('apple')}
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-3 text-white font-inter text-sm font-medium">
                    <i className="ri-apple-fill text-lg"></i>
                    Continue with iCloud
                  </span>
                </button>

                <button
                  onClick={() => handleSocialLogin('microsoft')}
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-3 text-white font-inter text-sm font-medium">
                    <i className="ri-microsoft-fill text-lg"></i>
                    Continue with Microsoft
                  </span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400 font-inter">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-[#54ACBF] hover:text-white transition-colors duration-300 font-semibold cursor-pointer whitespace-nowrap"
            >
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#54ACBF]/10 rounded-full blur-3xl animate-pulse-glow pointer-events-none"></div>
    </div>
  );
}
