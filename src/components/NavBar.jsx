import { useState, useEffect } from "react";

import { navLinks, profile } from "../constants";
import "../styles/chrome.css";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };

    document.addEventListener("keydown", handleKey);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("keydown", handleKey);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`navbar ${scrolled || menuOpen ? "scrolled" : "not-scrolled"}`}
    >
      <div className="inner">
        <a href="#hero" className="logo">
          {profile.name}
        </a>

        <nav className="desktop" aria-label="Primary">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                <a href={link}>
                  <span>{name}</span>
                  <span className="underline" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="resume-link"
          >
            Resume
          </a>

          <a href={`mailto:${profile.email}`} className="contact-btn group">
            <div className="inner">
              <span>Email me</span>
            </div>
          </a>

          <button
            id="menu-toggle"
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <img src="/images/menu.svg" alt="" />
            )}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={`mobile ${menuOpen ? "open" : ""}`}
        aria-label="Mobile"
        hidden={!menuOpen}
      >
        <ul>
          {navLinks.map(({ link, name }) => (
            <li key={name}>
              <a href={link} onClick={closeMenu}>
                {name}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-actions">
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
          >
            Resume
          </a>
          <a href={`mailto:${profile.email}`} onClick={closeMenu}>
            Email me
          </a>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
