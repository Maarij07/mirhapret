1. Design Philosophy

This product follows a minimal, monochromatic, content-first design system inspired by:

Apple → clarity, hierarchy, restraint

Aesop → editorial spacing, premium retail feel

The goal is quiet confidence, not visual noise.

If a UI element does not improve clarity, usability, or conversion — it does not belong.

2. Color System (Strict)
Allowed Colors ONLY
Purpose	Token	Value
Primary Background	--black	#000000
Secondary Background	--white	#FFFFFF
Surface / Card	--gray-950	Tailwind
Muted Surface	--gray-900	Tailwind
Borders / Dividers	--gray-800	Tailwind
Muted Text	--gray-400	Tailwind
Primary Text	--gray-100	Tailwind

❌ No accent colors
❌ No gradients
❌ No shadows unless meaningfully required

Contrast must meet WCAG AA minimum.

3. Typography System
Font

Inter (via next/font)

No fallback font mixing

Hierarchy
Usage	Size	Weight	Notes
Display	text-4xl – 5xl	500–600	Rare, homepage only
Heading 1	text-3xl	500	Product pages
Heading 2	text-2xl	500	Section titles
Body	text-base	400	Default
Small	text-sm	400	Metadata
Micro	text-xs	400	Legal / footnotes

Line-height should feel airy, not dense.

4. Spacing & Layout
Global Rules

Use 8px spacing scale

Prefer whitespace over borders

Layout must feel breathable

Container Widths
Breakpoint	Max Width
Mobile	100%
Tablet	768px
Desktop	1200px
Wide	1440px

Never center everything by default — let content breathe.

5. Components Design Rules
Buttons

Rectangular, subtle rounding

No gradients

Clear hover & focus states

Primary = solid white on black

Secondary = outline only

Inputs

Minimal borders

Clear focus ring

Labels always visible (no placeholder-only fields)

Cards

Flat surfaces

No heavy elevation

Separation via spacing, not decoration

6. Motion & Interaction

Motion is functional, not decorative.

Allowed Motion

Fade in/out

Subtle translate (≤ 4px)

Opacity transitions

Scale ≤ 1.02 on hover

Forbidden Motion

Bouncy effects

Long easing chains

Attention-seeking animations

Use motion to:

Confirm actions

Guide focus

Reduce cognitive load

7. Product Listing & Catalog
Product Cards

Image first

Name → Price → Metadata

No badges unless critical

Hover reveals secondary image or action

Pagination

Cursor-based

Infinite scroll only when justified

Explicit pagination preferred for large catalogs

8. Imagery Guidelines

Neutral lighting

No busy backgrounds

Product must dominate frame

Consistent aspect ratio

Lazy loading mandatory

Blur placeholder required

Images should feel editorial, not marketplace-style.

9. Accessibility Standards

All UI must be:

Keyboard navigable

Screen-reader friendly

Focus-visible

Semantic HTML

Accessibility is not optional and not a later phase.

10. Content & Copy
Tone

Calm

Confident

Minimal

No marketing fluff

Rules

Short sentences

No emojis

No excessive punctuation

Clarity > cleverness

11. Do / Don’t Summary
✅ Do

Use whitespace generously

Keep UI quiet

Let products speak

Reuse patterns

Design for scale

❌ Don’t

Add features visually

Introduce colors casually

Use trendy UI patterns

Over-animate

Design for screenshots instead of users

12. Future AI / RAG Compatibility

Design must support:

Clean semantic structure

Predictable layouts

Machine-readable content

Structured metadata surfaces

The UI should remain AI-readable, not just human-friendly.

13. Design Review Checklist

Before merging any UI change:

 Matches monochrome rules

 Typography hierarchy respected

 Motion justified

 Accessible

 Scales across breakpoints

 No unnecessary decoration

If any answer is “no” → revise.

Final Note

This design system is intentionally strict.

Restrictions create:

Consistency

Speed

Quality

Brand trust

If something feels “boring”, it’s probably correct.