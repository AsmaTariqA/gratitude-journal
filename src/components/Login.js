import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  console.log('Navigate:', navigate);


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
    <>
      <div className="container mt-5">
        <h2>Log in to continue to iNotePad</h2>
        <form onSubmit={handleSubmit}>
         
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email address
              </label>
              <input type='email' className='form-control' value={credentials.email} id='email'  name='email' aria-describedby='emailHelp' onChange={onChange} />
              <div id='emailHelp' className='form-text'>
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input type='password' className='form-control'  value={credentials.password} name='password' id='password' onChange={onChange} />
            </div>
            <button type='submit' className='btn btn-primary' disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
            
            <Link className="btn btn-primary mx-2" to="/signup" role="button">Creat an Account</Link>
        </form>
      </div>
  
    </>
  );
};

export default Login;

