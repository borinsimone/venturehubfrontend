import { useState, FormEvent, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // This would normally call your API
      // For demo we'll use a mock
      if (email === 'demo@example.com' && password === 'password') {
        login('fake-token', {
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
        });
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className='login-container'>
      <h2>Log in to VentureHub</h2>

      {error && <div className='error-message'>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type='submit'
          className='login-button'
        >
          Log In
        </button>
      </form>

      <div className='auth-links'>
        <p>
          Don't have an account? <Link to='/register'>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
