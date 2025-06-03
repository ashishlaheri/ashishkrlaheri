class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
        this.colors = [
            '#3498db', // Blue
            '#9b59b6', // Purple
            '#00a8ff', // Light Blue
            '#8e44ad'  // Deep Purple
        ];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.velocity = {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
        };
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        // Add glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color.replace('rgb', 'rgba').replace(')', `,${this.opacity})`);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Wrap around screen
        if (this.x < 0) this.x = this.canvas.width;
        if (this.x > this.canvas.width) this.x = 0;
        if (this.y < 0) this.y = this.canvas.height;
        if (this.y > this.canvas.height) this.y = 0;
    }
}

class GeometricPattern {
    constructor(canvas) {
        this.canvas = canvas;
        this.points = [];
        this.numPoints = 5;
        this.angle = 0;
        this.generatePoints();
    }

    generatePoints() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(this.canvas.width, this.canvas.height) * 0.3;

        for (let i = 0; i < this.numPoints; i++) {
            const angle = (i / this.numPoints) * Math.PI * 2;
            this.points.push({
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius
            });
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.strokeStyle = 'rgba(52, 152, 219, 0.1)';
        ctx.lineWidth = 2;

        // Rotate pattern
        ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        ctx.rotate(this.angle);
        ctx.translate(-this.canvas.width / 2, -this.canvas.height / 2);

        // Draw connecting lines
        ctx.beginPath();
        this.points.forEach((point, i) => {
            const nextPoint = this.points[(i + 1) % this.points.length];
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(nextPoint.x, nextPoint.y);
        });
        ctx.stroke();

        // Draw circles at intersections
        this.points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(52, 152, 219, 0.2)';
            ctx.fill();
        });

        ctx.restore();
        this.angle += 0.001;
    }

    resize() {
        this.points = [];
        this.generatePoints();
    }
}

class ParticleNetwork {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numberOfParticles = 150;
        this.maxDistance = 150;
        this.geometricPattern = null;
        
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }

    init() {
        this.canvas.id = 'particle-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.pointerEvents = 'none';
        document.body.prepend(this.canvas);
        
        this.resize();
        
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this.canvas));
        }

        this.geometricPattern = new GeometricPattern(this.canvas);
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;
        const rect = document.body.getBoundingClientRect();
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        
        if (this.geometricPattern) {
            this.geometricPattern.resize();
        }
    }

    drawLines() {
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.maxDistance) {
                    const opacity = (1 - distance / this.maxDistance) * 0.5;
                    const gradient = this.ctx.createLinearGradient(
                        this.particles[i].x, this.particles[i].y,
                        this.particles[j].x, this.particles[j].y
                    );
                    
                    gradient.addColorStop(0, this.particles[i].color.replace('rgb', 'rgba').replace(')', `,${opacity})`));
                    gradient.addColorStop(1, this.particles[j].color.replace('rgb', 'rgba').replace(')', `,${opacity})`));

                    this.ctx.beginPath();
                    this.ctx.strokeStyle = gradient;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw geometric pattern
        this.geometricPattern.draw(this.ctx);
        
        // Draw particles and connections
        this.drawLines();
        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
        });
        
        requestAnimationFrame(this.animate);
    }
}

// Initialize the particle network when the page loads
window.addEventListener('load', () => {
    new ParticleNetwork();
});