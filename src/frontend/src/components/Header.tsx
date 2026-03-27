import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface HeaderProps {
  onJoinClick: () => void;
}

export function Header({ onJoinClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="/"
          className="text-xl font-display font-semibold text-[#111111] tracking-tight"
          data-ocid="nav.link"
        >
          Airu
        </a>
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#problem"
            className="text-sm text-[#666] hover:text-[#111] transition-colors"
            data-ocid="nav.link"
          >
            Problem
          </a>
          <a
            href="#solution"
            className="text-sm text-[#666] hover:text-[#111] transition-colors"
            data-ocid="nav.link"
          >
            Solution
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-[#666] hover:text-[#111] transition-colors"
            data-ocid="nav.link"
          >
            How It Works
          </a>
          <a
            href="/blog"
            className="text-sm text-[#666] hover:text-[#111] transition-colors"
            data-ocid="nav.link"
          >
            Blog
          </a>
          <a
            href="#faq"
            className="text-sm text-[#666] hover:text-[#111] transition-colors"
            data-ocid="nav.link"
          >
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-5">
          <a
            href="https://instagram.com/breathefreshair.india"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline text-sm text-[#aaa] hover:text-[#111] transition-colors"
            data-ocid="nav.link"
          >
            Instagram
          </a>
          <a
            href="https://youtube.com/@BreatheFreshAir"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline text-sm text-[#aaa] hover:text-[#111] transition-colors"
            data-ocid="nav.link"
          >
            YouTube
          </a>
          <button
            type="button"
            onClick={onJoinClick}
            className="rounded-full bg-[#111111] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#333] active:scale-95 transition-all"
            data-ocid="nav.primary_button"
          >
            Reserve My Unit
          </button>
        </div>
      </div>
    </motion.header>
  );
}
