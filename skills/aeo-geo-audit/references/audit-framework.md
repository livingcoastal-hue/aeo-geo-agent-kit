# AEO/GEO Audit Framework

## Evidence Log Fields

Use this structure for every meaningful finding:

| Source | URL/Profile | Finding | Impact | Confidence | Owner |
|---|---|---|---|---|---|

Confidence:

- High: directly observed in source data.
- Medium: inferred from several signals.
- Low: plausible but needs platform/account access or better tooling.

## Priority Model

Rank each recommendation by:

- Impact: expected effect on AI/local discovery, trust, or conversions.
- Confidence: strength of evidence.
- Effort: time/cost/complexity.
- Dependency: whether other work requires it first.

## Common High-Impact Gaps

- Missing or inconsistent NAP.
- No validated LocalBusiness/Organization/Service schema.
- Important services hidden behind generic copy.
- No service-area/location pages with unique local proof.
- Thin review footprint or no owner responses.
- No clear answer blocks for costs, process, timelines, eligibility, and comparisons.
- Little third-party validation beyond self-published website copy.
- Competitors cited by answer engines because they have stronger reviews, directories, guides, or local mentions.
- Brand/entity confusion from inconsistent names, old addresses, duplicate profiles, or weak sameAs links.

## Suggested Prompt Bank

Use prompts with location and buyer context where possible:

- "Who are the best [service] providers in [city]?"
- "What company should I hire for [problem] near [city]?"
- "Compare [company] and [competitor] for [service]."
- "Is [company] reputable?"
- "What are common complaints about [company]?"
- "How much does [service] cost in [city]?"
- "What questions should I ask before hiring a [service provider]?"
- "Which [service provider] has the best reviews near [neighborhood/city]?"
- "Find sources that prove [company] specializes in [service]."

## Remediation Themes

Technical foundation:

- Fix indexability, crawl paths, broken links, canonical conflicts, and sitemap issues.

Entity foundation:

- Define canonical NAP, organization details, sameAs links, schema, and profile URLs.

Answer foundation:

- Add direct, evidence-backed answers to buyer questions across core pages.

Local foundation:

- Improve GBP, local citations, review velocity, location pages, and local proof.

Authority foundation:

- Build third-party mentions, relevant links, partnerships, expert proof, and citation-worthy assets.

LLM visibility:

- Test prompts, identify missing source patterns, and publish/support assets likely to be retrieved or cited.
