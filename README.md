# 🎯 ScoreTracker - CardCal

<div align="center">

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://cardcal-3lptalnt3-bdsahin365gmailcoms-projects.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/bdsahin365/cardcal)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**A modern, multilingual React-based score tracking application for board games with AI-powered features**

[Features](#-features) • [Setup](#-setup) • [Usage](#-usage) • [Deployment](#-deployment) • [Contributing](#-contributing)

</div>

---

A beautiful, responsive score tracking app built with React and Tailwind CSS. Features Bengali (বাংলা) localization, AI-powered commentary, and an intuitive interface for tracking scores across multiple players.

## ✨ Features

### 🎮 Core Functionality
- **Multi-player Support**: Track scores for 2-4 players simultaneously
- **Interactive Sliders**: Intuitive range slider (-13 to +13) for precise score adjustments
- **Score History**: Complete game history with timestamps and change tracking
- **Undo Functionality**: Revert to previous game states with one click
- **Cloud Sync**: Game sessions and team names sync across devices via Supabase
- **Auto-save**: Automatic saving of game state to cloud and local storage

### 🤖 AI-Powered Features
- **AI Name Generation**: Generate creative, fun team names using OpenAI
- **AI Commentary**: Live Bengali game commentary from an AI sportscaster
- **Smart Suggestions**: Context-aware team name suggestions

### 🌍 Localization
- **Bengali Support**: Fully translated interface (বাংলা)
- **Bangla Numbers**: Native Bengali number display
- **Cultural Context**: Team names and commentary in Bengali

### 🎨 User Experience
- **Responsive Design**: Seamlessly works on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful, clean interface built with Tailwind CSS
- **Color-Coded Players**: Distinct color themes for each player (Teal, Lime, Sky, Rose)
- **Real-time Updates**: Instant visual feedback on score changes

## 🚀 Setup

### Prerequisites

- **Node.js** 16+ and npm (or yarn/pnpm)
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))
- **Supabase Account** ([Sign up here](https://supabase.com)) - Optional but recommended for cloud sync

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bdsahin365/cardcal.git
   cd cardcal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   
   > ⚠️ **Security Note**: Never commit your `.env` file! It's already in `.gitignore`.
   
   > 📘 **Supabase Setup**: See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions on setting up Supabase.

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```
   
   Output will be in the `dist/` directory.

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite 4** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library

### AI & APIs
- **OpenAI API** - GPT-3.5-turbo for AI features
- **Supabase** - Backend as a Service for data persistence and cloud sync
- **Fetch API** - HTTP requests

### Development Tools
- **PostCSS** - CSS processing
- **Autoprefixer** - Automatic vendor prefixes
- **TypeScript types** - Type definitions for React

### Deployment
- **Vercel** - Hosting and CI/CD

## 🌐 Deployment

### Vercel (Recommended)

This project is configured for easy deployment on [Vercel](https://vercel.com):

1. **Connect your GitHub repository** to Vercel
2. **Add environment variables**:
   - `VITE_OPENAI_API_KEY`: Your OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
   - `VITE_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `VITE_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon/public key
3. **Deploy** - Vercel will automatically build and deploy

📘 **Detailed Guide**: See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for complete setup instructions including OpenAI API key setup.

Or use Vercel CLI:
```bash
npm i -g vercel
vercel --prod
```

### Other Platforms

The app can be deployed to any static hosting service:
- **Netlify** - Drag and drop the `dist` folder
- **GitHub Pages** - Configure GitHub Actions
- **Cloudflare Pages** - Connect your repository
- **AWS S3 + CloudFront** - Static website hosting

## 📖 Usage

### Basic Score Tracking

1. **Adjust Scores**: Use the slider for each player to set point changes (-13 to +13)
2. **Commit Changes**: Click "নতুন স্কোর সেট করুন" (Set New Scores) to apply changes
3. **View History**: Click the "ইতিহাস" (History) button to see past game states
4. **Undo Changes**: Use the undo button in settings to revert the last change
5. **Reset Game**: Go to Settings and click "গেম রিসেট করুন" (Reset Game)

### AI Features

1. **Generate Team Names**: Click the ✨ wand icon next to any player name for a random Bengali team name
2. **AI Commentary**: Click the "ধারাভাষ্য" (Caster) button for AI-generated match commentary in Bengali

### Settings

- **Change Player Count**: Switch between 2, 3, or 4 players
- **Custom Team Names**: Access admin panel to manage custom team names
- **Game Reset**: Reset all scores to zero

### Keyboard Shortcuts

- Use arrow keys on sliders for precise adjustments
- Tab to navigate between controls

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add comments for complex logic
- Test your changes before submitting
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**bdsahin365**

- GitHub: [@bdsahin365](https://github.com/bdsahin365)
- Repository: [cardcal](https://github.com/bdsahin365/cardcal)

## 🙏 Acknowledgments

- **OpenAI** for the GPT API powering AI features
- **Tailwind CSS** for the beautiful utility classes
- **Lucide** for the icon set
- **Vercel** for hosting and deployment
- **React Team** for the amazing framework

## 📊 Project Status

![GitHub stars](https://img.shields.io/github/stars/bdsahin365/cardcal?style=social)
![GitHub forks](https://img.shields.io/github/forks/bdsahin365/cardcal?style=social)
![GitHub issues](https://img.shields.io/github/issues/bdsahin365/cardcal)
![GitHub pull requests](https://img.shields.io/github/issues-pr/bdsahin365/cardcal)

---

<div align="center">

**Made with ❤️ using React and Tailwind CSS**

⭐ Star this repo if you found it helpful!

</div>

