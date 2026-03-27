import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, ChevronRight, Droplets, Flame, Wind } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { WaitlistModal } from "../components/WaitlistModal";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const problemCards = [
  {
    icon: <Flame className="w-5 h-5" />,
    title: "Cooking smell stays",
    desc: "Lingers long after you've left the kitchen.",
  },
  {
    icon: <Wind className="w-5 h-5" />,
    title: "Smoke lingers",
    desc: "Stays trapped with nowhere to escape.",
  },
  {
    icon: <Droplets className="w-5 h-5" />,
    title: "Room feels heavy",
    desc: "The same air, cycling endlessly.",
  },
];

const howItWorksSteps = [
  {
    step: "1",
    title: "Attach",
    desc: "Place it near your AC vent. No tools needed.",
  },
  {
    step: "2",
    title: "Run AC",
    desc: "Works silently with airflow.",
  },
  {
    step: "3",
    title: "Breathe Better",
    desc: "Air feels fresher over time.",
  },
];

const howItFeelsCards = [
  {
    num: "01",
    title: "Room feels lighter within minutes",
    desc: "The air shifts noticeably. Less heaviness, more clarity.",
  },
  {
    num: "02",
    title: "No lingering smell after cooking",
    desc: "Even with the door closed and AC on.",
  },
  {
    num: "03",
    title: "Air feels fresher at night",
    desc: "Fresher air makes a real difference when you're resting.",
  },
];

const benefits = [
  "Works with your existing AC",
  "Helps reduce trapped odor",
  "No expensive purifier needed",
  "Installs in seconds",
  "Built for closed rooms",
];

const testimonials = [
  {
    quote: "Room feels less stuffy after using this.",
    name: "Priya M.",
    city: "Bangalore",
  },
  {
    quote: "Helpful especially at night with AC on.",
    name: "Arjun K.",
    city: "Mumbai",
  },
  {
    quote: "Didn't expect this to work, but it actually helps.",
    name: "Sana R.",
    city: "Delhi",
  },
];

