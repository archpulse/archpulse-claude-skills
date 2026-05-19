# Architecture Patterns & Boundaries

Use these patterns to resolve violations identified by the `architectural-drift-sentinel`.

## 1. The Dependency Rule (Clean Architecture)
Dependencies flow **inwards** only.
- **Entities/Domain:** Core business logic. Zero external dependencies.
- **Use Cases/Application:** Orchestrates entities. Depends only on Domain.
- **Interface Adapters:** Repositories, Controllers. Depends on Domain/Application.
- **Infrastructure:** External tools (DB, Email). Depends on all inner layers.

## 2. Dependency Inversion Principle (DIP)
Use this to break **Domain -> Infrastructure** violations.

**Violation:** `Domain/UserService.ts` imports `Infrastructure/SqlRepo.ts`.
**Fix:**
1. Create interface `Domain/UserRepository.ts`.
2. `Domain/UserService.ts` depends on the interface.
3. `Infrastructure/SqlRepo.ts` implements the interface.
4. Inject the implementation at the application root.

## 3. Interface Extraction
Use this to break **Circular Dependencies**.

**Violation:** `Module A` <-> `Module B`.
**Fix:** 
1. Identify the shared types or logic.
2. Extract them into a `Module C` (or `Shared/Contracts`).
3. Both `Module A` and `Module B` import from `Module C`.

## 4. Layer Definitions (DDD)
- **Domain:** Pure logic, Entities, Value Objects, Domain Events.
- **Application:** Use Cases, DTOs, Command Handlers.
- **Infrastructure:** Persistence, External API clients, Loggers.
- **Presentation:** UI, Web Controllers, CLI.
