# LumaAir — Landing Page Copy Update

## Current State

Full landing page exists at `src/frontend/src/pages/LandingPage.tsx`. All backend logic, admin panel, blog, form structure, API integrations, and visual layout are intact and must remain unchanged. The page has the following sections:

- Navbar (CTA: "Reserve Your LumaAir")
- Hero (headline: "Your AC doesn't remove odor. LumaAir does.")
- Hero Image ("Designed for closed AC rooms")
- Product Section ("Meet LumaAir Odor Neutralizer", bullets: No electricity, No fragrance, No filters)
- Problem ("Your room feels closed. Because it is." + 3 visual cards)
- Cinematic Section (correct copy — keep as-is)
- Insight Section ("Your AC keeps recycling the same air.")
- Solution ("A better way to fix room odor")
- How It Works (steps 01/02/03 with short labels)
- Lifestyle + Additional Lifestyle + Video
- Benefits ("Designed for everyday use", 5 items)
- Indian Homes section
- Emotional section (keep as-is)
- Experience section (keep as-is)
- Trust ("Built for real life")
- Testimonials with dynamic reviews + fallback hardcoded reviews + submission form
- Social section
- Pre-Order section ("Launching Soon", ₹1,599, 3 bullet points)
- Final CTA ("Don't get used to bad air.")
- FAQ
- Footer
- Sticky CTA bar

## Requested Changes (Diff)

### Add
- Offer strip in Hero: ₹2,699 → ₹1,799 (Launch Offer), Free extra carbon cartridge, Save on replacements for 1 year, Limited to first 500 users
- New **Cartridge Section** (after Testimonials, before Pre-Order/Urgency): heading, copy, and 3 bullet details
- Third fallback review added to FALLBACK_REVIEWS array

### Modify
- **Navbar CTA**: "Reserve your spot (Free)"
- **Hero headline**: Three-line split → "Turn your AC" / "into an odor-eliminating" / "system" (with amber accent on last line or suitable split)
- **Hero subheadline**: "No sprays. No chemicals. Just clean air using your AC airflow."
- **Hero CTA button**: "Reserve your spot (Free)"
- **Hero subtext**: "No payment required • Early access only"
- **Problem section heading**: "Your AC doesn't remove odor. It spreads it."
- **Problem section copy**: Add explanatory paragraph below the heading: "Every time your AC runs, it circulates the same air again and again. That means cooking smell, smoke, and indoor odor stay trapped inside your room. Sprays don't solve it. They just mask it. What you actually need is to remove odor from the airflow itself."
- **Product section heading**: "Meet LumaAir" (was "Meet LumaAir Odor Neutralizer")
- **Product section subtext**: "LumaAir works with your AC to filter air before it reaches you."
- **Solution section heading**: "Meet LumaAir" → update to use the activated carbon explanation copy
- **Solution section copy**: "LumaAir works with your AC to filter air before it reaches you. Using activated carbon, it traps odor particles and delivers cleaner, fresher air—without adding any fragrance or chemicals. Think of it like a water filter, but for air."
- **How It Works heading**: keep "How it works"
- **How It Works steps** (text inside existing cards):
  - Step 01: "Attach near your AC vent" + sub: "Easily mount LumaAir where air flows out."
  - Step 02: "Air passes through activated carbon" + sub: "The filter captures odor particles from the airflow."
  - Step 03: "Clean air enters your room" + sub: "You breathe fresher, odor-free air every day."
- **Benefits heading**: "Why people love LumaAir" (was "Designed for everyday use")
- **Benefits items**: "Eliminates odor, doesn't mask it", "No chemicals or artificial fragrance", "Works with your existing AC", "No electricity required", "Easy to install and maintain"
- **Video section heading**: Add heading "See it in action" above the placeholder
- **Video section copy**: "Real results. No masking. LumaAir actively traps odor from the air—so your room actually feels fresh, not artificially scented."
- **Trust heading**: "Built for everyday use" (was "Built for real life")
- **Trust items**: "Safe for daily use", "No harmful chemicals", "Designed for Indian homes", "Works in bedrooms, kitchens, and offices"
- **Testimonials heading**: "Early users say" (was "What early users say")
- **Fallback reviews**: Update messages to match provided testimonials + add third review
- **Pre-Order section heading**: "Launch offer (First 500 users)"
- **Pre-Order pricing**: MRP ₹2,699, Today ₹1,799 (remove old ₹1,599)
- **Pre-Order bullet points**: "Free extra carbon cartridge", "Save on replacements for 1 year", "Limited first batch access"
- **Pre-Order CTA**: "Reserve your spot (Free)"
- **Final CTA heading**: "Don't get used to bad air" (same, minor: remove trailing period)
- **Final CTA subheading**: "Fix it before it becomes normal" (keep)
- **Final CTA button**: "Reserve your spot (Free)"
- **Final CTA subtext**: "No payment required • Limited early access"
- **Sticky bar label**: "Limited early access · First 500 units"
- **Sticky bar CTA**: "Reserve your spot (Free)"

### Remove
- No sections removed

## Implementation Plan

1. Update all CTA button text from "Reserve Your LumaAir" to "Reserve your spot (Free)" throughout LandingPage.tsx — includes navbar, hero, pre-order, final CTA, sticky bar
2. Update Hero headline, subheadline, and add offer strip (₹2,699 → ₹1,799 row with the 4 benefit points)
3. Update Problem section heading + add explanatory copy paragraph before the visual cards
4. Update Product section heading and subtext
5. Update Solution section heading and copy (activated carbon explanation + water filter analogy)
6. Update How It Works step text (all 3 steps) — add sub-line to each step card
7. Update Benefits heading and replace the 5 benefit items
8. Add "See it in action" heading + copy above the video placeholder in the Video section
9. Update Trust heading and items
10. Update Testimonials section heading; update FALLBACK_REVIEWS messages; add third fallback review
11. Add Cartridge section after TestimonialsSection, before Pre-Order section
12. Update Pre-Order section: heading, MRP/price, bullet points, CTA
13. Update Final CTA subtext
14. Update Sticky bar label text
