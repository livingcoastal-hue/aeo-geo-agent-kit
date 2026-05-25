---
name: aeo-geo-audit
description: Run a deep AEO, GEO, local search, Google Maps, schema, reputation, reviews, NAP, links, entity, and LLM visibility audit for a business using its company name and website URL. Use when assessing whether a company is ready to rank in AI answers, AI Overviews, ChatGPT, Gemini, Claude, Perplexity, Google Maps, and local/entity search, or when building an agent-led remediation plan.
---

# AEO/GEO Audit

This Claude-compatible bridge mirrors the workspace skill at `skills/aeo-geo-audit/`.

Use the main workflow in `../../../skills/aeo-geo-audit/SKILL.md` when available. If only this file is loaded, run the audit with this compact process:

1. Take `company_name`, `url`, optional `primary_location`, optional `service_area`, and optional competitors.
2. Audit crawlability, indexability, sitemap/robots, titles, headings, internal links, visible NAP, and extractable facts.
3. Audit schema and entity clarity: Organization, LocalBusiness, Service, FAQ, Review, Breadcrumb, sameAs, NAP, profile URLs, and validation issues.
4. Audit AEO/GEO content: direct answers, buyer questions, service details, proof, costs, comparisons, FAQs, local relevance, and citation-worthy claims.
5. Audit local/Maps readiness: Google Business Profile when available, categories, services, photos, posts, Q&A, reviews, owner responses, citations, and location pages.
6. Audit reputation: review sources, rating/count, recency, sentiment themes, response quality, testimonials, case studies, and trust proof.
7. Audit authority: links, local mentions, citations, industry directories, PR, partnerships, and competitor authority patterns.
8. Test or propose LLM visibility prompts for ChatGPT, Gemini, Claude, Perplexity, Google AI Mode/AI Overviews, and local recommendation queries.
9. Score each category 0-5 and produce a prioritized 30/60/90-day roadmap.

Always separate observed facts from inferences. Do not fabricate rankings, reviews, citations, or LLM mentions. Mark unavailable sources as not checked.
