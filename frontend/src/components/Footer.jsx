const Footer = () => {
  return (
    <footer className="relative bg-ink px-6 lg:px-11 py-8">
      <div className="flex flex-col items-center justify-between gap-4 text-sm text-bg sm:flex-row">
        <p>© 2026 Prashast Rawat</p>

        <nav aria-label="Social links" className="flex gap-5">
          <a href="https://github.com/PrashastRawat" target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/prashastrawat/" target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">
            LinkedIn
          </a>
          <a href="mailto:prashastrawat123@gmail.com" className="transition-colors hover:text-accent">
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;