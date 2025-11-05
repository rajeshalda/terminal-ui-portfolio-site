// ============================================
// BACKGROUND EFFECTS & ANIMATIONS
// ============================================

// ============================================
// 1. ANIMATED BACKGROUND CANVAS (STARS)
// ============================================
class BackgroundAnimation {
    constructor() {
        this.canvas = document.getElementById('background-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.shootingStars = [];
        this.resize();

        window.addEventListener('resize', () => this.resize());
        this.init();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        // Create stars
        for (let i = 0; i < 150; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2,
                speed: Math.random() * 0.5 + 0.1,
                opacity: Math.random()
            });
        }
    }

    createShootingStar() {
        if (Math.random() < 0.01) { // 1% chance per frame
            this.shootingStars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * (this.canvas.height / 2),
                length: Math.random() * 80 + 10,
                speed: Math.random() * 10 + 5,
                opacity: 1
            });
        }
    }

    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw and update stars
        this.stars.forEach(star => {
            this.ctx.fillStyle = `rgba(0, 255, 0, ${star.opacity})`;
            this.ctx.fillRect(star.x, star.y, star.size, star.size);

            star.y += star.speed;
            star.opacity = Math.sin(Date.now() * 0.001 + star.x) * 0.5 + 0.5;

            if (star.y > this.canvas.height) {
                star.y = 0;
                star.x = Math.random() * this.canvas.width;
            }
        });

        // Create and draw shooting stars
        this.createShootingStar();

        this.shootingStars = this.shootingStars.filter(star => {
            this.ctx.strokeStyle = `rgba(0, 255, 0, ${star.opacity})`;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(star.x, star.y);
            this.ctx.lineTo(star.x + star.length, star.y + star.length);
            this.ctx.stroke();

            star.x += star.speed;
            star.y += star.speed;
            star.opacity -= 0.02;

            return star.opacity > 0;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// 2. FLOATING PARTICLES
// ============================================
class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles');
        if (!this.container) return;

        this.createParticles();
    }

    createParticles() {
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                this.createParticle();
            }, i * 200);
        }

        // Create new particles periodically
        setInterval(() => {
            if (Math.random() < 0.3) {
                this.createParticle();
            }
        }, 3000);
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 4 + 1;
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${startX}px`;
        particle.style.bottom = '0';
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        this.container.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, (duration + delay) * 1000);
    }
}

// ============================================
// 3. UPDATE LIVE STATS
// ============================================
function updateLiveStats() {
    // Update visitor count
    const visits = localStorage.getItem('portfolioVisits') || '1';
    const visitorEl = document.getElementById('visitor-count');
    if (visitorEl) {
        visitorEl.textContent = visits;
        animateNumber(visitorEl, 0, parseInt(visits), 1000);
    }

    // Update commands count
    const commands = localStorage.getItem('commandCount') || '0';
    const commandsEl = document.getElementById('commands-count');
    if (commandsEl) {
        commandsEl.textContent = commands;
        animateNumber(commandsEl, 0, parseInt(commands), 1000);
    }

    // Update live time
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timeEl = document.getElementById('live-time');
        if (timeEl) {
            timeEl.textContent = `${hours}:${minutes}`;
        }
    }

    updateTime();
    setInterval(updateTime, 1000);
}

function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ============================================
// 4. INITIALIZE ON LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Start background animation
    new BackgroundAnimation();

    // Start particle system
    new ParticleSystem();

    // Update live stats
    updateLiveStats();

    // Add entrance animation to quick cards
    const cards = document.querySelectorAll('.quick-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(50px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 100 * index);
    });

    // Add entrance animation to stats widgets
    const widgets = document.querySelectorAll('.widget-item');
    widgets.forEach((widget, index) => {
        widget.style.opacity = '0';
        widget.style.transform = 'translateX(-50px)';
        setTimeout(() => {
            widget.style.transition = 'all 0.6s ease';
            widget.style.opacity = '1';
            widget.style.transform = 'translateX(0)';
        }, 100 * index + 200);
    });

    // Add subtle hover effect to terminal
    const terminal = document.querySelector('.terminal-container');
    if (terminal && !window.matchMedia('(max-width: 768px)').matches) {
        terminal.addEventListener('mouseenter', () => {
            terminal.style.transform = 'translate(-50%, -50%) scale(1.02)';
        });

        terminal.addEventListener('mouseleave', () => {
            terminal.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }
});

// ============================================
// EXPORT FOR USE IN OTHER SCRIPTS
// ============================================
window.backgroundEffects = {
    BackgroundAnimation,
    ParticleSystem,
    updateLiveStats
};
