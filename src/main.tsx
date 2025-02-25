
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Initializing application...');

// Create root outside of Strict Mode to prevent double renders
const root = createRoot(document.getElementById("root")!);
console.log('Root element found, mounting app...');

root.render(<App />);

console.log('App mounted successfully');
