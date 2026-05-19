---
name: architectural-drift-sentinel
description: A boundary enforcer that prevents and fixes architectural layer violations. Use when adding imports, moving files, or validating structural integrity in DDD/Clean Architecture projects.
---

# Architectural Drift Sentinel

## Killer Concept
A dynamic boundary enforcer that detects and resolves imports violating established architectural layers (e.g., Domain importing Infrastructure).

## When to use this skill
- Before finalizing any change that introduces new dependencies.
- When refactoring code across different modules.
- To resolve circular dependencies.

## Workflow: Boundary Enforcement

Follow these steps to ensure architectural integrity:

### 1. Map Layers
Run `mcp_codepulse_get_layers` to identify the project's layer boundaries (e.g., Domain, Application, Infrastructure) and their dependency rules.

### 2. Audit Violations
Run `mcp_codepulse_get_architecture_violations`. 
- **Interpret:** A violation occurs when an 'inner' layer (e.g., Domain) imports an 'outer' layer (e.g., Infrastructure/API). If 'UserEntity' imports 'DatabaseDriver', that is a violation.
- **Propose Fix:** 
    - **Dependency Inversion:** Move the concrete dependency to an interface.
    - **Interface Extraction:** Move shared logic to a lower-level module.
    - **Relocation:** Move the code to the layer where its dependencies are legal.

### 3. Check for Cycles
Run `mcp_codepulse_find_cycles_for_file` on modified files.
- Circular dependencies are often 'smells' of architectural drift. Break them by extracting shared abstractions or using interfaces.

## Resolution Strategies

| Violation | Strategy |
| :--- | :--- |
| **Domain -> Infrastructure** | **Dependency Inversion:** Define interface in Domain; implement in Infrastructure. |
| **Circular Dependency** | **Abstraction:** Extract common logic to a shared module or use interfaces. |
| **Layer Leakage** | **Relocation:** Move logic to the appropriate layer if it was misplaced. |

Refer to `references/architecture_patterns.md` for detailed pattern implementations.
