window.SKILL_DASHBOARD_DATA = {
  "generatedAt": "2026-05-25T00:00:00.000Z",
  "skills": [
    {
      "name": "aeo-geo-audit",
      "description": "Run a deep AEO, GEO, local search, Google Maps, schema, reputation, reviews, NAP, links, entity, and LLM visibility audit for a business using its company name and website URL.",
      "path": "skills/aeo-geo-audit/SKILL.md",
      "folder": "aeo-geo-audit",
      "sourceLabel": "Repository",
      "category": "AI Search"
    }
  ],
  "agents": [
    {
      "id": "main-coordinator",
      "owns": ["scope", "evidence_log", "scorecard", "final_report"]
    },
    {
      "id": "crawler-technical",
      "owns": ["crawlability", "indexability", "metadata", "internal_links", "technical_blockers"]
    },
    {
      "id": "schema-entity",
      "owns": ["schema", "entity_ids", "sameAs", "NAP_alignment"]
    },
    {
      "id": "aeo-geo-content",
      "owns": ["answer_readiness", "buyer_prompts", "proof_gaps", "content_roadmap"]
    },
    {
      "id": "local-maps-nap",
      "owns": ["Google_Maps", "GBP", "citations", "location_pages"]
    },
    {
      "id": "reputation-reviews",
      "owns": ["reviews", "sentiment", "owner_responses", "trust_proof"]
    },
    {
      "id": "authority-links",
      "owns": ["backlinks", "local_mentions", "industry_citations", "digital_PR"]
    },
    {
      "id": "llm-visibility",
      "owns": ["AI_answer_tests", "citations", "competitor_mentions", "source_patterns"]
    }
  ]
};
