import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";

const SECRET_CLICKS = 5;
const CLICK_WINDOW_MS = 2000;
const NAVIGATE_DELAY_MS = 400;

const Navbar = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastClickTime = useRef(0);
  const navigateTimeout = useRef(null);
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    const now = Date.now();

    const newCount =
      now - lastClickTime.current > CLICK_WINDOW_MS ? 1 : clickCount + 1;

    lastClickTime.current = now;

    if (navigateTimeout.current) {
      clearTimeout(navigateTimeout.current);
      navigateTimeout.current = null;
    }

    if (newCount >= SECRET_CLICKS) {
      setMenuOpen(false);
      setShowLogin(true);
      setClickCount(0);
      return;
    }

    setClickCount(newCount);

    navigateTimeout.current = setTimeout(() => {
      navigate("/");
      setClickCount(0);
    }, NAVIGATE_DELAY_MS);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <nav className="relative z-100 bg-ink flex justify-between items-center border-b border-line px-6 lg:px-11 py-5">
        <span
          onClick={handleLogoClick}
          className="font-pixel font-bold text-[20px] tracking-widest text-bg cursor-pointer select-none"
        >
          PRASHAST
        </span>
        <div className="hidden lg:flex gap-8">
          <Link to="/about" className="font-pixel text-[16px] tracking-wide font-bold text-bg hover:text-white transition-colors">ABOUT</Link>
          <Link to="/projects" className="font-pixel text-[16px] tracking-wide font-bold text-bg hover:text-white transition-colors">WORK</Link>
          <Link to="/gallery" className="font-pixel text-[16px] tracking-wide font-bold text-bg hover:text-white transition-colors">GALLERY</Link>
          <Link to="/blog" className="font-pixel text-[16px] tracking-wide font-bold text-bg hover:text-white transition-colors">BLOG</Link>
          <Link to="/contact" className="font-pixel text-[16px] tracking-wide font-bold text-bg hover:text-white transition-colors">CONTACT</Link>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="lg:hidden flex flex-col gap-1.5 p-2 text-bg"
        >
          <span className={`block h-0.5 w-6 bg-current transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-current transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>

        {menuOpen && (
          <>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 top-[73px] z-40 bg-ink/30 lg:hidden"
            />
            <div className="absolute left-0 right-0 top-full z-50 border-b border-line bg-ink p-6 shadow-[0_6px_0_#1a1a1a] lg:hidden">
              <div className="flex flex-col gap-5">
                {[['ABOUT', '/about'], ['WORK', '/projects'], ['GALLERY', '/gallery'], ['BLOG', '/blog'], ['CONTACT', '/contact']].map(([label, to]) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className="font-pixel text-base tracking-wide font-bold text-bg hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Navbar;