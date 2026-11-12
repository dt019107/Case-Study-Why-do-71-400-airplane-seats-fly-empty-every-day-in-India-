# AeroFill — Content Audit & Evidence Boundaries

This document outlines the claim audit log, evidence framework, and verification boundaries established for the **AeroFill** UX systems case study.

---

## 1. Project Characterization

- **Project Type:** Self-initiated UX design and systems engineering portfolio project.
- **Affiliation:** Not commercialized, piloted, or affiliated with the Directorate General of Civil Aviation (DGCA), Ministry of Civil Aviation (MoCA), IndiGo, or any commercial airline operator.
- **Goal:** To demonstrate systematic product thinking across complex multi-stakeholder trade-offs (yield management, passenger distress, cannibalization prevention, and operational feasibility).

---

## 2. Evidence Categorization Framework

Every datapoint and assertion in this case study adheres to one of four strict truth boundaries:

| Boundary Tier | Definition | Scope in Case Study |
|---|---|---|
| **Public-Source Benchmark** | Verifiable data from aviation regulatory filings, annual airline financial reports, and industry filings. | DGCA monthly traffic reports, domestic passenger load factors (PLF 84–89%), average A320 seat configurations (180–186 seats). |
| **Illustrative Persona** | Composite personas created to represent conflicting user behaviors and willingness-to-pay. | **Ananya** (distressed, price-sensitive, middle-seat tolerant student) vs. **Priya** (inflexible, corporate-expensed, corporate-yield traveler). |
| **Design Hypothesis** | Proposed interface and service design choices intended to resolve behavioral friction. | Requiring 7kg carry-on, gate-only middle seat allocation, and 15km geofence verification to prevent corporate leakage. |
| **Modelled Simulation** | Simplified, client-side mathematical models illustrating unit economic trade-offs. | Marginal jet fuel burn calculation (~₹820) + passenger service fee (~₹630) vs. incremental standby contribution. |

---

## 3. Audited Claims & Removed Draft Assumptions

During earlier drafts of this case study, several assertions were audited and removed or refined to preserve strict intellectual honesty:

### Claim Audit Log

1. **"Airlines lose ₹500 Cr daily on empty seats"**
   - *Status:* **Removed.**
   - *Reason:* Misleading metric that assumed empty seats could be sold at full average ticket prices without cannibalizing advance bookings. Reframed around *perishable capacity* and *marginal contribution*.

2. **"100% Guaranteed Spot Clearance"**
   - *Status:* **Removed & Replaced.**
   - *Reason:* Standby by definition cannot be guaranteed without undermining scheduled operations. Added explicit upfront notice: *"Standby is not guaranteed. If no seat clears, you get a full refund."*

3. **"Instant Automated ABHA Hospital Verification at the Gate"**
   - *Status:* **Reframed as a Design Concept with Graceful Fallback.**
   - *Reason:* Real-world hospital systems and ABDM gateways experience network latency and outages. Added explicit resolution error handling: *"We couldn't confirm this automatically — 15-minute hold with Medical Ops priority desk fallback."*

4. **"Zero-Fare Free Seats for Emergencies"**
   - *Status:* **Audited and Rejected.**
   - *Reason:* Airlines operate on 2–4% net margins. A flat ₹3,200 cap was selected to cover variable fuel burn and statutory airport security fees while eliminating surge pricing distress.

---

## 4. Simulation Parameters & Assumptions

The interactive simulators included in the case study operate on the following parameters:
- **Baseline Aircraft:** Airbus A320neo (186 seats layout)
- **Average Sold Capacity:** 162 seats (87.1% Load Factor)
- **Perishable Spoiled Inventory:** 24 empty seats
- **Variable Cost per Added Passenger:** ~₹1,450 (Fuel burn + CISF security fee + handling)
- **Net Incremental Contribution:** ~₹1,750 per standby passenger cleared at ₹3,200

*All calculations are client-side illustrative simulations intended to demonstrate UX and economic trade-offs, not certified revenue management accounting.*

