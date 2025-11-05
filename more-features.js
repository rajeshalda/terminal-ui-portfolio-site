// ============================================
// MORE ADVANCED FEATURES - PART 3
// ============================================

// ============================================
// 1. TYPING SPEED TEST
// ============================================
class TypingTest {
    constructor() {
        this.texts = [
            "The quick brown fox jumps over the lazy dog.",
            "Programming is the art of telling another human what one wants the computer to do.",
            "Code is like humor. When you have to explain it, it's bad.",
            "First, solve the problem. Then, write the code.",
            "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
        ];

        this.currentText = '';
        this.startTime = null;
        this.endTime = null;
        this.input = '';
        this.errors = 0;
    }

    start() {
        this.currentText = this.texts[Math.floor(Math.random() * this.texts.length)];
        this.startTime = Date.now();
        this.endTime = null;
        this.input = '';
        this.errors = 0;

        return this.render();
    }

    handleInput(char) {
        if (this.endTime) return this.render();

        this.input += char;

        if (this.input.length <= this.currentText.length) {
            if (this.input[this.input.length - 1] !== this.currentText[this.input.length - 1]) {
                this.errors++;
            }

            if (this.input.length === this.currentText.length) {
                this.endTime = Date.now();
            }
        }

        return this.render();
    }

    getResults() {
        if (!this.endTime) return null;

        const timeInSeconds = (this.endTime - this.startTime) / 1000;
        const wordsTyped = this.currentText.split(' ').length;
        const wpm = Math.round((wordsTyped / timeInSeconds) * 60);
        const accuracy = Math.round(((this.currentText.length - this.errors) / this.currentText.length) * 100);

        return { wpm, accuracy, time: timeInSeconds.toFixed(2), errors: this.errors };
    }

    render() {
        let output = '<div style="font-family: monospace; line-height: 1.8;">';
        output += '<span class="highlight">Typing Speed Test</span>\n';
        output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

        // Display text with highlighting
        for (let i = 0; i < this.currentText.length; i++) {
            if (i < this.input.length) {
                const correct = this.input[i] === this.currentText[i];
                const color = correct ? 'var(--primary-color)' : 'var(--error-color)';
                output += `<span style="color: ${color}; font-weight: bold;">${this.currentText[i]}</span>`;
            } else if (i === this.input.length) {
                output += `<span style="background: var(--primary-color); color: var(--background-dark);">${this.currentText[i]}</span>`;
            } else {
                output += `<span style="color: #666;">${this.currentText[i]}</span>`;
            }
        }

        output += '\n\n';

        if (this.endTime) {
            const results = this.getResults();
            output += `<span class="highlight">Results:</span>\n`;
            output += `  Speed: <span class="highlight">${results.wpm} WPM</span>\n`;
            output += `  Accuracy: <span class="highlight">${results.accuracy}%</span>\n`;
            output += `  Time: ${results.time} seconds\n`;
            output += `  Errors: ${results.errors}\n\n`;

            let rating = '';
            if (results.wpm >= 80) rating = '🚀 Excellent!';
            else if (results.wpm >= 60) rating = '👍 Great!';
            else if (results.wpm >= 40) rating = '✓ Good';
            else rating = '💪 Keep practicing!';

            output += `  Rating: ${rating}\n\n`;
            output += '<span style="color: #888">Type "typing" to try again</span>';
        } else {
            output += `Progress: ${this.input.length}/${this.currentText.length} characters\n`;
            output += '<span style="color: #888">Start typing the text above...</span>';
        }

        output += '</div>';
        return output;
    }
}

