# Vending Machine Frontend

A modern React TypeScript frontend for the vending machine application with responsive design and real-time updates.

## Features

- Modern React with TypeScript and Vite
- Real-time balance updates
- Interactive product selection
- Shopping cart functionality
- Responsive UI with Tailwind CSS
- Comprehensive error handling

## Project Structure

````
src/
├── components/         # React components
│   ├── Cart.tsx       # Shopping cart
│   ├── CoinInserter.tsx   # Coin insertion
│   └── ProductList.tsx    # Product display
├── services/
│   └── api.ts         # API integration
└── App.tsx            # Main application

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
````

### Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
