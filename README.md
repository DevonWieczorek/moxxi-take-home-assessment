# Benefits Access Center

A Next.js application for helping users find unclaimed money through a multi-step onboarding flow and survey.

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **React**: 19.2.3
- **TypeScript**: 5.9.3
- **Styling**: Tailwind CSS 4 + CSS Modules + Global CSS
- **Animations**: Framer Motion 12.23.26
- **Fonts**: Google Fonts (Lato, Fira Sans, Inter) via `next/font`

## Getting Started

### Prerequisites

- Node.js (v20 or higher recommended)
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── survey/        # Survey questions endpoint
│   │   └── users/         # User lookup and update endpoints
│   ├── components/        # Page-specific components
│   ├── register/          # Registration flow (steps 2-4)
│   ├── survey/            # Survey flow (step 5+)
│   ├── layout.tsx         # Root layout with fonts and global components
│   └── page.tsx           # Home page (step 1: email lookup)
├── components/             # Shared UI components
│   ├── forms/             # Form field components
│   └── ...
├── lib/                    # Core application logic
│   ├── contexts/          # React Context providers
│   ├── forms/             # Form utilities and types
│   ├── hooks/             # Custom React hooks
│   ├── survey/            # Survey types and constants
│   └── utils.tsx          # Utility functions
├── styles/                # Global styles
│   └── globals.css        # Tailwind + global CSS
└── public/                # Static assets
```

## Architectural Decisions

### State Management

**Decision**: React Context API instead of Redux/Zustand

- **Rationale**: The application has a relatively simple state structure with three main domains (user, progress, survey). Context API provides sufficient state management without additional dependencies.
- **Implementation**: Three context providers:
  - `UserContext`: Manages user information and API calls
  - `ProgressContext`: Tracks current step in the multi-step flow
  - `SurveyContext`: Manages survey questions and answers

### Data Persistence

**Decision**: localStorage for client-side persistence

- **Rationale**: Provides offline capability and maintains user progress across page refreshes without requiring a database for the initial flow.
- **Storage Keys**:
  - `userInfo`: User data (email, personal info)
  - `surveyQuestions`: Survey questions cache
  - `surveyCurrentQuestion`: Current question index
  - `surveyAnswers`: User's survey responses
- **Note**: API routes are currently mocked and ready for database integration. See `app/api/users/route.ts` for TODO comments.

### Routing Strategy

**Decision**: File-based routing with programmatic navigation

- **Flow**:
  1. `/` - Email lookup (Step 1)
  2. `/register` - Registration form (Steps 2-4)
  3. `/survey` - Survey questions (Step 5+)
- **Protection**: `useRequireEmail` hook redirects to home if email is not set
- **Navigation**: Uses Next.js `useRouter` for programmatic navigation after validation

### Styling Approach

**Decision**: Hybrid styling with Tailwind CSS 4, CSS Modules, and Global CSS

- **Tailwind CSS 4**: Utility classes for layout and responsive design
- **CSS Modules**: Component-scoped styles (import as `styles` plural, e.g., `import styles from './Button.module.css'`)
- **Global CSS**: Typography, color variables, and shared design tokens
- **Font Loading**: Optimized via `next/font` with CSS variables (`--font-lato`, `--font-fira-sans`, `--font-inter`)

### Form Handling

**Decision**: Custom hooks for form logic

- **`useFormStep`**: Common form step functionality (field changes, submission, step progression)
- **`useRequireEmail`**: Route protection hook that ensures email is set before allowing access to protected pages
- **Validation**: Client-side validation with error state management in contexts

### Step Transitions

**Decision**: Animated step transitions using Framer Motion

- **Component**: `StepTransition` handles slide-in/slide-out animations
- **Height Management**: Uses ResizeObserver to maintain container height during transitions
- **Performance**: Only renders steps that have been active (prevents unnecessary DOM nodes)

### Type Safety

**Decision**: TypeScript with strict mode enabled

- **Path Aliases**: `@/*` maps to project root (configured in `tsconfig.json`)
- **Type Definitions**: Centralized in `lib/types.ts` and domain-specific type files
- **Context Types**: All contexts have proper TypeScript interfaces

## Key Features

### Multi-Step Form Flow

The application uses a step-based progression system:

1. **Step 1** (`/`): Email lookup - User enters email, system looks up or creates user
2. **Steps 2-4** (`/register`): Registration form - Personal information collection
3. **Step 5+** (`/survey`): Survey questions - Dynamic question flow

Progress is tracked via `ProgressContext` and displayed in the `ProgressArea` component.

### Survey System

- Questions are fetched from `/api/survey` endpoint
- Questions and answers are persisted to localStorage
- Automatic progression to next question after answer selection
- Survey state is preserved across page refreshes

### Error Handling

- Error state managed in `UserContext`
- `ErrorContent` component displays errors consistently across pages
- Errors are cleared when user interacts with forms

## API Routes

### `/api/users`

- **POST**: Lookup or create user by email
  - Body: `{ email: string }`
  - Returns: `{ user: UserInfo, exists: boolean }`
- **PUT**: Update user information
  - Body: `UserInfo` object
  - Returns: `{ user: UserInfo }`

**Status**: Currently returns mock data. Database integration TODOs are documented in the route file.

### `/api/survey`

- **GET**: Fetch survey questions
  - Returns: `{ questions: SurveyQuestion[] }`
  - Questions are defined in `lib/survey/constants.ts`

## Important Notes for Developers

### CSS Modules Import Convention

**Always import CSS Modules as `styles` (plural)**:

```tsx
import styles from './Button.module.css';
```

This is a project convention to distinguish CSS Modules from other imports.

### City Field

The city field should be an **open text input**, not a dropdown or autocomplete.

### Context Provider Nesting

Context providers must be nested in the correct order:

```tsx
<UserProvider>
  <ProgressProvider>
    <SurveyProvider>
      {/* Your content */}
    </SurveyProvider>
  </ProgressProvider>
</UserProvider>
```

### Step Initialization

`ProgressProvider` accepts an `initialStep` prop to set the starting step for different pages:
- Home page: Default (step 1)
- Register page: `initialStep={2}`
- Survey page: `initialStep={4}`

### localStorage Considerations

- All localStorage operations check for `typeof window !== 'undefined'` to support SSR
- Data is automatically synced on mount and on changes
- Invalid stored data is caught and removed to prevent errors

### Animation Performance

`StepTransition` uses several optimizations:
- Only renders steps that have been active
- Skips initial animation if step is already active on mount
- Uses ResizeObserver for efficient height tracking

## Future Improvements

1. **Database Integration**: Replace mock API responses with actual database queries (see TODOs in `app/api/users/route.ts`)
2. **Email Validation**: Add proper email validation (currently basic check)
3. **Form Validation**: Add comprehensive validation rules for all form fields
4. **Error Boundaries**: Add React error boundaries for better error handling
5. **Testing**: Add unit and integration tests
6. **Accessibility**: Enhance ARIA labels and keyboard navigation

## Environment Variables

Currently, no environment variables are required. When integrating a database, you'll need to add:

- Database connection string
- API keys (if applicable)

## Deployment

The application is ready for deployment on Vercel or any Node.js hosting platform:

```bash
npm run build
npm start
```

Ensure Node.js 20+ is available in your deployment environment.
