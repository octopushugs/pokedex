Pokedex (151)
A React + TypeScript application for browsing the original 151 Pokémon, featuring real-time filtering and automated testing.

🛠 Tech Stack
Core: React, TypeScript, Tailwind CSS

Build: Vite

Testing: Vitest, React Testing Library, JSDOM

🚀 Quick Start
1. Setup

```
git clone https://github.com/octopushugs/pokedex.git
cd pokedex
npm install
```

2. Run Development Server

`npm run dev`

*App will be live at http://localhost:5173*

3. Run Tests

```
npm test          # Watch mode
npm test run      # Single run
npx vitest --ui   # Visual test dashboard
```

📋 Key Features
Parallel API Fetching: Optimized data retrieval via PokeAPI.

Instant Search: Memoized filtering by name and Pokémon type.

Responsive UI: Built with Tailwind CSS for mobile and desktop support.

Tested: Integration tests for data fetching and UI logic.

📁 Structure

```
/src — Main source code
/src/components - Component definitions
/src/interfaces — Type definitions
```

### Technical decisions:
* React/Typescript
  * I like these
* Vitest
  * I'm familiar with Vitest and I've had positive experiences with Gemini and Claude writing with it.
* AI Assistant
  * Normally I use Claude, but they've been having some issues lately so experimented with Gemini for this one. It was just as easy as Claude, though having it integrated in to my IDE would be nice.
* N+1 requests
  * On page load our useEffect hook fires a request to get the first 151 Pokemon, then fires another GET for each entry in the response. That was the most straighforward solution to getting the details for each, but that's a spot ripe for improvement.
* No backend
  * I opted to have an SPA that just queries the PokeAPI directly rather than going with an intermediate API for the sake of speed and because there weren't any requirements beyond displaying data that PokeAPI supplies. If I wanted to be a good internet citizen I would likely want to cache the PokeAPI data, on my own server, and naturally would use one if there was any data transformation to be done before getting to the end user.
