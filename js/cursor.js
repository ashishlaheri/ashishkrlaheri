class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);

        this.progressBar = document.createElement('div');
        this.progressBar.className = 'scroll-progress';
        document.body.appendChild(this.progressBar);

        this.init();
    }

    init() {
        this.addEventListeners();
        this.updateProgress();
    }

    addEventListeners() {
        // Update cursor position
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 10 + 'px';
            this.cursor.style.top = e.clientY - 10 + 'px';
        });

        // Add magnetic effect to buttons
        document.querySelectorAll('.btn-primary, .nav-link').forEach(button => {
            button.classList.add('magnetic-button');
            
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });

        // Update cursor style on interactive elements
        document.querySelectorAll('a, button, [role="button"]').forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('active');
            });

            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('active');
            });
        });

        // Update progress bar on scroll
        window.addEventListener('scroll', () => this.updateProgress());
    }

    updateProgress() {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        this.progressBar.style.width = `${progress}%`;
    }
}

// Initialize custom cursor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CustomCursor();
}); 