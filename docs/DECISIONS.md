# Decisions Log

Why we chose what we chose. Newest at the top. Format: decision, date, reasoning, alternatives considered.

---

## D-010: Single-hire jobs — accepting one application auto-rejects the rest
**Date:** Aug 2026
**Reasoning:** Covers almost all real cases ("fix my laptop" needs one person) and keeps the flow simple. Acceptance, order creation, job assignment, and rejection of other applications happen in one database transaction — all or nothing.
**Alternatives:** Multi-hire jobs (leave other applications pending). Deferred; revisit only if beta feedback demands it.

## D-009: Order audit columns (completed_by, cancelled_by)
**Date:** Aug 2026
**Reasoning:** Recording *which party* completed or cancelled an order is dispute evidence — essential once payments arrive in v3, cheap to capture from day one.
**Alternatives:** Status only, no attribution. Rejected as short-sighted.

## D-008: Reviews only against completed orders, one per order
**Date:** Aug 2026
**Reasoning:** The entire trust model. Vendors can't farm fake reviews; every rating traces to a real engagement. Enforced in API logic AND by a UNIQUE constraint on order_id at the database level (defence in two layers).
**Alternatives:** Open reviews on vendor profiles. Rejected — unverifiable, spammable.
**Open sub-decision:** review time window (currently open-ended; consider 30 days). Decide by Sprint 5.

## D-007: Campus-driven location, not GPS radius
**Date:** Aug 2026
**Reasoning:** Students search "APK campus", not "within 5km". Structured university → campus tables + free-text area_text (res/informal detail). Simpler to build, matches real behaviour.
**Alternatives:** Lat/long radius search (kept as a future option for community expansion beyond campuses).

## D-006: Multi-university schema from day one
**Date:** Aug 2026
**Reasoning:** Product targets all SA universities; UJ is only the pilot. universities and campuses tables cost 20 minutes now vs a painful migration later. Seeded with UJ's four campuses only.
**Alternatives:** Hardcode UJ campuses. Rejected.

## D-005: No payments in v1
**Date:** Aug 2026
**Reasoning:** Payments add gateway integration, refunds, fraud, and regulatory weight before the marketplace has proven demand. v1 records the engagement (orders) while parties settle cash/EFT directly. The orders table is the seam where a payments table attaches in v3.
**Alternatives:** Payments at launch. Rejected — highest-risk, lowest-need feature for an MVP.

## D-004: WhatsApp deep links instead of in-app chat
**Date:** Aug 2026
**Reasoning:** The market lives on WhatsApp. wa.me links cost nothing, need no API approval, and every pre-filled "found you on [platform]" message is free marketing. Building chat would duplicate a tool users prefer.
**Alternatives:** In-app messaging. Deferred indefinitely.

## D-003: PWA, not a native app
**Date:** Aug 2026
**Reasoning:** Distribution is WhatsApp links — a shared profile must open instantly with no install wall. One React codebase covers desktop and mobile; installable to home screen; no app store cycles; no 100MB download on limited data.
**Alternatives:** React Native app. Deferred to v2/v3 if push notifications or camera features justify it.

## D-002: Students-first launch (all universities as target, UJ as pilot)
**Date:** Aug 2026
**Reasoning:** A campus is a contained market that solves the marketplace cold-start problem — concentrated users, fast word of mouth, and we can personally recruit the first 30 vendors. Win one campus completely, then expand to other universities and surrounding communities.
**Alternatives:** Launch broad (townships + campuses simultaneously). Rejected — cold-start risk.

## D-001: Services & micro-jobs marketplace, goods e-commerce deferred
**Date:** Aug 2026
**Reasoning:** Services and micro-jobs share users, trust mechanics, and geo-search — they merge into one product. Physical goods add payments, stock, and delivery logistics that kill most local marketplaces. Data model keeps the door open (listings.type, stock column) so products bolt on later without a rewrite.
**Alternatives:** Full e-commerce at launch. Rejected.
