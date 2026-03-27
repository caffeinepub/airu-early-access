import { useParams } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import { motion } from "motion/react";
import type { BlogPost } from "../backend";
import { useGetPost } from "../hooks/useQueries";

const SEED_POSTS: BlogPost[] = [
  {
    id: BigInt(1),
    title: "Why Your AC Room Smells Bad (And How to Fix It)",
    description:
      "Closed rooms with running ACs develop that stale, musty smell for a specific reason. Here's the science and what you can do.",
    publishDate: "2026-03-01",
    createdAt: BigInt(0),
    content:
      "Have you ever walked into a room that has the AC running all day and noticed a stale, musty smell?\n\nYou're not imagining it. It's a real problem — and it has a simple explanation.\n\n**The AC does not bring in fresh air.**\n\nMost people assume the AC refreshes the room by pulling in air from outside. It doesn't. It recycles the same air inside the room, over and over.\n\nSo if there's any source of smell — a mattress, clothes, food particles, human breath — the AC picks it up and keeps circulating it.\n\n**Why does the smell get trapped?**\n\nIn a closed AC room, there's no path for stale air to exit. The room becomes airtight. Odor molecules accumulate. After a few hours, the smell becomes noticeable.\n\n**Common sources of closed room smell:**\n- Body odor from sleep or exercise\n- Fabric smell from mattresses and pillows\n- Food traces near the room\n- Pet presence\n- Dusty AC filters\n\n**How to fix it:**\n\n1. Open windows during off-AC periods to flush out stale air.\n2. Clean your AC filters every 2–3 months.\n3. Use a device that helps improve air cycling — like Airu.\n\nAiru is designed to work with your existing AC airflow to reduce odor buildup in closed rooms without filters or heavy machines.\n\nSimple. No installation. Just place it near your AC vent.",
  },
  {
    id: BigInt(2),
    title: "Closed Room Air Problems in Indian Homes",
    description:
      "Indian homes spend 6-10 hours in closed AC rooms daily. Here's what happens to the air inside — and why it matters.",
    publishDate: "2026-03-05",
    createdAt: BigInt(0),
    content:
      "In most Indian cities, summer means spending long hours in closed, air-conditioned rooms.\n\nBedrooms, offices, study rooms — all sealed, all cooled.\n\nBut nobody talks about what happens to the air quality inside.\n\n**The Indian home context:**\n\nIndian households often have multiple people in small rooms. Cooking smells from nearby kitchens seep in. Humidity is high. Ventilation is poor by design — because we want the cooling to stay in.\n\nThis creates a perfect storm for poor indoor air quality.\n\n**What happens inside a sealed room:**\n\nWhen a room is sealed:\n- CO2 levels gradually rise\n- Humidity gets trapped (especially in monsoon)\n- Odor molecules from fabrics, bodies, and food accumulate\n- Without any airflow exchange, it stagnates\n\n**Why this is worse in India:**\n\n- Higher ambient humidity means more moisture getting trapped\n- Spice-heavy cooking creates stronger lingering odors\n- Extended AC usage (8–12 hours/day in summer) means longer periods of sealed rooms\n\n**The solution:**\n\nThe first step is awareness — understanding that your AC is not ventilating the room.\n\nThe next step is to improve how air moves inside the room, not just how cold it gets.\n\nThat's the problem Airu is built to solve.\n\nNo filters. No purifiers. Just smarter air movement in the room you already have.",
  },
  {
    id: BigInt(3),
    title: "AC vs Air Purifier: What Actually Works?",
    description:
      "Most people think an air purifier will fix their room smell. Here's the honest comparison — and what actually helps.",
    publishDate: "2026-03-10",
    createdAt: BigInt(0),
    content:
      "A lot of people buy air purifiers expecting them to fix the 'AC room smell.'\n\nSome notice improvement. Many are disappointed.\n\nHere's an honest look at what each device does.\n\n**What an AC does:**\n- Cools the air\n- Recirculates the same room air\n- Does NOT bring in fresh outdoor air\n- Does NOT remove odors (unless it has a special filter)\n\n**What an air purifier does:**\n- Filters airborne particles (dust, pollen, PM2.5)\n- Some models reduce VOCs and odors using activated carbon filters\n- Requires clean filters regularly\n- Works best in the immediate area near the unit\n\n**The gap:**\n\nNeither device solves the core problem: stale, recirculated air in a sealed room.\n\nAn air purifier can clean particles. But if the same stale air keeps cycling, the smell remains.\n\n**What actually works for closed room smell:**\n\n1. Improved air circulation patterns inside the room\n2. Periodic ventilation (open windows when AC is off)\n3. Clean AC filters\n4. A device that assists airflow distribution\n\nAiru approaches the problem differently — by working with your AC's existing airflow to reduce odor buildup, without adding another filter to maintain or another machine to manage.\n\nSimple. Minimal. Designed for everyday use.",
  },
  {
    id: BigInt(4),
    title: "How to Improve Air Quality in Bedrooms",
    description:
      "Simple, practical steps to make your bedroom air feel fresher — especially if you sleep with the AC on.",
    publishDate: "2026-03-15",
    createdAt: BigInt(0),
    content:
      "If you wake up with a stuffy feeling or your room has that stale AC smell by morning, your bedroom air quality likely needs attention.\n\nHere are practical steps that actually help.\n\n**1. Ventilate before you sleep**\n\nOpen your windows for 10–15 minutes before turning on the AC. This replaces stale indoor air with fresh outdoor air before you seal the room.\n\n**2. Clean your AC filter monthly**\n\nDirty filters are the #1 cause of musty AC smell. A clean filter doesn't just smell better — it improves cooling efficiency too.\n\n**3. Reduce fabric clutter**\n\nMattresses, curtains, carpets, and pillows absorb and release odors over time. Wash them regularly and air them in sunlight when possible.\n\n**4. Keep humidity in check**\n\nHigh indoor humidity leads to mold and musty smells. If you live in a humid area, consider whether your AC has a dry mode — use it during monsoon.\n\n**5. Avoid eating in the bedroom**\n\nFood smells linger in sealed rooms for hours. Keep the bedroom a food-free zone.\n\n**6. Improve air distribution**\n\nACs often cool unevenly — one corner is cold while another is stale. Improving how air moves inside the room ensures the entire space gets cycled.\n\nThis is the core idea behind Airu — a small add-on module that helps your AC distribute air more effectively, reducing odor buildup without any filters or heavy maintenance.\n\nJoin the early access waitlist to be first to know when we launch.",
  },
  {
    id: BigInt(5),
    title: "Why Room Smell Gets Worse at Night",
    description:
      "Ever notice the stale smell is strongest in the morning? Here's why — and what you can do about it.",
    publishDate: "2026-03-20",
    createdAt: BigInt(0),
    content:
      "You go to sleep in a fresh room. You wake up and it smells stale.\n\nWhy?\n\n**What happens overnight in a closed AC room:**\n\nDuring sleep, you:\n- Breathe out CO2 for 7–8 hours\n- Release body heat and moisture\n- Shed skin cells (which accumulate on bedding)\n- Stay in one position, creating a concentrated odor zone near your pillow and mattress\n\nAnd throughout all of this, the AC keeps recirculating the same air.\n\nBy morning, that air has been through the cycle dozens of times. The odor molecules are concentrated. The CO2 level is elevated. The room feels heavy.\n\n**Why it feels worse than during the day:**\n\nDuring the day, you move around, open the door, maybe open a window briefly. The room gets some air exchange.\n\nAt night, none of that happens. The room is sealed for 7–9 hours straight.\n\n**What you can do:**\n\n1. Air the room out immediately after waking — open the window for even 5 minutes.\n2. Use a breathable mattress cover to reduce moisture absorption.\n3. Improve nighttime air circulation so odors don't concentrate.\n\nAiru is designed specifically for this use case — helping air move better through your room while the AC runs at night, so you wake up to a fresher space.\n\nNo filters. No noise. Just works in the background.",
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

function renderContent(content: string) {
  const paragraphs = content.split("\n\n");
  return paragraphs.map((para) => {
    const paraKey = para.slice(0, 32);
    // Render bold (**text**)
    const parts = para.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2);
        return <strong key={boldText}>{boldText}</strong>;
      }
      return part;
    });
    // Check if it's a list
    const paraLines = para.split("\n");
    const isList = paraLines.every(
      (l) => l.startsWith("- ") || l.match(/^\d+\.\s/),
    );
    if (isList) {
      const isOrdered = paraLines[0].match(/^\d+\.\s/);
      const items = paraLines.map((l) => l.replace(/^- |^\d+\.\s/, ""));
      if (isOrdered) {
        return (
          <ol
            key={paraKey}
            className="list-decimal list-inside space-y-2 text-[#444] leading-relaxed pl-2"
          >
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        );
      }
      return (
        <ul
          key={paraKey}
          className="list-disc list-inside space-y-2 text-[#444] leading-relaxed pl-2"
        >
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={paraKey} className="text-[#444] leading-[1.9] text-lg">
        {rendered}
      </p>
    );
  });
}

