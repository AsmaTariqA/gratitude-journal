import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiBook } from 'react-icons/fi';
import Image from './image1.png';
import Image2 from './image.png';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });

      const json = await response.json();
      if (json.success) {
        localStorage.setItem('token', json.authToken);
        props.showAlert('Logged in successfully', 'success');
        navigate('/');
      } else {
        props.showAlert('Invalid details', 'danger');
      }
    } catch (error) {
      console.error('Error during login:', error);
      props.showAlert('An error occurred during login. Please try again.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen  font-rubik">
      {/* Welcome Section */}
      <div className="pt-12 pb-8 px-6 text-center">
        <div className="flex justify-center items-center mb-4">
          <FiBook className="text-[#8E7DBE] mr-3 text-4xl" />
          <h1 className="text-5xl md:text-6xl font-bold text-[#5e548e] font-sans">
            Welcome to Your <span className='text-[#8E7DBE]'>Gratitude Journal</span>
          </h1>
          <img src={Image2} alt="Decoration" className='w-12 ml-3 animate-float' />
        </div>
        
        <p className="text-[#5e548e] text-2xl md:text-3xl   mt-6 mb-8 max-w-3xl mx-auto leading-relaxed font-caveat">
          Take a moment to reflect on the positive moments in your life. Login to start journaling your gratitude.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center font-sans">
          <img src={Image} alt="Decoration" className='w-16 mb-4 md:mb-0 md:mr-6' />
          <blockquote className="text-[#5e548e] text-xl md:text-2xl italic border-l-4 border-[#8E7DBE] pl-4 font-caveat">
            "Whoever is not grateful for small things will not be grateful for large things"
            <span className='block text-lg mt-2 text-[#6a5d8e]'>-Prophet Muhammad s.a.w</span>
          </blockquote>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex justify-center pb-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-[#F4F8D3] rounded-3xl shadow-xl p-8 border-2 border-[#8E7DBE]/20">
            <h2 className="text-3xl font-bold text-center text-[#5e548e] mb-8 font-amatic">
              Continue Your Journey
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-lg font-medium text-[#5e548e] font-caveat">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-6 w-6 text-[#8E7DBE]" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-[#8E7DBE]/30 bg-white/80 text-[#5e548e] focus:ring-2 focus:ring-[#8E7DBE] focus:border-transparent placeholder-[#8E7DBE]/60 text-lg"
                    placeholder="your@email.com"
                    value={credentials.email}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-lg font-medium text-[#5e548e] font-caveat">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-6 w-6 text-[#8E7DBE]" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="block w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-[#8E7DBE]/30 bg-white/80 text-[#5e548e] focus:ring-2 focus:ring-[#8E7DBE] focus:border-transparent placeholder-[#8E7DBE]/60 text-lg"
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center pt-2">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-5 w-5 text-[#8E7DBE] focus:ring-[#8E7DBE] border-[#8E7DBE] rounded-lg"
                />
                <label htmlFor="remember-me" className="ml-3 block text-lg text-[#5e548e] font-caveat">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 border border-transparent rounded-2xl shadow-md text-xl font-bold text-white bg-gradient-to-r from-[#8E7DBE] to-[#A6D6D6] hover:from-[#7a6ba8] hover:to-[#8fc2c2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8E7DBE] transition-all duration-300 transform hover:scale-[1.02] ${
                  loading ? 'opacity-80 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In with Gratitude'
                )}
              </button>

              <div className="text-center text-lg text-[#5e548e] pt-4 font-caveat">
                New to gratitude journaling?{' '}
                <Link 
                  to="/signup" 
                  className="font-bold text-[#8E7DBE] hover:text-[#6a5d8e] underline decoration-[#A6D6D6] decoration-2 underline-offset-4"
                >
                  Create account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;