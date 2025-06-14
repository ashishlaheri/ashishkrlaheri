# Modern Personal Website

A modern, responsive personal website built with HTML, Tailwind CSS, and JavaScript. Features a dark theme, smooth animations, and a functional contact form.

## Features

- 🌙 Modern dark theme with Gen Z aesthetic
- 📱 Fully responsive design
- ✨ Smooth animations and transitions
- 📝 Dedicated section for poems and creative works
- 📬 Functional contact form using Formspree
- 🎨 Customizable with Tailwind CSS
- 🔄 Light/Dark mode toggle
- 🎯 SEO friendly

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Tailwind CSS build process:
   ```bash
   npm run build:css
   ```

3. Set up the contact form:
   - Go to [Formspree](https://formspree.io) and create a free account
   - Create a new form and get your form ID
   - Replace `your-form-id` in `contact.html` with your actual Formspree form ID

4. Customize the content:
   - Replace all `[Your Name]` placeholders with your name
   - Update the social media links in the footer
   - Add your own images to the `assets/images` directory
   - Customize colors in `tailwind.config.js` if desired
   - Add your own content to each page

5. Preview the website:
   - Open `index.html` in your browser
   - For the best development experience, use a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js
     npx serve
     ```

## File Structure

```
├── index.html          # Home page
├── about.html         # About page
├── hobbies.html      # Hobbies and poems page
├── contact.html      # Contact page with form
├── css/
│   ├── input.css    # Tailwind CSS input file
│   └── output.css   # Generated CSS (after build)
├── js/
│   └── main.js      # JavaScript functionality
├── assets/
│   └── images/      # Image files
├── package.json     # Project dependencies
└── tailwind.config.js # Tailwind configuration
```

## Customization

### Colors
Edit the colors in `tailwind.config.js`:
```js
colors: {
  'primary': '#6366f1',    // Change primary color
  'secondary': '#4f46e5',  // Change secondary color
  'dark': '#0f172a',      // Change dark theme background
  'darker': '#020617',    // Change darker shade
}
```

### Fonts
1. Choose fonts from [Google Fonts](https://fonts.google.com)
2. Update the font link in the HTML files
3. Update the font family in `tailwind.config.js`

### Images
1. Add your images to `assets/images/`
2. Update image sources in HTML files
3. Recommended image formats: WebP, PNG, or JPEG
4. Optimize images for web use

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE). #   a s h i s h k r l a h e r i  
 g i t  
 i n i t  
 g i t  
 a d d  
 .  
 g i t  
 c o m m i t  
 - m  
 f i r s t   c o m m i t  
 g i t  
 b r a n c h  
 - M  
 m a i n  
 g i t  
 r e m o t e  
 a d d  
 o r i g i n  
 h t t p s : / / g i t h u b . c o m / a s h i s h l a h e r i / a s h i s h k r l a h e r i . g i t  
 g i t  
 p u s h  
 - u  
 o r i g i n  
 m a i n  
 