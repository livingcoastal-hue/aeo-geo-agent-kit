# Installation

This repo is designed to work with both Codex and Claude-style skill folders.

## Codex

Copy the skill folder into your Codex skills directory:

```bash
cp -R skills/aeo-geo-audit ~/.codex/skills/aeo-geo-audit
```

Then invoke it with:

```text
Use $aeo-geo-audit to audit [company name] at [URL].
```

## Claude

Copy the Claude bridge skill into your Claude skills directory or project-level `.claude/skills` folder:

```bash
cp -R .claude/skills/aeo-geo-audit /path/to/your/.claude/skills/aeo-geo-audit
```

Then invoke it with:

```text
Use the aeo-geo-audit skill to audit [company name] at [URL].
```

## Recommended Inputs

- Company name
- Website URL
- Primary location
- Service area
- Target customers
- Known competitors

## Notes

Some audit surfaces require live web access or account exports. If a data source is unavailable, the skill should mark it as not checked rather than guessing.
