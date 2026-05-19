---
name: zero-trust-verifier
description: Objective, multi-engine verification layer for code changes. Use this skill BEFORE claiming completion of any task to ensure changes are syntactically correct, pass linting, and do not break existing tests across various tech stacks (Node.js, Python, Go, Rust).
---

# Zero Trust Verifier

The **Zero Trust Verifier** is a mandatory interception layer for high-quality engineering. It fundamentally disables your ability to declare "I'm done" based on subjective intuition. Instead, it requires objective, localized, multi-engine verification to pass before any task can be considered complete.

## Core Mandate

**NEVER claim a task is complete or that code is "ready" without running the verifier.**

If you have made code changes, you MUST verify them. If the verifier fails, you MUST fix the issues and run it again. Completion is not a statement of intent; it is a verified state of the workspace.

## Workflow

1.  **Execute Changes**: Implement your logic, bug fixes, or features.
2.  **Trigger Verification**: Run the `scripts/verify.cjs` script.
    ```bash
    node /home/user/claude_skills/zero-trust-verifier/scripts/verify.cjs
    ```
3.  **Analyze Output**:
    - **SUCCESS**: If all checks pass, you have objective evidence that your changes meet the project's baseline standards.
    - **FAILURE**: If any check fails, treat the output as high-priority debugging information. Fix the root cause immediately.
4.  **Iterate**: Repeat steps 2-3 until you achieve a clean "PASS" across all detected engines.
5.  **Declare Completion**: Only once the verifier reports success should you call `complete_task`.

## Verification Engines

The verifier automatically detects the project stack and executes appropriate checks:

-   **Node.js**: Runs `npm run lint`, `npm run build`, and `npm test` (as defined in `package.json`).
-   **Python**: Checks for `ruff`, `mypy`, and `pytest` configurations in `pyproject.toml`. Falls back to `compileall` for basic syntax validation.
-   **Rust**: Executes `cargo check` and `cargo test`.
-   **Go**: Executes `go build ./...` and `go test ./...`.

## LLM-Friendly Output

The script is designed for agentic consumption:
-   **Truncation**: Large log outputs are automatically truncated to prevent context window bloat while preserving critical error context (start and end of logs).
-   **Clear Status**: Uses emoji and bold headers to make pass/fail states unmistakable.
-   **Actionable Errors**: STDOUT and STDERR are captured and presented clearly for immediate debugging.

## When to use this skill

-   After fixing a bug to ensure no regressions.
-   After implementing a new feature to verify it integrates correctly.
-   Before submitting your final response to a user.
-   Any time you find yourself about to say "The changes are complete."
