(function () {
  const data = window.SKILL_DASHBOARD_DATA || { skills: [], agents: [], generatedAt: null };
  const skills = data.skills || [];
  const agents = data.agents || [];
  const priorityTerms = [
    "google-business-profile",
    "aeo-geo",
    "local-service",
    "browser",
    "research",
    "github",
    "workflow",
    "skill-builder",
    "agent-swarm",
    "ui-ux"
  ];

  const elements = {
    skillCount: document.getElementById("skillCount"),
    sourceCount: document.getElementById("sourceCount"),
    categoryCount: document.getElementById("categoryCount"),
    agentCount: document.getElementById("agentCount"),
    lastUpdated: document.getElementById("lastUpdated"),
    searchInput: document.getElementById("searchInput"),
    categoryFilter: document.getElementById("categoryFilter"),
    sourceFilter: document.getElementById("sourceFilter"),
    prioritySkills: document.getElementById("prioritySkills"),
    skillList: document.getElementById("skillList"),
    resultCount: document.getElementById("resultCount"),
    skillDetail: document.getElementById("skillDetail"),
    selectedHint: document.getElementById("selectedHint"),
    agentRoster: document.getElementById("agentRoster")
  };

  const uniqueSources = [...new Set(skills.map((skill) => skill.sourceLabel))].sort();
  const uniqueCategories = [...new Set(skills.map((skill) => skill.category))].sort();

  elements.skillCount.textContent = skills.length.toLocaleString();
  elements.sourceCount.textContent = uniqueSources.length.toLocaleString();
  elements.categoryCount.textContent = uniqueCategories.length.toLocaleString();
  elements.agentCount.textContent = agents.length.toLocaleString();
  elements.lastUpdated.textContent = data.generatedAt
    ? `Updated ${new Date(data.generatedAt).toLocaleString()}`
    : "Inventory loaded";

  uniqueCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    elements.categoryFilter.append(option);
  });

  uniqueSources.forEach((source) => {
    const option = document.createElement("option");
    option.value = source;
    option.textContent = source;
    elements.sourceFilter.append(option);
  });

  function shortDescription(text) {
    if (!text) return "No description found in this skill file.";
    return text.length > 180 ? `${text.slice(0, 177)}...` : text;
  }

  function skillMatches(skill, query) {
    if (!query) return true;
    const haystack = `${skill.name} ${skill.category} ${skill.description} ${skill.path}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  }

  function renderSkillDetail(skill) {
    elements.selectedHint.textContent = "Skill details";
    elements.skillDetail.className = "skill-detail";
    elements.skillDetail.innerHTML = `
      <strong>${skill.name}</strong>
      <p>${shortDescription(skill.description)}</p>
      <div class="tag-row">
        <span class="tag green">${skill.category}</span>
        <span class="tag">${skill.sourceLabel}</span>
      </div>
      <dl>
        <div>
          <dt>Path</dt>
          <dd>${skill.path}</dd>
        </div>
        <div>
          <dt>Folder</dt>
          <dd>${skill.folder}</dd>
        </div>
      </dl>
    `;
  }

  function createSkillRow(skill) {
    const button = document.createElement("button");
    button.className = "skill-row";
    button.type = "button";
    button.innerHTML = `
      <span>
        <strong>${skill.name}</strong>
        <p>${shortDescription(skill.description)}</p>
        <span class="tag-row">
          <span class="tag green">${skill.category}</span>
        </span>
      </span>
      <span class="source-pill">${skill.sourceLabel}</span>
    `;
    button.addEventListener("click", () => renderSkillDetail(skill));
    return button;
  }

  function renderSkills() {
    const query = elements.searchInput.value.trim();
    const category = elements.categoryFilter.value;
    const source = elements.sourceFilter.value;
    const filtered = skills.filter((skill) => {
      return skillMatches(skill, query)
        && (category === "all" || skill.category === category)
        && (source === "all" || skill.sourceLabel === source);
    });

    elements.skillList.replaceChildren(...filtered.map(createSkillRow));
    elements.resultCount.textContent = `Showing ${filtered.length.toLocaleString()} of ${skills.length.toLocaleString()} skills`;
  }

  function renderPrioritySkills() {
    const seen = new Set();
    const prioritySkills = [];

    priorityTerms.forEach((term) => {
      const found = skills.find((skill) => skill.name.includes(term) && !seen.has(skill.name));
      if (found) {
        seen.add(found.name);
        prioritySkills.push(found);
      }
    });

    elements.prioritySkills.replaceChildren(...prioritySkills.map((skill) => {
      const card = document.createElement("button");
      card.className = "priority-card";
      card.type = "button";
      card.innerHTML = `
        <strong>${skill.name}</strong>
        <p>${shortDescription(skill.description)}</p>
        <div class="tag-row">
          <span class="tag green">${skill.category}</span>
          <span class="tag amber">${skill.sourceLabel}</span>
        </div>
      `;
      card.addEventListener("click", () => renderSkillDetail(skill));
      return card;
    }));
  }

  function renderAgents() {
    if (!agents.length) {
      elements.agentRoster.innerHTML = "<p>No project agent roster found.</p>";
      return;
    }

    elements.agentRoster.replaceChildren(...agents.map((agent) => {
      const card = document.createElement("article");
      card.className = "agent-card";
      card.innerHTML = `
        <strong>${agent.id}</strong>
        <ul>${agent.owns.map((item) => `<li>${item}</li>`).join("")}</ul>
      `;
      return card;
    }));
  }

  elements.searchInput.addEventListener("input", renderSkills);
  elements.categoryFilter.addEventListener("change", renderSkills);
  elements.sourceFilter.addEventListener("change", renderSkills);

  renderPrioritySkills();
  renderAgents();
  renderSkills();
})();
