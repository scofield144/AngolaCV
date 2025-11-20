# Loneus - The Modern CV Platform for Angola

Loneus is a comprehensive web application designed to bridge the gap between job seekers and recruiters in the Angolan job market. It provides a suite of powerful tools for creating professional CVs, managing job applications, and connecting with potential employers.

## Key Features

The platform is divided into two main account types, each with a tailored set of features.

### For Job Seekers (Personal Accounts)

- **CV Editor**: A guided, 5-step form to build a comprehensive professional profile. Users can input personal data, professional experience, education, skills, and languages.
- **My Library**: A central dashboard to manage, edit, and delete all created CVs and cover letters.
- **Job Board**: Users can browse and search for job opportunities posted on the platform.
- **Application Tracking**: A dedicated page to keep track of the status of all job applications in one place (e.g., Applied, Under Review, Interviewing).
- **Cover Letter Builder**: A simple yet effective editor to create, write, and save custom cover letters for job applications.
- **Settings**: Manage account preferences, including the option to make the user's profile visible and searchable by recruiters.

### For Recruiters (Company Accounts)

- **Advanced Candidate Search**: A powerful search interface with filters for keywords, skills, location (Angolan provinces), and industry to find the best talent.
- **Company Profile Management**: A section for recruiters to create and manage their public-facing company profile, including logo, company details, and social links to attract candidates.
- **Job Postings Management**: A dedicated section to view and manage job listings. (Note: Job creation UI is not yet implemented).

## Tech Stack

This project is built with a modern, robust, and scalable technology stack:

- **Framework**: [Next.js](https://nextjs.org/) (using the App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Backend & Authentication**: [Firebase](https://firebase.google.com/) (Firestore for database, Firebase Authentication for user management)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for robust validation
- **Icons**: [Lucide React](https://lucide.dev/)

## Project Structure

The codebase is organized into a modular and maintainable structure to facilitate development and scaling.

```
/src
├── app/               # Next.js App Router pages and layouts
│   ├── (auth)/        # Routes for authentication (login, signup)
│   └── dashboard/     # Protected dashboard routes for authenticated users
├── components/        # Reusable React components
│   ├── dashboard/     # Components specific to the dashboard layout (e.g., nav, header)
│   └── ui/            # Core UI components from ShadCN (Button, Card, etc.)
├── firebase/          # Firebase configuration, providers, and custom hooks
├── hooks/             # Custom React hooks (e.g., useUserProfile)
└── lib/               # Utility functions and shared libraries
```

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

Install the required npm packages.

```bash
npm install
```

### 3. Set Up Environment Variables

The project uses Firebase for its backend. You will need to create a Firebase project and get your configuration credentials.

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Create a new project.
3.  In your project, add a new Web App.
4.  Firebase will provide a `firebaseConfig` object. Copy this object.
5.  Update the contents of `src/firebase/config.ts` with your project's configuration. This file is already created in the project, you just need to paste your credentials.

### 4. Run the Development Server

This command starts the main web application.

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).
