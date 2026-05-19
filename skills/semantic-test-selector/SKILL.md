---
name: semantic-test-selector
description: Maps changed files to specific test cases via dependency graphs, running ONLY the tests that matter. Use this to speed up your verification loop.
---

# Semantic Test Selector

## Killer Concept
Identifies the minimal subset of tests impacted by a change using graph intelligence. Makes "test-on-every-write" computationally viable for the agent.

## When to use this skill
- Before claiming a task is complete (as part of the `zero-trust-verifier` workflow).
- When working in a large repository where running the full test suite takes >1 minute.

## Workflow: Targeted Testing

### 1. Identify Changed Files
List the files you have modified in the current session.

### 2. Map Dependents
Run `mcp_codepulse_get_blast_radius(file="modified_file.ts")` for each changed file.

### 3. Filter for Tests
Filter the blast radius output for files matching common test patterns:
- `*.test.*`
- `*.spec.*`
- `tests/`
- `__tests__/`

### 4. Run Selected Tests
Execute the test runner for *only* the identified test files.
Example (Jest): `npx jest src/auth.test.ts src/api.spec.ts`

### 5. Fallback
If the blast radius is empty (e.g., you edited a test file itself), run only that file.
If the blast radius is too large (>20 tests), run only the direct dependents (distance=1).

## Benefits
- Instant feedback.
- Drastically reduced token usage and session time.
- Prevents "test fatigue" where the agent starts ignoring failures.
