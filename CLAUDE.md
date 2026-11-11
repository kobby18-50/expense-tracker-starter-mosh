# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

This is the starter project for the Code with Mosh Claude Code course: a basic React expense tracker that **intentionally** has a bug, a poor UI, and messy code, all meant to be fixed during the course. Expect to find these problems on purpose. Don't treat them as conventions to keep.

## Commands

```bash
npm install       # install dependencies
npm run dev       # Vite dev server at http://localhost:5173
npm run build     # production build to dist/
npm run preview   # serve the production build
npm run lint      # ESLint (flat config in eslint.config.js)
```

There is no test framework set up yet, so there are no test commands.

## Architecture

- Stack: React 19 + Vite 7, plain JavaScript (JSX), no TypeScript, no router, no state library, no backend.
- Entry: `index.html` → `src/main.jsx` (mounts `<App />` in `StrictMode`) → `src/App.jsx`.
- Components (all in `src/`, one default-exported function component per file):
  - `App.jsx`: owns the `transactions` state (seeded with sample data) and the module-level `categories` constant. Passes them down and adds new transactions through `handleAdd`. It holds no other state.
  - `Summary.jsx`: takes `transactions` and works out income, expenses, and balance itself, then renders the three summary cards.
  - `TransactionForm.jsx`: takes `categories` and `onAdd`. Owns its own input state, builds the new transaction object (id, numeric amount, today's date), calls `onAdd`, then resets the inputs.
  - `TransactionList.jsx`: takes `transactions` and `categories`. Owns the type/category filter state and renders the filters and the transactions table.
- Data flows one way: state lives in `App`, children get it through props, and the form reports new transactions back through a callback. Values that can be computed (totals, filtered list) are worked out during render, not stored in state.
- Everything is held in `useState`. Nothing is saved, so changes are lost on reload.
- Styles: global styles are in `src/index.css`; component styles are in `src/App.css` (imported once by `App.jsx`), using plain class names (`.summary-card`, `.income-amount`, etc.) shared by all components.
- Transaction shape: `{ id, description, amount: number, type: "income" | "expense", category, date: "YYYY-MM-DD" }`. Keep `amount` a number. The form input value is a string, so it's converted with `Number()` when the transaction is created.

## Known gotchas

- The seed data isn't consistent. For example, "Freelance Work" has `type: "expense"` but `category: "salary"`.
- ESLint's `no-unused-vars` rule ignores names that start with an uppercase letter or `_`.
