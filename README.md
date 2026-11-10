# AeroFill — Self-Initiated UX Case Study

**Designer:** Deepak Tiwari  
**Role:** UX Design & Front-End Prototyping  
**Scope:** Passenger journey, state model, and service concept  
**Technology:** Vanilla HTML5, CSS3, Vanilla JavaScript (zero external dependencies, zero frameworks)  
**Deployment:** Static website compatible with GitHub Pages

---

## Central Design Question

> *“How might we help price-sensitive passengers access unsold seats without undermining full-fare bookings—or sending people to the airport with false hope?”*

---

## Project Context & Truth Boundaries

This is a **recruiter-facing UX portfolio case study**, designed to clearly communicate problem framing, design decisions, trade-offs, and evidence boundaries.

- **Status:** Self-initiated design concept. Not piloted, commercialised, or affiliated with any airline or regulatory authority.
- **Evidence Framework:**
  - **Public-Source Data:** General industry benchmarks regarding domestic aircraft capacity.
  - **Illustrative Scenario:** Passenger scenarios (e.g., Ananya) are illustrative narratives demonstrating conflicting requirements, not real participants.
  - **Design Hypotheses:** Proposed interface states, upfront restriction visibility, and assisted review paths.
  - **Prototype Simulation:** Purely client-side prototype demonstrating proposed state transitions without live APIs, payment processing, or ticket issuance.
  - **Modelled Estimates:** Simplified two-variable contribution formulas labeled as illustrative calculations, not verified commercial returns.

For a full breakdown of unverified claims audited and removed from earlier drafts, see [`content-review.md`](./content-review.md).

---

## File Structure

```text
├── index.html            # Semantic case-study markup
├── css/
│   └── styles.css        # Restrained editorial CSS tokens, layout & prototype styling
├── js/
│   ├── main.js           # Core case-study interactions, disclosures & navigation
│   └── prototype.js      # Explicit state-machine for interactive standby prototype
├── assets/               # Local imagery and design documentation
├── content-review.md     # Audit log of claims, assumptions, and evidence boundaries
└── README.md             # Project documentation and local preview instructions
```

---

## Local Preview

Because this project uses standard vanilla web technologies with no build steps, bundlers, or package managers, it can be viewed directly in any modern browser:

### Option 1: Direct File Opening
Double-click `index.html` or open it directly in your browser:
```bash
open index.html
```

### Option 2: Local Static Server (Recommended)
Using Python's built-in HTTP server:
```bash
python3 -m http.server 8000
```
Then navigate to: `http://localhost:8000`

---

## Accessibility & Design Standards

- **Typography:** Refined editorial serif for titles paired with neutral system sans-serif for body copy. Max line length constrained to 65–70 characters for optimal legibility.
- **Color Palette:** Warm paper background (`#F7F5F0`), deep ink (`#202725`), muted slate (`#59615D`), and high-contrast status tokens with text and shape indicators alongside color.
- **WCAG Compliance:** All text meets or exceeds WCAG 2.1 Level AA contrast requirements (4.5:1+ for normal text). Focus indicators are visible and unobscured.
- **Resilience:** Semantic content remains fully readable and navigable if JavaScript is disabled.
- **Reduced Motion:** Fully honors `prefers-reduced-motion` media queries.

