---
name: blast-radius-oracle
description: Statically computes the transitive closure of dependents before a file is edited. Use this to identify downstream impact and prevent regressions in shared utilities.
---

# Blast Radius Oracle

## Killer Concept
Statically computes the transitive closure of dependents *before* a file is edited, forcing the agent to acknowledge and plan for downstream impact.

## When to use this skill
- Before modifying any file that is exported or used by multiple other files.
- When changing function signatures, API contracts, or shared types.
- To plan a multi-file refactor.

## Workflow: Impact Analysis

### 1. Identify the Target
Specify the file you intend to modify.

### 2. Compute Blast Radius
Run `mcp_codepulse_get_blast_radius(file="path/to/file")`.
This tool returns all files that depend on your target, directly OR indirectly.

### 3. Review Downstream Consumers
- Examine the list of dependents.
- If the list is large (>5 files), prioritize checking those with high "centrality" or those in different architectural layers.
- Check if any dependents are "critical nodes" using `mcp_codepulse_analyze_project(focus="critical-node")`.

### 4. Formulate the "Ripple Plan"
Before editing the target, list the exact files that will need updates. 
Example: "I am changing the return type of `auth.ts`. This will require updates in `login.ts`, `api_v1.ts`, and `middleware.ts`."

## Verification
After making changes, you MUST verify the blast radius by running tests for the most distant dependents to ensure the "ripple" didn't break them.
