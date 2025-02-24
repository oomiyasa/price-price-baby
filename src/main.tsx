
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create root outside of Strict Mode to prevent double renders
const root = createRoot(document.getElementById("root")!);
root.render(<App />);
