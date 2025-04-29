# CTRL+F Search Engine

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.2-38B2AC?logo=tailwind-css)

<img src="./src/assets/Logo.png" alt="Curious Seeker Logo" width="200"/>

A fast, user-friendly search engine built with React, TypeScript & Vite, featuring a clean Shadcn UI.

</div>

## 📑 Table of Contents

- [CTRL+F Search Engine](#ctrlf-search-engine)
  - [📑 Table of Contents](#-table-of-contents)
  - [System Overview](#system-overview)
    - [Simplified Architecture](#simplified-architecture)
    - [Detailed Architecture](#detailed-architecture)
    - [Search Engine Components](#search-engine-components)
  - [Team Members](#team-members)
  - [Features](#features)
  - [Technology Stack](#technology-stack)
    - [Frontend](#frontend)
    - [Build \& Development](#build--development)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
  - [Project Structure](#project-structure)
  - [Search Features](#search-features)
  - [UI Components](#ui-components)
  - [Future Enhancements](#future-enhancements)
  - [Contributing](#contributing)
  - [Deployment](#deployment)

## System Overview

### Simplified Architecture
![Simplified Architecture](./src/assets/simpified%20version.png)
This simplified view illustrates the core components and their interactions in the search engine system. The diagram shows:
- User interface components for query input and results display
- Core search processing pipeline
- Data flow between frontend and search engine modules
- Key indexing and retrieval mechanisms

### Detailed Architecture
![Detailed Architecture](./src/assets/Detailed%20version.png)
The detailed architecture shows the complete system design, including all modules, data flows, and processing steps. This diagram includes:
- Frontend components and their interactions
- Query preprocessing stages (tokenization, normalization, stemming)
- Index structure and storage mechanisms
- Ranking algorithms and relevance scoring
- Result post-processing and presentation logic
- Data sources and document processing pipeline
- System optimization techniques and caching layers

### Search Engine Components
The search engine implementation consists of multiple modules:

- `searchEngine.ts`: Core search functionality combining multiple retrieval models
- `invertedIndex.ts`: Implements an inverted index for efficient term lookup
- `preprocessor.ts`: Handles text normalization, tokenization, and stemming
- `spellingCorrection.ts`: Provides query correction suggestions
- `mockDataAdapter.ts`: Simulates a data source for development and testing

## Team Members

<div align="center">
    <table>
        <tr>
            <td align="center">
                <img src="https://github.com/Ahmed-AbdullahCreates.png" width="100" height="100" style="border-radius:50%;" alt="Team Member" /><br />
                <sub><b>Team Member</b></sub>
            </td> 
            <td align="center">
                <img src="https://github.com/Elghrabawy.png" width="100" height="100" style="border-radius:50%;" alt="Team Member" /><br />
                <sub><b>Team Member</b></sub>
            </td>
            <td align="center">
                <img src="https://github.com/Ahmed010Ashraf.png" width="100" height="100" style="border-radius:50%;" alt="Team Member" /><br />
                <sub><b>Team Member</b></sub>
            </td>
            <td align="center">
                <img src="https://github.com/AhmedAyman4.png" width="100" height="100" style="border-radius:50%;" alt="Team Member" /><br />
                <sub><b>Team Member</b></sub>
            </td>
            <td align="center">
                <img src="https://github.com/MohamedOmaraa.png" width="100" height="100" style="border-radius:50%;" alt="Team Member" /><br />
                <sub><b>Team Member</b></sub>
            </td>
        </tr>
    </table>
</div>

## Features

- **Advanced Search Capabilities**:
    - Boolean retrieval (AND/OR/NOT operations)
    - Vector space model with TF-IDF weighting
    - Phrase search for exact sequence matching
    - Spelling correction for user queries
    - Inverted index for efficient information retrieval

- **User-Friendly Interface**:
    - Clean, responsive design with Tailwind CSS
    - Search filters for refined results
    - Search history tracking
    - Pagination for search results
    - Customizable search settings
    - Debugging tools for search analysis

- **Modern Architecture**:
    - Component-based UI with Shadcn
    - Custom hooks for enhanced functionality
    - Mock data adapter for testing and development

## Technology Stack

### Frontend
- **React**: Modern UI library for building component-based interfaces
- **TypeScript**: For type-safe code and better developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Shadcn UI**: High-quality UI components built on Radix UI primitives
- **React Router**: For seamless navigation and routing
- **React Context API**: For state management
- **React Hook Form**: With Zod validation for form handling
- **Recharts**: For data visualization components

### Build & Development
- **Vite**: Next-generation frontend tooling for faster development
- **npm/bun**: Package management and script execution

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm, yarn, or bun package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/Ahmed-AbdullahCreates/CTRL-F-Search-Engine
# Navigate to the project directory
cd CTRL-F-Search-Engine

# Install dependencies
npm install
# or
bun install
```

### Usage

```bash
# Start development server
npm run dev
# or
bun run dev

# Build for production
npm run build
# or
bun run build

# Preview production build
npm run preview
# or
bun run preview
```

## Project Structure

```
src/
├── components/         # UI components
│   └── ui/             # Shadcn UI components
├── context/            # React context providers
├── data/               # Mock data and constants
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
│   └── search/         # Search engine implementation
└── pages/              # Application pages
        ├── HomePage.tsx       # Main landing page
        ├── SearchPage.tsx     # Search results
        ├── SettingsPage.tsx   # User settings
        └── NotFoundPage.tsx   # 404 page
```

## Search Features

- **Real-time Search**: Instantly see results as you type
- **Search Filters**: Narrow down results by various criteria
- **Pagination**: Navigate through large result sets
- **Search History**: Track and revisit previous searches
- **Search Settings**: Customize the search experience
- **Search Debug Info**: View metadata about search operations

## UI Components

The interface is built with reusable components that provide a consistent user experience:

- Header and navigation
- Search bar with autocomplete
- Results display with pagination
- Search filters and facets
- Settings panel
- Circuit-style animation for visual appeal

## Future Enhancements

- Integration with real backend services
- Advanced analytics for search patterns
- User accounts and personalized search

## Contributing

We welcome contributions to improve the Curious Seeker Engine!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Deployment

The CTRL+F Search Engine is deployed and accessible at the following link:

[CTRL+F Search Engine Deployment](https://.example.com)