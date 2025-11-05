// ============================================
// ADVANCED FEATURES - PART 2
// ============================================

// ============================================
// 1. NEOFETCH CLONE
// ============================================
function generateNeofetch() {
    const ascii = `
    <span class="highlight">         ___</span>
    <span class="highlight">        (.. |</span>
    <span class="highlight">        (<> |</span>
    <span class="highlight">       / __  \\</span>
    <span class="highlight">      ( /  \\ /|</span>
    <span class="highlight">     _/\\ __)/_)</span>
    <span class="highlight">     \\/-____\\/</span>
    `;

    const info = `
    <span class="highlight">rajeshalda@portfolio</span>
    ────────────────────────────
    <span class="highlight">OS:</span> Terminal Portfolio v2.0
    <span class="highlight">Host:</span> Browser (${navigator.userAgent.split(' ').pop()})
    <span class="highlight">Kernel:</span> JavaScript ES6+
    <span class="highlight">Uptime:</span> ${Math.floor(performance.now() / 1000)} seconds
    <span class="highlight">Shell:</span> interactive-terminal
    <span class="highlight">Resolution:</span> ${window.innerWidth}x${window.innerHeight}
    <span class="highlight">Theme:</span> ${document.body.className || 'Matrix Green'}
    <span class="highlight">Terminal:</span> Rajesh's Portfolio
    <span class="highlight">CPU:</span> Associate Software Engineer
    <span class="highlight">Memory:</span> Azure & CCNA Certified
    <span class="highlight">Storage:</span> SAP MM Trained

    <span style="background: #000">   </span><span style="background: #f00">   </span><span style="background: #0f0">   </span><span style="background: #ff0">   </span><span style="background: #00f">   </span><span style="background: #f0f">   </span><span style="background: #0ff">   </span><span style="background: #fff">   </span>
    `;

    return `<div style="display: flex; gap: 20px;"><div style="flex: 0 0 auto;">${ascii}</div><div style="flex: 1;">${info}</div></div>`;
}

// ============================================
// 2. WEATHER API
// ============================================
async function fetchWeather(city = 'Ranchi') {
    try {
        // Using wttr.in - no API key needed!
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        if (!response.ok) throw new Error('Weather data unavailable');

        const data = await response.json();
        const current = data.current_condition[0];
        const today = data.weather[0];

        return {
            location: data.nearest_area[0].areaName[0].value,
            temp: current.temp_C,
            feels: current.FeelsLikeC,
            condition: current.weatherDesc[0].value,
            humidity: current.humidity,
            windSpeed: current.windspeedKmph,
            maxTemp: today.maxtempC,
            minTemp: today.mintempC,
            sunrise: today.astronomy[0].sunrise,
            sunset: today.astronomy[0].sunset
        };
    } catch (error) {
        return null;
    }
}

function formatWeather(weather) {
    if (!weather) {
        return '<span class="output error">Unable to fetch weather data. Try again later.</span>';
    }

    const getWeatherIcon = (condition) => {
        const c = condition.toLowerCase();
        if (c.includes('sunny') || c.includes('clear')) return '☀️';
        if (c.includes('cloud')) return '☁️';
        if (c.includes('rain')) return '🌧️';
        if (c.includes('storm')) return '⛈️';
        if (c.includes('snow')) return '❄️';
        if (c.includes('fog') || c.includes('mist')) return '🌫️';
        return '🌤️';
    };

    return `
<span class="highlight">Weather in ${weather.location}</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${getWeatherIcon(weather.condition)} ${weather.condition}

Temperature:  ${weather.temp}°C (Feels like ${weather.feels}°C)
High/Low:     ${weather.maxTemp}°C / ${weather.minTemp}°C
Humidity:     ${weather.humidity}%
Wind Speed:   ${weather.windSpeed} km/h
Sunrise:      ${weather.sunrise}
Sunset:       ${weather.sunset}
    `;
}

// ============================================
// 3. CRYPTO PRICES
// ============================================
async function fetchCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano,solana,polkadot&vs_currencies=usd,inr&include_24hr_change=true');
        if (!response.ok) throw new Error('Crypto data unavailable');
        return await response.json();
    } catch (error) {
        return null;
    }
}

