---
name: aeo-geo-audit
description: Run a deep AEO, GEO, local search, Google Maps, schema, reputation, reviews, NAP, links, entity, and LLM visibility audit for a business using its company name and website URL. Use when assessing whether a company is ready to rank in AI answers, AI Overviews, ChatGPT, Gemini, Claude, Perplexity, Google Maps, and local/entity search, or when building an agent-led remediation plan.
metadata:
  short-description: Audit AI search and maps readiness
---

# AEO/GEO Audit

## Inputs

Ask for only missing essentials:

- `company_name` - required
- `url` - required
- `primary_location` - optional but important for local/Maps audits
- `service_area` - optional
- `target_customers` - optional
- `competitors` - optional

If the user only gives a URL, infer the company name from the site and say it is inferred.

## Operating Rules

- Treat SEO, AEO, GEO, local search, and Maps as overlapping systems. Do not claim old SEO is dead; evaluate which assets are still useful and which need answer-engine adaptation.
- Verify current search-platform facts before relying on them. Google AI Mode, AI Overviews, Maps, Gemini, ChatGPT search, Perplexity, and Claude citation behavior change often.
- Evidence beats opinion. Every major finding should cite the page, profile, SERP observation, schema object, review source, or backlink/source reviewed.
- Prefer structured extraction over visual impressions: HTML, schema, robots, sitemap, headings, internal links, entity signals, NAP, GBP data, reviews, citations, and topical coverage.
- Separate observed facts from inferred risks.
- Flag legal/medical/financial claims for expert review instead of rewriting them confidently.
- Do not fabricate rankings, reviews, citations, or LLM mentions. If live search or a platform is unavailable, mark that data source as not checked.

## Agent Pattern

Use one main coordinator and focused subagents when the environment allows delegation. If subagents are unavailable, run the same sections sequentially.

1. **Main coordinator**: frames scope, normalizes evidence, resolves conflicts, scores readiness, and writes the final report.
2. **Crawler and technical agent**: crawls site, indexes pages, extracts metadata, headings, internal links, canonicals, robots, sitemaps, speed blockers, and crawlability issues.
3. **Schema and entity agent**: audits JSON-LD/microdata/RDFa, entity IDs, Organization/LocalBusiness/Product/Service/FAQ/Review/Breadcrumb schema, sameAs links, and knowledge graph consistency.
4. **AEO/GEO content agent**: checks whether content answers natural-language buyer questions, comparison prompts, local intent, objections, pricing/service details, and citation-worthy facts.
5. **Local Maps and NAP agent**: audits Google Business Profile signals when available, NAP consistency, service areas, categories, photos, posts, attributes, citations, and location landing pages.
6. **Reputation and reviews agent**: analyzes review quantity, velocity, sentiment, owner responses, review themes, trust markers, testimonials, and third-party proof.
7. **Authority and links agent**: evaluates backlinks, citations, local mentions, partnerships, PR, directories, topical authority, and unlinked brand/entity mentions.
8. **LLM visibility agent**: tests answer-engine prompts, captures citations/mentions, compares competitors, and identifies why the business is or is not surfaced.

Subagent prompts live in `agents/subagents/`. Load only the prompts you need.

## Workflow

### 1. Scope and Baseline

- Confirm the company name, URL, location/service area, business model, and target offerings.
- Create an evidence log with fields: `source`, `url/profile`, `finding`, `impact`, `confidence`, `owner`.
- Identify likely money queries and answer prompts:
  - "best [service] near [city]"
  - "[company] reviews"
  - "[service] cost in [market]"
  - "[problem] solution for [customer type]"
  - "[company] vs [competitor]"
  - "who should I hire for [job]"

### 2. Crawl and Extract

- Crawl the homepage, primary service/product pages, about page, contact/location pages, blog/resources, FAQ, reviews/testimonials, and any sitemap URLs that look commercially important.
- Extract title tags, meta descriptions, H1/H2s, canonical tags, indexability, schema, internal links, image alt text, contact data, author/reviewer data, and visible claims.
- Check `robots.txt`, XML sitemaps, redirects, HTTPS, canonical conflicts, broken internal links, thin pages, duplicate pages, and obvious performance/accessibility blockers.

