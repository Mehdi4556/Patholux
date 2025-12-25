# Patholux Boilerplate

A modern full-stack boilerplate with:
- ⚡ **React** - UI library
- 🔥 **TanStack Query** - Powerful data synchronization
- 🎯 **tRPC** - End-to-end typesafe APIs
- 🎨 **shadcn/ui** - Beautiful component library
- 🚀 **Bun** - Fast runtime and package manager
- 📘 **TypeScript** - Type safety

## Getting Started

### Install Dependencies

```bash
bun install
```

### Development

Start the development server:

```bash
bun run dev
```

The app will be available at http://localhost:3000

### Build

```bash
bun run build
```

### Preview Production Build

```bash
bun run preview
```

## Project Structure

```
patholux/
├── src/
│   ├── components/     # React components
│   │   └── ui/        # shadcn/ui components
│   ├── lib/           # Utilities and tRPC client
│   ├── pages/         # Page components
│   ├── App.tsx        # Main app component
│   └── main.tsx       # Entry point
├── index.html
└── package.json
```

## Adding shadcn/ui Components

To add more shadcn/ui components, you can use the CLI:

```bash
npx shadcn-ui@latest add [component-name]
```

Or manually add components to `src/components/ui/`.

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **TanStack Query v5** - Data fetching and caching
- **tRPC Client** - Type-safe API client (connect to external server)
- **shadcn/ui** - Component library
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **Bun** - Runtime and package manager

## License

MIT

