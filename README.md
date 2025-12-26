# Windows XP Portfolio Website

This project is a creative portfolio website designed to look and feel like the Windows XP operating system. It provides a unique and nostalgic way to showcase projects, skills, and contact information.

## Features

- **Interactive Desktop:** A familiar desktop environment with icons to open different sections of the portfolio.
- **Draggable Windows:** Each section (About, Projects, Skills, Contact) opens in a draggable and resizable window.
- **Functional Taskbar:** A taskbar that shows open windows, a start menu, and the current time.
- **Start Menu:** A classic start menu for navigating the different sections of the portfolio.
- **Startup Animation:** A nostalgic Windows XP startup animation.

## Tech Stack

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool and development server for modern web projects.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v14 or later)
- npm or pnpm

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/your_project_name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
   or if you are using pnpm
   ```sh
   pnpm install
   ```
3. Start the development server
   ```sh
   npm run dev
   ```
   or
    ```sh
   pnpm dev
   ```

Open [http://localhost:5173](http://localhost:5173) (or whatever port is specified in the console) to view it in the browser.

## Customization

You can easily customize the portfolio content by editing the following files:

- **`src/app/components/AboutContent.tsx`**: Update the content for the "About Me" section.
- **`src/app/components/ProjectsContent.tsx`**: Add your projects to this file.
- **`src/app/components/SkillsContent.tsx`**: List your skills in this file.
- **`src/app/components/ContactContent.tsx`**: Add your contact information.

You can also change the desktop wallpaper by updating the URL in `src/app/App.tsx`.
