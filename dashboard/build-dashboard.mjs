import fs from "node:fs";
import path from "node:path";

const workspace = process.cwd();
const roots = [
  {
    dir: "/Users/guymichael/.codex/skills",
    label: "Codex"
  },
  {
    dir: "/Users/guymichael/.agents/skills",
    label: "Agents"
  }
];

function walkSkillFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkSkillFiles(fullPath));
    } else if (entry.isFile() && entry.name === "SKILL.md") {
      files.push(fullPath);
    }
  }

  return files;
}

function parseFrontmatter(content) {
  if (!content.startsWith("---")) return {};
  const end = content.indexOf("\n---", 3);
  if (end === -1) return {};
  const frontmatter = content.slice(3, end).split("\n");
  const parsed = {};
  let activeKey = null;
  let activeValue = [];

  function flush() {
    if (activeKey) {
      parsed[activeKey] = activeValue.join(" ").replace(/\s+/g, " ").trim();
    }
    activeKey = null;
    activeValue = [];
  }

  for (const line of frontmatter) {
    const scalar = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (scalar) {
      flush();
      activeKey = scalar[1];
      const raw = scalar[2].trim();
      if (raw !== "|" && raw !== ">") {
        activeValue.push(raw.replace(/^["']|["']$/g, ""));
      }
      continue;
    }

    if (activeKey && /^\s+/.test(line)) {
      activeValue.push(line.trim());
    }
  }

  flush();
  return parsed;
}

function categorize(skill) {
  const text = `${skill.name} ${skill.description}`.toLowerCase();
  if (text.includes("google business") || text.includes("maps") || text.includes("local seo") || text.includes("gbp")) return "Local Growth";
  if (text.includes("aeo") || text.includes("geo") || text.includes("llm visibility") || text.includes("answer")) return "AI Search";
  if (text.includes("browser") || text.includes("chrome") || text.includes("scrape")) return "Browser";
  if (text.includes("github") || text.includes("pr ") || text.includes("pull request")) return "GitHub";
  if (text.includes("cost")) return "Cost";
  if (text.includes("security") || text.includes("pii") || text.includes("safety")) return "Security";
  if (text.includes("test") || text.includes("verify") || text.includes("quality")) return "Quality";
  if (text.includes("workflow") || text.includes("automation") || text.includes("cron")) return "Workflow";
  if (text.includes("agent") || text.includes("swarm") || text.includes("coordinator")) return "Agents";
  if (text.includes("design") || text.includes("frontend") || text.includes("ui") || text.includes("animation")) return "Frontend";
  if (text.includes("research") || text.includes("synthesize") || text.includes("dossier")) return "Research";
  if (text.includes("memory") || text.includes("vector") || text.includes("embedding")) return "Memory";
  if (text.includes("trader") || text.includes("market")) return "Market";
  if (text.includes("document") || text.includes("slides") || text.includes("spreadsheet")) return "Documents";
  return "General";
}

function getHeadingFallback(content, fallback) {
  const heading = content.match(/^#\s+(.+)$/m);
  return heading ? heading[1].trim() : fallback;
}

const skills = roots.flatMap((root) => {
  return walkSkillFiles(root.dir).map((file) => {
    const content = fs.readFileSync(file, "utf8");
    const frontmatter = parseFrontmatter(content);
    const folder = path.basename(path.dirname(file));
    const skill = {
      name: frontmatter.name || getHeadingFallback(content, folder),
      description: frontmatter.description || "",
      path: file,
      folder,
      sourceLabel: root.label
    };
    skill.category = categorize(skill);
    return skill;
  });
}).sort((a, b) => a.name.localeCompare(b.name));

function parseAgentRoster() {
  const rosterPath = path.join(workspace, "manifests", "agent-roster.yaml");
  if (!fs.existsSync(rosterPath)) return [];
  const lines = fs.readFileSync(rosterPath, "utf8").split("\n");
  const agents = [];
  let current = null;
  let inOwns = false;

  for (const line of lines) {
    const id = line.match(/^\s*(?:-\s*)?id:\s+"?([^"]+)"?/);
    if (id) {
      current = { id: id[1], owns: [] };
      agents.push(current);
      inOwns = false;
      continue;
    }

    if (current && line.includes("owns:")) {
      inOwns = true;
      continue;
    }

    const owned = line.match(/^\s*-\s+"?([^"]+)"?/);
    if (current && inOwns && owned) {
      current.owns.push(owned[1]);
    }
  }

  return agents;
}

const data = {
  generatedAt: new Date().toISOString(),
  skills,
  agents: parseAgentRoster()
};

const outPath = path.join(workspace, "dashboard", "skills-data.js");
fs.writeFileSync(outPath, `window.SKILL_DASHBOARD_DATA = ${JSON.stringify(data, null, 2)};\n`);
console.log(`Wrote ${skills.length} skills and ${data.agents.length} agents to ${outPath}`);
