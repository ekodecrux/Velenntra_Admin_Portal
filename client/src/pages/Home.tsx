import { useAuth } from "@/_core/hooks/useAuth";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { useLocation } from "wouter";

type RoleId = "employee" | "admin";

type Role = {
  id: RoleId;
  label: string;
  summary: string;
  detail: string;
  icon: typeof UsersRound;
};

const roles: Role[] = [
  {
    id: "employee",
    label: "Employee",
    summary: "My assigned work",
    detail: "Complete content and operations tasks assigned to you.",
    icon: UsersRound,
  },
  {
    id: "admin",
    label: "Admin",
    summary: "All operations",
    detail: "Manage events and employees, shape roles, review work, publish updates, and configure platform settings.",
    icon: Workflow,
  },
];

const roleUsernames: Record<RoleId, string> = {
  employee: "EMP001",
  admin: "ADMIN",
};

function readEmployeeUsernames() {
  const usernames = new Set(["EMP001", "EMP"]);
  try {
    const globalUsername = localStorage.getItem("velentra-global-employee-username") || sessionStorage.getItem("velentra-global-employee-username");
    if (globalUsername) usernames.add(globalUsername.trim().toUpperCase());
    for (const storage of [sessionStorage, localStorage]) {
      const storedEvents = storage.getItem("velentra-admin-events");
      if (!storedEvents) continue;
      const events = JSON.parse(storedEvents) as Array<{ subdomain?: string }>;
      events.forEach(event => { if (event.subdomain) usernames.add(event.subdomain.trim().toUpperCase()); });
    }
  } catch {
    // Continue with the built-in preview account when browser storage is unavailable.
  }
  return usernames;
}

function BrandMark() {
  return (
    <div className="brand-lockup-natural" aria-label="Velentra Group">
      <img className="brand-round-mark" src="/velentra-mark.png" alt="" />
      <div className="brand-wordmark">
        <strong>VELENTRA</strong>
        <div><i /> <span>GROUP</span> <i /></div>
      </div>
    </div>
  );
}

