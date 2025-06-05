# Developer Guide: Thomas Kim Portfolio

This document provides essential information for developers working on the Thomas Kim Portfolio website.

## Project Overview

This project is a personal portfolio website built with Next.js (React.js) to showcase various projects, including a second-hand selling platform developed with Flutter Dart and a Node.js backend API.

## Getting Started Locally

To set up and run the website on your local machine:

1.  **Install Dependencies:**
    Ensure you have Node.js (version 18.x or later recommended) and npm installed.
    Navigate to the project root directory in your terminal and install the project dependencies:
    ```bash
    npm install
    ```

2.  **Start the Development Server:**
    Once dependencies are installed, start the local development server:
    ```bash
    npm run dev
    ```
    This will compile the project and typically make it available at `http://localhost:3000`. Your browser should automatically open to this address, or you can navigate there manually.

    The development server supports hot-reloading, so changes you make to the code will automatically reflect in the browser.

## Deployment Process

This project is configured for continuous deployment with Netlify.

* **Deployment Trigger:** Any push to the `main` branch of the connected Git repository will automatically trigger a new build and deployment on Netlify.
* **Netlify Build Settings:**
    * **Build command:** `next build`
    * **Publish directory:** `.next`
    * The `@netlify/plugin-nextjs` plugin is used to ensure full compatibility with Next.js features during deployment.

**To deploy a new version of the website, simply push your latest changes to the `main` branch of your Git repository.** Netlify will handle the rest.

---