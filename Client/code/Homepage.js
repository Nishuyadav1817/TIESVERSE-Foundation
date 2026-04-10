import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendation } from "./authSlice";


const stats = [
  { value: "2,400+", label: "Founders Onboarded" },
  { value: "98%", label: "Accuracy Rate" },
  { value: "4", label: "Questions. That's It." },
  { value: "Free", label: "Forever. No Catch." },
];

const features = [
  {
    icon: "🚀",
    tag: "STAGE AWARE",
    title: "Startup Stage",
    desc: "Idea → MVP → Growth → Scaling. Every stage demands a different stack. We know the difference and tailor every recommendation precisely.",
    color: "feat-purple",
  },
  {
    icon: "👥",
    tag: "RESOURCE SMART",
    title: "Team & Budget",
    desc: "A solo founder bootstrapping and a 50-person team with runway need completely different tools. We right-size every recommendation.",
    color: "feat-blue",
  },
  {
    icon: "🏦",
    tag: "SECTOR SPECIFIC",
    title: "Sector Fit",
    desc: "FinTech compliance, EdTech scalability, HealthTech security — your industry shapes your stack. We factor in every nuance.",
    color: "feat-teal",
  },
  {
    icon: "🧠",
    tag: "AI POWERED",
    title: "AI Reasoning",
    desc: "Not just a list. Every tool choice comes with a clear, jargon-free explanation of why it fits your specific situation.",
    color: "feat-amber",
  },
];

export default function DashboardPage() {

  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(
    (state) => state.recommendation
  );

  const { register, handleSubmit } = useForm();

  const submit = (formData) => {
    dispatch(getRecommendation(formData));
  };

  return (
    <div className="tv-page">

      {/* ── NAV ── */}
      <nav className="tv-nav">
        <div className="tv-nav-inner">
          <a href="/" className="tv-logo">
            <span className="tv-logo-main">TIESVERSE</span>
            <span className="tv-logo-sub">Foundation</span>
          </a>
        </div>
      </nav>

      {/* ── DASHBOARD FORM ── */}
      <section className="tv-hero">
        <div className="tv-hero-content">
          <div className="tv-hero-left">
            <div className="tv-form-card">
              <h1 className="tv-form-title">Startup Details 🚀</h1>

              {error && <div className="tv-server-error">{error}</div>}

              <form onSubmit={handleSubmit(submit)}>
                <div className="tv-form-group">
                  <label>Startup Stage</label>
                  <select {...register("stage")}>
                    <option value="idea">Idea</option>
                    <option value="mvp">MVP</option>
                    <option value="growth">Growth</option>
                    <option value="scaling">Scaling</option>
                  </select>
                </div>

                <div className="tv-form-group">
                  <label>Team Size</label>
                  <select {...register("teamSize")}>
                    <option value="1-5">1-5</option>
                    <option value="5-10">5-10</option>
                    <option value="10-50">10-50</option>
                    <option value="50+">50+</option>
                  </select>
                </div>

                <div className="tv-form-group">
                  <label>Budget</label>
                  <select {...register("budget")}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="tv-form-group">
                  <label>Sector</label>
                  <select {...register("sector")}>
                    <option value="fintech">FinTech</option>
                    <option value="edtech">EdTech</option>
                    <option value="healthtech">HealthTech</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="saas">SaaS</option>
                  </select>
                </div>

                <button className="tv-btn-hero" type="submit">
                  Get Recommendation →
                </button>
              </form>

              {loading && (
                <div className="tv-spinner-container">
                  <div className="tv-spinner"></div>
                  <p className="tv-spinner-text">Analyzing your startup...</p>
                </div>
              )}

              {data && (
                <div className="tv-preview-card">
                  <div className="tv-preview-header">
                    <span className="tv-preview-label">Your Recommended Stack</span>
                  </div>
                  <div className="tv-stack-list">
                    {data.stack?.map((s, idx) => (
                      <div key={idx} className="tv-stack-row">
                        <span className="tv-stack-label">{s.label}</span>
                        <span className="tv-stack-value">{s.value}</span>
                        <span className="tv-stack-check">✓</span>
                      </div>
                    ))}
                  </div>
                  <div className="tv-preview-reason">
                    <span className="tv-reason-icon">🧠</span>
                    <p>{data.reason}</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="tv-features">
        <div className="tv-section-inner">
          <div className="tv-feat-grid">
            {features.map((f) => (
              <div key={f.title} className={`tv-feat-card ${f.color}`}>
                <div className="tv-feat-top">
                  <span className="tv-feat-tag">{f.tag}</span>
                  <span className="tv-feat-icon">{f.icon}</span>
                </div>
                <h3 className="tv-feat-title">{f.title}</h3>
                <p className="tv-feat-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}