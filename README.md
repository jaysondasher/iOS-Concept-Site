# Jayson Dasher Portfolio

A personal portfolio website designed to mimic an iOS device interface. The website displays like an iPad homescreen on desktop and an iPhone homescreen on mobile devices.

## Features

- Responsive design that adapts between tablet and mobile views
- iOS-style app icons for project links
- iOS-style widgets for personal information
- Dock with quick access links
- Modern, clean UI inspired by Apple's design language

## Technologies Used

- Next.js 14
- React
- TypeScript
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18.17 or later

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio-site.git
cd portfolio-site
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

To customize this portfolio with your own information:

1. Replace the placeholder profile image in `/public/images/`
2. Update the project links and information in `src/components/HomeScreen.tsx`
3. Modify the personal information in the `ProfileWidget` component in `src/components/Widget.tsx`
4. Customize colors and styling in `tailwind.config.js` and `src/styles/globals.css`

## Deployment

This site can be easily deployed to Vercel:

```bash
npm run build
```

For more information on deployment options, see the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## License

MIT 