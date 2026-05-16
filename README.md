# Superleap Lead CRM

A clean, scalable Lead Management CRM built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui.

## Demo Video Link

https://www.loom.com/share/99f4fc5ae8344bc0940343223a95df3c

## Tech Stack

- **Framework**: Next.js 16 with App Router — provides file-based routing, server components, and a modern React foundation.
- **Language**: TypeScript with strict mode — catches errors at compile time and provides excellent DX.
- **Styling**: Tailwind CSS — utility-first CSS for rapid, consistent styling.
- **UI Components**: shadcn/ui + Radix UI primitives — accessible, composable components.
- **State Management**: TanStack Query — handles server state (caching, loading, error states) declaratively.
- **Forms**: react-hook-form — performant form handling with minimal re-renders.
- **Drag and Drop**: @hello-pangea/dnd — a maintained fork of react-beautiful-dnd that works with React 18 out of the box. Chose it over @dnd-kit because the API is simpler for a straightforward column-based board, and I didn't need the low-level control dnd-kit offers. Gets out of the way and just works.
- **Icons**: Lucide React — clean, consistent icon set.

## Project Structure

```
src/
  app/                    # Next.js App Router pages
    board/                # Kanban board view
    leads/                # Leads list
    leads/new/            # Create lead form
    leads/[id]/           # View lead detail
    leads/[id]/edit/      # Edit lead form
  modules/leads/          # Lead feature module
    components/           # Lead-specific components
    hooks/                # TanStack Query hooks and Lead specific hooks
    types.ts              # Lead types & status logic
  components/
    ui/                   # shadcn/ui components
    layout/               # Sidebar, TopBar, AppShell
    data-table/           # Generic reusable table
  services/               # API service layer
  hooks/                  # Shared hooks (toast, search params)
  lib/                    # Utilities (cn helper)
```

## Running Locally

### Prerequisites

- Node.js 18+
- The mock API server running on `http://localhost:4000`

### Setup

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm start
```

## Architecture Decisions

### Component Organization

Components are organized by responsibility:

- **Route-level pages** live in `app/` and handle data fetching orchestration.
- **Feature-specific components** live in `modules/leads/components/`.
- **Generic reusable components** like `DataTable` live in `components/`.
- **UI primitives** (Button, Input, Dialog, etc.) live in `components/ui/`.

### State Separation

- **Server state** (leads data) is managed by TanStack Query in `modules/leads/hooks/useLeads.ts`.
- **UI state** (search, filters, dialog open/close) is managed locally with `useState`.
- **Form state** is managed by react-hook-form with its own validation.
- **URL state** for filters/search is synced via `useSearchParamsState` hook.

### Status Rules Enforcement

Status transition logic is centralized in `modules/leads/lib/status-machine.ts`:

- `getValidTransitions(current)` returns only valid next statuses.
- `isTerminalStatus(status)` checks if a lead is locked.
- The `StatusTransition` component only renders valid transitions.
- Terminal leads (CONVERTED/LOST) show a "Locked" indicator with no actions offered.

### What I'd Do Differently

**Offline support**: Add a service worker with background sync. Queue mutations locally and sync when online. Use IndexedDB for local caching.

**Concurrent edits**: Implement optimistic concurrency control with ETags. Show a "someone else edited this" warning and offer merge options.

**With another week**: Add pagination/infinite scroll, bulk actions, data export, and activity history per lead.

## AI Usage

Used Claude, ChatGPT, and Kimi throughout... mainly for boilerplate, component API lookups, and thinking through architecture tradeoffs. The status transition logic, state structure, and component boundaries I worked out myself, rewriting most generated code to fit my actual intent. I also refactored a major portion of generated code and make it reusable. AI handled the mechanical parts; judgment calls stayed mine.
