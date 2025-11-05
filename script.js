// Terminal Portfolio Script

const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');
let commandHistory = [];
let historyIndex = -1;

// Portfolio Data - Customize this section with your information
const portfolioData = {
    name: "Your Name",
    title: "Full Stack Developer",
    email: "your.email@example.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    website: "https://yourwebsite.com",

    about: `I'm a passionate developer with experience in building web applications.
I love creating innovative solutions and learning new technologies.
Always excited to take on new challenges and collaborate on interesting projects.`,

    skills: [
        "Languages: JavaScript, Python, Java, TypeScript",
        "Frontend: React, Vue.js, HTML5, CSS3, Tailwind CSS",
        "Backend: Node.js, Express, Django, Flask",
        "Database: MongoDB, PostgreSQL, MySQL, Redis",
        "Tools: Git, Docker, AWS, Linux, CI/CD",
        "Other: REST APIs, GraphQL, Microservices, Agile"
    ],

    experience: [
        {
            role: "Senior Full Stack Developer",
            company: "Tech Company Inc.",
            period: "2022 - Present",
            description: "Leading development of scalable web applications using React and Node.js"
        },
        {
            role: "Full Stack Developer",
            company: "Startup Co.",
            period: "2020 - 2022",
            description: "Built and maintained multiple web applications and REST APIs"
        },
        {
            role: "Junior Developer",
            company: "Digital Agency",
            period: "2018 - 2020",
            description: "Developed responsive websites and learned modern web development"
        }
    ],

    projects: [
        {
            name: "E-Commerce Platform",
            tech: "React, Node.js, MongoDB, Stripe",
            description: "Full-featured e-commerce platform with payment integration",
            link: "https://github.com/yourusername/project1"
        },
        {
            name: "Task Management App",
            tech: "Vue.js, Firebase, Vuex",
            description: "Real-time collaborative task management application",
            link: "https://github.com/yourusername/project2"
        },
        {
            name: "Weather Dashboard",
            tech: "React, API Integration, Chart.js",
            description: "Weather forecasting dashboard with data visualization",
            link: "https://github.com/yourusername/project3"
        }
    ],

    education: [
        "B.S. Computer Science - University Name (2018)",
        "AWS Certified Developer - Associate",
        "MongoDB Certified Developer"
    ],

    social: {
        github: "https://github.com/yourusername",
        linkedin: "https://linkedin.com/in/yourusername",
        twitter: "https://twitter.com/yourusername",
        email: "your.email@example.com"
    }
};

