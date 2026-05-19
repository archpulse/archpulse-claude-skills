---
name: temporal-coupling-mapper
description: Uses historical git analysis to warn about files that always change together. Use this to identify "invisible" dependencies like schema-documentation coupling.
---

# Temporal Coupling Mapper

## Killer Concept
Uses historical git analysis to surface files that are logically coupled but structurally separate, preventing the "forgot to update the config" problem.

## When to use this skill
- Before finalizing a change to a configuration file, schema, or core utility.
- When you are unsure if your change has side effects in unrelated files.

## Workflow: Coupling Analysis

### 1. Analyze History
Run a git command to find files that frequently appear in the same commit as your target file.

```bash
git log --name-only --pretty=format: -- [target-file] | sort | uniq -c | sort -nr | head -n 10
```

### 2. Interpret the Result
The command returns a list of files sorted by "coupling frequency". 
- **High Frequency (e.g., >50% of commits):** These files are almost certainly logically coupled. You MUST review them.
- **Medium Frequency:** Consider if the coupling is relevant to your specific change (e.g., both modified in a large refactor).

### 3. Review Coupled Files
Open the top 2-3 coupled files and check for:
- Shared constants.
- Mirroring logic (e.g., Frontend DTOs vs Backend Entities).
- Documentation that needs updating.

## Examples of Temporal Coupling
- `schema.prisma` <-> `migrations/`
- `api_v1.ts` <-> `api_v2.ts` (Mirroring changes)
- `UserService.ts` <-> `UserService.test.ts`
- `package.json` <-> `lockfile`
