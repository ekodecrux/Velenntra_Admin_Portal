import { ChevronDown, LogOut, Menu, Settings, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type WorkspaceRole = "employee" | "admin";

export type WorkspaceHeaderProps = {
  role: WorkspaceRole;
  username: string;
  onHome: () => void;
  onOpenNavigation: () => void;
  onSettings: () => void;
  onLogout: () => void;
};

export type WorkspaceFooterProps = {
  role: WorkspaceRole;
};

function formatRole(role: WorkspaceRole) {
  return role === "admin" ? "Admin" : "Employee";
}

export function WorkspaceHeader({
  role,
  username,
  onHome,
  onOpenNavigation,
  onSettings,
  onLogout,
}: WorkspaceHeaderProps) {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const roleLabel = formatRole(role);

  useEffect(() => {
    if (!isAccountOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && !accountRef.current?.contains(target)) {
        setIsAccountOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsAccountOpen(false);
        accountRef.current?.querySelector<HTMLButtonElement>(".workspace-account-toggle")?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAccountOpen]);

  return (
    <header className="workspace-topbar">
      <button
        type="button"
        className="workspace-menu-toggle"
        onClick={onOpenNavigation}
        aria-label="Open navigation"
      >
        <Menu size={19} aria-hidden="true" />
      </button>

      <button
        type="button"
        className="workspace-logo-button"
        onClick={onHome}
        aria-label="Go to home"
      >
        <img
          src="/velentra-dashboard-logo.webp"
          alt="Velentra"
          width={1536}
          height={886}
        />
      </button>

      <span className="workspace-header-role">{roleLabel}</span>
      <div className="workspace-topbar-spacer" aria-hidden="true" />

      <div className="workspace-account" ref={accountRef}>
        <button
          type="button"
          className="workspace-account-toggle"
          aria-expanded={isAccountOpen}
          aria-label="Open account menu"
          aria-haspopup="menu"
          onClick={() => setIsAccountOpen((open) => !open)}
        >
          <UserRound size={17} aria-hidden="true" />
          <span className="workspace-account-name">{username}</span>
          <ChevronDown size={13} aria-hidden="true" />
        </button>

        {isAccountOpen ? (
          <div className="workspace-account-dropdown" role="menu">
            <div className="workspace-account-identity" role="presentation">
              <span>{username}</span>
              <span>{roleLabel}</span>
            </div>
            <button
              type="button"
              className="workspace-account-action"
              role="menuitem"
              onClick={() => {
                setIsAccountOpen(false);
                onSettings();
              }}
            >
              <Settings size={15} aria-hidden="true" />
              <span>Settings</span>
            </button>
            <button
              type="button"
              className="workspace-account-action"
              role="menuitem"
              onClick={() => {
                setIsAccountOpen(false);
                onLogout();
              }}
            >
              <LogOut size={15} aria-hidden="true" />
              <span>Logout</span>
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export function WorkspaceFooter({ role }: WorkspaceFooterProps) {
  return (
    <footer className="workspace-footer">
      <span>© {new Date().getFullYear()} Velentra</span>
      <span>{formatRole(role)}</span>
      <span>Internal operations portal</span>
    </footer>
  );
}
