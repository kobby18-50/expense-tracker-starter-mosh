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
- **All of the app lives in one component, `src/App.jsx`**: the seed transaction data, the form state for adding transactions, the type/category filters, the summary totals (income, expenses, balance), and the transactions table. Everything is held in local `useState`. Nothing is saved, so changes are lost on reload.
- Styles: global styles are in `src/index.css`; component styles are in `src/App.css`, using plain class names (`.summary-card`, `.income-amount`, etc.).
- The category list is hardcoded in `App.jsx` and used by both the add form and the category filter.

## Known gotchas in the starter code

- Transaction `amount` values are stored as **strings**, both in the seed data and from the form input. Because of this, the `reduce` that computes the totals concatenates the strings instead of adding the numbers. Convert to numbers whenever you do arithmetic.
- The seed data isn't consistent. For example, "Freelance Work" has `type: "expense"` but `category: "salary"`.
- ESLint's `no-unused-vars` rule ignores names that start with an uppercase letter or `_`.
