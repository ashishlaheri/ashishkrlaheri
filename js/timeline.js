class Timeline {
    constructor() {
        this.timelineData = [
            {
                year: '2022',
                title: 'Beginning of Coding Journey',
                description: 'Started my coding journey, learning programming fundamentals and web development basics.',
                icon: '💻',
                category: 'learning'
            },
            {
                year: '2023',
                title: 'Jarvis AI Assistant',
                description: 'Developed an AI-powered personal assistant named Jarvis, showcasing skills in AI integration and automation.',
                icon: '🤖',
                category: 'project'
            },
            {
                year: '2024',
                title: 'Cybersecurity Journey',
                description: 'Started exploring cybersecurity, learning about network security, ethical hacking, and security best practices.',
                icon: '🔒',
                category: 'learning'
            },
            {
                year: '2025',
                title: 'Cloud & DevOps Engineer',
                description: 'Transitioning into Cloud and DevOps engineering, focusing on infrastructure automation, CI/CD pipelines, and cloud architecture.',
                icon: '☁️',
                category: 'career'
            }
        ];

        this.container = document.querySelector('.timeline-container');
        this.init();
    }

    init() {
        this.createTimeline();
        this.addEventListeners();
        this.observeTimelineItems();
    }

    createTimeline() {
        const timeline = document.createElement('div');
        timeline.className = 'timeline relative';

        this.timelineData.forEach((item, index) => {
            const timelineItem = this.createTimelineItem(item, index);
            timeline.appendChild(timelineItem);
        });

        this.container.appendChild(timeline);
    }

    createTimelineItem(item, index) {
        const itemDiv = document.createElement('div');
        itemDiv.className = `timeline-item relative mb-12 ${index % 2 === 0 ? 'left' : 'right'} opacity-0 transform translate-y-8 transition-all duration-1000`;
        
        itemDiv.innerHTML = `
            <div class="timeline-content bg-dark/50 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div class="flex items-center gap-4 mb-4">
                    <span class="text-4xl">${item.icon}</span>
                    <div>
                        <h3 class="text-xl font-bold text-primary">${item.title}</h3>
                        <span class="text-sm text-gray-400">${item.year}</span>
                    </div>
                </div>
                <p class="text-gray-300">${item.description}</p>
                <div class="mt-4">
                    <span class="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">${item.category}</span>
                </div>
            </div>
            <div class="timeline-dot absolute top-6 ${index % 2 === 0 ? 'right-0' : 'left-0'} transform translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
        `;

        return itemDiv;
    }

    addEventListeners() {
        const items = document.querySelectorAll('.timeline-item');
        
        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.querySelector('.timeline-content').classList.add('scale-105');
            });

            item.addEventListener('mouseleave', () => {
                item.querySelector('.timeline-content').classList.remove('scale-105');
            });
        });
    }

    observeTimelineItems() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-8');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px'
        });

        const items = document.querySelectorAll('.timeline-item');
        items.forEach(item => observer.observe(item));
    }
}

// Initialize timeline when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Timeline();
}); 