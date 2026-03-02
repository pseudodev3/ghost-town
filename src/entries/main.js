// Shared entry point - bundles all common CSS and JS
import '../style.css';
import '../public/fonts/fonts.css';

// Load script.js functionality
if (typeof window !== 'undefined') {
  // This ensures script.js runs after our imports
  import('../../script.js');
}
