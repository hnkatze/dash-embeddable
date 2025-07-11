# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based web application designed to embed dashboard widgets from Embeddable.com. The project uses Astro 5.11.0 with Tailwind CSS v4.

## Essential Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

### Technology Stack
- **Framework**: Astro 5.11.0 (static site generator)
- **Styling**: Tailwind CSS v4 (using @tailwindcss/vite)
- **Build Tool**: Vite (integrated with Astro)
- **Module System**: ESM (`"type": "module"`)

### Project Structure
- `/src/pages/` - Routes (file-based routing)
- `/src/components/` - Reusable Astro components
- `/src/layouts/` - Page layouts (Layout.astro wraps all pages)
- `/src/styles/` - Global styles (Tailwind imports in global.css)
- `/public/` - Static assets served directly

### Key Integration
The application integrates with Embeddable.com's widget system:
- External script loaded from `https://embed.embeddable.com/js/v1/`
- Custom web component `<em-beddable>` used in pages
- Widget configuration passed via `data-*` attributes

### Astro-Specific Patterns
- Components use `.astro` file format with frontmatter scripts
- Pages in `/src/pages/` automatically become routes
- Layouts wrap page content for consistent structure
- Static assets in `/public/` are served at root path