# CTRL+F Search Engine

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.2-38B2AC?logo=tailwind-css)

<img src="./src/assets/Logo.png" alt="CTRL+F Search Engine Logo" width="200"/>

A fast, powerful search engine inspired by the universal CTRL+F keyboard shortcut. Built with React, TypeScript & Vite, this project delivers lightning-fast search results with advanced information retrieval techniques.

*This project was developed as part of the Information Retrieval course taught by [ENG. Esraa Maged](https://github.com/EsraaMagedd), FCAI, 2024-2025.*

</div>


## 📑 Table of Contents

- [CTRL+F Search Engine](#ctrlf-search-engine)
  - [📑 Table of Contents](#-table-of-contents)
  - [System Overview](#system-overview)
    - [Simplified Architecture](#simplified-architecture)
    - [Detailed Architecture](#detailed-architecture)
    - [Search Engine Components](#search-engine-components)
  - [Core Information Retrieval Features](#core-information-retrieval-features)
    - [Responsive Design Features](#responsive-design-features)
    - [Text Processing Pipeline](#text-processing-pipeline)
    - [Indexing \& Retrieval Models](#indexing--retrieval-models)
    - [Search Enhancement Features](#search-enhancement-features)
    - [User Experience Features](#user-experience-features)
    - [Performance Optimizations](#performance-optimizations)
  - [Deployment](#deployment)
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
  - [Deployment](#deployment-1)
  - [⭐ Star the Repository](#-star-the-repository)

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

## Core Information Retrieval Features

<div align="center">
  <h3>🔍 Advanced Search Engine Implementation</h3>
</div>

### Responsive Design Features
- **Mobile-First Approach**: Optimized for all screen sizes from mobile to desktop
- **Adaptive Components**: UI elements that adjust layout and sizing based on viewport
- **Custom Breakpoints**: Added an extra small (xs: 480px) breakpoint for finer control
- **Improved Typography**: Responsive font sizes for better readability on small screens
- **Touch-Friendly Elements**: Larger tap targets and properly spaced UI controls
- **Flexible Layouts**: Grid and flex layouts that reflow content appropriately
- **Content Prioritization**: Critical information remains visible across all devices
- **Enhanced Mobile UX**: Simplified UI for smaller screens without sacrificing functionality

### Text Processing Pipeline
- **Tokenization**: Breaking text into individual terms with careful handling of punctuation and special characters
- **Stop Word Removal**: Filtering out common words with little semantic value using a comprehensive stop word list
- **Stemming**: Reducing words to their root form using a simplified Porter stemming algorithm
- **Query Preprocessing**: Special handling for search queries with less aggressive stop word removal

### Indexing & Retrieval Models
- **Inverted Index**: Space-efficient index mapping terms to documents for fast retrieval
- **Vector Space Model**: Document-query similarity calculation using TF-IDF weighting and cosine similarity
- **Boolean Retrieval**: Support for logical operators (AND, OR, NOT) for precise filtering
- **Phrase Search**: Matching exact sequences of words for higher precision

### Search Enhancement Features
- **"Did You Mean?"**: Spelling correction for misspelled queries using edit distance algorithms
- **Search Suggestions**: Real-time query suggestions as users type
- **Query Expansion**: Enhanced recall through automatic expansion of search terms
- **Document Ranking**: Sophisticated relevance scoring combining multiple signals

### User Experience Features
- **Real-time Search**: Instant results as you type for immediate feedback
- **Search History**: Tracking and recalling past searches for convenient access
- **Filter & Faceting**: Category-based filtering to refine search results
- **Pagination**: Efficient navigation through large result sets
- **Search Analytics**: Debug information showing query processing details, execution time, and term frequencies

### Performance Optimizations
- **Efficient Term Lookup**: O(1) access to term posting lists
- **Smart Query Processing**: Optimized evaluation of complex queries
- **Result Caching**: Improved response times for repeated queries

## Deployment
<div align="center">
  <h3><a href="https://ctrlof-search-engine.vercel.app/">🌐 Live Demo: CTRL+F Search Engine</a></h3>
  <p>Try our search engine now with features like spelling correction, multi-model search, and advanced filtering!</p>
</div>

## Team Members

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/Ahmed-AbdullahCreates">
          <img src="https://github.com/Ahmed-AbdullahCreates.png" width="100" height="100" style="border-radius:50%;" alt="Ahmed Abdullah" /><br />
          <sub><b>Ahmed Abdullah</b></sub>
        </a>
      </td> 
      <td align="center">
        <a href="https://github.com/Elghrabawy">
          <img src="https://github.com/Elghrabawy.png" width="100" height="100" style="border-radius:50%;" alt="Ibrahim Alghrbawy" /><br />
          <sub><b>Ibrahim Alghrbawy</b></sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/Ahmed010Ashraf">
          <img src="https://github.com/Ahmed010Ashraf.png" width="100" height="100" style="border-radius:50%;" alt="Ahmed Ashraf" /><br />
          <sub><b>Ahmed Ashraf</b></sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/AhmedAyman4">
          <img src="https://github.com/AhmedAyman4.png" width="100" height="100" style="border-radius:50%;" alt="Ahmed Ayman" /><br />
          <sub><b>Ahmed Ayman</b></sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/MohamedOmaraa">
          <img src="https://github.com/MohamedOmaraa.png" width="100" height="100" style="border-radius:50%;" alt="Mohamed Omara" /><br />
          <sub><b>Mohamed Omara</b></sub>
        </a>
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

[CTRL+F Search Engine Deployment](https://ctrlof-search-engine.vercel.app/)

## ⭐ Star the Repository

If you find this project helpful or interesting, please consider giving it a star on GitHub! 
<div align="center">
  <a href="https://github.com/Ahmed-AbdullahCreates/CTRL-F-Search-Engine">
    <img src="https://img.shields.io/github/stars/Ahmed-AbdullahCreates/CTRL-F-Search-Engine?style=social" alt="Star this repository" />
  </a>
  
</div>
