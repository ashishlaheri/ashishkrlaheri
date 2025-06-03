// Tech stack data with coordinates and details
const techStack = [
    {
        name: 'Python',
        icon: '🐍',
        position: { lat: 40.7128, lng: -74.0060 }, // New York
        description: 'Advanced Python development with AI/ML focus',
        level: 'Expert',
        projects: ['Jarvis AI', 'Data Analysis Tools']
    },
    {
        name: 'JavaScript',
        icon: '📜',
        position: { lat: 51.5074, lng: -0.1278 }, // London
        description: 'Full-stack JavaScript development',
        level: 'Advanced',
        projects: ['Web Applications', 'Interactive UIs']
    },
    {
        name: 'React',
        icon: '⚛️',
        position: { lat: 37.7749, lng: -122.4194 }, // San Francisco
        description: 'Modern React with hooks and context',
        level: 'Advanced',
        projects: ['Portfolio Website', 'E-commerce Platform']
    },
    {
        name: 'Node.js',
        icon: '🟢',
        position: { lat: 35.6762, lng: 139.6503 }, // Tokyo
        description: 'Backend development with Node.js',
        level: 'Advanced',
        projects: ['REST APIs', 'Real-time Applications']
    },
    {
        name: 'Docker',
        icon: '🐳',
        position: { lat: 48.8566, lng: 2.3522 }, // Paris
        description: 'Containerization and deployment',
        level: 'Intermediate',
        projects: ['Microservices', 'CI/CD Pipelines']
    },
    {
        name: 'AWS',
        icon: '☁️',
        position: { lat: 47.6062, lng: -122.3321 }, // Seattle
        description: 'Cloud infrastructure and services',
        level: 'Intermediate',
        projects: ['Cloud Architecture', 'Serverless Apps']
    }
];

class TechGlobe {
    constructor() {
        this.container = document.getElementById('globe');
        if (!this.container) {
            console.error('Globe container not found');
            return;
        }

        this.init();
    }

    init() {
        // Set up scene
        this.scene = new THREE.Scene();
        
        // Set up camera
        this.camera = new THREE.PerspectiveCamera(
            45,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        // Set up renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);

        // Create globe
        this.createGlobe();
        
        // Add tech stack points
        this.addTechPoints();
        
        // Add lights
        this.addLights();
        
        // Add particles
        this.addParticles();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Start animation
        this.animate();
    }

    createGlobe() {
        // Create main globe
        const geometry = new THREE.SphereGeometry(2, 64, 64);
        const material = new THREE.MeshPhongMaterial({
            color: 0x3498db,
            transparent: true,
            opacity: 0.3,
            wireframe: true
        });
        this.globe = new THREE.Mesh(geometry, material);
        this.scene.add(this.globe);

        // Create outer glow
        const glowGeometry = new THREE.SphereGeometry(2.1, 64, 64);
        const glowMaterial = new THREE.MeshPhongMaterial({
            color: 0x3498db,
            transparent: true,
            opacity: 0.1,
            wireframe: true
        });
        this.glow = new THREE.Mesh(glowGeometry, glowMaterial);
        this.scene.add(this.glow);
    }

    addTechPoints() {
        this.techPoints = [];
        techStack.forEach(tech => {
            const position = this.latLngToVector3(tech.position.lat, tech.position.lng);
            const point = this.createTechPoint(tech, position);
            this.techPoints.push(point);
            this.scene.add(point);
        });
    }

    createTechPoint(tech, position) {
        const geometry = new THREE.SphereGeometry(0.1, 16, 16);
        const material = new THREE.MeshPhongMaterial({
            color: 0x3498db,
            emissive: 0x3498db,
            emissiveIntensity: 0.5
        });
        const point = new THREE.Mesh(geometry, material);
        point.position.copy(position);
        point.userData = tech;
        return point;
    }

    addLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x3498db, 0.5);
        this.scene.add(ambientLight);

        // Point light
        const pointLight = new THREE.PointLight(0x3498db, 1);
        pointLight.position.set(5, 3, 5);
        this.scene.add(pointLight);
    }

    addParticles() {
        const particleCount = 1000;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const radius = 2.2 + Math.random() * 0.2;

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);
        }

        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particleMaterial = new THREE.PointsMaterial({
            color: 0x3498db,
            size: 0.02,
            transparent: true,
            opacity: 0.6
        });

        this.particleSystem = new THREE.Points(particles, particleMaterial);
        this.scene.add(this.particleSystem);
    }

    setupEventListeners() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        });

        // Handle mouse movement for rotation
        this.container.addEventListener('mousemove', (event) => {
            const rect = this.container.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            this.globe.rotation.y += x * 0.01;
            this.globe.rotation.x += y * 0.01;
        });

        // Handle click events for tech points
        this.container.addEventListener('click', (event) => {
            const rect = this.container.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera({ x, y }, this.camera);

            const intersects = raycaster.intersectObjects(this.techPoints);
            if (intersects.length > 0) {
                const tech = intersects[0].object.userData;
                this.showTechDetails(tech);
            }
        });
    }

    showTechDetails(tech) {
        // Create or update tooltip
        let tooltip = document.getElementById('tech-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'tech-tooltip';
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '1rem';
            tooltip.style.borderRadius = '0.5rem';
            tooltip.style.zIndex = '1000';
            document.body.appendChild(tooltip);
        }

        tooltip.innerHTML = `
            <h3>${tech.icon} ${tech.name}</h3>
            <p>${tech.description}</p>
            <p>Level: ${tech.level}</p>
            <p>Projects: ${tech.projects.join(', ')}</p>
        `;

        // Position tooltip near the click
        const rect = this.container.getBoundingClientRect();
        tooltip.style.left = `${rect.left + event.clientX + 10}px`;
        tooltip.style.top = `${rect.top + event.clientY + 10}px`;

        // Hide tooltip after 3 seconds
        setTimeout(() => {
            tooltip.style.display = 'none';
        }, 3000);
    }

    latLngToVector3(lat, lng) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        const radius = 2;

        const x = -(radius * Math.sin(phi) * Math.cos(theta));
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);

        return new THREE.Vector3(x, y, z);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Rotate globe
        this.globe.rotation.y += 0.001;
        this.glow.rotation.y += 0.001;

        // Rotate particles
        if (this.particleSystem) {
            this.particleSystem.rotation.y += 0.0005;
        }

        // Animate tech points
        this.techPoints.forEach(point => {
            point.scale.x = 1 + Math.sin(Date.now() * 0.003) * 0.1;
            point.scale.y = 1 + Math.sin(Date.now() * 0.003) * 0.1;
            point.scale.z = 1 + Math.sin(Date.now() * 0.003) * 0.1;
        });

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the globe when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TechGlobe();
}); 