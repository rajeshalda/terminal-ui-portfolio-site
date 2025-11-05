# Terminal Portfolio Site

A beautiful, interactive terminal-style portfolio website that mimics a command-line interface. Perfect for developers who want to showcase their skills in a unique and engaging way.

## Features

- **Interactive Terminal UI** - Fully functional command-line interface
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Command History** - Use arrow keys to navigate through previous commands
- **Tab Completion** - Press Tab to autocomplete commands
- **Multiple Commands** - Display your skills, projects, experience, and more
- **Customizable** - Easy to update with your personal information
- **No Dependencies** - Pure HTML, CSS, and JavaScript

## Available Commands

- `help` - Display all available commands
- `about` - Learn more about you
- `skills` - View technical skills
- `experience` - View work experience
- `projects` - View projects
- `education` - View education and certifications
- `contact` - Get contact information
- `social` - View social media links
- `resume` - Download resume
- `clear` - Clear the terminal
- `banner` - Display the welcome banner

**Easter Egg Commands:**
- `ls` - List directory contents
- `whoami` - Display current user
- `date` - Display current date
- `echo [text]` - Display a line of text

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/terminal-ui-portfolio-site.git
   cd terminal-ui-portfolio-site
   ```

2. **Customize your portfolio**
   - Open `script.js`
   - Find the `portfolioData` object (around line 9)
   - Update with your personal information

3. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server like Live Server (VS Code extension)

## Customization Guide

### Update Personal Information

Edit the `portfolioData` object in `script.js`:

```javascript
const portfolioData = {
    name: "Your Name",
    title: "Your Title",
    email: "your.email@example.com",
    // ... add your information
};
```

### Change Color Scheme

Edit `styles.css` to change the terminal colors:

```css
/* Green terminal (default) */
#terminal-output {
    color: #00ff00;
}

/* Amber terminal */
#terminal-output {
    color: #ffb000;
}

/* Blue terminal */
#terminal-output {
    color: #00aaff;
}
```

### Add Custom Commands

Add new commands in the `commands` object in `script.js`:

```javascript
commands.mycommand = {
    description: "Description of command",
    usage: "mycommand",
    execute: () => {
        return "Command output here";
    }
};
```

## Deployment

### GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select your branch and root directory
4. Your site will be live at `https://yourusername.github.io/terminal-ui-portfolio-site`

### Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Deploy with default settings

### Vercel

1. Push your code to GitHub
2. Import your repository to Vercel
3. Deploy automatically

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Feel free to submit a Pull Request.

## Acknowledgments

- Inspired by classic terminal interfaces
- ASCII art generated with various tools
- Built with love for the developer community

## Contact

If you have any questions or suggestions, feel free to reach out or open an issue!

---

Made with ❤️ by developers, for developers