### 3. Entity and Trust Audit

- Identify the canonical business entity: name, address, phone, website, logo, founders/leadership, locations, services, credentials, awards, social profiles, GBP, directories, and third-party mentions.
- Check whether the entity is consistent across the website, schema, Google Business Profile, major citations, review platforms, and social profiles.
- Look for trust proof: licensing, insurance, certifications, case studies, real photos, staff, methodology, guarantees, policies, pricing, and support details.

### 4. AEO/GEO Content Audit

- Evaluate whether pages answer complete questions in plain language, with extractable facts and direct answers near the top.
- Look for concise definitions, comparisons, steps, costs, timelines, eligibility, local modifiers, tradeoffs, and evidence.
- Check whether content is written for current AI retrieval patterns: clear entities, consistent terminology, quotable claims, tables/lists where useful, FAQs that answer actual customer prompts, and unique firsthand evidence.
- Flag outdated keyword-stuffing, vague marketing copy, generic AI text, missing proof, and pages that do not satisfy the implied user task.

### 5. Local/Maps Audit

- When possible, inspect Google Business Profile, Maps presence, categories, service areas, hours, photos, posts, products/services, Q&A, reviews, owner responses, and competitor map pack signals.
- Compare NAP across the site, schema, footer, contact page, location pages, GBP, Bing Places, Apple Business Connect, Yelp, BBB, industry directories, and top local citations.
- Evaluate location page quality: unique local proof, embedded map only if useful, driving/service-area context, staff/location photos, reviews from that market, local FAQs, and local schema.

### 6. Reputation and Authority Audit

- Summarize review profile by source, average rating, count, recency, velocity, sentiment themes, response quality, unresolved issues, and competitor gap.
- Evaluate backlink and citation quality: topical relevance, locality, trust, diversity, anchor/entity signals, and spam risk.
- Look for authority gaps that LLMs and Maps may rely on: missing third-party validation, weak local mentions, no expert bios, no original data, no industry relationships, no citation-worthy assets.

### 7. LLM Visibility Tests

- Run or propose prompts across available answer engines. Capture the date, model/platform, prompt, answer summary, citation/mention status, competitors mentioned, and likely reason.
- Use prompt sets for:
  - category discovery
  - local recommendation
  - comparison and alternatives
  - problem/solution research
  - cost and timeline
  - reputation verification
  - brand-specific fact check
- Treat results as samples, not absolute rankings. LLM answers vary by date, user location, personalization, and query wording.

### 8. Score and Prioritize

Use the rubric in `references/scoring-rubric.md`.

Score:

- Technical crawlability and indexability
- Schema and entity clarity
- AEO/GEO answer readiness
- Local/Maps readiness
- NAP and citation consistency
- Reputation and review strength
- Authority, links, and mentions
- LLM visibility and citation likelihood
- Conversion trust

Prioritize actions by impact, confidence, effort, and dependency. Label as:

- `Critical`: blocks discovery, trust, or entity understanding
- `High`: likely to improve AI/local visibility or conversions
- `Medium`: useful but not foundational
- `Low`: polish or later-stage advantage

## Outputs

Use `templates/audit-report.md` for the final audit and `templates/remediation-roadmap.md` when the user asks for an implementation plan.

The final report must include:

- Executive summary in plain English
- Readiness scorecard
- Evidence-backed findings
- Competitor or market context if available
- Prioritized 30/60/90-day roadmap
- Agent-ready task list
- Data sources checked and not checked
- Caveats and assumptions

## Optional References

- `references/audit-framework.md` - deeper checklist for each audit surface
- `references/prompt-library.md` - reusable LLM and AI-search test prompts
- `references/scoring-rubric.md` - scoring rules and severity definitions
- `references/tools-and-data.md` - suggested data sources, crawlers, APIs, and manual checks
