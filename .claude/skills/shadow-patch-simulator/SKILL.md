---
name: shadow-patch-simulator
description: Runs a planned, wide-reaching refactor in an isolated, in-memory (or temp directory) sandbox and generates a confidence score before touching the real workspace. Use for high-risk refactors, cross-cutting changes, or when architectural integrity must be verified before application.
---

# Shadow Patch Simulator

The Shadow Patch Simulator allows you to verify complex changes in a safe, isolated environment. By simulating the application of patches and running verification suites in a temporary directory, you can identify regressions and integration issues before they affect the main codebase.

## When to Use This Skill

- **High-Risk Refactors**: Changing core utilities, renaming widespread symbols, or altering fundamental data structures.
- **Cross-Cutting Concerns**: Applying changes that touch multiple modules or layers of the application.
- **Dependency Upgrades**: Testing how a package update affects different parts of the system.
- **Experimental Logic**: Trying out a new architectural pattern without cluttering the current state.

## Shadow Patching Workflow

Follow these steps to safely simulate and verify your changes.

### 1. Identify Blast Radius
Determine which files are directly or indirectly affected by your change. Ensure you include:
- Files being modified.
- Files that import the modified modules.
- Configuration files (`package.json`, `tsconfig.json`, `jest.config.js`, etc.).
- Essential dependencies (e.g., `node_modules` should be symlinked).

### 2. Prepare Simulation Plan
Create a temporary JSON file (e.g., `sim-plan.json`) with the following structure:

```json
{
  "baseDir": "/absolute/path/to/project",
  "filesToCopy": [
    "package.json",
    "src/core/utils.js",
    "src/components/App.js",
    "tests/utils.test.js",
    "node_modules"
  ],
  "patches": [
    {
      "path": "src/core/utils.js",
      "content": "... new content ..."
    }
  ],
  "verifyCommands": [
    "npm run lint",
    "npm test tests/utils.test.js"
  ]
}
```

### 3. Run Simulation
Execute the simulator script:

```bash
node scripts/simulate_patch.cjs path/to/sim-plan.json
```

### 4. Evaluate Results
The script will output a JSON object containing:
- **Confidence Score**: 0-100% based on command success.
- **Temp Directory**: The path to the sandbox for manual inspection.
- **Logs**: Tail-end output from the verification commands.

### 5. Finalize or Iterate
- **Score = 100%**: High confidence. Proceed with applying changes to the workspace.
- **Score < 100%**: Failure detected. Inspect the logs in the output or visit the `tempDir` to diagnose. Refine your patches and re-run the simulation.

## Agentic Ergonomics

- **Surgical Selection**: Don't copy the whole project unless necessary. Focus on the blast radius.
- **Symlink node_modules**: Always include `node_modules` in `filesToCopy` to ensure tests can run without re-installing. The script handles this as a symlink.
- **Clean Up**: The simulation uses your system's temporary directory. While it persists for inspection, remember to clean up large simulations if they accumulate.
