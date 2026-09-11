// src/pages/Contact.jsx
import { useState } from "react";
import PixelBg from "../components/PixelBg";

const EMAIL = "prashastrawat123@gmail.com";

const links = [
  { label: "GITHUB", href: "https://github.com/prashastrawat" },
  { label: "LINKEDIN", href: "https://linkedin.com/in/prashastrawat" },
];

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleEmailClick = async () => {
    if (copied) return; // prevent spamming clicks mid-countdown

    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);

      setTimeout(() => {
        window.open(
          `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`,
          "_blank"
        );
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <section className="relative bg-bg px-6 lg:px-11 py-16 lg:py-20 overflow-hidden">
      <PixelBg />

      <div className="relative mx-auto max-w-6xl border-l border-line pl-5 lg:pl-6">
        <p className="font-mono text-xs tracking-widest text-accent mb-4">CONTACT // 006</p>
        <h1 className="font-mono font-extrabold text-4xl lg:text-6xl text-ink mb-6">LET'S TALK</h1>
        <p className="text-sm text-muted leading-relaxed mb-8">
          Have a project in mind, or just want to say hi? Reach out through any of
          these — I usually reply within a day or two.
        </p>

        <div className="flex flex-col gap-3">
          {links.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-fit border border-ink text-ink text-xs font-bold tracking-wide px-5 py-2.5 hover:bg-accent hover:border-accent hover:text-white transition-colors"
              style={{ boxShadow: "1.5px 1.5px 0 #050505" }}
            >
              {social.label}
            </a>
          ))}

          <button
            onClick={handleEmailClick}
            disabled={copied}
            className="inline-block w-fit border border-ink text-ink text-xs font-bold tracking-wide px-5 py-2.5 hover:bg-accent hover:border-accent hover:text-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ boxShadow: "1.5px 1.5px 0 #050505" }}
          >
            {copied ? "EMAIL COPIED — OPENING GMAIL..." : "EMAIL"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;