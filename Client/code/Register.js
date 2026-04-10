import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { registerUser } from './authSlice';
import { useEffect } from 'react';
import { NavLink } from 'react-router';


function Register() {
  const validator = z.object({
    FullName: z.string().min(3, 'Minimum 3 characters required'),
    EmailId: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(validator)
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  const goToLogin = () => navigate('/login');
  const submit = (data) => dispatch(registerUser(data));

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner">
          <span></span><span></span><span></span>
        </div>
        <p className="spinner-label">Setting up your account…</p>
      </div>
    );
  }

  return (
    <div className="register-bg">
      {/* Ambient blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">⬡</span>
          <h2>Tech Stack Recommender</h2>
        </div>
       
      </nav>

      <div className="register-main">
        {/* Form card */}
        <div className="form-card">
          <div className="form-header">
            <div className="form-badge">Join free</div>
            <h1 className="form-title">TIESVERSE<br /><span>Foundation</span></h1>
            <p className="form-subtitle">Get AI-powered stack recommendations for your startup.</p>
          </div>

          {error && <div className="server-error">{error}</div>}

          <form onSubmit={handleSubmit(submit)} noValidate>
            <div className="form-group">
              <label htmlFor="FullName">Full Name</label>
              <div className="input-wrap">
                <span className="input-icon">👤</span>
                <input
                  id="FullName"
                  {...register('FullName')}
                  placeholder="Jane Doe"
                  type="text"
                  className={errors.FullName ? 'has-error' : ''}
                />
              </div>
              {errors.FullName && <span className="error">{errors.FullName.message}</span>}
            </div>

            <div className="form-group">
  <label htmlFor="EmailId">Email</label>
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

            <button className="submit-btn" type="submit">
              <span>Create Account</span>
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>

          <div className="login-text">
            Already have an account?{' '}
            <button className="login-link" onClick={goToLogin}>Sign in</button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar-info">
          <div className="sidebar-tag">What you get</div>
          <h3 className="sidebar-title">Stack intelligence<br />for builders.</h3>
          <p className="sidebar-desc">
            Answer four questions about your startup and receive a curated,
            reasoned tech stack — no guesswork, no bloat.
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
      </div>
    </div>
  );
}

export default Register;