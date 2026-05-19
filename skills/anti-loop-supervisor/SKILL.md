---
name: anti-loop-supervisor
description: Monitors execution paths, tool calls, and error similarity to prevent and break infinite loops. Use when a fix fails multiple times or when you feel stuck in a repetitive loop.
---

# Anti-Loop Supervisor

## Killer Concept
Monitors execution paths and tool call sequences. Force-quits strategies that are thrashing by detecting high similarity in error outputs and state transitions.

## When to use this skill
- When a `run_shell_command` or test fails more than twice with the same error.
- When you are tempted to try the "same fix with a slight variation" for the third time.
- When you find yourself reading the same file repeatedly without making progress.

## Workflow: Loop Breaking

### 1. Enable Tracking
Before attempting a fix for a recurring failure, initialize a mental (or scratchpad) "Attempt Log":
- **Failure:** [Exact error message]
- **Assumption:** [Why I thought the last fix would work]
- **Correction:** [What I will change this time]

### 2. Run with Supervisor Script
Use `scripts/check_loop.cjs` to compare the current failure with previous ones.

```bash
node scripts/check_loop.cjs --current "[current-error]" --previous "[last-error]"
```

### 3. Loop Detection
If the script reports a **SIMILARITY > 90%**, you are officially in a loop.
**MANDATORY ACTION:**
- **Stop:** Do NOT apply the fix.
- **Rollback:** Revert any changes made during the loop.
- **Pivot:** Change your architectural approach. If you were patching the consumer, try patching the provider. If you were fixing the test, fix the logic (or vice versa).

## Strategy Shift Table

| Stuck in... | Pivot to... |
| :--- | :--- |
| **Logic fix loop** | **Deep research:** Re-read dependencies/types. |
| **Test failure loop** | **Reproduction script:** Write a standalone script to isolate the bug. |
| **Type error loop** | **Constraint check:** Verify the underlying interface or generic definition. |
