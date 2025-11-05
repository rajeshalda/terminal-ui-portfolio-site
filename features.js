// Enhanced Features for Terminal Portfolio

// ============================================
// 1. THEME SYSTEM
// ============================================
const themes = {
    green: 'Matrix Green',
    blue: 'Blue Hacker',
    amber: 'Amber Classic',
    purple: 'Purple Haze',
    red: 'Red Alert'
};

function changeTheme(themeName) {
    const body = document.body;
    // Remove all theme classes
    body.className = body.className.replace(/theme-\w+/g, '').trim();

    // Add new theme class (except for green which is default)
    if (themeName !== 'green') {
        body.classList.add(`theme-${themeName}`);
    }

    // Save to localStorage
    localStorage.setItem('terminalTheme', themeName);
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('terminalTheme');
    if (savedTheme && themes[savedTheme]) {
        changeTheme(savedTheme);
    }
}

// ============================================
// 2. TYPING ANIMATION
// ============================================
let isTyping = false;
let typingQueue = [];

function typeText(text, element, speed = 5) {
    return new Promise((resolve) => {
        isTyping = true;
        let index = 0;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';

        element.innerHTML = '';

        function type() {
            if (index < text.length) {
                // Handle HTML tags
                if (text[index] === '<') {
                    let tagEnd = text.indexOf('>', index);
                    if (tagEnd !== -1) {
                        element.innerHTML += text.substring(index, tagEnd + 1);
                        index = tagEnd + 1;
                    } else {
                        element.innerHTML += text[index];
                        index++;
                    }
                } else {
                    element.innerHTML += text[index];
                    index++;
                }
                setTimeout(type, speed);
            } else {
                isTyping = false;
                resolve();
            }
        }

        type();
    });
}

// ============================================
// 3. VISITOR COUNTER
// ============================================
function initVisitorCounter() {
    let visits = localStorage.getItem('portfolioVisits');
    if (visits) {
        visits = parseInt(visits) + 1;
    } else {
        visits = 1;
    }
    localStorage.setItem('portfolioVisits', visits);
    return visits;
}

function getVisitorStats() {
    const visits = localStorage.getItem('portfolioVisits') || 1;
    const commandCount = localStorage.getItem('commandCount') || 0;
    const firstVisit = localStorage.getItem('firstVisit') || new Date().toLocaleDateString();

    if (!localStorage.getItem('firstVisit')) {
        localStorage.setItem('firstVisit', firstVisit);
    }

    return { visits, commandCount, firstVisit };
}

function incrementCommandCount() {
    let count = localStorage.getItem('commandCount');
    count = count ? parseInt(count) + 1 : 1;
    localStorage.setItem('commandCount', count);
}

// ============================================
// 4. FILE SYSTEM SIMULATION
// ============================================
const fileSystem = {
    '/': {
        type: 'dir',
        children: {
            'home': {
                type: 'dir',
                children: {
                    'about.txt': { type: 'file', content: 'About Rajesh Alda - Associate Software Engineer' },
                    'skills.txt': { type: 'file', content: 'Technical Skills: Azure, CCNA, SAP MM, Networking' },
                    'contact.txt': { type: 'file', content: 'Email: rajeshalda844@gmail.com | Phone: +91-8292701044' }
                }
            },
            'projects': {
                type: 'dir',
                children: {
                    'azure-infrastructure.txt': { type: 'file', content: 'Azure Cloud Infrastructure Setup' },
                    'network-design.txt': { type: 'file', content: 'Network Design & Implementation with CCNA' },
                    'sap-mm.txt': { type: 'file', content: 'SAP MM Procurement Workflows' }
                }
            },
            'docs': {
                type: 'dir',
                children: {
                    'resume.pdf': { type: 'file', content: '[Resume PDF file]' },
                    'certifications': {
                        type: 'dir',
                        children: {
                            'azure-az900.txt': { type: 'file', content: 'Microsoft Azure Fundamentals (AZ-900)' },
                            'ccna.txt': { type: 'file', content: 'Cisco Certified Network Associate (CCNA)' }
                        }
                    }
                }
            }
        }
    }
};

