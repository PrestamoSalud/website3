# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static landing page for Préstamo Salud, a healthcare financing platform for Latin America. The website is built with vanilla HTML, CSS, and JavaScript without any build tools or package managers.

## Project Structure

```
prestamosalud/
├── index.html           # Main landing page
├── css/                 # Stylesheets
│   ├── styles.css       # Main styles with CSS variables
│   ├── header-menu.css  # Header navigation styles
│   ├── hero-styles.css  # Hero section specific styles
│   ├── solutions-styles.css # Solutions section styles
│   └── wave-transition.css  # Wave transition effects
├── js/                  # JavaScript files
│   ├── main.js          # Core functionality (AOS, tabs, accordion, forms)
│   ├── animations.js    # Animation utilities
│   ├── header-menu.js   # Header menu interactions
│   ├── hero-animation.js # Hero section animations
│   └── solutions-tabs.js # Solutions section tabs
├── images/              # Image assets
│   ├── favicon/         # Favicon files
│   ├── flags/           # Country flag SVGs
│   ├── icons/           # Various icons
│   ├── process/         # Process step illustrations
│   ├── solutions/       # Solution images
│   └── team/            # Team member photos
└── TESTWEBTOLEAD.html   # Salesforce form test page
```

## Key Features

### Interactive Elements
- Responsive navigation with mobile hamburger menu
- Tabbed sections for About and Solutions
- FAQ accordion
- Animated statistics counters
- Timeline progress indicator
- Contact form with Salesforce integration

### Third-party Dependencies (CDN)
- **AOS (Animate On Scroll)**: For scroll-triggered animations
- **Font Awesome**: For icons
- **Google Fonts**: Poppins and Inter font families

### Salesforce Integration
The main contact form submits to Salesforce Web-to-Lead:
- Form endpoint: `https://webto.salesforce.com/servlet/servlet.WebToLead`
- Organization ID: `00Do0000000bAHH`
- Uses hidden iframe for submission
- Form validation and success feedback

## Development Guidelines

### CSS Architecture
- Uses CSS custom properties (CSS variables) for consistent theming
- Organized with BEM-like naming conventions
- Responsive design with mobile-first approach
- Color scheme: Primary blue (#0055FF), secondary teal (#00E1C3)

### JavaScript Structure
- Event-driven architecture in `main.js`
- Modular approach with separate files for specific functionality
- No build process - direct file inclusion
- Form submission handling with iframe technique

### File Organization
- Static assets organized by type (css/, js/, images/)
- Images categorized by usage (icons/, solutions/, team/, etc.)
- Separate CSS files for major components

## Common Development Tasks

### Adding New Sections
1. Add HTML structure to `index.html`
2. Create corresponding CSS in appropriate file under `css/`
3. Add JavaScript interactions in `js/main.js` or create new module

### Modifying Styles
- Use existing CSS variables in `:root` for consistency
- Follow mobile-first responsive design approach
- Maintain existing color scheme and typography

### Testing Forms
- Use `TESTWEBTOLEAD.html` for Salesforce form testing
- Form submissions require valid Salesforce organization setup

### Image Optimization
- Images are stored in organized subdirectories
- SVG icons for scalability
- WebP format for team photos
- Compressed JPG/PNG for other images

## Browser Support
- Modern browsers with CSS Grid and Flexbox support
- ES6+ JavaScript features used
- Progressive enhancement approach for animations

## Deployment
This is a static website that can be deployed to any web server or CDN. No build process is required - simply upload the files to your hosting provider.