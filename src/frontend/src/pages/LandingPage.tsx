import { Instagram, Mail, Play, Youtube, Zap } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { WaitlistModal } from "../components/WaitlistModal";

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Dark placeholder style
const darkPlaceholder = {
  background: "linear-gradient(135deg, #1a1a18 0%, #2a2520 100%)",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
} as React.CSSProperties;

// Light/beige placeholder style
const lightPlaceholder = {
  background: "#ede8df",
  borderRadius: "16px",
  border: "1px solid #d4cfc6",
  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
} as React.CSSProperties;

const placeholderLabelDark: React.CSSProperties = {
  color: "rgba(255,255,255,0.3)",
  fontSize: "0.85rem",
  fontStyle: "italic",
  letterSpacing: "0.05em",
};

const placeholderLabelLight: React.CSSProperties = {
  color: "#9a948a",
  fontSize: "0.85rem",
  fontStyle: "italic",
  letterSpacing: "0.05em",
};

export function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-md"
        style={{ background: "rgba(10,10,10,0.85)" }}
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <a
            href="/"
            className="text-white font-bold text-lg tracking-widest"
            data-ocid="nav.link"
          >
            LumaAir
          </a>
          <div className="flex items-center gap-4">
            <a
              href="/blog"
              className="text-white/60 hover:text-white text-sm font-medium transition-colors hidden sm:block"
              data-ocid="nav.link"
            >
              Blog
            </a>
            <button
              type="button"
              onClick={openModal}
              className="bg-white text-[#0a0a0a] text-sm font-semibold px-5 py-2 rounded-full hover:bg-white/90 transition-all"
              data-ocid="nav.primary_button"
            >
              Reserve Your LumaAir
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="min-h-screen flex items-center pt-16 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #0a0a0a 0%, #1a1410 60%, #0d0c0a 100%)",
        }}
      >
        {/* Amber glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(217,119,6,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-5 py-28 md:py-36 relative z-10 w-full">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 max-w-2xl"
            >
              <div className="inline-flex items-center border border-white/20 rounded-full px-4 py-1.5 mb-8">
                <span className="text-white/70 text-xs font-medium tracking-widest uppercase">
                  Pre-Order · Limited First Batch
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                <span className="text-white block">Your AC doesn't</span>
                <span className="text-white block">remove odor.</span>
                <em className="not-italic block" style={{ color: "#d97706" }}>
                  LumaAir does.
                </em>
              </h1>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
                A simple module that neutralizes trapped smell in closed AC
                rooms — no electricity, no sprays, no artificial fragrance.
              </p>
              <button
                type="button"
                onClick={openModal}
                className="bg-white text-[#0a0a0a] font-semibold text-base px-8 py-4 rounded-full hover:bg-white/95 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-xl"
                data-ocid="hero.primary_button"
              >
                Reserve Your LumaAir
              </button>
              <div className="mt-4 space-y-1">
                <p className="text-white/35 text-sm">
                  No upfront payment · Limited first batch
                </p>
                <p className="text-white/25 text-xs">
                  Early access users across India
                </p>
              </div>
            </motion.div>

            {/* Floating product image placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <div className="animate-float relative">
                {/* Amber glow ring */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    boxShadow:
                      "0 0 60px 20px rgba(217,119,6,0.18), 0 0 120px 40px rgba(217,119,6,0.08)",
                  }}
                />
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "clamp(180px, 22vw, 300px)",
                    height: "clamp(230px, 28vw, 380px)",
                    background:
                      "linear-gradient(160deg, #1e1b16 0%, #0d0c0a 100%)",
                    borderRadius: "28px",
                    border: "1px solid rgba(217,119,6,0.2)",
                    boxShadow:
                      "0 24px 64px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.35)",
                  }}
                >
                  <span
                    style={{
                      ...placeholderLabelDark,
                      fontSize: "0.75rem",
                      textAlign: "center",
                      padding: "0 16px",
                    }}
                  >
                    [ LumaAir Device ]
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#0a0a0a" }}
      >
        <FadeIn>
          <div className="relative" style={{ minHeight: "50vh" }}>
            <img
              src="/assets/generated/hero-bedroom.dim_1600x900.jpg"
              alt="Modern bedroom with AC"
              className="w-full h-full object-cover"
              style={{ minHeight: "50vh", display: "block" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
              }}
            />
            <div className="absolute bottom-0 left-0 px-8 pb-8 md:px-14 md:pb-12">
              <p className="text-white font-bold text-2xl md:text-4xl">
                Designed for closed AC rooms
              </p>
              <p
                className="mt-2 font-semibold text-base tracking-widest uppercase"
                style={{ color: "#d97706" }}
              >
                LumaAir
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ───────────────────────────────────────────────── */}
      {/* PRODUCT SECTION — new, placed after Hero Image   */}
      {/* ───────────────────────────────────────────────── */}
      <section className="py-24 md:py-36" style={{ background: "#F5F0E8" }}>
        <div className="max-w-2xl mx-auto px-5">
          {/* Main product render */}
          <FadeIn>
            <div
              className="w-full flex items-center justify-center mb-5"
              style={{
                ...darkPlaceholder,
                aspectRatio: "4/5",
                background: "linear-gradient(160deg, #1c1916 0%, #0d0c0a 100%)",
              }}
            >
              <span
                style={{
                  ...placeholderLabelDark,
                  fontSize: "0.8rem",
                  textAlign: "center",
                }}
              >
                [ LumaAir Product Render ]
              </span>
            </div>
          </FadeIn>

          {/* Close-up detail */}
          <FadeIn delay={0.1}>
            <div
              className="w-full flex items-center justify-center mb-3"
              style={{
                ...darkPlaceholder,
                aspectRatio: "3/2",
                background: "linear-gradient(160deg, #1c1916 0%, #0d0c0a 100%)",
              }}
            >
              <span
                style={{
                  ...placeholderLabelDark,
                  fontSize: "0.8rem",
                  textAlign: "center",
                }}
              >
                [ Close-Up Product Detail ]
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p
              className="text-center text-sm italic mb-14"
              style={{ color: "#9a948a" }}
            >
              Engineered with precision materials for consistent odor
              neutralization.
            </p>
          </FadeIn>

          {/* Text block */}
          <FadeIn delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0a0a] leading-tight mb-4">
              Meet LumaAir Odor Neutralizer
            </h2>
            <p className="text-[#666] text-lg leading-relaxed mb-8">
              Works with your AC airflow to naturally remove odor.
            </p>
            <div className="space-y-4">
              {["No electricity", "No fragrance", "No filters"].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: "#d97706" }}
                  />
                  <p className="text-[#0a0a0a] font-semibold text-lg">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Problem */}
      <section className="py-28 md:py-32" style={{ background: "#f5f0e8" }}>
        <div className="max-w-4xl mx-auto px-5">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0a0a] leading-tight mb-14 max-w-lg">
              Your room feels closed.
              <br />
              Because it is.
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5 mb-14">
            {[
              {
                label: "Cooking smell stays",
                src: "/assets/generated/problem-cooking.dim_800x600.jpg",
                alt: "Cooking in kitchen",
              },
              {
                label: "Smoke lingers",
                src: "/assets/generated/problem-smoke.dim_800x600.jpg",
                alt: "Smoke in room",
              },
              {
                label: "Air feels heavy",
                src: "/assets/generated/problem-closed-room.dim_800x600.jpg",
                alt: "Closed room air",
              },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)]">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full object-cover"
                    style={{ aspectRatio: "4/3" }}
                  />
                  <div className="p-6">
                    <p className="text-[#0a0a0a] font-semibold text-lg">
                      {item.label}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <p
              className="text-xl md:text-2xl font-medium italic"
              style={{ color: "#d97706" }}
            >
              Your AC circulates air. It doesn't refresh it.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Insight Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <FadeIn>
              <img
                src="/assets/generated/insight-airflow.dim_800x600.jpg"
                alt="AC airflow loop"
                className="w-full rounded-2xl object-cover"
                style={{ aspectRatio: "4/3" }}
              />
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="flex items-center justify-center md:justify-start">
                <p className="text-3xl md:text-4xl font-bold text-[#0a0a0a] leading-tight">
                  Your AC keeps recycling the same air.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-28 md:py-32" style={{ background: "#f5f0e8" }}>
        <div className="max-w-3xl mx-auto px-5">
          <FadeIn>
            <img
              src="/assets/generated/solution-product.dim_1200x675.jpg"
              alt="LumaAir near AC vent"
              className="w-full rounded-2xl object-cover mb-10"
              style={{ aspectRatio: "16/9" }}
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0a0a] leading-tight mb-8">
              A better way to fix room odor
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-[#555] text-lg md:text-xl leading-relaxed mb-8">
              LumaAir works with your AC airflow to naturally neutralize odor.
            </p>
            <div className="space-y-3 mb-8">
              {["No sprays.", "No perfumes.", "No electricity."].map((line) => (
                <p key={line} className="text-[#0a0a0a] font-bold text-xl">
                  {line}
                </p>
              ))}
            </div>
            <p className="text-[#555] text-lg">Just cleaner air over time.</p>
          </FadeIn>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-28 md:py-32" style={{ background: "#0a0a0a" }}>
        <div className="max-w-4xl mx-auto px-5">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              How it works
            </h2>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl mb-14">
              Inside LumaAir is a natural adsorption material that captures and
              neutralizes odor particles as air flows through it. No masking. No
              chemicals in the air. Just removal.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                num: "01",
                text: "Attach near AC vent",
                label: "[ Product on AC Vent ]",
              },
              {
                num: "02",
                text: "Air flows through LumaAir",
                label: "[ Air Flowing Through Device ]",
              },
              {
                num: "03",
                text: "Odor particles get neutralized",
                label: "[ Clean Air Output ]",
              },
            ].map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.1}>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  {/* Step image placeholder */}
                  <div
                    className="w-full flex items-center justify-center"
                    style={{
                      aspectRatio: "4/3",
                      background:
                        "linear-gradient(135deg, #1a1a18 0%, #2a2520 100%)",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span
                      style={{
                        ...placeholderLabelDark,
                        fontSize: "0.75rem",
                        textAlign: "center",
                        padding: "0 12px",
                      }}
                    >
                      {step.label}
                    </span>
                  </div>
                  {/* Step text */}
                  <div className="p-6">
                    <p
                      className="text-2xl font-bold mb-2 font-serif"
                      style={{ color: "#d97706" }}
                    >
                      {step.num}
                    </p>
                    <p className="text-white font-medium text-base">
                      {step.text}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle Section */}
      <section className="relative overflow-hidden bg-[#0a0a0a]">
        <FadeIn>
          <div className="relative" style={{ minHeight: "50vh" }}>
            <img
              src="/assets/generated/lifestyle-bedroom.dim_1600x900.jpg"
              alt="Relaxing bedroom environment"
              className="w-full h-full object-cover absolute inset-0"
              style={{ minHeight: "50vh" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
              }}
            />
            <div
              className="relative flex flex-col items-center justify-end text-center pb-14 px-6"
              style={{ minHeight: "50vh" }}
            >
              <p className="text-white font-bold text-2xl md:text-4xl">
                Feel the difference in your room
              </p>
              <p className="mt-3 text-base md:text-lg text-white/60">
                Cleaner air. Better sleep.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Additional Lifestyle placeholders: Living Room + Closed Indoor */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-5 grid md:grid-cols-2 gap-5">
          <FadeIn>
            <div
              className="w-full flex items-center justify-center rounded-2xl"
              style={{ ...darkPlaceholder, aspectRatio: "16/9" }}
            >
              <span
                style={{
                  ...placeholderLabelDark,
                  fontSize: "0.8rem",
                  textAlign: "center",
                }}
              >
                [ Living Room ]
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div
              className="w-full flex items-center justify-center rounded-2xl"
              style={{ ...darkPlaceholder, aspectRatio: "16/9" }}
            >
              <span
                style={{
                  ...placeholderLabelDark,
                  fontSize: "0.8rem",
                  textAlign: "center",
                }}
              >
                [ Closed Indoor Environment ]
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Video Placeholder */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-5">
          <FadeIn>
            <div
              className="rounded-2xl overflow-hidden relative"
              style={{ ...darkPlaceholder, aspectRatio: "16/9" }}
            >
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(217,119,6,0.1) 0%, transparent 70%)",
                }}
              >
                <p style={placeholderLabelDark}>[ Product Demo Video ]</p>
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
              </div>
            </div>
            <p className="text-center text-[#999] text-sm mt-4">
              See how LumaAir works in real conditions
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-28 md:py-32" style={{ background: "#f5f0e8" }}>
        <div className="max-w-4xl mx-auto px-5">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0a0a] leading-tight mb-12">
              Designed for everyday use
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              "Works with your AC",
              "Reduces odor",
              "No purifier needed",
              "Easy setup",
              "Silent",
            ].map((benefit, i) => (
              <FadeIn key={benefit} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 flex flex-col items-center text-center gap-4 shadow-[0_4px_24px_rgba(0,0,0,0.07)]">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      ...lightPlaceholder,
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                    }}
                  >
                    <span
                      style={{ ...placeholderLabelLight, fontSize: "0.6rem" }}
                    >
                      [ icon ]
                    </span>
                  </div>
                  <p className="text-[#0a0a0a] font-medium text-sm leading-snug">
                    {benefit}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Indian Homes */}
      <section className="py-28 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-5">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0a0a] leading-tight mb-4">
              Designed for real Indian homes
            </h2>
            <p className="text-[#666] text-lg leading-relaxed mb-10">
              Works in bedrooms, rented flats, and closed AC rooms where airflow
              is limited and odor builds up easily.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid md:grid-cols-2 gap-5 mb-10">
              <img
                src="/assets/generated/indian-kitchen.dim_800x600.jpg"
                alt="Indian kitchen"
                className="w-full rounded-2xl object-cover"
                style={{ aspectRatio: "4/3" }}
              />
              <img
                src="/assets/generated/indian-bedroom.dim_800x600.jpg"
                alt="Bedroom setup"
                className="w-full rounded-2xl object-cover"
                style={{ aspectRatio: "4/3" }}
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="space-y-3">
              {[
                "Designed for closed AC rooms",
                "Tested in real flats and bedrooms",
                "Made for Indian cooking and lifestyle",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3 py-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "#d97706" }}
                  />
                  <p className="text-[#0a0a0a] font-medium">{point}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Emotional */}
      <section className="py-32 md:py-40" style={{ background: "#0a0a0a" }}>
        <div className="max-w-3xl mx-auto px-5 text-center">
          <FadeIn>
            <p className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              You spend 8–10 hours in your room every day.
            </p>
            <p className="text-white/50 text-xl">
              The air you breathe there matters more than you think.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Experience */}
      <section className="py-28 md:py-32" style={{ background: "#f5f0e8" }}>
        <div className="max-w-3xl mx-auto px-5">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0a0a] leading-tight mb-12">
              What you'll notice after using LumaAir
            </h2>
          </FadeIn>
          <div className="space-y-5">
            {[
              "Room feels breathable within hours",
              "No lingering smell after cooking",
              "Better sleep at night",
            ].map((item, i) => (
              <FadeIn key={item} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-7 flex items-center gap-5 shadow-[0_4px_24px_rgba(0,0,0,0.07)]">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: "#d97706" }}
                  />
                  <p className="text-[#0a0a0a] font-medium text-lg">{item}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-28 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-5">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0a0a] leading-tight mb-12">
              Built for real life
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: "🏢", text: "Used in bedrooms, kitchens, and offices" },
              { icon: "🌿", text: "No chemicals, no artificial smell" },
              { icon: "✅", text: "Safe for daily use" },
              { icon: "🇮🇳", text: "Designed for Indian homes" },
            ].map((item, i) => (
              <FadeIn key={item.text} delay={i * 0.08}>
                <div className="flex items-start gap-4 p-6 rounded-2xl border border-[#f0f0f0]">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-[#0a0a0a] font-medium">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 md:py-32" style={{ background: "#f5f0e8" }}>
        <div className="max-w-4xl mx-auto px-5">
          <FadeIn>
            <h2 className="text-4xl font-bold text-[#0a0a0a] mb-12">
              What early users say
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                quote: "Room actually feels breathable after a few hours.",
                name: "Priya M.",
                location: "Bangalore",
              },
              {
                quote: "No smell even after cooking with AC on.",
                name: "Arjun K.",
                location: "Mumbai",
              },
            ].map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.07)]">
                  <p className="text-[#0a0a0a] text-lg leading-relaxed mb-6 font-medium">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: "#0a0a0a" }}
                    >
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-[#0a0a0a] text-sm font-semibold">
                        {t.name}
                      </p>
                      <p className="text-[#999] text-xs">{t.location}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-3">
              Stay connected with LumaAir
            </h2>
            <p className="text-[#888] mb-10">
              Follow our journey, updates, and real user experiences.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-3 text-[#0a0a0a]">
                <Instagram className="w-5 h-5" style={{ color: "#d97706" }} />
                <span className="font-medium text-sm">@lumaair.in</span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-[#eee]" />
              <div className="flex items-center gap-3 text-[#0a0a0a]">
                <Youtube className="w-5 h-5" style={{ color: "#d97706" }} />
                <span className="font-medium text-sm">LumaAir</span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-[#eee]" />
              <div className="flex items-center gap-3 text-[#0a0a0a]">
                <Mail className="w-5 h-5" style={{ color: "#d97706" }} />
                <span className="font-medium text-sm">hello@lumaair.in</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pre-Order */}
      <section className="py-28 md:py-32" style={{ background: "#0d0c0a" }}>
        <div className="max-w-2xl mx-auto px-5 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Launching Soon
            </h2>
            <p className="text-white/50 text-lg mb-10">
              Expected price:{" "}
              <span style={{ color: "#d97706" }} className="font-semibold">
                ₹1,599
              </span>
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-3 mb-10">
              {[
                "First 100 units — early access",
                "Spots filling fast",
                "No upfront payment required",
              ].map((point) => (
                <div
                  key={point}
                  className="flex items-center justify-center gap-2"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#d97706" }}
                  />
                  <p className="text-white/60 text-sm">{point}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={openModal}
              className="bg-white text-[#0a0a0a] font-semibold text-base px-8 py-4 rounded-full hover:bg-white/95 hover:scale-[1.02] active:scale-95 transition-all duration-200"
              data-ocid="preorder.primary_button"
            >
              Reserve Your LumaAir
            </button>
            <p className="text-white/30 text-xs mt-4">
              You'll only be contacted when we launch. No spam.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 md:py-40" style={{ background: "#000" }}>
        <div className="max-w-2xl mx-auto px-5 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
              Don't get used to bad air.
            </h2>
            <p className="text-white/40 text-xl mb-10">
              Fix it before it becomes normal.
            </p>
            <button
              type="button"
              onClick={openModal}
              className="bg-white text-[#0a0a0a] font-semibold text-base px-10 py-4 rounded-full hover:bg-white/95 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-2xl"
              data-ocid="finalcta.primary_button"
            >
              Reserve Your LumaAir
            </button>
            <p className="text-white/25 text-sm mt-5">
              No upfront payment · Limited first batch
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 md:py-32 bg-white">
        <div className="max-w-2xl mx-auto px-5">
          <FadeIn>
            <h2 className="text-4xl font-bold text-[#0a0a0a] mb-12">
              Frequently asked
            </h2>
          </FadeIn>
          <div className="space-y-6">
            {[
              {
                q: "Does it completely remove smell?",
                a: "It continuously reduces and neutralizes odor over time using natural adsorption.",
              },
              {
                q: "Is this an air purifier?",
                a: "No. It's a passive odor neutralizer that works with AC airflow — no electricity or filters needed.",
              },
              {
                q: "Do I need installation?",
                a: "No tools needed. Just place it near your AC vent.",
              },
              {
                q: "Is it safe for daily use?",
                a: "Yes, it uses natural materials and releases no chemicals or artificial fragrance.",
              },
            ].map((item, i) => (
              <FadeIn key={item.q} delay={i * 0.07}>
                <div className="border-b border-[#f0f0f0] pb-6">
                  <p className="text-[#0a0a0a] font-semibold text-lg mb-2">
                    {item.q}
                  </p>
                  <p className="text-[#666] leading-relaxed">{item.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16" style={{ background: "#0a0a0a" }}>
        <div className="max-w-5xl mx-auto px-5">
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
            <div>
              <p className="text-white font-bold text-xl tracking-widest mb-2">
                LumaAir
              </p>
              <p className="text-white/40 text-sm">
                Fresh air for closed spaces
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white/60 text-sm">hello@lumaair.in</p>
              <p className="text-white/40 text-sm">Instagram: @lumaair.in</p>
              <p className="text-white/40 text-sm">YouTube: LumaAir</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-white/20 text-xs">
              © {new Date().getFullYear()} LumaAir. All rights reserved.
            </p>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              className="text-white/20 text-xs hover:text-white/40 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Built with love using caffeine.ai
            </a>
          </div>
        </div>
      </footer>

      {/* Sticky CTA Bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 backdrop-blur-md"
        style={{ background: "rgba(10,10,10,0.90)" }}
        data-ocid="sticky.panel"
      >
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" style={{ color: "#d97706" }} />
            <span className="text-white/70 text-sm font-medium">
              Limited Pre-Order Batch
            </span>
          </div>
          <button
            type="button"
            onClick={openModal}
            className="bg-white text-[#0a0a0a] font-semibold text-sm px-5 py-2 rounded-full hover:bg-white/90 transition-all"
            data-ocid="sticky.primary_button"
          >
            Reserve Your LumaAir
          </button>
        </div>
      </div>

      <WaitlistModal open={modalOpen} onClose={closeModal} />
    </div>
  );
}
