import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "motion/react";
import type { BlogPost } from "../backend";
import { useListPosts } from "../hooks/useQueries";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const SEED_POSTS: BlogPost[] = [
  {
    id: BigInt(1),
    title: "Why Your AC Room Smells Bad (And How to Fix It)",
    description:
      "Closed rooms with running ACs develop that stale, musty smell for a specific reason. Here's the science and what you can do.",
    publishDate: "2026-03-01",
    createdAt: BigInt(0),
    content:
      "Have you ever walked into a room that has the AC running all day and noticed a stale, musty smell?\n\nYou're not imagining it. It's a real problem — and it has a simple explanation.\n\n**The AC does not bring in fresh air.**\n\nMost people assume the AC refreshes the room by pulling in air from outside. It doesn't. It recycles the same air inside the room, over and over.\n\nSo if there's any source of smell — a mattress, clothes, food particles, human breath — the AC picks it up and keeps circulating it.\n\n**Why does the smell get trapped?**\n\nIn a closed AC room, there's no path for stale air to exit. The room becomes airtight. Odor molecules accumulate. After a few hours, the smell becomes noticeable.\n\n**Common sources of closed room smell:**\n- Body odor from sleep or exercise\n- Fabric smell from mattresses and pillows\n- Food traces near the room\n- Pet presence\n- Dusty AC filters\n\n**How to fix it:**\n\n1. Open windows during off-AC periods to flush out stale air.\n2. Clean your AC filters every 2–3 months.\n3. Use AEROVAIX Odor Shield near your AC vent to neutralize odor using natural adsorption.\n\nSimple. No complex installation. Just place it near your AC vent.",
  },
  {
    id: BigInt(2),
    title: "Closed Room Air Problems in Indian Homes",
    description:
      "Indian homes spend 6-10 hours in closed AC rooms daily. Here's what happens to the air inside — and why it matters.",
    publishDate: "2026-03-05",
    createdAt: BigInt(0),
    content:
      "In most Indian cities, summer means spending long hours in closed, air-conditioned rooms.\n\nBedrooms, offices, study rooms — all sealed, all cooled.\n\nBut nobody talks about what happens to the air quality inside.\n\n**The Indian home context:**\n\nIndian households often have multiple people in small rooms. Cooking smells from nearby kitchens seep in. Humidity is high. Ventilation is poor by design — because we want the cooling to stay in.\n\nThis creates a perfect storm for poor indoor air quality.\n\n**What happens inside a sealed room:**\n\nWhen a room is sealed:\n- CO2 levels gradually rise\n- Humidity gets trapped (especially in monsoon)\n- Odor molecules from fabrics, bodies, and food accumulate\n- Without any airflow exchange, it stagnates\n\n**Why this is worse in India:**\n\n- Higher ambient humidity means more moisture getting trapped\n- Spice-heavy cooking creates stronger lingering odors\n- Extended AC usage (8–12 hours/day in summer) means longer periods of sealed rooms\n\n**The solution:**\n\nThe first step is awareness — understanding that your AC is not ventilating the room.\n\nThe next step is to neutralize odor at the source.\n\nThat's the problem AEROVAIX Odor Shield is built to solve.\n\nNo filters. No purifiers. Just natural adsorption working with the airflow you already have.",
  },
  {
    id: BigInt(3),
    title: "AC vs Air Purifier: What Actually Works?",
    description:
      "Most people think an air purifier will fix their room smell. Here's the honest comparison — and what actually helps.",
    publishDate: "2026-03-10",
    createdAt: BigInt(0),
    content:
      "A lot of people buy air purifiers expecting them to fix the 'AC room smell.'\n\nSome notice improvement. Many are disappointed.\n\nHere's an honest look at what each device does.\n\n**What an AC does:**\n- Cools the air\n- Recirculates the same room air\n- Does NOT bring in fresh outdoor air\n- Does NOT remove odors (unless it has a special filter)\n\n**What an air purifier does:**\n- Filters airborne particles (dust, pollen, PM2.5)\n- Some models reduce VOCs and odors using activated carbon filters\n- Requires clean filters regularly\n- Works best in the immediate area near the unit\n\n**The gap:**\n\nNeither device solves the core problem: stale, recirculated air in a sealed room.\n\nAn air purifier can clean particles. But if the same stale air keeps cycling, the smell remains.\n\n**What actually works for closed room smell:**\n\n1. Improved air circulation patterns inside the room\n2. Periodic ventilation (open windows when AC is off)\n3. Clean AC filters\n4. A passive odor neutralizer\n\nAEROVAIX Odor Shield approaches the problem differently — using natural adsorption to neutralize odor as air flows through it, without adding another filter to maintain or another machine to manage.\n\nSimple. Minimal. Designed for everyday use.",
  },
  {
    id: BigInt(4),
    title: "How to Improve Air Quality in Bedrooms",
    description:
      "Simple, practical steps to make your bedroom air feel fresher — especially if you sleep with the AC on.",
    publishDate: "2026-03-15",
    createdAt: BigInt(0),
    content:
      "If you wake up with a stuffy feeling or your room has that stale AC smell by morning, your bedroom air quality likely needs attention.\n\nHere are practical steps that actually help.\n\n**1. Ventilate before you sleep**\n\nOpen your windows for 10–15 minutes before turning on the AC. This replaces stale indoor air with fresh outdoor air before you seal the room.\n\n**2. Clean your AC filter monthly**\n\nDirty filters are the #1 cause of musty AC smell. A clean filter doesn't just smell better — it improves cooling efficiency too.\n\n**3. Reduce fabric clutter**\n\nMattresses, curtains, carpets, and pillows absorb and release odors over time. Wash them regularly and air them in sunlight when possible.\n\n**4. Keep humidity in check**\n\nHigh indoor humidity leads to mold and musty smells. If you live in a humid area, consider whether your AC has a dry mode — use it during monsoon.\n\n**5. Avoid eating in the bedroom**\n\nFood smells linger in sealed rooms for hours. Keep the bedroom a food-free zone.\n\n**6. Neutralize odor at the source**\n\nACs often spread odor throughout the room. Using a passive odor neutralizer near your AC vent ensures odor molecules are captured before they circulate.\n\nThis is the core idea behind AEROVAIX Odor Shield — a compact module that uses natural adsorption to neutralize odor as your AC runs.",
  },
  {
    id: BigInt(5),
    title: "Why Room Smell Gets Worse at Night",
    description:
      "Ever notice the stale smell is strongest in the morning? Here's why — and what you can do about it.",
    publishDate: "2026-03-20",
    createdAt: BigInt(0),
    content:
      "You go to sleep in a fresh room. You wake up and it smells stale.\n\nWhy?\n\n**What happens overnight in a closed AC room:**\n\nDuring sleep, you:\n- Breathe out CO2 for 7–8 hours\n- Release body heat and moisture\n- Shed skin cells (which accumulate on bedding)\n- Stay in one position, creating a concentrated odor zone near your pillow and mattress\n\nAnd throughout all of this, the AC keeps recirculating the same air.\n\nBy morning, that air has been through the cycle dozens of times. The odor molecules are concentrated. The CO2 level is elevated. The room feels heavy.\n\n**Why it feels worse than during the day:**\n\nDuring the day, you move around, open the door, maybe open a window briefly. The room gets some air exchange.\n\nAt night, none of that happens. The room is sealed for 7–9 hours straight.\n\n**What you can do:**\n\n1. Air the room out immediately after waking — open the window for even 5 minutes.\n2. Use a breathable mattress cover to reduce moisture absorption.\n3. Place AEROVAIX Odor Shield near your AC vent at night — its natural adsorption material works continuously to neutralize odor as you sleep.\n\nNo filters. No noise. Just works in the background.",
  },
];

