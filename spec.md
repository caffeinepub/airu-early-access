# AEROVAIX Landing Page Rebrand & Content Update

## Current State

The landing page (`src/frontend/src/pages/LandingPage.tsx`) is a 1404-line premium, mobile-first conversion page for "LumaAir" — an AC-mounted odor neutralizer. It includes:

- Navbar with "LumaAir" branding and CTA
- Hero section with AI-generated product render, floating animation, amber glow
- Product Section (after Hero) — large centered product image, close-up detail, beige background
- Problem section with premium gradient cards
- Solution section ("Meet LumaAir")
- How It Works (3 visual steps)
- Benefits Grid
- Indian Homes split section
- Video placeholder section
- Cinematic section ("The same air keeps circulating. So does the smell.")
- Emotional section ("You spend 8–10 hours in your room...")
- Experience section ("What you'll notice after using LumaAir")
- Trust section ("Built for real life")
- Testimonials (dynamic from backend, with fallback hardcoded reviews)
- Social Proof section (Instagram @lumaair.in, YouTube: LumaAir, Email: hello@lumaair.in)
- Pre-order/Launch section with urgency
- Final CTA section
- FAQ section
- Blog section (backend-powered)
- Footer with "LumaAir" branding
- Sticky bottom CTA bar
- WaitlistModal (pre-order form — DO NOT MODIFY)

Blog pages (`BlogListPage.tsx`, `BlogDetailPage.tsx`) show "LumaAir" in header/branding.
`index.html` has meta title "LumaAir — Fresh Air for Closed AC Rooms".
Admin panel (`AdminPage.tsx`) — DO NOT TOUCH.

## Requested Changes (Diff)

### Add
- **Transparency Section** (new section between Benefits and Demo/Proof sections):
  - Heading: "What this product does"
  - Copy: "AEROVAIX Odor Shield is designed to remove odor from indoor air. It does not remove dust, PM2.5, or allergens. This ensures clear expectations and consistent performance."
  - Style: clean, premium, trust-focused (white or light background, centered or left-aligned)

### Modify
- **Brand name** — Replace ALL user-visible "LumaAir" with "AEROVAIX" (navbar, footer, hero, all section copy, blog header/logo display, meta title in index.html, page titles)
- **Meta title** (`index.html`) → "AEROVAIX — Fresh Air for Closed AC Rooms"
- **Hero section**: New headline, subheadline, offer strip, CTA, subtext (per copy below)
- **Problem section**: New heading and copy
- **Solution section**: New heading ("Meet AEROVAIX Odor Shield") and copy
- **How It Works**: New heading and 3-step labels
- **Benefits section**: New heading ("Why choose AEROVAIX") and 5 bullet points
- **Demo/Proof section**: New heading ("See the difference") and copy — keep existing video/image placeholders
- **Pricing/Launch section**: New heading, copy, and CTA
- **Trust section**: New heading ("Built for everyday use") and 4 bullet points
- **Testimonials section heading**: "Early users say" (3 concise fallback testimonials updated)
- **Cartridge/Maintenance section**: New heading and copy (replace every 2–3 months)
- **Urgency section**: New heading ("Limited early access") and copy (500 units, first batch)
- **Final CTA section**: New heading, subheading, CTA, subtext
- **Cinematic section**: Update wording to align with AEROVAIX messaging (keep emotional tone, dark full-screen style)
- **Emotional section**: Slightly simplify language — keep human, not dramatic
- **Indian Homes section**: Update branding references from LumaAir to AEROVAIX
- **Experience section**: Evaluate — if clear, keep and update branding; if confusing/vague, simplify
- **Social Proof section**: Update handles from @lumaair.in to @aerovaix.in where shown as display text, update email to hello@aerovaix.in
- **FAQ section**: Update answers to clarify: odor-only (not dust/PM2.5/allergens), cartridge replacement info, installation steps, safety
- **Blog branding**: Blog list/detail pages — update displayed brand name from "LumaAir" to "AEROVAIX"
- **Footer**: Brand name → "AEROVAIX", tagline, contact email → hello@aerovaix.in, social handles → @aerovaix.in
- **Sticky CTA bar**: Update text if it references LumaAir
- **WaitlistModal title/copy**: Update brand name references only (DO NOT change form fields, submission logic, or integrations)

### Remove
- Nothing removed. All sections kept.

## Implementation Plan

1. Update `src/frontend/index.html` — meta title, description tags to AEROVAIX
2. Update `src/frontend/src/pages/LandingPage.tsx`:
   a. Global text replace: "LumaAir" → "AEROVAIX" (all user-visible strings)
   b. Update hero copy (headline, subheadline, offer strip, CTA, subtext)
   c. Update problem section copy
   d. Update solution section copy
   e. Update how it works step labels
   f. Update benefits heading + bullet points
   g. INSERT new Transparency section between Benefits and Demo/Proof
   h. Update demo/proof section heading + copy
   i. Update pricing/launch section copy
   j. Update trust section heading + bullet points
   k. Update testimonial section heading + 3 fallback testimonials
   l. Update cartridge section heading + copy
   m. Update urgency section heading + copy
   n. Update final CTA heading, subheading, CTA, subtext
   o. Update cinematic section text to align with AEROVAIX messaging
   p. Simplify emotional section language
   q. Update Indian Homes branding
   r. Update/simplify Experience section
   s. Update Social Proof display handles/email
   t. Update FAQ answers (odor-only, cartridge, installation)
   u. Update footer brand, email, social handles
   v. Update sticky CTA bar text
3. Update `src/frontend/src/components/WaitlistModal.tsx` — brand name display only (title, subtext), NOT form fields or logic
4. Update `src/frontend/src/pages/BlogListPage.tsx` — brand/logo display text
5. Update `src/frontend/src/pages/BlogDetailPage.tsx` — brand/logo display text
