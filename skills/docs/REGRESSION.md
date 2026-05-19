# 🧪 Regression Sentinel

## Killer Concept
Enforces true Test-Driven Development (TDD) autonomously by generating a failing reproduction script *before* the fix is applied.

## Workflow
1. **Detect Bug:** Identify a failure through logs or user report.
2. **Reproduction:** Create a standalone `repro.js` or `repro.py` that fails.
3. **Red Phase:** Run the repro. If it passes, your understanding of the bug is incorrect.
4. **Fix Phase:** Apply the code changes.
5. **Green Phase:** Run the repro. It must pass.
6. **Crystallize:** Move the repro into the permanent test suite.

## Why it matters
AI agents often "hallucinate fixes" by changing code that looks wrong but isn't the root cause. This skill forces the agent to prove it has actually solved the problem.
