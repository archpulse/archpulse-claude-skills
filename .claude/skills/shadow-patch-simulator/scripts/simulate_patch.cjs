#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

/**
 * Shadow Patch Simulator
 * 
 * Runs a simulation of a refactor in a temporary directory.
 * 
 * Input: A JSON file containing:
 * {
 *   "baseDir": string,
 *   "filesToCopy": string[],
 *   "patches": { path: string, content: string }[],
 *   "verifyCommands": string[]
 * }
 */

async function main() {
  const planPath = process.argv[2];
  if (!planPath) {
    console.error("Usage: node simulate_patch.cjs <plan_json_path>");
    process.exit(1);
  }

  let plan;
  try {
    plan = JSON.parse(fs.readFileSync(planPath, 'utf8'));
  } catch (err) {
    console.error(`Failure: Could not read or parse plan file: ${err.message}`);
    process.exit(1);
  }

  const { baseDir, filesToCopy = [], patches = [], verifyCommands = [] } = plan;
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'shadow-patch-'));

  try {
    // 1. Copy relevant files
    for (const relPath of filesToCopy) {
      const src = path.resolve(baseDir, relPath);
      const dest = path.resolve(tempDir, relPath);
      
      if (fs.existsSync(src)) {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        // If it's a directory, we might want to copy recursively, but for simplicity 
        // and to avoid massive copies, we expect individual files.
        // However, if someone passes node_modules, we should probably symlink it.
        if (relPath === 'node_modules' || relPath.endsWith('/node_modules')) {
            fs.symlinkSync(src, dest, 'junction');
        } else {
            fs.copyFileSync(src, dest);
        }
      }
    }

    // 2. Apply patches
    for (const patch of patches) {
      const dest = path.resolve(tempDir, patch.path);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, patch.content, 'utf8');
    }

    // 3. Run verification
    let results = [];
    let successCount = 0;

    for (const cmd of verifyCommands) {
      try {
        const output = execSync(cmd, { cwd: tempDir, stdio: 'pipe', encoding: 'utf8' });
        results.push({ cmd, status: 'passed', output: output.slice(-500) });
        successCount++;
      } catch (err) {
        results.push({ cmd, status: 'failed', output: err.stdout ? err.stdout.slice(-500) : err.message });
      }
    }

    // 4. Calculate Confidence Score
    const confidenceScore = verifyCommands.length > 0 
      ? Math.round((successCount / verifyCommands.length) * 100) 
      : 100;

    // Output results
    const output = {
      tempDir,
      confidenceScore,
      results,
      summary: `Simulation complete. Confidence Score: ${confidenceScore}% (${successCount}/${verifyCommands.length} checks passed).`
    };

    process.stdout.write(JSON.stringify(output, null, 2) + '\n');

  } catch (err) {
    process.stderr.write(`Failure: ${err.message}\n`);
    process.exit(1);
  }
}

main();
