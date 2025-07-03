import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiBook } from 'react-icons/fi';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", cpassword: "", email: '', password: '' });
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { name, email, password } = credentials;
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('token', json.authToken);
        navigate('/');
        props.showAlert("Account created successfully", "success");
      } else {
        props.showAlert("Invalid credentials", "danger");
      }
    } catch (error) {
      console.error('Error during signup:', error);
      props.showAlert('An error occurred during signup. Please try again.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen  font-rubik flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        <div className="bg-[#F4F8D3] rounded-3xl shadow-xl p-8 border-2 border-[#8E7DBE]/20">
          <div className="flex justify-center mb-6">
            <FiBook className="text-[#8E7DBE] text-4xl" />
          </div>
          <h1 className="text-3xl font-bold text-center text-[#5e548e] mb-8 font-amatic">
            Start Your Gratitude Journey
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-lg font-medium text-[#5e548e] font-caveat">
                Your Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-6 w-6 text-[#8E7DBE]" />
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-[#8E7DBE]/30 bg-white/80 text-[#5e548e] focus:ring-2 focus:ring-[#8E7DBE] focus:border-transparent placeholder-[#8E7DBE]/60 text-lg"
                  placeholder="Your beautiful name"
                  value={credentials.name}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-lg font-medium text-[#5e548e] font-caveat">
                Email Address
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

            <div className="space-y-2">
              <label htmlFor="cpassword" className="block text-lg font-medium text-[#5e548e] font-caveat">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-6 w-6 text-[#8E7DBE]" />
                </div>
                <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  className="block w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-[#8E7DBE]/30 bg-white/80 text-[#5e548e] focus:ring-2 focus:ring-[#8E7DBE] focus:border-transparent placeholder-[#8E7DBE]/60 text-lg"
                  placeholder="••••••••"
                  value={credentials.cpassword}
                  onChange={onChange}
                  required
                />
              </div>
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
                  Creating...
                </span>
              ) : (
                'Begin Your Journey'
              )}
            </button>

            <div className="text-center text-lg text-[#5e548e] pt-4 font-caveat">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-bold text-[#8E7DBE] hover:text-[#6a5d8e] underline decoration-[#A6D6D6] decoration-2 underline-offset-4"
              >
                Log in here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;