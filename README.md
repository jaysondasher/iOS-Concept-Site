# iOS Concept Site

A personal website designed to mimic an iOS device interface. The website displays like an iPad homescreen on desktop and an iPhone homescreen on mobile devices, with realistic device frames and UI elements.

## Features

- Responsive design that adapts between tablet and mobile views
- Realistic iPad frame with aurora-like glow effects on desktop
- Full-screen iPhone experience on mobile with status bar and home indicator
- iOS-style app icons for project links
- iOS-style widgets for personal information
- Dock with quick access links
- Modern, clean UI inspired by Apple's design language
- Beautiful background wallpaper that enhances the iOS aesthetic

## Technologies Used

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- CSS Animations and Effects

## Getting Started

### Prerequisites

- Node.js 18.17 or later

### Installation

1. Clone the repository
```bash
git clone https://github.com/jaysondasher/iOS-Concept-Site.git
cd iOS-Concept-Site
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Customization

To customize this site with your own information:

1. Replace the profile image in `/public/jayson.jpeg`
2. Replace the wallpaper images in `/public/SequoiaLight.png` and `/public/Sequoia-Trees.jpg`
3. Update the project links and information in `src/components/HomeScreen.tsx`
4. Modify the personal information in the `ProfileWidget` component in `src/components/Widget.tsx`
5. Customize colors and styling in `tailwind.config.js` and `src/styles/globals.css`
6. Adjust the device frame styling in the media queries section of `src/styles/globals.css`

## Project Structure

- `src/app`: Next.js app router files
- `src/components`: React components for the UI
  - `HomeScreen.tsx`: Main screen component with app grid and dock
  - `Widget.tsx`: Profile widget component
  - `AppIcon.tsx`: App icon component for projects
  - `StatusBar.tsx`: Status bar component with time and icons
- `src/styles`: CSS files
  - `globals.css`: Global styles and device frame styling
- `public`: Static assets like images

## Deployment

This site can be easily deployed to Vercel:

```bash
npm run build
```

For more information on deployment options, see the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## License

MIT 