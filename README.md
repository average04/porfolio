# Jay-R Bayog, portfolio

The source for [jayrb.dev](https://jayrb.dev), the personal site of Jay-R Bayog, a software engineer in Metro Manila working in .NET, React, and Azure.

It is a single static page: an introduction, three featured projects with screenshots, a list of smaller projects, work history, tools, and contact details.

## Design

- One typeface, [Atkinson Hyperlegible Next](https://fonts.google.com/specimen/Atkinson+Hyperlegible+Next), loaded with `next/font`. Hierarchy comes from size and weight only.
- Colors are white, black, and the blue of the Philippine flag (`#0038A8`). The flag's yellow (`#FCD116`) is used only for focus outlines and text selection.
- Blue fields at the top and bottom hold the introduction and contact details. The work sits on white between them.
- No scroll animation. The only motion is feedback when you interact, such as the copy-address button.

## Tech stack

| | |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) with React 19 |
| Language | TypeScript |
| Styling | Plain CSS in `app/globals.css`, with Tailwind CSS 4 for its base reset |

The page is a server component. The only client JavaScript is the copy-address button.

## Getting started

The Next.js app lives in the [`portfolio/`](portfolio/) directory:

```bash
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Structure

```
portfolio/
├── app/
│   ├── page.tsx              # The page, plus project, experience, and tools data
│   ├── layout.tsx            # Metadata and font
│   ├── globals.css           # All styles
│   ├── components/
│   │   └── CopyEmail.tsx     # Copy-address button (client component)
│   ├── fonts/                # Atkinson TTFs for the generated icon and social image
│   ├── icon.tsx              # Favicon
│   ├── apple-icon.tsx        # Apple touch icon
│   └── opengraph-image.tsx   # Social sharing image
└── public/
    ├── projects/             # Screenshots of the featured projects
    ├── avatar.png
    └── Resume-Bayog_JayR.pdf
```

To change the content, edit the `work`, `otherProjects`, `experience`, and `tools` arrays at the top of `app/page.tsx`.

Atkinson Hyperlegible Next is licensed under the SIL Open Font License.
