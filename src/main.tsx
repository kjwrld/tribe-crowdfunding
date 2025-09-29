
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import "./styles/font-override.css";
  import { StripeProvider } from "./components/StripeProvider.tsx";
  import { modelPreloader } from "./services/ModelPreloader";

  // Nuclear option: Force Nunito font via JavaScript
  const forceNunitoFont = () => {
    const style = document.createElement('style');
    style.innerHTML = `
      *, *::before, *::after {
        font-family: "Nunito", ui-sans-serif, system-ui, sans-serif !important;
      }
    `;
    document.head.appendChild(style);
    
    // Also directly set font-family on all existing elements
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      (el as HTMLElement).style.fontFamily = '"Nunito", ui-sans-serif, system-ui, sans-serif';
    });
  };

  // Initialize model preloading immediately
  modelPreloader.initializePreloading();
  
  // Also warm up R3F chunks for faster navigation
  modelPreloader.warmupR3F().catch(console.warn);

  // Run immediately and after DOM loads
  forceNunitoFont();
  document.addEventListener('DOMContentLoaded', forceNunitoFont);
  window.addEventListener('load', forceNunitoFont);

  createRoot(document.getElementById("root")!).render(
    <StripeProvider>
      <App />
    </StripeProvider>
  );
  