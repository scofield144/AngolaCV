
# Loneus - The Modern CV Platform for Angola

Loneus is a comprehensive web application designed to bridge the gap between job seekers and recruiters in the Angolan job market. It provides a suite of powerful tools for creating professional CVs, optimizing them for Applicant Tracking Systems (ATS), and connecting with potential employers.

## Tech Stack

This project is built with a modern, robust, and scalable technology stack:

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Backend & Auth**: [Firebase](https://firebase.google.com/) (Authentication, Firestore)
- **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit) (for AI-powered features)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
- **Icons**: [Lucide React](https://lucide.dev/)

## Key Features

### For Job Seekers (Personal Accounts)

- **AI-Powered CV Editor**: A guided, 5-step form to build a comprehensive professional profile, with AI suggestions for content tailored to the Angolan market.
- **My Library**: A central dashboard to manage, edit, and delete all created CVs and cover letters.
- **ATS Compatibility Checker**: An AI-driven tool to analyze CV content and provide a score and actionable feedback to improve its chances of passing through automated screening systems.
- **Job Board**: Browse and search for job opportunities posted on the platform.
- **Application Tracking**: Keep track of the status of all your job applications in one place.
- **Settings**: Manage account preferences, such as profile visibility to recruiters.

### For Recruiters (Company Accounts)

- **Advanced Candidate Search**: A powerful search interface with filters for keywords, skills, location, and industry to find the best talent.
- **Company Profile**: Create and manage a public-facing company profile to attract candidates.
- **Job Postings Management**: A dedicated section to create, view, and manage job listings.

## Project Structure

The codebase is organized to be modular and maintainable.

```
/src
├── ai/                # Genkit flows and AI-related logic
│   ├── flows/
│   └── genkit.ts
├── app/               # Next.js App Router pages and layouts
│   ├── (auth)/        # Routes for authentication (login, signup)
│   └── dashboard/     # Protected dashboard routes and pages
├── components/        # Reusable React components
│   ├── dashboard/     # Components specific to the dashboard layout
│   └── ui/            # ShadCN UI components
├── firebase/          # Firebase configuration, hooks, and providers
├── hooks/             # Custom React hooks (e.g., useUserProfile)
└── lib/               # Utility functions and type definitions
```

## Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

The project uses Firebase for backend services. You will need to create a Firebase project and obtain your configuration credentials.

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Create a new project.
3.  Add a new Web App to your project.
4.  Copy the `firebaseConfig` object.
5.  Update the contents of `src/firebase/config.ts` with your project's configuration.

### 4. Run the Development Server

The application consists of the Next.js frontend and the Genkit AI development server. Run them in separate terminals.

**Terminal 1: Run the Next.js App**

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).

**Terminal 2: Run the Genkit AI Server**

```bash
npm run genkit:watch
```

This starts the Genkit development server, which makes the AI flows available for the Next.js application to call. The Genkit UI will be available at [http://localhost:4000](http://localhost:4000).
