// Terminal Portfolio Script

const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');
let commandHistory = [];
let historyIndex = -1;

// Portfolio Data - Customize this section with your information
const portfolioData = {
    name: "Rajesh Alda",
    title: "Associate Software Engineer",
    email: "rajeshalda844@gmail.com",
    phone: "+91-8292701044",
    location: "Ranchi, Jharkhand",
    github: "https://github.com/rajeshalda",
    linkedin: "https://linkedin.com/in/rajeshalda",
    website: "https://rajeshalda.vercel.app",

    about: `I am an IT professional with experience in software training and customer care. I hold certifications
in Microsoft Azure Fundamentals (AZ-900) and CCNA. With a Master's degree in Computer Applications
(MCA) and a Bachelor's degree in Computer Applications (BCA), I have a strong foundation in networking,
cloud computing, and SAP MM. I am skilled in Microsoft Azure, various networking protocols, and SAP MM's
procurement and inventory management processes. I am also passionate about cooking, gaming, and
exploring new technologies.`,

    skills: [
        "Cloud Computing: Microsoft Azure (VM, Active Directory, Disaster Recovery, Network Services, Security)",
        "Networking: OSI & TCP/IP Models, TCP/UDP, ARP, ICMP, Static & Dynamic Routing (RIP, EIGRP, OSPF)",
        "Switching: STP, VLANs, CDP, LLDP, DTP, LACP, PAGP, Inter-VLAN Routing",
        "Network Services: ACLs, NAT/PAT, DHCP, DNS",
        "SAP MM: Master Data, Purchase Info, P2P Process, Inventory, Contract Management, MIRO, Invoice Parking",
        "Certifications: Microsoft Azure Fundamentals (AZ-900), CCNA",
        "Languages: English (Professional), Hindi (Native)"
    ],

    experience: [
        {
            role: "Associate Software Engineer",
            company: "Nathcorp Pvt. Ltd.",
            period: "Jun 2024 - Present",
            description: "Working on software engineering projects, applying knowledge of networking, cloud computing, and enterprise systems"
        },
        {
            role: "SAP MM Module Training",
            company: "Techning IT Solutions Pvt. LTD",
            period: "Jun 2023 - Jun 2024",
            description: "Completed comprehensive training in SAP MM Module including Master Data Management, Procure-to-Pay processes, Inventory Management, and Invoice Verification"
        },
        {
            role: "Software Trainee",
            company: "Nathcorp Pvt. Ltd.",
            period: "Dec 2022 - May 2023",
            description: "Gained hands-on experience in software development practices and enterprise solutions"
        }
    ],

    projects: [
        {
            name: "Azure Cloud Infrastructure Setup",
            tech: "Microsoft Azure, Virtual Machines, Active Directory",
            description: "Designed and deployed cloud infrastructure using Azure services including VMs, AD, and disaster recovery solutions",
            link: "https://github.com/rajeshalda/azure-infrastructure"
        },
        {
            name: "Network Design & Implementation",
            tech: "CCNA, Routing Protocols, VLANs, Network Services",
            description: "Implemented enterprise network solutions with dynamic routing (OSPF, EIGRP), VLANs, and network security features",
            link: "https://github.com/rajeshalda/network-design"
        },
        {
            name: "SAP MM Procurement Workflows",
            tech: "SAP MM, P2P Process, Inventory Management",
            description: "Developed and optimized procurement workflows including purchase orders, invoice verification, and inventory management",
            link: "https://github.com/rajeshalda/sap-mm-workflows"
        }
    ],

    education: [
        "Master of Computer Applications (MCA) - St. Xavier College, Ranchi University (2017-2020) - 65.33%",
        "Bachelor of Computer Applications (BCA) - NSHM College of Management & Technology, MAKAUT (2013-2016) - 66.7%",
        "Senior Secondary - Kolhan Inter College, Ranchi University (2010-2013) - 60%",
        "Secondary School - Netaji Subhas Public School, CBSE (2009-2010) - 55%"
    ],

    certifications: [
        "AZ-900: Microsoft Azure Fundamentals",
        "CCNA (Cisco Certified Network Associate)"
    ],

    hobbies: [
        "Cooking: Specializes in Chicken Curry",
        "Gaming: Enjoys simulation games like Mud Runner and Euro Truck Simulation 2",
        "Technology: Constantly exploring emerging tech trends and innovations"
    ],

    social: {
        github: "https://github.com/rajeshalda",
        linkedin: "https://linkedin.com/in/rajeshalda",
        twitter: "https://twitter.com/rajeshalda",
        email: "rajeshalda844@gmail.com"
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

  <span class="highlight">about</span>          - Learn more about me
  <span class="highlight">skills</span>         - View my technical skills
  <span class="highlight">experience</span>     - View my work experience
  <span class="highlight">projects</span>       - View my projects
  <span class="highlight">education</span>      - View my education background
  <span class="highlight">certifications</span> - View my professional certifications
  <span class="highlight">hobbies</span>        - View my hobbies and interests
  <span class="highlight">contact</span>        - Get my contact information
  <span class="highlight">social</span>         - View my social media links
  <span class="highlight">resume</span>         - Download my resume
  <span class="highlight">clear</span>          - Clear the terminal
  <span class="highlight">help</span>           - Display this help message
  <span class="highlight">banner</span>         - Display the welcome banner

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
Location: ${portfolioData.location}

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
        description: "View my education background",
        usage: "education",
        execute: () => {
            let output = `
<span class="highlight">Education</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<ul>`;
            portfolioData.education.forEach(edu => {
                output += `<li>${edu}</li>`;
            });
            output += `</ul>`;
            return output;
        }
    },

    certifications: {
        description: "View my professional certifications",
        usage: "certifications",
        execute: () => {
            let output = `
<span class="highlight">Professional Certifications</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<ul>`;
            portfolioData.certifications.forEach(cert => {
                output += `<li>${cert}</li>`;
            });
            output += `</ul>`;
            return output;
        }
    },

    hobbies: {
        description: "View my hobbies and interests",
        usage: "hobbies",
        execute: () => {
            let output = `
<span class="highlight">Hobbies & Interests</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<ul>`;
            portfolioData.hobbies.forEach(hobby => {
                output += `<li>${hobby}</li>`;
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

Name: ${portfolioData.name}
Location: ${portfolioData.location}
Phone: ${portfolioData.phone}
Email: <a href="mailto:${portfolioData.email}">${portfolioData.email}</a>

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
document.addEventListener('click', (e) => {
    // Only focus if not dragging
    if (!isDragging) {
        terminalInput.focus();
    }
});

// Initialize
terminalInput.focus();

// Draggable Terminal Functionality
const terminalContainer = document.querySelector('.terminal-container');
const terminalHeader = document.querySelector('.terminal-header');

let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

// Check if device is mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Set initial position
function setInitialPosition() {
    if (!isMobile()) {
        terminalContainer.style.transform = 'translate(-50%, -50%)';
        xOffset = 0;
        yOffset = 0;
    }
}

// Drag start
function dragStart(e) {
    if (isMobile()) return; // Disable dragging on mobile

    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if (e.target === terminalHeader || terminalHeader.contains(e.target)) {
        isDragging = true;
        terminalContainer.classList.add('dragging');
    }
}

// Drag
function drag(e) {
    if (isDragging && !isMobile()) {
        e.preventDefault();

        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const terminalWidth = terminalContainer.offsetWidth;
        const terminalHeight = terminalContainer.offsetHeight;

        // Calculate boundaries (keep at least 100px of the terminal visible)
        const minX = -(viewportWidth / 2) + 100;
        const maxX = (viewportWidth / 2) - 100;
        const minY = -(viewportHeight / 2) + 50;
        const maxY = (viewportHeight / 2) - 50;

        // Apply boundaries
        const boundedX = Math.max(minX, Math.min(maxX, currentX));
        const boundedY = Math.max(minY, Math.min(maxY, currentY));

        setTranslate(boundedX, boundedY, terminalContainer);
    }
}

// Drag end
function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
    terminalContainer.classList.remove('dragging');
}

// Set position
function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate(calc(-50% + ${xPos}px), calc(-50% + ${yPos}px))`;
}

// Event listeners for desktop
terminalHeader.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', dragEnd);

// Event listeners for touch devices
terminalHeader.addEventListener('touchstart', dragStart, { passive: false });
document.addEventListener('touchmove', drag, { passive: false });
document.addEventListener('touchend', dragEnd);

// Reset position on window resize
window.addEventListener('resize', () => {
    if (isMobile()) {
        terminalContainer.style.transform = 'none';
        xOffset = 0;
        yOffset = 0;
    } else {
        setInitialPosition();
    }
});

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
