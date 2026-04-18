# CLAUDE.md

This file provides guidance for AI assistants (Claude Code and similar tools) working in this repository.

## Repository Overview

**Repository:** `petesbot/SPRINT`
**Status:** Freshly initialized — no application code exists yet. Update this file as the codebase grows.

---

## Development Branch Convention

Always develop on feature branches. The default integration branch is `main`.

```bash
# Create a new feature branch
git checkout -b <type>/<short-description>

# Push and track remote
git push -u origin <branch-name>
```

Branch naming: `<type>/<kebab-case-description>` — e.g. `feat/user-auth`, `fix/login-crash`, `chore/update-deps`.

---

## Commit Message Convention

Use the Conventional Commits format:

```
<type>(<optional scope>): <short imperative summary>

<optional body explaining WHY, not WHAT>
```

Common types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `ci`.

- Subject line ≤ 72 characters, lowercase after the type prefix.
- Body only when the "why" is non-obvious.
- No trailing period on the subject line.

---

## Git Workflow

1. Branch from `main` for every change.
2. Commit atomically — one logical change per commit.
3. Push with `git push -u origin <branch-name>`.
4. Open a pull request against `main`; do not push directly to `main`.
5. Never force-push to `main`.

---

## General Coding Conventions

These apply regardless of the language/framework chosen as the project grows:

- **No speculative code.** Don't add abstractions, helpers, or error-handling paths that aren't required by the current task.
- **No comments that restate the code.** Only comment when the *why* is non-obvious (hidden constraints, surprising behaviour, workarounds for specific bugs).
- **Validate only at system boundaries** (user input, external APIs). Trust internal function contracts and framework guarantees.
- **Prefer editing existing files** to creating new ones. Delete dead code rather than commenting it out.
- **No backwards-compat shims** unless explicitly required.

---

## Security Practices

- Never commit secrets, credentials, `.env` files, or API keys.
- Validate and sanitize all user-supplied input at system boundaries.
- Avoid introducing OWASP Top 10 vulnerabilities (SQLi, XSS, command injection, etc.).
- Use environment variables for configuration; provide a `.env.example` with placeholder values.

---

## Pull Requests

- Only create a PR when explicitly asked.
- PR title: short (≤ 70 chars), imperative, matches the commit convention.
- PR body should include a summary, test plan, and any relevant context.

---

## AI Assistant Instructions

- Read this file at the start of every session to orient yourself.
- Update this file when codebase structure, tooling, or conventions change.
- Do not push to `main` directly — always use a feature branch.
- Do not open a PR unless the user explicitly requests it.
- Prefer small, reversible changes; confirm before destructive operations.
- When the project gains a language/framework/test runner, add a dedicated section below.

---

## Project-Specific Sections (add as the project grows)

Once the stack is chosen, add sections covering:

- **Tech Stack** — languages, frameworks, key libraries and their versions.
- **Project Structure** — directory layout and what lives where.
- **Local Setup** — prerequisites and `getting started` steps.
- **Running Tests** — how to run the test suite and what the CI gate requires.
- **Linting & Formatting** — tools used and how to run them.
- **Database / Migrations** — schema management workflow.
- **Environment Variables** — list of required vars and where to set them.
- **Deployment** — how to deploy and which environments exist.