export function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handler = () => {
      setShowSticky(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ scrollBehavior: "smooth" }}>
      <Header onJoinClick={() => setModalOpen(true)} />
      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Section 1 — Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-bedroom-ac.dim_1600x900.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-[#111111]/80" />
        <img
          src="/assets/generated/airflow-visual-transparent.dim_800x600.png"
          alt=""
          aria-hidden="true"
          className="absolute right-0 bottom-0 w-2/3 max-w-2xl opacity-10 pointer-events-none"
        />
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-white">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-[700px]"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/40 text-xs tracking-[0.2em] uppercase font-medium text-white/80">
                Pre-Launch • Limited Batch
              </span>
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="text-sm text-white/60 mb-3 tracking-wide"
            >
              Tested in 100+ Indian homes
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8"
            >
              Breathe Better.
              <br />
              Even in a Closed AC Room.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-xl sm:text-2xl text-white font-medium mb-10 leading-snug"
            >
              Your AC circulates air. It doesn't clean it.
            </motion.p>
            <motion.div variants={fadeUp} className="mb-2">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="rounded-full bg-white text-[#111111] px-8 py-4 text-base font-medium hover:bg-white/90 active:scale-95 transition-all duration-200"
                data-ocid="hero.primary_button"
              >
                Reserve My Unit
              </button>
            </motion.div>
            <motion.p variants={fadeUp} className="text-white/60 text-sm mb-6">
              Limited first batch • No payment required
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-white/50 text-sm mt-2 mb-3"
            >
              Follow our journey
            </motion.p>
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <a
                href="https://instagram.com/breathefreshair.india"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/40 text-white/80 text-xs font-medium px-5 py-2 hover:bg-white/10 hover:border-white/60 transition-all duration-200"
                data-ocid="hero.link"
              >
                Instagram
              </a>
              <a
                href="https://youtube.com/@BreatheFreshAir"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/40 text-white/80 text-xs font-medium px-5 py-2 hover:bg-white/10 hover:border-white/60 transition-all duration-200"
                data-ocid="hero.link"
              >
                YouTube
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* NEW — Strong Problem Statement */}
      <section className="bg-white py-24" data-ocid="problem_statement.section">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-[700px]"
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-bold text-[#111111] leading-tight mb-4"
            >
              Your AC doesn't bring in fresh air.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg text-[#5c5c5c] leading-relaxed"
            >
              It keeps circulating the same air again and again — trapping odor,
              humidity, and discomfort.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Trust Booster */}
      <section className="bg-[#faf8f5] py-10 border-b border-[#f0ebe3]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center">
          <p className="text-[#888] text-sm">
            Trusted by early users across Indian homes
          </p>
          <span className="hidden sm:block w-px h-4 bg-[#ddd]" />
          <p className="text-[#111111] text-sm font-medium">
            100+ people reserved from the first batch
          </p>
        </div>
      </section>

      {/* NEW — Why This Matters */}
      <section className="bg-[#f8f6f2] py-28" data-ocid="why_matters.section">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-bold text-[#111111] mb-10 leading-tight"
            >
              This isn't just about smell
            </motion.h2>
            <motion.div variants={stagger} className="space-y-6">
              {[
                "Air feels heavy and stale",
                "Sleep quality gets affected",
                "You don't realize it — but you feel it",
              ].map((point, i) => (
                <motion.div
                  key={point}
                  variants={fadeUp}
                  className="flex items-start gap-4"
                  data-ocid={`why_matters.item.${i + 1}`}
                >
                  <span className="text-[#bbb] text-xl font-light mt-0.5">
                    —
                  </span>
                  <p className="text-xl sm:text-2xl text-[#333] leading-snug">
                    {point}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What Exactly Is Airu? */}
      <section id="what-is-airu" className="bg-white py-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p
                variants={fadeUp}
                className="text-sm tracking-[0.15em] uppercase text-[#999] mb-4"
              >
                The Product
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-5xl sm:text-6xl font-bold text-[#111111] mb-8 leading-tight"
              >
                What Exactly Is Airu?
              </motion.h2>
              <motion.div variants={stagger} className="space-y-5">
                <motion.p
                  variants={fadeUp}
                  className="text-[#6b6b6b] text-lg leading-relaxed"
                >
                  Airu is a compact add-on module designed to work with your AC
                  airflow.
                </motion.p>
                <motion.p
                  variants={fadeUp}
                  className="text-[#6b6b6b] text-lg leading-relaxed"
                >
                  It helps reduce odor buildup inside closed rooms by improving
                  how air moves and cycles.
                </motion.p>
                <motion.p
                  variants={fadeUp}
                  className="text-[#6b6b6b] text-lg leading-relaxed"
                >
                  No filters. No heavy machines. Just a simple add-on that works
                  in the background.
                </motion.p>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              <div className="bg-[#f8f6f2] rounded-3xl p-8 w-full">
                <img
                  src="/assets/generated/airu-product-mockup.dim_1200x800.jpg"
                  alt="Airu product near AC vent"
                  className="w-full h-auto rounded-2xl"
                />
                <p className="text-center text-sm text-[#aaa] mt-4 tracking-wide">
                  Designed to work with your AC airflow
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2 — Problem */}
      <section id="problem" className="bg-[#f0ebe3] py-40">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.h2 variants={fadeUp} className="max-w-[700px] mb-3">
              <span className="text-3xl sm:text-4xl font-medium text-[#444] block mb-4 leading-[1.3]">
                You close the door.
                <br />
                Turn on the AC.
              </span>
              <span className="text-5xl sm:text-6xl font-bold text-[#111111] block leading-[1.2]">
                But the smell stays.
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base text-[#666] italic mt-3 mb-8 max-w-[700px]"
            >
              Because the air isn't being replaced — it's being reused.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-[#5c5c5c] text-lg max-w-[700px] leading-loose mb-8"
            >
              Because your room isn't getting fresh air — it's just circulating
              the same air again and again.
            </motion.p>
            <motion.div
              variants={stagger}
              className="grid sm:grid-cols-3 gap-5"
            >
              {problemCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-6 shadow-card"
                  data-ocid={`problem.item.${i + 1}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#f0ebe3] flex items-center justify-center mb-4 text-[#111111]">
                    {card.icon}
                  </div>
                  <h3 className="font-semibold text-[#111111] mb-1">
                    {card.title}
                  </h3>
                  <p className="text-[#6b6b6b] text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 3 — Insight */}
      <section className="bg-white py-40">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={fadeUp}
              className="text-sm tracking-[0.15em] uppercase text-[#999] mb-4"
            >
              The Reality
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#111111] mb-4 leading-tight"
            >
              Your AC Was Never
              <br />
              Designed to Remove Odor.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-2xl text-[#444] mb-10 font-medium"
            >
              It only circulates air.
            </motion.p>
            <motion.ul variants={stagger} className="space-y-3">
              {["Cooking smell stays", "Smoke lingers", "Room feels heavy"].map(
                (item, i) => (
                  <motion.li
                    key={item}
                    variants={fadeUp}
                    className="flex items-center gap-3 text-lg text-[#5c5c5c]"
                    data-ocid={`insight.item.${i + 1}`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                    {item}
                  </motion.li>
                ),
              )}
            </motion.ul>
            <motion.p
              variants={fadeUp}
              className="text-[#888] text-base mt-8 leading-relaxed italic max-w-[700px]"
            >
              Most people don't realize this — but ACs don't bring in fresh air.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Section 4 — Solution */}
      <section id="solution" className="bg-[#f0ebe3] py-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.h2
                variants={fadeUp}
                className="text-4xl sm:text-5xl font-semibold text-[#111111] mb-6 leading-tight max-w-[700px]"
              >
                So we built something that works with your AC — not against it.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-[#111111] text-xl font-semibold leading-relaxed mb-6 max-w-[700px]"
              >
                No filters. No bulky machines. Just smarter airflow.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-[#6b6b6b] text-base italic leading-relaxed mb-2"
              >
                Just attach it once. It works automatically.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[#aaa] text-sm mt-4">
                Built after observing real problems in closed AC rooms.
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
              <div className="w-full">
                <button
                  type="button"
                  className="relative rounded-3xl overflow-hidden bg-[#111] aspect-video shadow-2xl cursor-pointer group w-full"
                  onClick={() => alert("Coming soon — stay tuned!")}
                  data-ocid="solution.canvas_target"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                      <svg
                        viewBox="0 0 24 24"
                        fill="white"
                        className="w-6 h-6 translate-x-0.5"
                        aria-hidden="true"
                      >
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </div>
                    <p className="text-white/70 text-sm font-medium tracking-wide">
                      See how Airu works in real conditions
                    </p>
                  </div>
                </button>
                <p className="text-center text-sm text-[#888] mt-4">
                  Designed to work with your AC airflow
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 5 — How It Works */}
      <section id="how-it-works" className="bg-white py-40">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={fadeUp}
              className="text-sm tracking-[0.15em] uppercase text-[#999] mb-4"
            >
              How It Works
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-semibold text-[#111111] mb-12"
            >
              Simple. Effective. Invisible.
            </motion.h2>
            <motion.div
              variants={stagger}
              className="grid sm:grid-cols-3 gap-8 mb-10"
            >
              {howItWorksSteps.map((s, i) => (
                <motion.div
                  key={s.step}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative bg-[#fafafa] rounded-2xl p-6 border border-[#f0f0f0]"
                  data-ocid={`howto.item.${i + 1}`}
                >
                  {i < 2 && (
                    <div className="hidden sm:block absolute top-5 left-full w-8 z-10">
                      <ChevronRight className="w-5 h-5 text-[#ccc] -translate-x-2" />
                    </div>
                  )}
                  <div className="font-display text-5xl font-bold text-[#f0ebe3] mb-3">
                    {s.step}
                  </div>
                  <h3 className="text-xl font-semibold text-[#111111] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-[#6b6b6b] text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            <motion.p variants={fadeUp} className="text-[#888] text-sm">
              No noise. No maintenance. No effort.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* How It Feels Section */}
      <section className="bg-white py-40 border-t border-[#f0f0f0]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={fadeUp}
              className="text-sm tracking-[0.15em] uppercase text-[#999] mb-4"
            >
              The Experience
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-semibold text-[#111111] mb-14"
            >
              What changes after using Airu
            </motion.h2>
            <motion.div
              variants={stagger}
              className="grid sm:grid-cols-3 gap-6"
            >
              {howItFeelsCards.map((card, i) => (
                <motion.div
                  key={card.num}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-[#f8f6f2] rounded-2xl p-8"
                  data-ocid={`feels.item.${i + 1}`}
                >
                  <div className="text-6xl font-bold text-[#ede8e0] mb-5 leading-none">
                    {card.num}
                  </div>
                  <h3 className="text-lg font-semibold text-[#111111] mb-3 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-[#6b6b6b] text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 6 — Benefits */}
      <section className="bg-[#f0ebe3] py-40">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-semibold text-[#111111] mb-12"
            >
              Designed for Everyday Use
            </motion.h2>
            <motion.div
              variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  variants={fadeUp}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4"
                  data-ocid={`benefits.item.${i + 1}`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[#111111] text-sm font-medium leading-snug">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Booster — Designed for Real Indian Homes */}
      <section className="bg-white py-40">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-[700px]"
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-semibold text-[#111111] mb-6 leading-tight"
            >
              Designed for Real Indian Homes
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[#5c5c5c] text-lg leading-loose"
            >
              Works in bedrooms, rented flats, and closed AC rooms where airflow
              is limited and odor builds up easily.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Section 7 — Education */}
      <section className="bg-[#f0ebe3] py-40">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-[700px]"
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-semibold text-[#111111] mb-6"
            >
              A Better Way to Fix Room Smell
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[#5c5c5c] text-lg leading-loose"
            >
              Closed rooms trap odor from cooking, smoke, and daily living.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-[#5c5c5c] text-lg leading-loose mt-4"
            >
              Instead of adding bulky machines, this solution works with airflow
              already present — making your room feel fresher over time.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Section 8 — Social Proof / Testimonials */}
      <section className="bg-white py-40">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={fadeUp}
              className="text-sm tracking-[0.15em] uppercase text-[#999] mb-4"
            >
              Early Feedback
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-semibold text-[#111111] mb-12"
            >
              What Early Testers Are Saying
            </motion.h2>
            <motion.div
              variants={stagger}
              className="grid sm:grid-cols-3 gap-5"
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  variants={fadeUp}
                  className="bg-[#f0ebe3] rounded-2xl p-6 shadow-card"
                  data-ocid={`testimonials.item.${i + 1}`}
                >
                  <p className="text-[#333] text-base leading-relaxed mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="text-sm text-[#888]">
                    <span className="font-medium text-[#5c5c5c]">{t.name}</span>{" "}
                    · {t.city}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.p variants={fadeUp} className="text-[#aaa] text-sm mt-8">
              From early testers and prototype users.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Trust Section — Built for real Indian homes */}
      <section className="bg-[#f0ebe3] py-40">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-[700px]"
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-semibold text-[#111111] mb-10 leading-tight"
            >
              Built for real Indian homes
            </motion.h2>
            <motion.div variants={stagger} className="space-y-6">
              {[
                "Designed for closed AC rooms",
                "Tested in real flats and bedrooms",
                "Made for Indian climate and lifestyle",
              ].map((point, i) => (
                <motion.div
                  key={point}
                  variants={fadeUp}
                  className="flex items-center gap-4"
                  data-ocid={`trust.item.${i + 1}`}
                >
                  <div className="w-7 h-7 rounded-full bg-[#111111] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[#111111] text-lg font-medium">
                    {point}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Follow the Journey — Social Section */}
      <section className="bg-[#f8f6f2] py-40">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={fadeUp}
              className="text-sm tracking-[0.15em] uppercase text-[#999] mb-4"
            >
              Building in public
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-semibold text-[#111111] mb-4"
            >
              Follow the Journey
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[#6b6b6b] text-lg leading-relaxed mb-14 max-w-[600px]"
            >
              We're documenting the journey — from problem to product.
            </motion.p>
            <motion.div
              variants={stagger}
              className="grid sm:grid-cols-2 gap-6 max-w-3xl"
            >
              <motion.div
                variants={fadeUp}
                className="bg-white rounded-3xl p-8"
                data-ocid="social.item.1"
              >
                <p className="text-xs tracking-[0.15em] uppercase text-[#999] mb-3">
                  Instagram
                </p>
                <h3 className="text-xl font-semibold text-[#111111] mb-3">
                  @breathefreshair.india
                </h3>
                <p className="text-[#6b6b6b] text-sm leading-relaxed mb-8">
                  Daily insights on closed room air, real problems, and updates.
                </p>
                <a
                  href="https://instagram.com/breathefreshair.india"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-[#111111] text-[#111111] text-xs font-medium px-6 py-2.5 hover:bg-[#111111] hover:text-white transition-all duration-200"
                  data-ocid="social.link"
                >
                  Follow on Instagram
                </a>
              </motion.div>
              <motion.div
                variants={fadeUp}
                className="bg-white rounded-3xl p-8"
                data-ocid="social.item.2"
              >
                <p className="text-xs tracking-[0.15em] uppercase text-[#999] mb-3">
                  YouTube
                </p>
                <h3 className="text-xl font-semibold text-[#111111] mb-3">
                  @BreatheFreshAir
                </h3>
                <p className="text-[#6b6b6b] text-sm leading-relaxed mb-8">
                  Deep dives, experiments, and real testing videos.
                </p>
                <a
                  href="https://youtube.com/@BreatheFreshAir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-[#111111] text-[#111111] text-xs font-medium px-6 py-2.5 hover:bg-[#111111] hover:text-white transition-all duration-200"
                  data-ocid="social.link"
                >
                  Watch on YouTube
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 9 — Pre-Launch Offer */}
      <section className="bg-[#f0ebe3] py-40">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-[700px]"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block mb-4 px-3 py-1 rounded-full bg-white text-[#5c5c5c] text-xs font-medium tracking-wide"
            >
              Pre-Launch
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-semibold text-[#111111] mb-4"
            >
              Launching Soon
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[#5c5c5c] text-lg leading-loose mb-4"
            >
              Expected price:{" "}
              <span className="font-bold text-[#111111]">₹1,599</span>
              <br />
              Reserve early to get priority access when we launch.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[#888] text-sm">
              Limited first batch. No payment required.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[#888] text-sm mt-1">
              Tested in real Indian homes • Designed for closed AC rooms
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-[#6b6b6b] text-base mt-3"
            >
              Launching with a limited first batch to test real demand.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[#888] text-sm mt-2">
              Manufacturing begins after first batch confirmation.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-[#111111] text-sm font-medium mt-3 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#111] inline-block" />
              Spots filling fast
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Section 10 — Final CTA */}
      <section className="bg-[#111111] py-40">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={fadeUp}
              className="text-sm tracking-[0.2em] uppercase text-white/40 mb-4"
            >
              Limited Access
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl mx-auto"
            >
              Don't get used to bad air.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/60 text-xl mb-10 max-w-xl mx-auto"
            >
              Fix it before it becomes normal.
            </motion.p>
            <motion.div variants={fadeUp} className="flex justify-center mb-4">
              <button
                onClick={() => setModalOpen(true)}
                type="button"
                className="rounded-full bg-white text-[#111111] px-10 py-4 text-base font-medium hover:bg-white/90 transition-colors"
                data-ocid="cta.primary_button"
              >
                Reserve My Unit
              </button>
            </motion.div>
            <motion.p variants={fadeUp} className="text-white/40 text-sm">
              Limited first batch • No upfront payment
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Section 11 — FAQ */}
      <section id="faq" className="bg-white py-40">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-semibold text-[#111111] mb-12"
            >
              FAQ
            </motion.h2>
            <motion.div variants={fadeUp}>
              <Accordion
                type="single"
                collapsible
                className="space-y-2"
                data-ocid="faq.panel"
              >
                <AccordionItem
                  value="q1"
                  className="border border-[#eee] rounded-2xl px-6"
                >
                  <AccordionTrigger className="text-[#111111] font-medium hover:no-underline py-5">
                    Does it completely remove smell?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#666] pb-5 leading-loose">
                    It helps reduce odor buildup significantly over time.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="q2"
                  className="border border-[#eee] rounded-2xl px-6"
                >
                  <AccordionTrigger className="text-[#111111] font-medium hover:no-underline py-5">
                    Is this like an air purifier?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#666] pb-5 leading-loose">
                    No — it's a simpler, more affordable solution that works
                    with your AC.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="q3"
                  className="border border-[#eee] rounded-2xl px-6"
                >
                  <AccordionTrigger className="text-[#111111] font-medium hover:no-underline py-5">
                    When will it launch?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#666] pb-5 leading-loose">
                    Expected within 30–45 days after preorders.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="q4"
                  className="border border-[#eee] rounded-2xl px-6"
                >
                  <AccordionTrigger className="text-[#111111] font-medium hover:no-underline py-5">
                    Do I need to install anything?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#666] pb-5 leading-loose">
                    No — just place it near your AC vent. No tools required.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111111] py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-3 text-center">
          <p className="font-display text-white text-xl font-semibold tracking-tight">
            Airu
          </p>
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Airu. Built for modern Indian homes.
          </p>
          <a
            href="mailto:airu.product@gmail.com"
            className="text-white/40 text-sm hover:text-white/70 transition-colors"
          >
            airu.product@gmail.com
          </a>
          <p className="text-white/40 text-sm mt-4">Follow us:</p>
          <div className="flex gap-6">
            <a
              href="https://instagram.com/breathefreshair.india"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 text-sm hover:text-white/70 transition-colors"
              data-ocid="footer.link"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com/@BreatheFreshAir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 text-sm hover:text-white/70 transition-colors"
              data-ocid="footer.link"
            >
              YouTube
            </a>
          </div>
          <p className="text-white/20 text-xs mt-4">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/40 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      {/* Sticky Bottom CTA Bar */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#111111] border-t border-white/10 py-4 px-6 flex items-center justify-between">
          <p className="text-white/70 text-sm hidden sm:block">
            Limited first batch available
          </p>
          <p className="text-white/70 text-sm sm:hidden">
            ⚡ Limited first batch
          </p>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="rounded-full bg-white text-[#111111] px-6 py-2.5 text-sm font-medium hover:bg-white/90 active:scale-95 transition-all"
            data-ocid="sticky.primary_button"
          >
            Reserve My Unit
          </button>
        </div>
      )}
    </div>
  );
}
