# Portfolio

A professional portfolio website built with Next.js 16, Tailwind CSS, and shadcn/ui.

## Features

- Modern, responsive design
- Dark/Light mode toggle
- Smooth scrolling navigation
- Contact form
- Mobile-friendly

## Sections

- **Hero** - Eye-catching introduction
- **About** - Personal information and highlights
- **Skills** - Technical skills and technologies
- **Projects** - Featured work showcase
- **Experience** - Work history timeline
- **Contact** - Contact form and information

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lucide Icons](https://lucide.dev/) - Icons
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme switching

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

Edit the following files to personalize your portfolio:

- `src/components/sections/hero.tsx` - Update your name and tagline
- `src/components/sections/about.tsx` - Add your bio and highlights
- `src/components/sections/skills.tsx` - List your skills
- `src/components/sections/projects.tsx` - Showcase your projects
- `src/components/sections/experience.tsx` - Add your work history
- `src/components/sections/contact.tsx` - Update contact information
- `src/components/footer.tsx` - Update social links
- `src/app/layout.tsx` - Update metadata (title, description)

## Deploy to Vercel

The easiest way to deploy this portfolio is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy"

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## License

MIT
