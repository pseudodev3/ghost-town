// Main entry point - imports all shared functionality
import '../style.css';
import '../public/fonts/fonts.css';

// Core functionality from script.js
document.addEventListener('DOMContentLoaded', () => {
  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
  }
});
