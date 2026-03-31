import { Instagram, Mail, Play, Youtube, Zap } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { WaitlistModal } from "../components/WaitlistModal";
import {
  type Review,
  useGetApprovedReviews,
  useSubmitReview,
} from "../hooks/useQueries";

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

// Premium dark gradient placeholder
const darkPlaceholder = {
  background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.07)",
  boxShadow: "0 4px 24px rgba(0,0,0,0.22)",
} as React.CSSProperties;

// Light/beige placeholder style
const lightPlaceholder = {
  background: "linear-gradient(135deg, #f5f0e8 0%, #e8dcc8 100%)",
  borderRadius: "16px",
  border: "1px solid #d4cfc6",
  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
} as React.CSSProperties;

const placeholderLabelDark: React.CSSProperties = {
  color: "rgba(255,255,255,0.28)",
  fontSize: "0.8rem",
  fontStyle: "italic",
  letterSpacing: "0.06em",
  textAlign: "center",
};

const placeholderLabelLight: React.CSSProperties = {
  color: "#9a948a",
  fontSize: "0.8rem",
  fontStyle: "italic",
  letterSpacing: "0.06em",
  textAlign: "center",
};

// Star display component
function StarDisplay({
  rating,
  size = "sm",
}: { rating: number; size?: "sm" | "lg" }) {
  const fontSize = size === "lg" ? "1.2rem" : "0.95rem";
  return (
    <span style={{ fontSize, letterSpacing: "2px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: i <= rating ? "#d97706" : "#ddd" }}>
          &#9733;
        </span>
      ))}
    </span>
  );
}

// Interactive star selector
function StarSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1" data-ocid="reviews.toggle">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          className="text-2xl transition-transform hover:scale-110 focus:outline-none"
          style={{
            color: i <= (hovered || value) ? "#d97706" : "#ccc",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "2px",
          }}
          aria-label={`${i} star${i !== 1 ? "s" : ""}`}
        >
          &#9733;
        </button>
      ))}
    </div>
  );
}

const FALLBACK_REVIEWS = [
  {
    id: BigInt(-1),
    name: "Priya M.",
    city: "Bangalore",
    rating: BigInt(5),
    message: "The difference is noticeable, especially after cooking.",
    status: { approved: null } as { approved: null },
    createdAt: BigInt(0),
  },
  {
    id: BigInt(-2),
    name: "Arjun K.",
    city: "Mumbai",
    rating: BigInt(5),
    message: "Feels like the air is actually cleaner, not just perfumed.",
    status: { approved: null } as { approved: null },
    createdAt: BigInt(0),
  },
  {
    id: BigInt(-3),
    name: "Sneha R.",
    city: "Delhi",
    rating: BigInt(5),
    message: "Super easy to install and works quietly with the AC.",
    status: { approved: null } as { approved: null },
    createdAt: BigInt(0),
  },
];

