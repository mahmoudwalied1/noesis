# Noēsis Backend Rules

## Core behavior
- Always prefer implementation over planning.
- Implement directly in the repository; do not stop at high-level design.
- Preserve existing good code and avoid unnecessary rewrites.
- Keep the backend modular, typed, and production-minded.
- If a choice is ambiguous, choose sensible defaults and continue.

## Stack expectations
- Use TypeScript, Express, Prisma, PostgreSQL, Redis, BullMQ, and Zod unless the repository already has a strongly established compatible alternative.
- Use clean architecture by module.
- Keep prompts and AI logic out of controllers; place them in dedicated services/templates.
- Update README and `.env.example` whenever configuration changes.

## Build-agent workflow
- The primary implementation agent is Codex.
- Codex should implement the requested phase fully before moving to the next phase.
- Codex must create and modify files, wire dependencies, add migrations, add tests, and keep the project runnable.
- Codex should not stop at a plan unless explicitly asked for planning only.

## Review-agent workflow
- After each implementation phase, a review agent may inspect the resulting code.
- Treat the review agent as a strict code reviewer focused on correctness, architecture, maintainability, missing logic, security, validation, testing gaps, and production readiness.
- The review agent should identify:
  - bugs
  - incomplete implementations
  - weak architecture decisions
  - missing validation
  - missing tests
  - risky security issues
  - broken or unclear developer experience
  - documentation gaps
- The review agent should clearly separate:
  - critical fixes
  - recommended improvements
  - optional polish

## How review results must be presented
- After implementation, provide a concise implementation summary.
- Then provide a review summary in a structured way:
  1. What is good
  2. What must be fixed
  3. What should be improved
  4. What is optional
- When issues are found, present them as an actionable checklist.

## Edit-approval workflow
- If the review finds issues, do not silently rewrite everything.
- First show the review findings clearly.
- Then explicitly give the user the option to:
  - apply all critical fixes
  - apply critical fixes plus recommended improvements
  - apply selected fixes only
  - keep current implementation unchanged
- If the user chooses to apply fixes, Codex should make the edits directly in the repository.

## Review output format
When a review is performed, use this exact structure:

### Review verdict
- Pass / Pass with fixes / Needs revision

### Critical fixes
- [ ] item
- [ ] item

### Recommended improvements
- [ ] item
- [ ] item

### Optional polish
- [ ] item
- [ ] item

### Next action
State clearly whether the user wants Codex to:
1. apply critical fixes only
2. apply critical + recommended fixes
3. apply all fixes
4. make no changes

## Quality bar
- All AI-generated outputs must be validated with schemas where possible.
- RAG-backed responses must return citations when retrieval is used.
- Study plans should use prerequisite relationships when available.
- Add tests for every major module.
- Keep code readable, strongly typed, and maintainable.
- Avoid placeholder implementations for major features unless blocked by external secrets or services.