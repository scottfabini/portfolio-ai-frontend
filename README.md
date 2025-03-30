# Portfolio AI Frontend

A modern portfolio website built with Next.js and Tailwind CSS, showcasing my professional experience, skills, projects, and a demo Todo application.

## Tech Stack

- **Next.js 14**: Utilizing the App Router for efficient client-side navigation
- **React 18**: Component-based UI with hooks for state management
- **TypeScript**: Type-safe code to ensure reliability and better development experience
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Framer Motion**: Animation library for smooth transitions and effects
- **Next Themes**: Dark mode support with theme switching

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode**: Elegant dark theme with light mode option
- **Hero Section**: Engaging introduction with animated elements
- **Experience Timeline**: Showcase of professional history
- **Project Gallery**: Visual grid of projects with details
- **Skills Section**: Categorized list of technical skills
- **Todo App**: Functional CRUD application demonstrating backend integration
- **Smooth Animations**: Page transitions and scroll animations

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/scottfabini/portfolio-ai-frontend.git
cd portfolio-ai-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

```
frontend/
├── app/                   # Next.js app router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   └── todo/              # Todo application page
├── components/            # Reusable components
│   ├── About.tsx          # About section
│   ├── Education.tsx      # Education section
│   ├── Experience.tsx     # Experience timeline
│   ├── Hero.tsx           # Hero banner
│   ├── Navbar.tsx         # Navigation bar
│   ├── Projects.tsx       # Projects gallery
│   ├── Skills.tsx         # Skills section
│   ├── ThemeProvider.tsx  # Dark mode provider
│   └── Todo.tsx           # Todo application component
├── public/                # Static assets
│   └── images/            # Project and section images
├── styles/                # Additional styles
│   └── globals.css        # Global CSS imports
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Development

### Code Style

This project uses TypeScript and follows modern React best practices:
- Functional components with hooks
- TypeScript interfaces for props and data structures
- Tailwind CSS utility classes for styling

### API Integration

The Todo application integrates with a Spring Boot backend with the following endpoints:
- `GET /api/todos`: Fetch all todos
- `POST /api/todos`: Create a new todo
- `GET /api/todos/:id`: Fetch a specific todo
- `PUT /api/todos/:id`: Update a todo
- `PATCH /api/todos/:id/toggle`: Toggle todo completion status
- `DELETE /api/todos/:id`: Delete a todo

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm start
# or
yarn start
```

## Deployment

This project is configured for deployment on AWS Amplify:

1. Connect your repository to AWS Amplify
2. Configure the build settings:
   - Build command: `npm run build`
   - Output directory: `out`
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL`: URL of your deployed backend API

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 