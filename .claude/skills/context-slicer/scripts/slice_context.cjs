#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

const filePath = process.argv[2];
const symbol = process.argv[3];

if (!filePath || !symbol) {
  console.error('Usage: node slice_context.cjs <file_path> <symbol>');
  process.exit(1);
}

try {
  // Find the start line using grep
  // We look for common patterns: function name, class name, const name, etc.
  // Using -n to get line number
  const grepCommand = `grep -nE "(\\bfunction\\b|\\bclass\\b|\\bconst\\b|\\blet\\b|\\bvar\\b|\\bdef\\b)\\s+${symbol}\\b" "${filePath}"`;
  let grepOutput;
  try {
    grepOutput = execSync(grepCommand, { encoding: 'utf8' });
  } catch (e) {
    console.error(`Symbol "${symbol}" not found in ${filePath}`);
    process.exit(1);
  }

  const matches = grepOutput.trim().split('\n');
  if (matches.length === 0) {
    console.error(`Symbol "${symbol}" not found in ${filePath}`);
    process.exit(1);
  }

  // Take the first match
  const [lineNumStr, ...contentParts] = matches[0].split(':');
  const startLine = parseInt(lineNumStr, 10);
  const content = contentParts.join(':');

  // Determine language by extension
  const ext = filePath.split('.').pop();
  let endLine = startLine;

  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  const totalLines = lines.length;

  if (['py'].includes(ext)) {
    // Python indentation-based slicing
    const firstLine = lines[startLine - 1];
    const baseIndentation = firstLine.match(/^\s*/)[0].length;
    
    for (let i = startLine; i < totalLines; i++) {
      const line = lines[i];
      if (line.trim() === '') continue;
      const currentIndentation = line.match(/^\s*/)[0].length;
      if (currentIndentation <= baseIndentation && !line.trim().startsWith('#')) {
        break;
      }
      endLine = i + 1;
    }
  } else {
    // Brace-based slicing (JS, TS, C, etc.)
    let braceCount = 0;
    let started = false;
    
    for (let i = startLine - 1; i < totalLines; i++) {
      const line = lines[i];
      for (let j = 0; j < line.length; j++) {
        if (line[j] === '{') {
          braceCount++;
          started = true;
        } else if (line[j] === '}') {
          braceCount--;
        }
      }
      endLine = i + 1;
      if (started && braceCount <= 0) {
        break;
      }
    }
  }

  console.log(`Suggested command:`);
  console.log(`read_file(file_path="${filePath}", start_line=${startLine}, end_line=${endLine})`);

} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}