let currentPath = '/';

function resolvePath(path) {
    if (path.startsWith('/')) {
        return path;
    }

    let resolved = currentPath;
    if (!resolved.endsWith('/')) resolved += '/';
    resolved += path;

    // Normalize path
    const parts = resolved.split('/').filter(p => p && p !== '.');
    const normalized = [];

    for (const part of parts) {
        if (part === '..') {
            normalized.pop();
        } else {
            normalized.push(part);
        }
    }

    return '/' + normalized.join('/');
}

function getNode(path) {
    const parts = path.split('/').filter(p => p);
    let node = fileSystem['/'];

    for (const part of parts) {
        if (node.type === 'dir' && node.children && node.children[part]) {
            node = node.children[part];
        } else {
            return null;
        }
    }

    return node;
}

// ============================================
// 5. GITHUB API INTEGRATION
// ============================================
async function fetchGitHubStats(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error('User not found');

        const data = await response.json();
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
        const repos = await reposResponse.json();

        return { user: data, repos };
    } catch (error) {
        return null;
    }
}

// ============================================
// 6. EASTER EGGS DATA
// ============================================
const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "Why did the developer go broke? Because he used up all his cache!",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
    "Why do Java developers wear glasses? Because they don't C#!",
    "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
    "What's the object-oriented way to become wealthy? Inheritance!",
    "Why did the programmer quit his job? Because he didn't get arrays!",
    "What do you call a programmer from Finland? Nerdic!",
    "Why do Python programmers have low self-esteem? They're constantly comparing themselves to others!",
    "What's a programmer's favorite hangout place? Foo Bar!"
];

const quotes = [
    "\"Talk is cheap. Show me the code.\" - Linus Torvalds",
    "\"Code is like humor. When you have to explain it, it's bad.\" - Cory House",
    "\"First, solve the problem. Then, write the code.\" - John Johnson",
    "\"Experience is the name everyone gives to their mistakes.\" - Oscar Wilde",
    "\"In order to be irreplaceable, one must always be different.\" - Coco Chanel",
    "\"Java is to JavaScript what car is to Carpet.\" - Chris Heilmann",
    "\"Knowledge is power.\" - Francis Bacon",
    "\"Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.\" - Dan Salomon",
    "\"Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.\" - Antoine de Saint-Exupery",
    "\"Code never lies, comments sometimes do.\" - Ron Jeffries"
];

// ============================================
// 7. MATRIX RAIN EFFECT
// ============================================
function matrixRain(duration = 5000) {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '9999';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 20);
    const drops = Array(columns).fill(1);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = '15px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * 20, drops[i] * 20);

            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    const interval = setInterval(draw, 33);

    setTimeout(() => {
        clearInterval(interval);
        document.body.removeChild(canvas);
    }, duration);
}

// ============================================
// 8. SNAKE GAME
// ============================================
class SnakeGame {
    constructor(container) {
        this.container = container;
        this.gridSize = 20;
        this.grid = [];
        this.snake = [{x: 10, y: 10}];
        this.food = this.generateFood();
        this.direction = {x: 1, y: 0};
        this.nextDirection = {x: 1, y: 0};
        this.gameOver = false;
        this.score = 0;
        this.gameLoop = null;

        this.init();
    }

    init() {
        this.render();
        this.gameLoop = setInterval(() => this.update(), 150);

        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleKeyPress(e) {
        if (this.gameOver) return;

        const key = e.key.toLowerCase();
        if ((key === 'arrowup' || key === 'w') && this.direction.y === 0) {
            this.nextDirection = {x: 0, y: -1};
        } else if ((key === 'arrowdown' || key === 's') && this.direction.y === 0) {
            this.nextDirection = {x: 0, y: 1};
        } else if ((key === 'arrowleft' || key === 'a') && this.direction.x === 0) {
            this.nextDirection = {x: -1, y: 0};
        } else if ((key === 'arrowright' || key === 'd') && this.direction.x === 0) {
            this.nextDirection = {x: 1, y: 0};
        }
    }

    generateFood() {
        let food;
        do {
            food = {
                x: Math.floor(Math.random() * this.gridSize),
                y: Math.floor(Math.random() * this.gridSize)
            };
        } while (this.snake.some(segment => segment.x === food.x && segment.y === food.y));
        return food;
    }

    update() {
        if (this.gameOver) return;

        this.direction = this.nextDirection;

        const head = {
            x: this.snake[0].x + this.direction.x,
            y: this.snake[0].y + this.direction.y
        };

        // Check collision with walls
        if (head.x < 0 || head.x >= this.gridSize || head.y < 0 || head.y >= this.gridSize) {
            this.endGame();
            return;
        }

        // Check collision with self
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.endGame();
            return;
        }

        this.snake.unshift(head);

        // Check if food eaten
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.food = this.generateFood();
        } else {
            this.snake.pop();
        }

