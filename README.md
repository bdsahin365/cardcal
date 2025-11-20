# ScoreTracker - CardCal

A modern React-based score tracking application for board games with AI-powered features.

## Features

- **Multi-player Support**: Track scores for 2-4 players
- **Interactive Sliders**: Adjust scores with a range slider (-13 to +13)
- **Score History**: View past game states with timestamps
- **AI Name Generation**: Generate creative team names using Google Gemini AI
- **AI Commentary**: Get live game commentary from an AI sportscaster
- **Undo Functionality**: Revert to previous game states
- **Responsive Design**: Works on desktop and mobile devices
- **Progressive Web App (PWA)**: Installable as a standalone app
- **Offline Support**: Works offline after initial load, automatically caches assets

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   **Security Note**: 
   - Never commit your `.env` file to version control!
   - The `.env` file is already included in `.gitignore`
   - Get your API key from: https://platform.openai.com/api-keys

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Lucide React (icons)
- OpenAI API (for AI features)
- Vite PWA Plugin (for offline support and PWA capabilities)

## Progressive Web App (PWA) Features

This app is configured as a Progressive Web App with offline support:

- **Installable**: Can be installed on mobile devices and desktop browsers
- **Offline Mode**: After the first visit, the app works offline
- **Auto-update**: Service worker automatically updates when new versions are available
- **Fast Loading**: Assets are cached for instant loading on subsequent visits

### Installing the PWA

1. **Mobile (Android/Chrome)**:
   - Visit the site in Chrome
   - Tap the menu (three dots) and select "Install App" or "Add to Home Screen"

2. **Desktop (Chrome/Edge)**:
   - Visit the site in Chrome or Edge
   - Click the install icon in the address bar
   - Click "Install" in the prompt

3. **iOS (Safari)**:
   - Visit the site in Safari
   - Tap the share button
   - Select "Add to Home Screen"

## Usage

1. Adjust the sliders to set score changes for each player
2. Click "SET NEW SCORES" to commit the changes
3. Use the History button to view past game states
4. Use the Settings button to change player count or reset the game
5. Click the wand icon next to player names to generate AI names
6. Click the "Caster" button to get AI-generated game commentary

