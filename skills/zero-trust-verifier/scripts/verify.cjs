#!/usr/bin/env node

/**
 * zero-trust-verifier/scripts/verify.cjs
 * 
 * Objective, multi-engine verification for code changes.
 * Detects project stack and runs appropriate build/lint/test commands.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const MAX_OUTPUT_LINES = 50;

function log(message) {
  process.stdout.write(message + '\n');
}

function truncateOutput(output) {
  if (!output) return '';
  const lines = output.trim().split('\n');
  if (lines.length > MAX_OUTPUT_LINES) {
    const start = lines.slice(0, MAX_OUTPUT_LINES / 2);
    const end = lines.slice(-MAX_OUTPUT_LINES / 2);
    return [...start, `\n... (truncated ${lines.length - MAX_OUTPUT_LINES} lines) ...\n`, ...end].join('\n');
  }
  return lines.join('\n');
}

function runCommand(command, name) {
  log(`\n[VERIFIER] Running ${name}: ${command}`);
  try {
    const output = execSync(command, { 
      encoding: 'utf8', 
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, CI: 'true' } // Many tools behave better in CI mode
    });
    log(`✅ ${name} PASSED`);
    if (output.trim()) {
      log(truncateOutput(output));
    }
    return true;
  } catch (error) {
    log(`❌ ${name} FAILED`);
    if (error.stdout) {
      log('--- STDOUT ---');
      log(truncateOutput(error.stdout));
    }
    if (error.stderr) {
      log('--- STDERR ---');
      log(truncateOutput(error.stderr));
    }
    return false;
  }
}

function main() {
  const cwd = process.cwd();
  log(`Zero-Trust Verification for: ${cwd}`);

  const checks = [];

  // --- Node.js ---
  if (fs.existsSync(path.join(cwd, 'package.json'))) {
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf8'));
      log('Detected: Node.js');
      if (pkg.scripts) {
        if (pkg.scripts.lint) checks.push({ name: 'npm-lint', command: 'npm run lint' });
        if (pkg.scripts.build) checks.push({ name: 'npm-build', command: 'npm run build' });
        if (pkg.scripts.test) checks.push({ name: 'npm-test', command: 'npm test' });
      }
    } catch (e) {
      log('Error reading package.json');
    }
  }

  // --- Python ---
  const hasPyProject = fs.existsSync(path.join(cwd, 'pyproject.toml'));
  const hasRequirements = fs.existsSync(path.join(cwd, 'requirements.txt'));
  const hasSetupPy = fs.existsSync(path.join(cwd, 'setup.py'));

  if (hasPyProject || hasRequirements || hasSetupPy) {
    log('Detected: Python');
    if (hasPyProject) {
      const pyproject = fs.readFileSync(path.join(cwd, 'pyproject.toml'), 'utf8');
      if (pyproject.includes('[tool.ruff]')) checks.push({ name: 'ruff', command: 'ruff check .' });
      if (pyproject.includes('[tool.mypy]')) checks.push({ name: 'mypy', command: 'mypy .' });
      if (pyproject.includes('[tool.pytest]')) checks.push({ name: 'pytest', command: 'pytest' });
    }
    // Fallback if no specific tools found but it's clearly python
    if (checks.length === 0) {
      checks.push({ name: 'py-compile', command: 'python3 -m compileall .' });
    }
  }

  // --- Rust ---
  if (fs.existsSync(path.join(cwd, 'Cargo.toml'))) {
    log('Detected: Rust');
    checks.push({ name: 'cargo-check', command: 'cargo check' });
    checks.push({ name: 'cargo-test', command: 'cargo test' });
  }

  // --- Go ---
  if (fs.existsSync(path.join(cwd, 'go.mod'))) {
    log('Detected: Go');
    checks.push({ name: 'go-build', command: 'go build ./...' });
    checks.push({ name: 'go-test', command: 'go test ./...' });
  }

  if (checks.length === 0) {
    log('No automated verification steps identified for this project stack.');
    log('Action: Manually verify your changes before completion.');
    process.exit(0);
  }

  let failedCount = 0;
  for (const check of checks) {
    if (!runCommand(check.command, check.name)) {
      failedCount++;
    }
  }

  if (failedCount === 0) {
    log('\n✨ VERIFICATION SUCCESS: All engines report PASS.');
    log('Zero-trust threshold satisfied. You may proceed to completion.');
    process.exit(0);
  } else {
    log(`\n🚨 VERIFICATION FAILURE: ${failedCount} engine(s) reported errors.`);
    log('CRITICAL: Do not claim completion until these issues are resolved.');
    process.exit(1);
  }
}

main();
