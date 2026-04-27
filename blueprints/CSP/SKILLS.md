
# CSP Folder Coordination Skill

Guidelines for working with all artifacts in the CSP folder. This skill coordinates and governs changes across all files in this folder, including architecture definitions, configuration, documentation, and supporting scripts.


## When to Use

Use this skill when:
- Reading, writing, or modifying any file in the CSP folder
- Adding or updating TypeScript domain models, configuration, or documentation
- Coordinating changes that affect multiple artifacts (code, docs, config)
- Ensuring consistency and traceability across the CSP solution


## 1. Know the artifact Types

The CSP folder contains:

| File/artifact                  | Responsibility/Notes                                      |
|-------------------------------|-----------------------------------------------------------|
| `enterprise-architecture.ts`   | Enterprise integration, governance, customer context       |
| `application-domain.ts`        | Bounded-context application responsibilities              |
| `devsecops-domain.ts`          | SDLC, testing, security controls, delivery governance      |
| `data-governance.ts`           | Data policies, retention, classification                   |
| `event-contracts.ts`           | Canonical event schemas and contracts                      |
| `eslint.config.mjs`            | Linting configuration for code quality                     |
| `tsconfig.json`                | TypeScript project configuration                           |
| `package.json`                 | NPM dependencies and scripts                              |
| `README.md`                    | Project overview                                          |
| `README_GOVERNANCE.md`         | Governance patterns and policies                           |
| `README_OPERATION.md`          | Operational considerations                                |

**Before making changes:**
- Identify all artifacts affected by your change
- Check for cross-file dependencies (types, config, docs)
- Ensure updates are reflected in documentation and configuration as needed


## 2. TypeScript and Configuration Consistency

- Use `export type` for discriminated unions and literal types
- Use `export interface` for complex structural types
- Always import types from their defining file
- Keep `tsconfig.json` and `eslint.config.mjs` in sync with codebase structure
- Update `package.json` scripts if build/test/lint steps change


## 3. Follow Existing Patterns

- Match the file and naming conventions already present
- Use JSDoc comments for all exported types, interfaces, and functions
- When adding new artifacts, update relevant documentation files


## 4. Surgical and Coordinated Changes

- Only touch artifacts relevant to your change
- If a change affects multiple files (e.g., a new type and its usage in docs/config), update all in one commit
- Do not refactor unrelated code or documentation
- If you find inconsistencies, mention them in PRs/issues unless asked to fix


## 5. Goal-Driven Artifact Coordination

When introducing new artifacts or making significant changes:
- Define types/interfaces/configuration first
- Update or create documentation to reflect the change
- Ensure build, lint, and test scripts still work
- Coordinate updates across all affected files

Example workflow:
```
1. Define/update types/config → verify: no type/config errors
2. Update code and docs → verify: all references and docs are correct
3. Update scripts/config if needed → verify: build/lint/test pass
4. Commit all related changes together
```


## Additional References

- See `README.md` for project overview
- See `README_GOVERNANCE.md` for governance
- See `README_OPERATION.md` for operations
- See `tsconfig.json`, `eslint.config.mjs`, and `package.json` for configuration
- See `.github/workflows/csp-blueprint-devsecops.yml` for CI/CD, validation, and promotion pipeline
- See `.github/workflows/csp-blueprint-deploy.yml` for deployment contract and environment automation