export default function Home() {
  const [, setLocation] = useLocation();
  const { user, loading: sessionLoading } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalEmployeeUsername] = useState(() => {
    try { return localStorage.getItem("velentra-global-employee-username") || sessionStorage.getItem("velentra-global-employee-username") || "EMP001"; } catch { return "EMP001"; }
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setNotice("");

    if (!identifier.trim() || !password.trim()) {
      setFormError("Enter your work email or username and password to continue.");
      return;
    }

    try {
      setIsSubmitting(true);
      const normalizedIdentifier = identifier.trim().toUpperCase().replace(/\s+/g, " ");
      const isAdminLogin = ["ADMIN", "ADMIN001", "ADMIN@VELENTRA", "ADMIN@VELENTRAGROUP"].includes(normalizedIdentifier);
      const resolvedRole: RoleId = isAdminLogin ? "admin" : "employee";
      const isEventSubdomain = !isAdminLogin
        && /^[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?$/.test(normalizedIdentifier)
        && normalizedIdentifier !== "EMP001"
        && normalizedIdentifier !== "EMP";
      const isValidPreviewLogin = (resolvedRole === "employee"
        ? readEmployeeUsernames().has(normalizedIdentifier) || isEventSubdomain
        : isAdminLogin)
        && password === "123456";

      if (!isValidPreviewLogin) {
        setIsSubmitting(false);
        setFormError("We couldn’t sign you in. Check your UID and password and try again.");
        return;
      }

      try {
        sessionStorage.setItem("velentra-demo-authenticated", "true");
        sessionStorage.setItem("velentra-signin-role", resolvedRole);
        if (resolvedRole === "employee") sessionStorage.setItem("velentra-signed-in-employee", normalizedIdentifier);
        localStorage.setItem("velentra-demo-authenticated", "true");
        localStorage.setItem("velentra-signin-role", resolvedRole);
        if (resolvedRole === "employee") localStorage.setItem("velentra-signed-in-employee", normalizedIdentifier);
      } catch {
        // The preview can still show the validation state if storage is blocked.
      }
      setLocation(`/workspace/${resolvedRole}`);
    } catch {
      setIsSubmitting(false);
      setFormError("Sign-in is not available right now. Please try again.");
    }
  };

  const handleRecovery = () => {
    setFormError("");
    setNotice("This preview uses role-based demo accounts. Production password recovery will be connected after the account model is finalized.");
  };

  return (
    <div className="velentra-shell">
      <div className="conference-copy" aria-label="Velentra conference information">
        <div className="conference-top-brand">
          <img src="/conference-header-logo.png" alt="Velentra Group" />
          <span>Innovating Today... Empowering Tomorrow...</span>
        </div>
        <div className="conference-hero-copy">
          <p className="conference-overline">Velentra Group</p>
          <h1>Conferences</h1>
          <div className="conference-motto"><i /> <span>Connect · Share · Grow</span> <i /></div>
          <p>A Platform for Knowledge, Innovation<br />and Collaboration</p>
        </div>
        <div className="conference-feature-copy">
          <span><CalendarDays /> Conference<br />Events</span>
          <span><UsersRound /> Expert Speakers</span>
          <span><Workflow /> Knowledge Sharing</span>
          <span><ShieldCheck /> Networking Opportunities</span>
        </div>
        <div className="conference-bottom-copy">
          <span>© 2026 Velentra Group. All Rights Reserved.</span>
          <span>Together Towards a Smarter Future</span>
        </div>
      </div>
      <section className="brand-panel" aria-label="Velentra platform overview">
        <div className="brand-grid" aria-hidden="true" />
        <div className="brand-orbit brand-orbit-one" aria-hidden="true" />
        <div className="brand-orbit brand-orbit-two" aria-hidden="true" />

        <div className="brand-topline">
          <div className="brand-lockup">
            <BrandMark />
          </div>
          <span className="brand-version">v.01 / portal</span>
        </div>

        <div className="brand-hero">
          <div className="eyebrow eyebrow-light">
            <span className="eyebrow-dot" /> Operations portal
          </div>
          <h1>
            Every event, <em>moving</em> in one direction.
          </h1>
          <p>
            A shared workspace for the teams shaping what guests see, what gets
            approved, and what goes live.
          </p>

          <div className="signal-stack" aria-label="Platform capabilities">
            <div className="signal-card signal-card-featured">
              <div className="signal-icon"><CalendarDays size={17} /></div>
              <div>
                <strong>18 live events</strong>
                <span>Across 04 active programs</span>
              </div>
              <ArrowUpRight size={16} className="signal-arrow" />
            </div>
            <div className="signal-row">
              <div className="signal-card">
                <div className="signal-icon signal-icon-teal"><Workflow size={16} /></div>
                <div>
                  <strong>One workflow</strong>
                  <span>Review to publish</span>
                </div>
              </div>
              <div className="signal-card">
                <div className="signal-icon signal-icon-copper"><Sparkles size={16} /></div>
                <div>
                  <strong>42 teammates</strong>
                  <span>One clear rhythm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="brand-footer">
          <span>Content / People / Progress</span>
          <span className="footer-rule" aria-hidden="true" />
          <span>Built for the moments that matter.</span>
        </div>
      </section>

      <main className="auth-panel">
        <div className="auth-topline">
          <span className="auth-topline-label">Secure team access</span>
          <span className="auth-topline-status"><span /> System ready</span>
        </div>

        <div className="auth-content">
          <div className="login-card-brand"><BrandMark /></div>
          <div className="login-card-title"><UsersRound size={28} /><span>Conference Login</span></div>
          {user && !sessionLoading ? (
            <div className="session-banner" role="status">
              <div className="session-banner-icon"><Check size={16} /></div>
              <div>
                <strong>You’re already signed in</strong>
                <span>{user.name || user.email || "Your Velentra account"} is ready to continue.</span>
              </div>
              <button
                className="session-banner-action"
                type="button"
                onClick={() => setLocation(`/workspace/${user.role === "admin" ? "admin" : "employee"}`)}
              >
                Open workspace <ArrowUpRight size={15} />
              </button>
            </div>
          ) : null}

          <div className="auth-heading">
            <div className="eyebrow"><span className="eyebrow-dot" /> Welcome back</div>
            <h2>Sign In</h2>
            <p>Welcome back! Please login to continue.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="section-heading section-heading-form">
              <span className="section-label">Enter your credentials</span>
              <span className="secure-note"><LockKeyhole size={13} /> Preview access</span>
            </div>

            <div className="field-group">
              <label htmlFor="identifier">UID</label>
              <div className="input-shell">
                <KeyRound size={17} aria-hidden="true" />
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  value={identifier}
                  onChange={event => setIdentifier(event.target.value)}
                  placeholder="Enter UID"
                  autoComplete="username"
                  aria-invalid={Boolean(formError) && !identifier.trim()}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="field-group">
              <div className="field-label-row">
                  <label htmlFor="password">Password</label>
                <button className="text-link" type="button" onClick={handleRecovery}>
                  Forgot password?
                </button>
              </div>
              <div className="input-shell">
                <LockKeyhole size={17} aria-hidden="true" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-invalid={Boolean(formError) && !password.trim()}
                  disabled={isSubmitting}
                />
                <button
                  className="input-action"
                  type="button"
                  onClick={() => setShowPassword(value => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {formError ? <div className="form-message form-message-error" role="alert">{formError}</div> : null}
            {notice ? <div className="form-message form-message-notice" role="status"><CircleHelp size={16} /> {notice}</div> : null}

            <div className="login-options-row">
              <label className="remember-me"><input type="checkbox" checked={rememberMe} onChange={event => setRememberMe(event.target.checked)} /> <span>Remember Me</span></label>
              <button className="text-link login-forgot-link" type="button" onClick={handleRecovery}>Forgot Password?</button>
            </div>

            <button className="signin-button" type="submit" disabled={isSubmitting}>
              <span>{isSubmitting ? "Signing in…" : "Sign In"}</span>
              {isSubmitting ? <span className="button-spinner" aria-hidden="true" /> : <ArrowUpRight size={18} />}
            </button>
          </form>

          <div className="auth-trust-row">
            <div><ShieldCheck size={17} /> Your role and access are protected by Velentra controls.</div>
            <button type="button" className="help-link" onClick={handleRecovery}><CircleHelp size={15} /> Need access?</button>
          </div>
        </div>

        <footer className="auth-footer">
          <span>Powered by Velentra Group</span>
        </footer>
      </main>
    </div>
  );
}