// ============================================
// 2. MORE THEMES (Extended Theme Library)
// ============================================
const extendedThemes = {
    // Original themes
    green: { name: 'Matrix Green', primary: '#00ff00', secondary: '#00ffff' },
    blue: { name: 'Blue Hacker', primary: '#00aaff', secondary: '#00ffff' },
    amber: { name: 'Amber Classic', primary: '#ffb000', secondary: '#ffd700' },
    purple: { name: 'Purple Haze', primary: '#bd93f9', secondary: '#ff79c6' },
    red: { name: 'Red Alert', primary: '#ff5555', secondary: '#ff6e6e' },

    // New themes
    dracula: { name: 'Dracula', primary: '#bd93f9', secondary: '#ff79c6' },
    monokai: { name: 'Monokai', primary: '#a6e22e', secondary: '#f92672' },
    nord: { name: 'Nord', primary: '#88c0d0', secondary: '#81a1c1' },
    solarized: { name: 'Solarized Dark', primary: '#268bd2', secondary: '#2aa198' },
    gruvbox: { name: 'Gruvbox', primary: '#b8bb26', secondary: '#fabd2f' },
    oceanic: { name: 'Oceanic Next', primary: '#6699cc', secondary: '#5fb3b3' },
    palenight: { name: 'Material Palenight', primary: '#c792ea', secondary: '#89ddff' },
    onedark: { name: 'One Dark', primary: '#61afef', secondary: '#c678dd' },
    tokyo: { name: 'Tokyo Night', primary: '#7aa2f7', secondary: '#bb9af7' },
    cyberpunk: { name: 'Cyberpunk', primary: '#ff00ff', secondary: '#00ffff' },
    forest: { name: 'Forest', primary: '#a7c080', secondary: '#dbbc7f' },
    sunset: { name: 'Sunset', primary: '#ff8700', secondary: '#ff5f00' },
    ocean: { name: 'Deep Ocean', primary: '#00d9ff', secondary: '#00a8cc' },
    neon: { name: 'Neon Pink', primary: '#ff10f0', secondary: '#ff6ec7' },
    hacker: { name: 'Elite Hacker', primary: '#39ff14', secondary: '#00ff00' }
};

function applyExtendedTheme(themeName) {
    const theme = extendedThemes[themeName];
    if (!theme) return false;

    const body = document.body;
    body.className = body.className.replace(/theme-\w+/g, '').trim();

    if (themeName !== 'green') {
        body.classList.add(`theme-${themeName}`);
    }

    // Update CSS variables
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--secondary-color', theme.secondary);

    localStorage.setItem('terminalTheme', themeName);
    return true;
}

// ============================================
// 3. COWSAY
// ============================================
function cowsay(message) {
    const maxWidth = 40;
    const lines = [];
    let currentLine = '';

    message.split(' ').forEach(word => {
        if ((currentLine + word).length > maxWidth) {
            lines.push(currentLine.trim());
            currentLine = word + ' ';
        } else {
            currentLine += word + ' ';
        }
    });

    if (currentLine.trim()) {
        lines.push(currentLine.trim());
    }

    const longestLine = Math.max(...lines.map(l => l.length));
    const border = '-'.repeat(longestLine + 2);

    let output = ' ' + border + '\n';

    if (lines.length === 1) {
        output += `< ${lines[0].padEnd(longestLine)} >\n`;
    } else {
        lines.forEach((line, i) => {
            const padded = line.padEnd(longestLine);
            if (i === 0) {
                output += `/ ${padded} \\\n`;
            } else if (i === lines.length - 1) {
                output += `\\ ${padded} /\n`;
            } else {
                output += `| ${padded} |\n`;
            }
        });
    }

    output += ' ' + border + '\n';
    output += '        \\   ^__^\n';
    output += '         \\  (oo)\\_______\n';
    output += '            (__)\\       )\\/\\\n';
    output += '                ||----w |\n';
    output += '                ||     ||\n';

    return `<pre>${output}</pre>`;
}

// ============================================
// 4. FIGLET (ASCII Text Art)
// ============================================
function figlet(text) {
    const fonts = {
        'standard': {
            'A': ['  ___  ', ' / _ \\ ', '| |_| |', '|  _  |', '|_| |_|'],
            'B': [' _____ ', '|  _  |', '| |_| |', '|  _  |', '|_____| '],
            'C': [' _____ ', '|  ___|', '| |    ', '| |___ ', '|_____|'],
            // Add more letters as needed
        }
    };

    // Simplified version - just makes text bigger
    const bigText = text.toUpperCase().split('').map(char => {
        return `
 ██ ${char} ██
 ██ ${char} ██
 ██ ${char} ██
        `.trim();
    }).join('  ');

    return `<pre class="highlight">${bigText}</pre>`;
}