        this.render();
    }

    render() {
        let output = `<div style="font-family: monospace; line-height: 1.2;">Score: ${this.score}\n\n`;

        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                if (this.snake.some(segment => segment.x === x && segment.y === y)) {
                    output += '█';
                } else if (this.food.x === x && this.food.y === y) {
                    output += '●';
                } else {
                    output += '·';
                }
            }
            output += '\n';
        }

        output += '\nControls: Arrow Keys or WASD\nPress Ctrl+C to quit</div>';
        this.container.innerHTML = output;
    }

    endGame() {
        this.gameOver = true;
        clearInterval(this.gameLoop);
        this.container.innerHTML += `\n\n<span style="color: var(--error-color);">Game Over! Final Score: ${this.score}</span>`;
    }

    stop() {
        clearInterval(this.gameLoop);
        document.removeEventListener('keydown', this.handleKeyPress);
    }
}

// ============================================
// 9. TIC-TAC-TOE GAME
// ============================================
class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.winner = null;
    }

    makeMove(position) {
        if (this.gameOver || this.board[position] !== null) {
            return false;
        }

        this.board[position] = this.currentPlayer;

        if (this.checkWinner()) {
            this.winner = this.currentPlayer;
            this.gameOver = true;
            return true;
        }

        if (this.board.every(cell => cell !== null)) {
            this.gameOver = true;
            return true;
        }

        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';

        // AI move
        if (this.currentPlayer === 'O' && !this.gameOver) {
            setTimeout(() => {
                this.aiMove();
            }, 500);
        }

        return true;
    }

    aiMove() {
        const emptySpaces = this.board.map((cell, i) => cell === null ? i : null).filter(i => i !== null);
        if (emptySpaces.length > 0) {
            const move = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
            this.makeMove(move);
        }
    }

    checkWinner() {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        return lines.some(([a, b, c]) => {
            return this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c];
        });
    }

    render() {
        let output = '<div style="font-family: monospace; line-height: 1.5;">';
        output += 'Tic-Tac-Toe (You: X, Computer: O)\n\n';

        for (let i = 0; i < 9; i += 3) {
            output += '  ';
            for (let j = 0; j < 3; j++) {
                const index = i + j;
                const cell = this.board[index];
                output += cell || (index + 1);
                if (j < 2) output += ' | ';
            }
            output += '\n';
            if (i < 6) output += ' -----------\n';
        }

        if (this.gameOver) {
            if (this.winner) {
                output += `\n<span style="color: var(--secondary-color);">${this.winner} wins!</span>`;
            } else {
                output += '\n<span style="color: var(--secondary-color);">It\'s a draw!</span>';
            }
        } else {
            output += `\n\nCurrent player: ${this.currentPlayer}`;
            output += '\nEnter a number (1-9) to make your move';
        }

        output += '</div>';
        return output;
    }
}

// ============================================
// EXPORT FOR USE IN MAIN SCRIPT
// ============================================
window.terminalFeatures = {
    themes,
    changeTheme,
    loadSavedTheme,
    typeText,
    initVisitorCounter,
    getVisitorStats,
    incrementCommandCount,
    fileSystem,
    currentPath,
    resolvePath,
    getNode,
    fetchGitHubStats,
    jokes,
    quotes,
    matrixRain,
    SnakeGame,
    TicTacToe
};