function readTime(content: string) {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article variants={fadeUp}>
      <Link
        to="/blog/$postId"
        params={{ postId: post.id.toString() }}
        className="block group bg-white rounded-2xl border border-[#eee] p-8 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
        data-ocid={`blog.item.${index + 1}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs text-[#aaa] tracking-wide">
            {formatDate(post.publishDate)}
          </span>
          <span className="text-[#ddd]">&bull;</span>
          <span className="flex items-center gap-1 text-xs text-[#aaa]">
            <Clock className="w-3 h-3" />
            {readTime(post.content)} min read
          </span>
        </div>
        <h2 className="text-xl font-semibold text-[#111111] mb-3 group-hover:text-[#333] transition-colors leading-snug">
          {post.title}
        </h2>
        <p className="text-[#666] text-sm leading-relaxed mb-5">
          {post.description}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm text-[#111111] font-medium group-hover:gap-2.5 transition-all">
          Read more <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
    </motion.article>
  );
}

export function BlogListPage() {
  const { data: backendPosts = [], isLoading } = useListPosts();
  const posts = backendPosts.length > 0 ? backendPosts : SEED_POSTS;

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal nav */}
      <header className="border-b border-[#eee] bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <a
            href="/"
            className="font-semibold text-[#111111] tracking-wide"
            data-ocid="nav.link"
          >
            AEROVAIX
          </a>
          <a
            href="/"
            className="text-sm text-[#666] hover:text-[#111] transition-colors"
            data-ocid="nav.link"
          >
            &larr; Back to Home
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-20">
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="mb-16">
            <p className="text-xs tracking-[0.2em] uppercase text-[#aaa] mb-4">
              Insights
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#111111] mb-4 leading-tight">
              Blog
            </h1>
            <p className="text-[#666] text-lg">
              Understanding indoor air — one read at a time.
            </p>
          </motion.div>

          {isLoading ? (
            <motion.div
              variants={fadeUp}
              className="py-20 text-center text-[#aaa]"
              data-ocid="blog.loading_state"
            >
              Loading posts...
            </motion.div>
          ) : (
            <motion.div
              variants={stagger}
              className="space-y-4"
              data-ocid="blog.list"
            >
              {posts.map((post, i) => (
                <PostCard key={post.id.toString()} post={post} index={i} />
              ))}
            </motion.div>
          )}

          {/* CTA card */}
          <motion.div
            variants={fadeUp}
            className="mt-16 rounded-3xl bg-[#111111] p-10 text-center"
            data-ocid="blog.card"
          >
            <p className="text-white/50 text-sm mb-3 tracking-wide">
              Ready to breathe better?
            </p>
            <h3 className="text-white text-2xl font-semibold mb-6">
              Reserve your spot (Free)
            </h3>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white text-[#111111] px-8 py-3 text-sm font-semibold hover:bg-white/90 hover:scale-[1.02] transition-all duration-200"
              data-ocid="blog.primary_button"
            >
              Reserve your spot (Free) <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </main>

      <footer className="border-t border-[#eee] py-8 mt-8">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between">
          <p className="text-sm text-[#aaa]">
            AEROVAIX &copy; {new Date().getFullYear()}
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#ccc] hover:text-[#999] transition-colors"
          >
            Built with caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