export function BlogDetailPage() {
  const { postId } = useParams({ from: "/blog/$postId" });
  const id = BigInt(postId);
  const { data: backendPost, isLoading } = useGetPost(id);

  const post =
    backendPost ||
    (isLoading ? null : SEED_POSTS.find((p) => p.id === id) || null);

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="border-b border-[#eee] bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <a
            href="/"
            className="font-display font-semibold text-[#111111] tracking-tight"
            data-ocid="nav.link"
          >
            Airu
          </a>
          <a
            href="/blog"
            className="flex items-center gap-1.5 text-sm text-[#666] hover:text-[#111] transition-colors"
            data-ocid="nav.link"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </a>
        </div>
      </header>

      <main className="max-w-[700px] mx-auto px-6 py-20">
        {isLoading ? (
          <div
            className="py-20 text-center text-[#aaa]"
            data-ocid="blog.loading_state"
          >
            Loading...
          </div>
        ) : !post ? (
          <div className="py-20 text-center" data-ocid="blog.error_state">
            <p className="text-[#888] text-lg">Post not found.</p>
            <a
              href="/blog"
              className="mt-6 inline-block text-sm text-[#111] underline"
            >
              Back to Blog
            </a>
          </div>
        ) : (
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm text-[#aaa]">
                {formatDate(post.publishDate)}
              </span>
              <span className="text-[#ddd]">•</span>
              <span className="flex items-center gap-1 text-sm text-[#aaa]">
                <Clock className="w-3.5 h-3.5" />
                {readTime(post.content)} min read
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#111111] mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-[#666] leading-relaxed mb-12 pb-12 border-b border-[#eee]">
              {post.description}
            </p>
            <div className="space-y-6">{renderContent(post.content)}</div>

            {/* Inline CTA */}
            <div className="mt-20 rounded-3xl bg-[#f0ebe3] p-10 text-center">
              <p className="text-sm text-[#888] mb-2">
                Interested in better air?
              </p>
              <h3 className="text-2xl font-semibold text-[#111111] mb-6">
                Join Early Access
              </h3>
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-[#111111] text-white px-8 py-3 text-sm font-semibold hover:bg-[#333] hover:scale-[1.02] transition-all duration-200"
                data-ocid="blog.primary_button"
              >
                Reserve My Spot
              </a>
              <p className="mt-3 text-xs text-[#aaa]">No payment required</p>
            </div>
          </motion.article>
        )}
      </main>

      <footer className="border-t border-[#eee] py-8">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between">
          <p className="text-sm text-[#aaa]">
            © {new Date().getFullYear()} Airu.
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