function formatCrypto(data) {
    if (!data) {
        return '<span class="output error">Unable to fetch crypto prices. Try again later.</span>';
    }

    const formatPrice = (usd, inr) => `$${usd.toLocaleString()} (₹${inr.toLocaleString()})`;
    const formatChange = (change) => {
        const color = change >= 0 ? 'var(--primary-color)' : 'var(--error-color)';
        const sign = change >= 0 ? '+' : '';
        return `<span style="color: ${color}">${sign}${change.toFixed(2)}%</span>`;
    };

    return `
<span class="highlight">Cryptocurrency Prices</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🪙 <span class="highlight">Bitcoin (BTC)</span>
   ${formatPrice(data.bitcoin.usd, data.bitcoin.inr)}
   24h Change: ${formatChange(data.bitcoin.usd_24h_change)}

💎 <span class="highlight">Ethereum (ETH)</span>
   ${formatPrice(data.ethereum.usd, data.ethereum.inr)}
   24h Change: ${formatChange(data.ethereum.usd_24h_change)}

🔷 <span class="highlight">Cardano (ADA)</span>
   ${formatPrice(data.cardano.usd, data.cardano.inr)}
   24h Change: ${formatChange(data.cardano.usd_24h_change)}

◎ <span class="highlight">Solana (SOL)</span>
   ${formatPrice(data.solana.usd, data.solana.inr)}
   24h Change: ${formatChange(data.solana.usd_24h_change)}

● <span class="highlight">Polkadot (DOT)</span>
   ${formatPrice(data.polkadot.usd, data.polkadot.inr)}
   24h Change: ${formatChange(data.polkadot.usd_24h_change)}

<span style="color: #888">Data provided by CoinGecko</span>
    `;
}

// ============================================
// 4. SOUND EFFECTS
// ============================================
class SoundSystem {
    constructor() {
        this.enabled = localStorage.getItem('soundEnabled') === 'true';
        this.audioContext = null;
    }

    init() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('soundEnabled', this.enabled);
        return this.enabled;
    }

    playKeyPress() {
        if (!this.enabled) return;
        this.init();

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.05);
    }

    playBeep() {
        if (!this.enabled) return;
        this.init();

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = 1000;
        oscillator.type = 'square';

        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    playSuccess() {
        if (!this.enabled) return;
        this.init();

        [523, 659, 784].forEach((freq, i) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = freq;
            oscillator.type = 'sine';

            const startTime = this.audioContext.currentTime + (i * 0.1);
            gainNode.gain.setValueAtTime(0.2, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

            oscillator.start(startTime);
            oscillator.stop(startTime + 0.2);
        });
    }

    playError() {
        if (!this.enabled) return;
        this.init();

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = 200;
        oscillator.type = 'sawtooth';

        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }
}

// ============================================
// 5. SKILLS CHART (ASCII Bar Chart)
// ============================================
function generateSkillsChart() {
    const skills = [
        { name: 'Microsoft Azure', level: 85 },
        { name: 'CCNA Networking', level: 90 },
        { name: 'SAP MM', level: 80 },
        { name: 'Cloud Computing', level: 85 },
        { name: 'Network Security', level: 75 },
        { name: 'System Administration', level: 70 }
    ];

    let output = `
<span class="highlight">Skills Proficiency</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

`;

    skills.forEach(skill => {
        const barLength = Math.floor(skill.level / 2); // Max 50 chars
        const bar = '█'.repeat(barLength);
        const empty = '░'.repeat(50 - barLength);
        output += `<span class="highlight">${skill.name.padEnd(20)}</span> ${bar}${empty} ${skill.level}%\n`;
    });

    return output;
}

// ============================================
// 6. QR CODE GENERATOR (using API)
// ============================================
function generateQRCode(text = window.location.href) {
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;

    return `
<span class="highlight">QR Code Generated</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<img src="${qrApiUrl}" alt="QR Code" style="border: 2px solid var(--primary-color); padding: 10px; background: white; margin: 10px 0;" />

Data: ${text}

<span style="color: #888">Scan this QR code to visit the portfolio on mobile!</span>
    `;
}

// ============================================
// 7. GUEST BOOK
// ============================================
class GuestBook {
    constructor() {
        this.entries = JSON.parse(localStorage.getItem('guestbook') || '[]');
    }

    addEntry(name, message) {
        const entry = {
            name: name,
            message: message,
            timestamp: new Date().toISOString(),
            id: Date.now()
        };

        this.entries.unshift(entry);

        // Keep only last 50 entries
        if (this.entries.length > 50) {
            this.entries = this.entries.slice(0, 50);
        }

        localStorage.setItem('guestbook', JSON.stringify(this.entries));
        return true;
    }

    getEntries(limit = 10) {
        return this.entries.slice(0, limit);
    }

    render() {
        if (this.entries.length === 0) {
            return `
<span class="highlight">Guest Book</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

No entries yet. Be the first to sign!

Usage: guestbook sign "Your Name" "Your Message"
       guestbook view
            `;
        }

        let output = `
<span class="highlight">Guest Book (${this.entries.length} entries)</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

`;

        this.entries.slice(0, 10).forEach((entry, i) => {
            const date = new Date(entry.timestamp).toLocaleDateString();
            output += `
<span class="highlight">${i + 1}. ${entry.name}</span> - ${date}
   "${entry.message}"
`;
        });

        output += `\nShowing ${Math.min(10, this.entries.length)} of ${this.entries.length} entries`;
        output += `\n\nSign the guestbook: guestbook sign "Your Name" "Your Message"`;

        return output;
    }
}

// ============================================
// 8. 2048 GAME
// ============================================
class Game2048 {
    constructor(container) {
        this.container = container;
        this.size = 4;
        this.grid = [];
        this.score = 0;
        this.gameOver = false;
        this.won = false;

        this.init();
    }