// ============================================
// 5. FORTUNE COOKIES
// ============================================
const fortunes = [
    "Your code will compile on the first try today!",
    "A bug you've been hunting will reveal itself soon.",
    "Your next commit will be legendary.",
    "The solution you seek is in the documentation.",
    "You will successfully explain recursion to someone today.",
    "Your pull request will be merged without comments.",
    "Stack Overflow will have your answer.",
    "You will finish that side project this month.",
    "Your code review will receive only praise.",
    "The coffee machine will work when you need it most.",
    "You will write bug-free code today... or not.",
    "The person who wrote this spaghetti code was you, 6 months ago.",
    "Your 'temporary fix' will become permanent.",
    "You will find a semi-colon you forgot.",
    "Debugging will teach you patience today.",
    "Your variable naming will be questioned.",
    "You will Google the same error twice today.",
    "Your code works, but you don't know why.",
    "It works on your machine, and that's what matters.",
    "You will discover a new keyboard shortcut today."
];

function getFortune() {
    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    return `
╔════════════════════════════════════════╗
║  🥠 Fortune Cookie                     ║
╠════════════════════════════════════════╣
║                                        ║
║  ${fortune.padEnd(38)}║
║                                        ║
╚════════════════════════════════════════╝
    `;
}

// ============================================
// 6. QUIZ GAME
// ============================================
class TechQuiz {
    constructor() {
        this.questions = [
            {
                question: "What does 'Azure' stand for in Microsoft Azure?",
                options: ["A) Advanced Zero-config Unified Resource Engine", "B) It's just a name, doesn't stand for anything", "C) Automated Zone for Unified Resources", "D) Application Zone for Universal Resources"],
                correct: 1,
                explanation: "Azure is just a brand name chosen by Microsoft, it's not an acronym!"
            },
            {
                question: "What is CCNA?",
                options: ["A) Cisco Certified Network Administrator", "B) Cisco Certified Network Associate", "C) Central Computer Network Association", "D) Certified Cloud Network Admin"],
                correct: 1,
                explanation: "CCNA stands for Cisco Certified Network Associate."
            },
            {
                question: "In SAP MM, what does 'MM' stand for?",
                options: ["A) Material Management", "B) Money Manager", "C) Master Module", "D) Manufacturing Management"],
                correct: 0,
                explanation: "MM stands for Material Management in SAP."
            },
            {
                question: "What OSI layer does a router operate at?",
                options: ["A) Layer 2 (Data Link)", "B) Layer 3 (Network)", "C) Layer 4 (Transport)", "D) Layer 7 (Application)"],
                correct: 1,
                explanation: "Routers operate at Layer 3 (Network Layer) of the OSI model."
            },
            {
                question: "What is the default port for HTTPS?",
                options: ["A) 80", "B) 8080", "C) 443", "D) 8443"],
                correct: 2,
                explanation: "HTTPS uses port 443 by default, while HTTP uses port 80."
            }
        ];

        this.currentQuestion = 0;
        this.score = 0;
        this.answered = false;
        this.selectedAnswer = -1;
    }

    start() {
        this.currentQuestion = 0;
        this.score = 0;
        this.answered = false;
        this.selectedAnswer = -1;
        return this.render();
    }

    answer(choice) {
        if (this.answered) return this.render();

        this.selectedAnswer = parseInt(choice) - 1;
        this.answered = true;

        if (this.selectedAnswer === this.questions[this.currentQuestion].correct) {
            this.score++;
        }

        return this.render();
    }

    next() {
        this.currentQuestion++;
        this.answered = false;
        this.selectedAnswer = -1;
        return this.render();
    }

