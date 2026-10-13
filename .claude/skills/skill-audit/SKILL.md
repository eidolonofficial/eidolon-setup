---
name: skill-audit
description: "Use when auditing Eidolon Setup skill packaging or verifying changed frontmatter, references, and published documentation."
---

# skill-audit

Validate the changed surfaces: YAML parses, `name` and `description` are non-empty, and referenced files exist. The legacy `trigger` field and line budgets are repository conventions, not Agent Skills requirements; apply them only where the actual deployment contract still requires them.

Check links affected by a move and consistency of the changed behavior across the entrypoint and its references. Do not require every available reference to be loaded or linked directly from the root: a clear second-level route is valid progressive disclosure.

Keep secrets and private machine data out of publishable artifacts. Review substantive claims against source evidence, separating hypotheses from observed behavior. Batch actionable findings with file locations and evidence. A small wording edit needs the relevant checks, not an unrelated nine-stage audit.