// Command definitions
const commands = {
    help: {
        description: "Display all available commands",
        usage: "help",
        execute: () => {
            return `
Available commands:

  <span class="highlight">about</span>       - Learn more about me
  <span class="highlight">skills</span>      - View my technical skills
  <span class="highlight">experience</span>  - View my work experience
  <span class="highlight">projects</span>    - View my projects
  <span class="highlight">education</span>   - View my education and certifications
  <span class="highlight">contact</span>     - Get my contact information
  <span class="highlight">social</span>      - View my social media links
  <span class="highlight">resume</span>      - Download my resume
  <span class="highlight">clear</span>       - Clear the terminal
  <span class="highlight">help</span>        - Display this help message
  <span class="highlight">banner</span>      - Display the welcome banner

Type any command to get started!
            `;
        }
    },

    about: {
        description: "Learn more about me",
        usage: "about",
        execute: () => {
            return `
<span class="highlight">About Me</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${portfolioData.name}
Role: ${portfolioData.title}

${portfolioData.about}
            `;
        }
    },

    skills: {
        description: "View my technical skills",
        usage: "skills",
        execute: () => {
            let output = `
<span class="highlight">Technical Skills</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<ul>`;
            portfolioData.skills.forEach(skill => {
                output += `<li>${skill}</li>`;
            });
            output += `</ul>`;
            return output;
        }
    },

    experience: {
        description: "View my work experience",
        usage: "experience",
        execute: () => {
            let output = `
<span class="highlight">Work Experience</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

`;
            portfolioData.experience.forEach((exp, index) => {
                output += `
<span class="highlight">${exp.role}</span>
${exp.company} | ${exp.period}
${exp.description}
`;
                if (index < portfolioData.experience.length - 1) {
                    output += '\n';
                }
            });
            return output;
        }
    },

    projects: {
        description: "View my projects",
        usage: "projects",
        execute: () => {
            let output = `
<span class="highlight">Projects</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

`;
            portfolioData.projects.forEach((project, index) => {
                output += `
<span class="highlight">${index + 1}. ${project.name}</span>
   Tech Stack: ${project.tech}
   ${project.description}
   Link: <a href="${project.link}" target="_blank">${project.link}</a>
`;
            });
            return output;
        }
    },

    education: {
        description: "View my education and certifications",
        usage: "education",
        execute: () => {
            let output = `
<span class="highlight">Education & Certifications</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<ul>`;
            portfolioData.education.forEach(edu => {
                output += `<li>${edu}</li>`;
            });
            output += `</ul>`;
            return output;
        }
    },

    contact: {
        description: "Get my contact information",
        usage: "contact",
        execute: () => {
            return `
<span class="highlight">Contact Information</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Email: <a href="mailto:${portfolioData.social.email}">${portfolioData.social.email}</a>
GitHub: <a href="${portfolioData.social.github}" target="_blank">${portfolioData.social.github}</a>
LinkedIn: <a href="${portfolioData.social.linkedin}" target="_blank">${portfolioData.social.linkedin}</a>

Feel free to reach out! I'm always open to interesting conversations and collaboration opportunities.
            `;
        }
    },

    social: {
        description: "View my social media links",
        usage: "social",
        execute: () => {
            return `
<span class="highlight">Social Media</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GitHub: <a href="${portfolioData.social.github}" target="_blank">${portfolioData.social.github}</a>
LinkedIn: <a href="${portfolioData.social.linkedin}" target="_blank">${portfolioData.social.linkedin}</a>
Twitter: <a href="${portfolioData.social.twitter}" target="_blank">${portfolioData.social.twitter}</a>
Email: <a href="mailto:${portfolioData.social.email}">${portfolioData.social.email}</a>
            `;
        }
    },

    resume: {
        description: "Download my resume",
        usage: "resume",
        execute: () => {
            return `
<span class="highlight">Resume</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You can download my resume here:
<a href="./resume.pdf" target="_blank">Download Resume (PDF)</a>

Note: Update the link with your actual resume file path.
            `;
        }
    },

    clear: {
        description: "Clear the terminal",
        usage: "clear",
        execute: () => {
            terminalOutput.innerHTML = '';
            return null;
        }
    },

    banner: {
        description: "Display the welcome banner",
        usage: "banner",
        execute: () => {
            return `
<pre class="ascii-art">
 _____                    _             _
|_   _|__ _ __ _ __ ___ (_)_ __   __ _| |
  | |/ _ \\ '__| '_ \` _ \\| | '_ \\ / _\` | |
  | |  __/ |  | | | | | | | | | | (_| | |
  |_|\\___|_|  |_| |_| |_|_|_| |_|\\__,_|_|

 ____            _    __       _ _
|  _ \\ ___  _ __| |_ / _| ___ | (_) ___
| |_) / _ \\| '__| __| |_ / _ \\| | |/ _ \\
|  __/ (_) | |  | |_|  _| (_) | | | (_) |
|_|   \\___/|_|   \\__|_|  \\___/|_|_|\\___/
</pre>
Welcome to my interactive portfolio!
Type <span class="highlight">'help'</span> to see available commands.
            `;
        }
    }
};

// Process command
function processCommand(input) {
    const trimmedInput = input.trim();
    const [command, ...args] = trimmedInput.toLowerCase().split(' ');

    // Add to history
    if (trimmedInput) {
        commandHistory.unshift(trimmedInput);
        historyIndex = -1;
    }

    // Display command
    addOutput(`<span class="prompt">visitor@portfolio:~$</span> <span class="user-input">${input}</span>`);

    // Execute command
    if (trimmedInput === '') {
        return;
    }

    if (commands[command]) {
        const result = commands[command].execute(args);
        if (result !== null) {
            addOutput(result, 'output');
        }
    } else {
        addOutput(`Command not found: ${command}. Type <span class="highlight">'help'</span> to see available commands.`, 'output error');
    }
}

// Add output to terminal
function addOutput(text, className = 'command-line') {
    const div = document.createElement('div');
    div.className = className;
    div.innerHTML = text;
    terminalOutput.appendChild(div);

    // Scroll to bottom
    terminalOutput.parentElement.scrollTop = terminalOutput.parentElement.scrollHeight;
}

// Handle input
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = terminalInput.value;
        processCommand(input);
        terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        } else if (historyIndex === 0) {
            historyIndex = -1;
            terminalInput.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const input = terminalInput.value.toLowerCase();
        const matchingCommands = Object.keys(commands).filter(cmd => cmd.startsWith(input));

        if (matchingCommands.length === 1) {
            terminalInput.value = matchingCommands[0];
        } else if (matchingCommands.length > 1) {
            addOutput(`<span class="prompt">visitor@portfolio:~$</span> <span class="user-input">${input}</span>`);
            addOutput(matchingCommands.join('  '), 'output');
        }
    }
});

// Keep input focused
document.addEventListener('click', () => {
    terminalInput.focus();
});

// Initialize
terminalInput.focus();

// Easter egg commands
commands.ls = {
    description: "List directory contents",
    usage: "ls",
    execute: () => "about.txt  skills.txt  projects.txt  contact.txt"
};

commands.whoami = {
    description: "Display current user",
    usage: "whoami",
    execute: () => portfolioData.name
};

commands.date = {
    description: "Display current date",
    usage: "date",
    execute: () => new Date().toString()
};

commands.echo = {
    description: "Display a line of text",
    usage: "echo [text]",
    execute: (args) => args.join(' ')
};