function TestimonialsSection() {
  const { data: approvedReviews = [], isLoading } = useGetApprovedReviews();
  const submitReview = useSubmitReview();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    city: "",
    rating: 5,
    message: "",
  });
  const [formError, setFormError] = useState("");

  const displayReviews: Review[] =
    approvedReviews.length > 0 ? approvedReviews : FALLBACK_REVIEWS;
  const avgRating =
    approvedReviews.length > 0
      ? approvedReviews.reduce((sum, r) => sum + Number(r.rating), 0) /
        approvedReviews.length
      : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!form.name.trim() || !form.city.trim() || !form.message.trim()) {
      setFormError("Please fill in all fields.");
      return;
    }
    try {
      await submitReview.mutateAsync(form);
      setSubmitted(true);
    } catch {
      setFormError("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-28 md:py-32" style={{ background: "#f5f0e8" }}>
      <div className="max-w-4xl mx-auto px-5">
        <FadeIn>
          <h2 className="text-4xl font-bold text-[#0a0a0a] mb-4">
            Early users say
          </h2>
          {avgRating !== null && (
            <div className="flex items-center gap-2 mb-10">
              <span style={{ color: "#d97706", fontSize: "1.1rem" }}>
                &#11088;
              </span>
              <span className="text-lg font-semibold text-[#0a0a0a]">
                {avgRating.toFixed(1)}/5
              </span>
              <span className="text-[#888] text-sm">
                from {approvedReviews.length} early user
                {approvedReviews.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
          {!avgRating && <div className="mb-10" />}
        </FadeIn>

        {isLoading ? (
          <div
            className="flex justify-center py-10"
            data-ocid="reviews.loading_state"
          >
            <div className="w-8 h-8 rounded-full border-2 border-[#d97706] border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {displayReviews.map((r, i) => (
              <FadeIn key={r.id.toString()} delay={i * 0.1}>
                <div
                  className="bg-white rounded-2xl p-8 shadow-lg flex flex-col gap-4"
                  data-ocid={`reviews.item.${i + 1}`}
                >
                  <StarDisplay rating={Number(r.rating)} />
                  <p className="text-[#0a0a0a] text-xl leading-relaxed font-medium">
                    &ldquo;{r.message}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{ background: "#0a0a0a" }}
                    >
                      {r.name[0]}
                    </div>
                    <div>
                      <p className="text-[#0a0a0a] font-bold text-sm">
                        {r.name}
                      </p>
                      <p className="text-[#999] text-xs">{r.city}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}

        {/* Review submission form */}
        <FadeIn delay={0.2}>
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-xl mx-auto">
            <h3 className="text-xl font-bold text-[#0a0a0a] mb-1">
              Share your experience
            </h3>
            <p className="text-[#888] text-sm mb-6">
              Tried AEROVAIX Odor Shield? Tell others what you think.
            </p>

            {submitted ? (
              <div
                className="flex flex-col items-center py-6 gap-3 text-center"
                data-ocid="reviews.success_state"
              >
                <span className="text-3xl">&#x1F64F;</span>
                <p className="text-[#0a0a0a] font-semibold text-lg">
                  Thanks! Your review will appear after approval.
                </p>
                <p className="text-[#888] text-sm">
                  We review all submissions to keep things genuine.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="review-name"
                      className="block text-xs font-semibold text-[#555] mb-1.5 uppercase tracking-wide"
                    >
                      Name
                    </label>
                    <input
                      id="review-name"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      className="w-full rounded-xl border border-[#e5e0d8] bg-[#faf8f5] px-4 py-2.5 text-sm text-[#111] focus:outline-none focus:ring-2 focus:ring-[#d97706]"
                      data-ocid="reviews.input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="review-city"
                      className="block text-xs font-semibold text-[#555] mb-1.5 uppercase tracking-wide"
                    >
                      City
                    </label>
                    <input
                      id="review-city"
                      required
                      placeholder="Your city"
                      value={form.city}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, city: e.target.value }))
                      }
                      className="w-full rounded-xl border border-[#e5e0d8] bg-[#faf8f5] px-4 py-2.5 text-sm text-[#111] focus:outline-none focus:ring-2 focus:ring-[#d97706]"
                      data-ocid="reviews.input"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="review-rating"
                    className="block text-xs font-semibold text-[#555] mb-1.5 uppercase tracking-wide"
                  >
                    Rating
                  </label>
                  <StarSelector
                    value={form.rating}
                    onChange={(v) => setForm((p) => ({ ...p, rating: v }))}
                  />
                </div>
                <div>
                  <label
                    htmlFor="review-message"
                    className="block text-xs font-semibold text-[#555] mb-1.5 uppercase tracking-wide"
                  >
                    Your Experience
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us what changed in your room…"
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    className="w-full rounded-xl border border-[#e5e0d8] bg-[#faf8f5] px-4 py-2.5 text-sm text-[#111] focus:outline-none focus:ring-2 focus:ring-[#d97706] resize-none"
                    data-ocid="reviews.textarea"
                  />
                </div>
                {formError && (
                  <p
                    className="text-red-500 text-sm"
                    data-ocid="reviews.error_state"
                  >
                    {formError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitReview.isPending}
                  className="w-full rounded-full py-3 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
                  style={{ background: "#0a0a0a" }}
                  data-ocid="reviews.submit_button"
                >
                  {submitReview.isPending ? "Submitting…" : "Submit Review"}
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

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
            AEROVAIX
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
              Reserve your spot (Free)
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
        {/* Ambient background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(217,119,6,0.10) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-5 py-28 md:py-36 relative z-10 w-full">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Text left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 max-w-2xl"
            >
              <div className="inline-flex items-center border border-white/20 rounded-full px-4 py-1.5 mb-8">
                <span className="text-white/70 text-xs font-medium tracking-widest uppercase">
                  Pre-Order &middot; Limited First Batch
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                <span className="text-white block">Turn your AC into</span>
                <span className="text-white block">an odor-free airflow</span>
                <em className="not-italic block" style={{ color: "#d97706" }}>
                  system
                </em>
              </h1>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-xl mb-6">
                AEROVAIX Odor Shield removes smell from your AC airflow using
                activated carbon.
              </p>
              <div className="flex flex-col gap-1.5 mb-8 mt-2">
                <div className="flex items-center gap-3">
                  <span className="text-white/40 text-sm line-through">
                    &#8377;2,699
                  </span>
                  <span className="text-white font-bold text-base">
                    &#8377;1,799
                  </span>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: "#d97706", color: "#fff" }}
                  >
                    Launch Offer
                  </span>
                </div>
                <p className="text-white/50 text-sm">
                  &#10003; Free extra carbon filter
                </p>
                <p className="text-white/50 text-sm">
                  &#10003; Save on replacements for 1 year
                </p>
                <p className="text-white/50 text-sm">
                  &#10003; Limited to first 500 users
                </p>
              </div>
              <button
                type="button"
                onClick={openModal}
                className="bg-white text-[#0a0a0a] font-semibold text-base px-8 py-4 rounded-full hover:bg-white/95 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-xl"
                data-ocid="hero.primary_button"
              >
                Reserve your spot (Free)
              </button>
              <div className="mt-4 space-y-1">
                <p className="text-white/35 text-sm">
                  No payment required &bull; Early access only
                </p>
              </div>
            </motion.div>

            {/* Floating product image — right side on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0 flex items-center justify-center w-full md:w-auto"
            >
              <div className="relative flex items-center justify-center">
                {/* Radial amber glow behind product */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    width: "500px",
                    height: "500px",
                    background:
                      "radial-gradient(ellipse at center, rgba(251,191,36,0.25) 0%, transparent 70%)",
                    transform: "translate(-50%, -50%)",
                    top: "50%",
                    left: "50%",
                    borderRadius: "50%",
                  }}
                />
                {/* Product image with float animation */}
                <img
                  src="/assets/generated/lumaair-product-hero.dim_800x900.png"
                  alt="AEROVAIX Odor Neutralizer"
                  className="animate-float relative z-10 drop-shadow-2xl"
                  style={{
                    width: "clamp(200px, 28vw, 340px)",
                    height: "auto",
                    filter:
                      "drop-shadow(0 24px 48px rgba(217,119,6,0.18)) drop-shadow(0 8px 24px rgba(0,0,0,0.55))",
                  }}
                />
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
                AEROVAIX
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* PRODUCT SECTION — dominant, directly after Hero */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="py-32 md:py-44"
        style={{
          background:
            "linear-gradient(180deg, #F5F0E8 0%, #EDE8DF 50%, #F5F0E8 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-5">
          {/* Main product image — large, centered */}
          <FadeIn>
            <div
              className="w-full flex items-center justify-center mb-8"
              style={{
                minHeight: "520px",
                background:
                  "linear-gradient(160deg, #111110 0%, #1c1916 40%, #0d0c0a 100%)",
                borderRadius: "28px",
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.22), 0 8px 28px rgba(0,0,0,0.14)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Glow */}
              <div
                style={{
                  position: "absolute",
                  width: "60%",
                  height: "60%",
                  background:
                    "radial-gradient(ellipse at center, rgba(251,191,36,0.15) 0%, transparent 70%)",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none",
                }}
              />
              <img
                src="/assets/generated/lumaair-product-hero.dim_800x900.png"
                alt="AEROVAIX Odor Neutralizer"
                className="relative z-10"
                style={{
                  maxHeight: "480px",
                  width: "auto",
                  objectFit: "contain",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.55))",
                }}
              />
            </div>
          </FadeIn>

          {/* Close-up detail placeholder */}
          <FadeIn delay={0.1}>
            <div
              className="w-full flex items-center justify-center mb-3"
              style={{
                ...darkPlaceholder,
                aspectRatio: "3/1.2",
                background: "linear-gradient(135deg, #1c1916 0%, #2a2520 100%)",
              }}
            >
              <span style={placeholderLabelDark}>
                [ Close-Up Product Detail ]
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p
              className="text-center text-sm italic mb-16"
              style={{ color: "#9a948a" }}
            >
              Engineered with precision materials for consistent odor
              neutralization.
            </p>
          </FadeIn>

          {/* Text block */}
          <FadeIn delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0a0a] leading-tight mb-4">
              Meet AEROVAIX Odor Shield
            </h2>
            <p className="text-[#666] text-lg leading-relaxed mb-4">
              AEROVAIX Odor Shield works with your AC to clean the air before it
              reaches you. Using activated carbon, it traps odor particles and
              delivers fresh, odor-free airflow—without adding any fragrance or
              chemicals.
            </p>
            <p className="text-[#0a0a0a] font-semibold text-lg italic mb-8">
              Like a water filter, but for air.
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
              Your AC circulates odor. It doesn&apos;t remove it.
            </h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="max-w-2xl mb-12 space-y-4">
              <p className="text-[#555] text-lg leading-relaxed">
                Every time your AC runs, it recirculates the same air again and
                again. Cooking smell, smoke, and indoor odor stay trapped inside
                your room.
              </p>
              <p className="text-[#555] text-lg leading-relaxed">
                Sprays don&apos;t solve it. They just mask it.
              </p>
              <p className="text-[#0a0a0a] font-semibold text-lg">
                To actually fix the problem, odor needs to be removed from the
                airflow itself.
              </p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5 mb-14">
            {[
              { label: "Cooking smell", dark: true },
              { label: "Smoke", dark: false },
              { label: "Closed room", dark: true },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.1}>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                  }}
                >
                  {/* Premium gradient placeholder */}
                  <div
                    style={{
                      height: "180px",
                      background: item.dark
                        ? "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
                        : "linear-gradient(135deg, #f5f0e8 0%, #e8dcc8 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "16px 16px 0 0",
                    }}
                  >
                    <span
                      style={{
                        ...(item.dark
                          ? placeholderLabelDark
                          : placeholderLabelLight),
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                  <div
                    className="p-6"
                    style={{
                      background: item.dark ? "#1a1a1a" : "#ede8df",
                    }}
                  >
                    <p
                      className="font-semibold text-lg"
                      style={{ color: item.dark ? "#fff" : "#0a0a0a" }}
                    >
                      {item.label === "Cooking smell"
                        ? "Cooking smell stays"
                        : item.label === "Smoke"
                          ? "Smoke lingers"
                          : "Air feels heavy"}
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
              Your AC circulates air. It doesn&apos;t refresh it.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ╔══════════════════════════════════╗ */}
      {/* CINEMATIC SECTION                    */}
      {/* ╚══════════════════════════════════╝ */}
      <section
        style={{
          background: "#000000",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FadeIn>
          <div
            style={{
              maxWidth: "800px",
              textAlign: "center",
              padding: "0 20px",
            }}
          >
            <p
              className="font-bold text-white leading-tight"
              style={{ fontSize: "clamp(2rem, 6vw, 4.5rem" }}
            >
              The same smell. The same air. Every day.
            </p>
          </div>
        </FadeIn>
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
              alt="AEROVAIX Odor Shield near AC vent"
              className="w-full rounded-2xl object-cover mb-10"
              style={{ aspectRatio: "16/9" }}
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0a0a] leading-tight mb-8">
              Clean air, without adding anything to it
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-[#555] text-lg md:text-xl leading-relaxed mb-6">
              AEROVAIX Odor Shield uses activated carbon to trap odor particles
              from the airflow—before the air reaches you.
            </p>
            <p className="text-[#555] text-lg md:text-xl leading-relaxed mb-8">
              No fragrance added. No chemicals released. Just odor removed.
            </p>
            <p className="text-[#0a0a0a] font-semibold text-xl italic">
              Think of it like a water filter, but for air.
            </p>
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
              Inside AEROVAIX Odor Shield is a natural adsorption material that
              captures and neutralizes odor particles as air flows through it.
              No masking. No chemicals in the air. Just removal.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                num: "01",
                text: "Attach near your AC vent",
                sub: "Easily mount AEROVAIX Odor Shield where air flows out.",
                label: "[ Product on AC Vent ]",
              },
              {
                num: "02",
                text: "Air flows through activated carbon filter",
                sub: "The filter captures odor particles from the airflow.",
                label: "[ Air Flowing Through Device ]",
              },
              {
                num: "03",
                text: "Odor particles are trapped before air enters your room",
                sub: "You breathe fresher, odor-free air every day.",
                label: "[ Clean Air Output ]",
              },
            ].map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.1}>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <div
                    className="w-full flex items-center justify-center"
                    style={{
                      height: "180px",
                      background:
                        "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                      borderRadius: "16px 16px 0 0",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span
                      style={{ ...placeholderLabelDark, padding: "0 12px" }}
                    >
                      {step.label}
                    </span>
                  </div>
                  <div className="p-6">
                    <p
                      className="text-2xl font-bold mb-2"
                      style={{ color: "#d97706" }}
                    >
                      {step.num}
                    </p>
                    <p className="text-white font-medium text-base mb-1">
                      {step.text}
                    </p>
                    <p className="text-white/45 text-sm leading-snug">
                      {step.sub}
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
              <span style={{ ...placeholderLabelDark }}>[ Living Room ]</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div
              className="w-full flex items-center justify-center rounded-2xl"
              style={{ ...darkPlaceholder, aspectRatio: "16/9" }}
            >
              <span style={{ ...placeholderLabelDark }}>
                [ Closed Indoor Environment ]
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Video / Demo */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-5">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0a0a] leading-tight mb-3">
              See the difference
            </h2>
            <p className="text-[#555] text-lg leading-relaxed mb-3">
              Real odor removal. Not masking.
            </p>
            <p className="text-[#555] text-lg leading-relaxed mb-8">
              AEROVAIX Odor Shield traps odor from the airflow so your room
              actually feels fresh.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div
              className="rounded-2xl overflow-hidden relative"
              style={{ ...darkPlaceholder, aspectRatio: "16/9" }}
            >
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(217,119,6,0.10) 0%, transparent 70%)",
                }}
              >
                <p style={placeholderLabelDark}>[ Product Demo Video ]</p>
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
              </div>
            </div>
            <p className="text-center text-[#999] text-sm mt-4">
              See how AEROVAIX Odor Shield works in real conditions
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-28 md:py-32" style={{ background: "#f5f0e8" }}>
        <div className="max-w-4xl mx-auto px-5">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0a0a] leading-tight mb-12">
              Why choose AEROVAIX
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              "Eliminates odor, doesn\u2019t mask it",
              "No chemicals or artificial fragrance",
              "Works with your existing AC",
              "No electricity required",
              "Easy to install and maintain",
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

      {/* ╔══════════════════════════════════╗ */}
      {/* TRANSPARENCY SECTION               */}
      {/* ╚══════════════════════════════════╝ */}
      <section className="py-24 md:py-28 bg-white">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0a0a] leading-tight mb-8">
              What this product does
            </h2>
            <p className="text-[#555] text-lg leading-relaxed mb-6">
              AEROVAIX Odor Shield is designed to remove odor from indoor air.
            </p>
            <div
              className="rounded-2xl p-6 mx-auto mb-6"
              style={{
                background: "#faf8f5",
                border: "1px solid #e8e0d5",
                maxWidth: "480px",
              }}
            >
              <p className="text-[#0a0a0a] font-semibold text-lg">
                It does not remove dust, PM2.5, or allergens.
              </p>
            </div>
            <p className="text-[#888] text-base leading-relaxed">
              This ensures clear expectations and consistent performance.
            </p>
          </FadeIn>
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
              You spend most of your day in your room.
            </p>
            <p className="text-white/50 text-xl">
              The air you breathe there matters.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Experience */}
      <section className="py-28 md:py-32" style={{ background: "#f5f0e8" }}>
        <div className="max-w-3xl mx-auto px-5">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0a0a] leading-tight mb-12">
              What you&apos;ll notice with AEROVAIX
            </h2>
          </FadeIn>
          <div className="space-y-5">
            {[
              "No lingering cooking smell",
              "Fresher air every morning",
              "Room smells neutral, not perfumed",
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
              Built for everyday use
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: "✅", text: "Safe for daily use" },
              { icon: "🌿", text: "No harmful chemicals" },
              { icon: "🏠", text: "Designed for Indian homes" },
              {
                icon: "🏢",
                text: "Works in bedrooms, kitchens, and offices",
              },
            ].map((item, i) => (
              <FadeIn key={item.text} delay={i * 0.08}>
                <div className="flex items-start gap-4 p-6 rounded-2xl border border-[#f0f0f0] shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-[#0a0a0a] font-medium">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Cartridge Section */}
      <section className="py-28 md:py-32 bg-white">
        <div className="max-w-2xl mx-auto px-5">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0a0a] leading-tight mb-6">
              Simple maintenance, long-term freshness
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-[#555] text-lg leading-relaxed mb-4">
              Replace the carbon filter every 2–3 months for best performance.
            </p>
            <p className="text-[#555] text-lg leading-relaxed mb-8">
              This keeps your air consistently odor-free.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Social */}
      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-3">
              Stay connected with AEROVAIX
            </h2>
            <p className="text-[#888] mb-10">
              Follow our journey, updates, and real user experiences.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-3 text-[#0a0a0a]">
                <Instagram className="w-5 h-5" style={{ color: "#d97706" }} />
                <span className="font-medium text-sm">@aerovaix.in</span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-[#eee]" />
              <div className="flex items-center gap-3 text-[#0a0a0a]">
                <Youtube className="w-5 h-5" style={{ color: "#d97706" }} />
                <span className="font-medium text-sm">AEROVAIX</span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-[#eee]" />
              <div className="flex items-center gap-3 text-[#0a0a0a]">
                <Mail className="w-5 h-5" style={{ color: "#d97706" }} />
                <span className="font-medium text-sm">hello@aerovaix.in</span>
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
              Launch offer (First 500 users)
            </h2>
            <div className="flex items-baseline gap-3 justify-center mb-8">
              <span className="text-white/40 text-lg line-through">
                &#8377;2,699
              </span>
              <span className="text-white font-bold text-3xl">
                &#8377;1,799
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-3 mb-6">
              {[
                "Free extra carbon filter",
                "Save on replacements for 1 year",
                "Limited first batch access",
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
            <p className="text-white/30 text-sm mb-8">
              No payment required &bull; Limited early access
            </p>
            <button
              type="button"
              onClick={openModal}
              className="bg-white text-[#0a0a0a] font-semibold text-base px-8 py-4 rounded-full hover:bg-white/95 hover:scale-[1.02] active:scale-95 transition-all duration-200"
              data-ocid="preorder.primary_button"
            >
              Reserve your spot (Free)
            </button>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 md:py-40" style={{ background: "#000" }}>
        <div className="max-w-2xl mx-auto px-5 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
              Don&apos;t get used to bad air
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
              Reserve your spot (Free)
            </button>
            <p className="text-white/25 text-sm mt-5">
              No payment required &bull; Limited early access
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
                q: "Does it remove dust or PM2.5?",
                a: "No. AEROVAIX Odor Shield is designed specifically for odor removal, not dust, PM2.5, or allergens.",
              },
              {
                q: "How often do I replace the filter?",
                a: "Every 2\u20133 months for best results. Each replacement ensures consistently odor-free air.",
              },
              {
                q: "How do I install it?",
                a: "Simply attach it near your AC vent where air flows out. No tools or electricity needed.",
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
                AEROVAIX
              </p>
              <p className="text-white/40 text-sm">Fresh air, naturally.</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white/60 text-sm">hello@aerovaix.in</p>
              <p className="text-white/40 text-sm">Instagram: @aerovaix.in</p>
              <p className="text-white/40 text-sm">YouTube: AEROVAIX</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-white/20 text-xs">
              &copy; {new Date().getFullYear()} AEROVAIX. All rights reserved.
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
              Early access &middot; First 500 units
            </span>
          </div>
          <button
            type="button"
            onClick={openModal}
            className="bg-white text-[#0a0a0a] font-semibold text-sm px-5 py-2 rounded-full hover:bg-white/90 transition-all"
            data-ocid="sticky.primary_button"
          >
            Reserve your spot (Free)
          </button>
        </div>
      </div>

      <WaitlistModal open={modalOpen} onClose={closeModal} />
    </div>
  );
}
