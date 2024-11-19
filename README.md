Playing with my silly idea for a job board

## TODO

### Features

- [x ] Set up basic animations
- [ ] Update header for small screens
- [ ] Create a Landing Page
- [ ] Make Job Cards open a side menu or load a new page so that the descriptions are only run through AI if they are clicked, not all of them.
  - [ ] Maybe bulk create shortened job descriptions for Cards
- [ ] Error Page
- [ ] 404 Page
- [ ] Create a custom color theme
- [ ] Build

### Bugs/Issues

- [ ] Fix API keys, they shouldn't have to be NEXT_PUBLIC anymore because they are server components
- [ ] MUI might have issues with latest React, consider replacing or finding and fixing issue with peer dependencys

# Project Setup

## ENV

- Get an API key from Groq AI and Rapid AI Jobs API
  - <https://rapidapi.com/Pat92/api/jobs-api14>
  - <https://groq.com/>

Add to .env file

- NEXT_PUBLIC_RAPID_API_KEY
- NEXT_PUBLIC_OPEN_API_KEY

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
