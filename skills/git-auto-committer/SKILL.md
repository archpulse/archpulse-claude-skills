---
name: git-auto-committer
description: Automates atomic git commits after task completion to maintain workspace integrity. Use this only when a git repository is detected and the task is fully verified.
---

# Git Auto-Committer

## Killer Concept
Ensures that **Claude Code** never leaves a workspace in a "dirty" state, keeping `git status` clean and preventing confusion for future branching or context loading.

## When to use this skill
- Immediately after the `zero-trust-verifier` passes.
- Before claiming a task is complete.
- **Prerequisite:** A `.git` directory must exist in the project root.

## Workflow: Atomic Committing

### 1. Detect Repository
Verify that the project is a git repository by running `git rev-parse --is-inside-work-tree`. If it fails, skip this skill.

### 2. Stage Changes
Stage only the files related to the current task:
```bash
git add [relevant-files]
```

### 3. Generate Conventional Message
Create a concise commit message following [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `refactor:` for code changes that neither fix a bug nor add a feature

Example: `feat: implement Zero-Trust verifier script`

### 4. Commit
Run the commit command:
```bash
git commit -m "[conventional-message]"
```

### 5. Final Status Check
Run `git status` to ensure everything is clean.

## Why it matters
Atomic commits prevent "mega-diffs" and make it easier for Claude to understand the project's evolution in subsequent turns. It also ensures that tools like `git branch` and `git switch` work as expected without uncommitted change errors.
