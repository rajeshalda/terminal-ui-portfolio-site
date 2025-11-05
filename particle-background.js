// ============================================
// VANILLA JS PARTICLE BACKGROUND
// No external libraries required!
// ============================================

(function() {
    'use strict';

    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = -9999; // Start off-screen
    let mouseY = -9999;
    let targetMouseX = -9999;
    let targetMouseY = -9999;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Configuration
    const PARTICLE_COUNT = 150;
    const PARTICLE_SIZE = 2;
    const MAX_DISTANCE = 150;
    const MOUSE_RADIUS = 250; // Increased for more noticeable effect
    const MOUSE_FORCE = 1.2; // Increased force strength

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = PARTICLE_SIZE + Math.random() * 2;
        }

        update() {
            // Apply velocity
            this.x += this.vx;
            this.y += this.vy;

            // Mouse interaction - attract to mouse with stronger force
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < MOUSE_RADIUS && distance > 0) {
                const force = (1 - distance / MOUSE_RADIUS) * MOUSE_FORCE;
                this.vx += dx * force * 0.002;
                this.vy += dy * force * 0.002;

                // Apply direct position change for immediate feedback
                this.x += dx * force * 0.015;
                this.y += dy * force * 0.015;
            }

            // Apply friction to velocity
            this.vx *= 0.98;
            this.vy *= 0.98;

            // Wrap around edges
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = getParticleColor();
            ctx.fill();

            // Add glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = getParticleColor();
        }
    }

    // Get particle color from CSS variable
    function getParticleColor() {
        const primaryColor = getComputedStyle(document.body)
            .getPropertyValue('--primary-color')
            .trim() || '#00ff00';
        return primaryColor;
    }

    // Initialize particles
    function init() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }
        console.log('Particle background initialized! Particles:', PARTICLE_COUNT);
    }

    // Draw connections between nearby particles
    function drawConnections() {
        const color = getParticleColor();

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < MAX_DISTANCE) {
                    const opacity = (1 - distance / MAX_DISTANCE) * 0.3;
                    ctx.beginPath();
                    ctx.strokeStyle = hexToRgba(color, opacity);
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Convert hex color to rgba
    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // Animation loop
    function animate() {
        // Smooth mouse interpolation
        mouseX += (targetMouseX - mouseX) * 0.1;
        mouseY += (targetMouseY - mouseY) * 0.1;

        // Clear canvas with fade effect
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, width, height);

        // Reset shadow
        ctx.shadowBlur = 0;

        // Draw mouse interaction area (visual feedback)
        if (targetMouseX > 0 && targetMouseY > 0) {
            const color = getParticleColor();
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, MOUSE_RADIUS, 0, Math.PI * 2);
            ctx.strokeStyle = hexToRgba(color, 0.1);
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw smaller inner circle
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, MOUSE_RADIUS / 2, 0, Math.PI * 2);
            ctx.strokeStyle = hexToRgba(color, 0.15);
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Draw connections first (behind particles)
        drawConnections();

        // Update and draw particles
        for (let particle of particles) {
            particle.update();
            particle.draw();
        }

        requestAnimationFrame(animate);
    }

    // Mouse move handler
    function handleMouseMove(event) {
        targetMouseX = event.clientX;
        targetMouseY = event.clientY;
    }

    // Window resize handler
    function handleResize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    // Update colors when theme changes
    function updateColors() {
        console.log('Particle colors updated for theme change');
    }

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Expose update function for theme changes
    window.update3DBackground = updateColors;

    // Debug: Log first mouse movement
    let firstMouseMove = true;
    document.addEventListener('mousemove', function logFirstMove(e) {
        if (firstMouseMove) {
            console.log('✅ Mouse interaction active! Move your cursor to attract particles.');
            console.log(`Mouse position: ${e.clientX}, ${e.clientY}`);
            firstMouseMove = false;
            document.removeEventListener('mousemove', logFirstMove);
        }
    });

    // Initialize and start
    init();
    animate();

    console.log('🌟 Particle background fully loaded and animating!');
    console.log(`📍 Interaction radius: ${MOUSE_RADIUS}px`);

})();