    render() {
        if (this.currentQuestion >= this.questions.length) {
            const percentage = (this.score / this.questions.length) * 100;
            let rating = '';

            if (percentage === 100) rating = '🏆 Perfect Score!';
            else if (percentage >= 80) rating = '🌟 Excellent!';
            else if (percentage >= 60) rating = '👍 Good Job!';
            else if (percentage >= 40) rating = '📚 Keep Learning!';
            else rating = '💪 Practice More!';

            return `
<span class="highlight">Quiz Complete!</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your Score: ${this.score}/${this.questions.length} (${percentage.toFixed(0)}%)

${rating}

Type 'quiz' to play again!
            `;
        }

        const q = this.questions[this.currentQuestion];
        let output = `
<span class="highlight">Tech Quiz - Question ${this.currentQuestion + 1}/${this.questions.length}</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${q.question}

`;

        q.options.forEach((option, i) => {
            const letter = String.fromCharCode(65 + i);
            let style = '';

            if (this.answered) {
                if (i === q.correct) {
                    style = 'color: var(--primary-color); font-weight: bold;';
                } else if (i === this.selectedAnswer) {
                    style = 'color: var(--error-color);';
                }
            }

            output += `  <span style="${style}">${i + 1}. ${option}</span>\n`;
        });

        if (this.answered) {
            const correct = this.selectedAnswer === q.correct;
            output += `\n${correct ? '<span class="highlight">✓ Correct!</span>' : '<span style="color: var(--error-color);">✗ Wrong!</span>'}`;
            output += `\n\n${q.explanation}`;
            output += `\n\nType 'next' to continue or type a number (1-4) for next question`;
        } else {
            output += `\nType a number (1-${q.options.length}) to answer`;
        }

        output += `\n\nScore: ${this.score}/${this.currentQuestion}`;

        return output;
    }
}

// ============================================
// 7. CRT/SCANLINE EFFECTS
// ============================================
function enableCRTEffect() {
    const style = document.createElement('style');
    style.id = 'crt-effects';
    style.textContent = `
        .terminal-body::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: repeating-linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.15),
                rgba(0, 0, 0, 0.15) 1px,
                transparent 1px,
                transparent 2px
            );
            pointer-events: none;
            z-index: 10;
        }

        .terminal-body::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
            pointer-events: none;
            z-index: 9;
        }

        .terminal-body {
            position: relative;
            animation: flicker 0.15s infinite;
        }

        @keyframes flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.98; }
        }

        #terminal-output {
            text-shadow: 0 0 5px var(--primary-color);
        }
    `;
    document.head.appendChild(style);
    localStorage.setItem('crtEffect', 'enabled');
}

function disableCRTEffect() {
    const style = document.getElementById('crt-effects');
    if (style) style.remove();
    localStorage.setItem('crtEffect', 'disabled');
}

function toggleCRTEffect() {
    const style = document.getElementById('crt-effects');
    if (style) {
        disableCRTEffect();
        return false;
    } else {
        enableCRTEffect();
        return true;
    }
}

// ============================================
// 8. GLITCH EFFECT
// ============================================
function glitchEffect() {
    const terminal = document.querySelector('.terminal-container');
    terminal.classList.add('glitch-active');

    const style = document.createElement('style');
    style.textContent = `
        .glitch-active {
            animation: glitch 0.3s infinite;
        }

        @keyframes glitch {
            0%, 100% { transform: translate(-50%, -50%); }
            25% { transform: translate(calc(-50% + 2px), calc(-50% + 2px)); }
            50% { transform: translate(calc(-50% - 2px), calc(-50% - 2px)); }
            75% { transform: translate(calc(-50% + 2px), calc(-50% - 2px)); }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        terminal.classList.remove('glitch-active');
        style.remove();
    }, 1000);
}

// ============================================
// EXPORT
// ============================================
window.moreFeatures = {
    TypingTest,
    extendedThemes,
    applyExtendedTheme,
    cowsay,
    figlet,
    getFortune,
    TechQuiz,
    enableCRTEffect,
    disableCRTEffect,
    toggleCRTEffect,
    glitchEffect
};
