# The Daily Grind Innovation Hub (TDGH) — Digital Ecosystem
> Business incubation centre and Business Management System (BMS) SaaS platform.

Enterprise monorepo powering **The Daily Grind Innovation Hub (TDGH)** in Scottsville, Kraaifontein. Designed with an editorial high-contrast aesthetic to empower youth from job seekers into job creators.

## Topology

* **`apps/web` (`dailygrindhub.co.za`)**: Public marketing platform, interactive co-working floorplan, 3D printing additive manufacturing simulator, Codetrepreneurs live typing terminal & Git commit tree, cohort directory, applicant onboarding wizard, and ticketing intake.
* **`apps/admin` (`admin.dailygrindhub.co.za`)**: Staff control room, department-level inquiry triage kanban & detail view, cohort applicant scoring funnel, cohort CRUD manager, team CMS, and floor plan CMS.
* **`apps/bms` (`*.dailygrindhub.co.za`)**: Incubatee venture workspace with 9-box Business Model Canvas (BMC), 10-week pre-incubation roadmap, financial runway / KPIs, and compliance document vault.
* **`packages/ui`**: Shared design system built with Tailwind CSS, Lucide icons, and Radix primitives.
* **`packages/db`**: Relational database models (Prisma ORM / PostgreSQL) and mock data seed generators.
* **`packages/types`**: Single source of truth TypeScript domain interfaces.
* **`packages/config`**: Shared Tailwind, TSConfig, and ESLint configurations.

## Quick Start

```bash
# Install dependencies
pnpm install

# Run all applications concurrently
pnpm dev

# Or run specific applications
pnpm dev:web    # http://localhost:3000
pnpm dev:admin  # http://localhost:3001
pnpm dev:bms    # http://localhost:3002

# Typecheck & Build
pnpm typecheck
pnpm build
```

