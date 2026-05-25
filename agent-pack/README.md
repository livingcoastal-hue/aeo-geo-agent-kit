# Agent Pack

This folder describes how the AEO/GEO audit agents work together outside a single skill runtime.

## Coordinator

The coordinator owns scope, evidence standards, scoring, prioritization, and the final report.

## Specialist Agents

- Crawler and technical agent
- Schema and entity agent
- AEO/GEO content agent
- Local Maps and NAP agent
- Reputation and reviews agent
- Authority, links, and mentions agent
- LLM visibility agent

## Handoff Rules

- Every specialist returns findings with evidence.
- The coordinator resolves conflicts.
- Scores should use the rubric in `skills/aeo-geo-audit/references/scoring-rubric.md`.
- Final recommendations should include priority, impact, effort, confidence, and acceptance criteria.
