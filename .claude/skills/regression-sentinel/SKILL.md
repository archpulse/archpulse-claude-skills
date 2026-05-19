---
name: regression-sentinel
description: Automatically generates localized, temporary regression tests for bugs before fixing them. Use this to confirm the failure state and ensure a fix is objectively verified.
---

# Regression Sentinel

## Killer Concept
Enforces true Test-Driven Development (TDD) autonomously by generating a failing reproduction script *before* the fix is applied.

## When to use this skill
- When a bug is reported that isn't already covered by a failing test.
- When you find a bug while exploring the codebase.
- To prove that a reported issue actually exists.

## Workflow: TDD Reproduction

### 1. Observe the Bug
Read the report or trace the logs to understand the failure.

### 2. Generate Reproduction Script
Create a standalone script or a temporary test case that isolates the bug.
- **Node.js:** Create `repro.spec.ts` or `repro.js`.
- **Python:** Create `repro.py` or use `pytest`.
- **General:** Use `run_shell_command` with a curl or CLI call that fails.

### 3. Verify Failure (The Red Phase)
Run the reproduction script. **It MUST fail.** 
If it passes, your reproduction is incorrect, or you don't understand the bug. Stop and re-research.

### 4. Apply the Fix (The Green Phase)
Implement the minimal fix required to make the reproduction script pass.

### 5. Verify Success
Run the reproduction script again. **It MUST pass.**

### 6. Crystallize
Optionally move the reproduction script into the project's permanent test suite to prevent future regressions.