    init() {
        this.grid = Array(this.size).fill(null).map(() => Array(this.size).fill(0));
        this.score = 0;
        this.gameOver = false;
        this.won = false;

        this.addRandomTile();
        this.addRandomTile();
        this.render();

        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleKeyPress(e) {
        if (this.gameOver) return;

        const key = e.key;
        let moved = false;

        if (key === 'ArrowUp' || key === 'w' || key === 'W') {
            moved = this.move('up');
        } else if (key === 'ArrowDown' || key === 's' || key === 'S') {
            moved = this.move('down');
        } else if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
            moved = this.move('left');
        } else if (key === 'ArrowRight' || key === 'd' || key === 'D') {
            moved = this.move('right');
        }

        if (moved) {
            this.addRandomTile();
            this.render();

            if (this.isGameOver()) {
                this.gameOver = true;
                this.render();
            }
        }
    }

    addRandomTile() {
        const emptyCells = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.grid[i][j] === 0) {
                    emptyCells.push({x: i, y: j});
                }
            }
        }

        if (emptyCells.length > 0) {
            const cell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.grid[cell.x][cell.y] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    move(direction) {
        let moved = false;
        const oldGrid = JSON.stringify(this.grid);

        if (direction === 'left' || direction === 'right') {
            for (let i = 0; i < this.size; i++) {
                const row = this.grid[i].filter(x => x !== 0);
                const merged = this.mergeTiles(direction === 'left' ? row : row.reverse());
                const newRow = direction === 'left' ? merged : merged.reverse();

                while (newRow.length < this.size) {
                    direction === 'left' ? newRow.push(0) : newRow.unshift(0);
                }

                this.grid[i] = newRow;
            }
        } else {
            for (let j = 0; j < this.size; j++) {
                const col = this.grid.map(row => row[j]).filter(x => x !== 0);
                const merged = this.mergeTiles(direction === 'up' ? col : col.reverse());
                const newCol = direction === 'up' ? merged : merged.reverse();

                while (newCol.length < this.size) {
                    direction === 'up' ? newCol.push(0) : newCol.unshift(0);
                }

                for (let i = 0; i < this.size; i++) {
                    this.grid[i][j] = newCol[i];
                }
            }
        }

        moved = oldGrid !== JSON.stringify(this.grid);
        return moved;
    }

    mergeTiles(tiles) {
        const result = [];
        let i = 0;

        while (i < tiles.length) {
            if (i < tiles.length - 1 && tiles[i] === tiles[i + 1]) {
                const merged = tiles[i] * 2;
                result.push(merged);
                this.score += merged;

                if (merged === 2048 && !this.won) {
                    this.won = true;
                }

                i += 2;
            } else {
                result.push(tiles[i]);
                i++;
            }
        }

        return result;
    }

    isGameOver() {
        // Check for empty cells
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.grid[i][j] === 0) return false;
            }
        }

        // Check for possible merges
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const current = this.grid[i][j];
                if ((j < this.size - 1 && current === this.grid[i][j + 1]) ||
                    (i < this.size - 1 && current === this.grid[i + 1][j])) {
                    return false;
                }
            }
        }

        return true;
    }

    getTileColor(value) {
        const colors = {
            2: '#eee4da',
            4: '#ede0c8',
            8: '#f2b179',
            16: '#f59563',
            32: '#f67c5f',
            64: '#f65e3b',
            128: '#edcf72',
            256: '#edcc61',
            512: '#edc850',
            1024: '#edc53f',
            2048: '#edc22e'
        };
        return colors[value] || '#cdc1b4';
    }

    render() {
        let output = '<div style="font-family: monospace; line-height: 1.5;">';
        output += `<span class="highlight">2048 Game</span> - Score: ${this.score}\n\n`;

        // Draw grid
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const value = this.grid[i][j];
                const displayValue = value === 0 ? '·' : value.toString();
                const color = value === 0 ? '#444' : this.getTileColor(value);
                const textColor = value > 4 ? '#fff' : '#776e65';

                output += `<span style="display: inline-block; width: 60px; height: 40px; background: ${color}; color: ${textColor}; text-align: center; line-height: 40px; margin: 2px; border-radius: 3px; font-weight: bold;">${displayValue}</span>`;
            }
            output += '\n';
        }

        output += '\n<span style="color: #888">Controls: Arrow Keys or WASD</span>';

        if (this.won) {
            output += '\n\n<span class="highlight">🎉 You Won! You reached 2048! 🎉</span>';
        }

        if (this.gameOver) {
            output += '\n\n<span style="color: var(--error-color);">Game Over! Final Score: ' + this.score + '</span>';
            output += '\n<span style="color: #888">Type "2048" to play again</span>';
        }

        output += '</div>';
        this.container.innerHTML = output;
    }

    stop() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }
}

// ============================================
// EXPORT
// ============================================
window.advancedFeatures = {
    generateNeofetch,
    fetchWeather,
    formatWeather,
    fetchCryptoPrices,
    formatCrypto,
    SoundSystem,
    generateSkillsChart,
    generateQRCode,
    GuestBook,
    Game2048
};
