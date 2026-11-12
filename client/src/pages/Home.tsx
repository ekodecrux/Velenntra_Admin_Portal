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

function BrandMark() {
  return (
    <img className="brand-logo-image" src="/v-logo1.webp" alt="Velentra Group" />
  );
}

export default function Home() {
  const [, setLocation] = useLocation();
  const { user, loading: sessionLoading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<RoleId>("employee");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalEmployeeUsername] = useState(() => {
    try { return localStorage.getItem("velentra-global-employee-username") || sessionStorage.getItem("velentra-global-employee-username") || "EMP001"; } catch { return "EMP001"; }
  });

  const activeRole = roles.find(role => role.id === selectedRole) ?? roles[0];
  const ActiveRoleIcon = activeRole.icon;
  const activeUsername = selectedRole === "employee" ? globalEmployeeUsername : roleUsernames[selectedRole];

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
      const isValidPreviewLogin = (selectedRole === "employee"
        ? normalizedIdentifier === activeUsername.toUpperCase() || normalizedIdentifier === "EMP001" || normalizedIdentifier === "EMP"
        : normalizedIdentifier === roleUsernames[selectedRole])
        && password === "123456";

      if (!isValidPreviewLogin) {
        setIsSubmitting(false);
        setFormError(`We couldn’t sign you in. Use ${activeUsername} with the shared preview password.`);
        return;
      }

      try {
        sessionStorage.setItem("velentra-demo-authenticated", "true");
        sessionStorage.setItem("velentra-signin-role", selectedRole);
        localStorage.setItem("velentra-demo-authenticated", "true");
        localStorage.setItem("velentra-signin-role", selectedRole);
      } catch {
        // The preview can still show the validation state if storage is blocked.
      }
      setLocation(`/workspace/${selectedRole}`);
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
            <h2>Sign in to your workspace.</h2>
            <p>Employee and Admin access are enabled for this preview. Each role opens a workspace shaped around its responsibilities.</p>
          </div>

          <div className="role-section">
            <div className="section-heading">
              <span className="section-label">01 / Your access point</span>
              <span className="section-helper">Both demo roles enabled</span>
            </div>
            <div className="role-picker" role="group" aria-label="Choose your access point">
              {roles.map(role => {
                const RoleIcon = role.icon;
                const isActive = role.id === selectedRole;
                return (
                  <button
                    className={`role-option ${isActive ? "role-option-active" : ""}`}
                    type="button"
                    key={role.id}
                    aria-pressed={isActive}
                    onClick={() => {
                      setSelectedRole(role.id);
                      setFormError("");
                      setNotice("");
                    }}
                  >
                    <span className="role-option-icon"><RoleIcon size={17} /></span>
                    <span className="role-option-copy">
                      <strong>{role.label}</strong>
                      <small>{role.summary}</small>
                    </span>
                    <ChevronRight size={16} className="role-option-arrow" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="selected-role-note">
            <span className="selected-role-icon"><ActiveRoleIcon size={17} /></span>
            <span><strong>{activeRole.label} access</strong> — {activeRole.detail}</span>
          </div>
          <div className="demo-credential-note"><span>{activeRole.label} preview credentials</span><code>{activeUsername}</code><span>/</span><code>123456</code></div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="section-heading section-heading-form">
              <span className="section-label">02 / {activeRole.label} credentials</span>
              <span className="secure-note"><LockKeyhole size={13} /> Preview access</span>
            </div>

            <div className="field-group">
              <label htmlFor="identifier">Username</label>
              <div className="input-shell">
                <KeyRound size={17} aria-hidden="true" />
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  value={identifier}
                  onChange={event => setIdentifier(event.target.value)}
                  placeholder={activeUsername}
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

            <button className="signin-button" type="submit" disabled={isSubmitting}>
              <span>{isSubmitting ? "Opening secure sign-in…" : "Continue to sign in"}</span>
              {isSubmitting ? <span className="button-spinner" aria-hidden="true" /> : <ArrowUpRight size={18} />}
            </button>
          </form>

          <div className="auth-trust-row">
            <div><ShieldCheck size={17} /> Your role and access are protected by Velentra controls.</div>
            <button type="button" className="help-link" onClick={handleRecovery}><CircleHelp size={15} /> Need access?</button>
          </div>
        </div>

        <footer className="auth-footer">
          <span>© 2026 Velentra Group · Internal operations portal</span>
        </footer>
      </main>
    </div>
  );
}
