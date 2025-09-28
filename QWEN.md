# Project-Specific Qwen Code Configuration

This file contains project-specific settings and preferences for Qwen Code interactions within this project.

## Project Context

### Project Name
Fernando - A Next.js-based web application

### Technology Stack
- Framework: Next.js 14+ (App Router)
- Language: TypeScript
- Package Manager: pnpm
- Styling: Tailwind CSS
- Linting: Biome
- Environment: Node.js

### Project Structure
- `/app` - Next.js App Router pages and components
- `/components` - Reusable React components
- `/lib` - Utility functions and business logic
- `/public` - Static assets
- `/styles` - Global styles and CSS modules

## Coding Preferences

### Style Guide
- Follow existing code style and patterns in the project
- Use TypeScript for all new files
- Maintain consistency with existing component patterns
- Use semantic HTML and proper accessibility attributes

### File Organization
- Place components near where they're used when possible
- Keep utility functions in `/lib` directory
- Group related functionality together
- Use descriptive names that clearly indicate purpose

### Component Development
- Use React Server Components where possible for better performance
- Implement proper error boundaries
- Follow accessibility best practices
- Optimize for Core Web Vitals

## API and Integration Notes
- API routes follow Next.js convention in `/app/api`
- Environment variables are managed with .env files
- Integrations follow Next.js patterns

## Project-Specific Instructions
- Maintain existing folder structure and conventions
- Follow existing patterns for data fetching
- Prioritize performance and user experience
- Ensure responsive design across all components
- Consider internationalization where applicable