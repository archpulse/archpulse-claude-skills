---
name: context-slicer
description: Surgically reads specific symbols (functions, classes) from files to minimize context usage. Use when you need to understand or modify a specific part of a large file without reading the entire content.
---

# Context Slicer

The `context-slicer` skill allows you to dynamically curate the exact minimum set of AST nodes needed for a task, hiding the rest of the file. This maximizes context efficiency by avoiding large `read_file` calls.

## Surgical Reading Workflow

When you identify a file that contains a symbol (function, class, variable) you need to examine:

1. **Locate the symbol**: Use `scripts/slice_context.cjs` to find the exact line range for the symbol.
   ```bash
   node /home/user/claude_skills/context-slicer/scripts/slice_context.cjs <file_path> <symbol_name>
   ```
2. **Read the slice**: Execute the `read_file` command suggested by the script.
3. **Verify context**: If the symbol depends on other local symbols, repeat the process for those dependencies.

## Masking & Mental Modeling

"Masking" is the practice of maintaining a mental model of a file's structure without loading its full content into your context window.

### Guidelines for Effective Masking:

- **Trust the Grep**: Use `grep -n` or `grep -C` to see the "neighborhood" of a symbol without reading the whole file.
- **Incremental Discovery**: Only read what you need. If a function calls `helper()`, don't read `helper()` until you actually need to understand its implementation.
- **Skeleton Mapping**: Use `grep -E "function|class"` to get a bird's-eye view of the file's contents (a "skeleton") without the implementation details.
- **Avoid Context Bloat**: Resist the urge to read the whole file "just in case." Large files degrade your performance and precision.

## Resource Reference

### scripts/slice_context.cjs
A Node.js utility that calculates line ranges for symbols in JS, TS, and Python files.
- **Input**: `<file_path> <symbol_name>`
- **Output**: A formatted `read_file` call with `start_line` and `end_line`.
