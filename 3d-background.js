// ============================================
// 3D INTERACTIVE BACKGROUND WITH THREE.JS
// ============================================

(function() {
    'use strict';

    // Scene setup
    let scene, camera, renderer, particles, particleSystem;
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    // Particle configuration
    const PARTICLE_COUNT = 1500;
    const PARTICLE_SIZE = 2;
    const PARTICLE_SPEED = 0.0005;
    const MOUSE_INFLUENCE = 50;

    function init() {
        // Check if THREE.js is loaded
        if (typeof THREE === 'undefined') {
            console.error('THREE.js not loaded! Cannot initialize 3D background.');
            return;
        }

        // Get canvas
        const canvas = document.getElementById('three-canvas');
        if (!canvas) {
            console.error('Canvas element not found!');
            return;
        }

        console.log('Initializing 3D background...');

        // Create scene
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.0008);

        // Create camera
        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        camera.position.z = 400;

        // Create renderer
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);

        // Create particles
        createParticles();

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x00ff88, 1, 1000);
        pointLight.position.set(0, 0, 400);
        scene.add(pointLight);

        // Event listeners
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        window.addEventListener('resize', onWindowResize, false);

        // Start animation
        animate();

        console.log('3D background initialized successfully! Particles:', PARTICLE_COUNT);
    }

    function createParticles() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const colors = new Float32Array(PARTICLE_COUNT * 3);
        const velocities = [];

        // Get theme color
        const themeColor = getComputedStyle(document.body)
            .getPropertyValue('--primary-color')
            .trim() || '#00ff88';
        const color = new THREE.Color(themeColor);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;

            // Position
            positions[i3] = Math.random() * 2000 - 1000;
            positions[i3 + 1] = Math.random() * 2000 - 1000;
            positions[i3 + 2] = Math.random() * 2000 - 1000;

            // Color with slight variation
            const colorVariation = 0.3;
            colors[i3] = color.r + (Math.random() - 0.5) * colorVariation;
            colors[i3 + 1] = color.g + (Math.random() - 0.5) * colorVariation;
            colors[i3 + 2] = color.b + (Math.random() - 0.5) * colorVariation;

            // Velocity for floating effect
            velocities.push({
                x: (Math.random() - 0.5) * 0.5,
                y: (Math.random() - 0.5) * 0.5,
                z: (Math.random() - 0.5) * 0.5
            });
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Store velocities as custom property
        geometry.userData.velocities = velocities;

        // Create material
        const material = new THREE.PointsMaterial({
            size: PARTICLE_SIZE,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        // Create particle system
        particleSystem = new THREE.Points(geometry, material);
        particles = geometry.getAttribute('position');
        scene.add(particleSystem);

        // Add connecting lines
        createConnections();
    }

    function createConnections() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(PARTICLE_COUNT * 6);

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.LineBasicMaterial({
            color: 0x00ff88,
            transparent: true,
            opacity: 0.1,
            blending: THREE.AdditiveBlending
        });

        const lines = new THREE.LineSegments(geometry, material);
        scene.add(lines);

        // Store lines for updates
        scene.userData.lines = lines;
    }

    function updateConnections() {
        const lines = scene.userData.lines;
        if (!lines) return;

        const positions = particles.array;
        const linePositions = lines.geometry.attributes.position.array;
        let vertexpos = 0;
        const maxDistance = 150;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;
            const x1 = positions[i3];
            const y1 = positions[i3 + 1];
            const z1 = positions[i3 + 2];

            // Only check nearby particles (optimization)
            for (let j = i + 1; j < Math.min(i + 10, PARTICLE_COUNT); j++) {
                const j3 = j * 3;
                const x2 = positions[j3];
                const y2 = positions[j3 + 1];
                const z2 = positions[j3 + 2];

                const dx = x1 - x2;
                const dy = y1 - y2;
                const dz = z1 - z2;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (distance < maxDistance) {
                    linePositions[vertexpos++] = x1;
                    linePositions[vertexpos++] = y1;
                    linePositions[vertexpos++] = z1;
                    linePositions[vertexpos++] = x2;
                    linePositions[vertexpos++] = y2;
                    linePositions[vertexpos++] = z2;
                }
            }
        }

        lines.geometry.setDrawRange(0, vertexpos / 3);
        lines.geometry.attributes.position.needsUpdate = true;
    }

    function onDocumentMouseMove(event) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        requestAnimationFrame(animate);

        // Smooth camera movement following mouse
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (-targetY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        // Animate particles
        if (particles) {
            const positions = particles.array;
            const velocities = particleSystem.geometry.userData.velocities;

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const i3 = i * 3;

                // Apply velocity for floating effect
                positions[i3] += velocities[i].x;
                positions[i3 + 1] += velocities[i].y;
                positions[i3 + 2] += velocities[i].z;

                // Mouse interaction - attract particles
                const dx = mouseX * 2 - positions[i3];
                const dy = -mouseY * 2 - positions[i3 + 1];
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < MOUSE_INFLUENCE * 10) {
                    const force = (1 - distance / (MOUSE_INFLUENCE * 10)) * 2;
                    positions[i3] += dx * force * PARTICLE_SPEED;
                    positions[i3 + 1] += dy * force * PARTICLE_SPEED;
                }

                // Boundary check - wrap around
                if (positions[i3] > 1000) positions[i3] = -1000;
                if (positions[i3] < -1000) positions[i3] = 1000;
                if (positions[i3 + 1] > 1000) positions[i3 + 1] = -1000;
                if (positions[i3 + 1] < -1000) positions[i3 + 1] = 1000;
                if (positions[i3 + 2] > 1000) positions[i3 + 2] = -1000;
                if (positions[i3 + 2] < -1000) positions[i3 + 2] = 1000;
            }

            particles.needsUpdate = true;

            // Update connections every few frames (optimization)
            if (Math.random() > 0.95) {
                updateConnections();
            }
        }

        // Rotate particle system slowly
        if (particleSystem) {
            particleSystem.rotation.y += 0.0005;
        }

        renderer.render(scene, camera);
    }

    // Update particle colors when theme changes
    function updateParticleColors() {
        if (!particleSystem) return;

        const themeColor = getComputedStyle(document.body)
            .getPropertyValue('--primary-color')
            .trim() || '#00ff88';
        const color = new THREE.Color(themeColor);

        const colors = particleSystem.geometry.attributes.color;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;
            const colorVariation = 0.3;
            colors.array[i3] = color.r + (Math.random() - 0.5) * colorVariation;
            colors.array[i3 + 1] = color.g + (Math.random() - 0.5) * colorVariation;
            colors.array[i3 + 2] = color.b + (Math.random() - 0.5) * colorVariation;
        }
        colors.needsUpdate = true;

        // Update lines color
        if (scene.userData.lines) {
            scene.userData.lines.material.color.set(themeColor);
        }
    }

    // Expose update function for theme changes
    window.update3DBackground = updateParticleColors;

    // Initialize when both DOM and THREE.js are ready
    function tryInit() {
        if (typeof THREE !== 'undefined') {
            init();
        } else {
            console.log('Waiting for THREE.js to load...');
            setTimeout(tryInit, 100);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryInit);
    } else {
        tryInit();
    }

})();
