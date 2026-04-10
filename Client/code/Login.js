import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginUser } from './authSlice';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';


function Login() {
  const validator = z.object({
  EmailId: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const [loginAttempted, setLoginAttempted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(validator)
  });

  const submit = (data) => {
    setLoginAttempted(true);
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const goToRegister = () => navigate('/register');

  return (
    <div className="login-bg">
      {/* Ambient blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">⬡</span>
          <h2>Tech Stack Recommender</h2>
        </div>
        <NavLink className="admin-btn" to="/adminreg">Admin Portal →</NavLink>
      </nav>

      <div className="login-main">
        {/* Sidebar Info */}
        <div className="sidebar-info">
          <div className="sidebar-tag">Welcome back</div>
          <h3 className="sidebar-title">Your stack<br />awaits.</h3>
          <p className="sidebar-desc">
            Sign in to access AI-powered tech stack recommendations
            tailored to your startup's stage, team, and sector.
          </p>

          <ul className="feature-list">
            {[
              ['🚀', 'Startup stage', 'Idea → MVP → Growth → Scaling'],
              ['👥', 'Team & budget', 'Right-sized for your resources'],
              ['🏦', 'Sector fit', 'FinTech, EdTech, HealthTech & more'],
              ['🧠', 'AI reasoning', 'Every choice explained clearly'],
            ].map(([icon, title, desc]) => (
              <li key={title} className="feature-item">
                <span className="feature-icon">{icon}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="sidebar-footer">
            Trusted by 2,400+ founders · Free forever
          </div>
        </div>

        {/* Login Form */}
        <div className="form-card">
          <div className="form-header">
            <div className="form-badge">Sign in</div>
            <h1 className="form-title">TIESVERSE<br /><span>Foundation</span></h1>
            <p className="form-subtitle">Enter your credentials to continue.</p>
          </div>

          {loginAttempted && error && (
            <div className="server-error">{error}</div>
          )}

          <form onSubmit={handleSubmit(submit)} noValidate>
            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <div className="input-wrap">
                <span className="input-icon">✉️</span>
                <input
                  id="EmailId"
                  {...register('EmailId')}
                  placeholder="jane@startup.com"
                  type="email"
                  className={errors.EmailId ? 'has-error' : ''}
                />
              </div>
              {errors.EmailId && <span className="error">{errors.EmailId.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="Password">Password</label>
              <div className="input-wrap">
                <span className="input-icon">🔒</span>
                <input
                  id="password"
                  {...register('password')}
                  placeholder="Min. 6 characters"
                  type="password"
                  className={errors.password ? 'has-error' : ''}
                />
              </div>
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>

            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="btn-spinner" />
                  Signing in…
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="register-text">
            Don't have an account?{' '}
            <button className="register-link" onClick={goToRegister}>Create one</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;