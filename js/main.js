// Dark mode functionality
document.addEventListener('DOMContentLoaded', () => {
    // Set dark mode by default
    document.documentElement.classList.add('dark');
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Dark/Light mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            
            // Update button text
            const isDark = document.documentElement.classList.contains('dark');
            themeToggle.innerHTML = isDark ? '🌞' : '🌙';
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate progress bars on page load
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        // Start with 0 width
        bar.style.width = '0%';
        bar.style.transition = 'width 2s ease-out';
        
        // Animate to the target width after a small delay
        setTimeout(() => {
            bar.style.width = `${progress}%`;
        }, 500);
    });

    // Intersection Observer for progress bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress');
                bar.style.width = `${progress}%`;
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe all progress bars
    progressBars.forEach(bar => observer.observe(bar));

    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        const modals = document.querySelectorAll('[id$="Modal"]');
        modals.forEach(modal => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const visibleModal = document.querySelector('[id$="Modal"]:not(.hidden)');
            if (visibleModal) {
                closeModal(visibleModal.id);
            }
        }
    });

    // Handle skill item hover effects
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            skillItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.filter = 'blur(1px)';
                    otherItem.style.opacity = '0.7';
                }
            });
        });

        item.addEventListener('mouseleave', () => {
            skillItems.forEach(otherItem => {
                otherItem.style.filter = 'none';
                otherItem.style.opacity = '1';
            });
        });
    });
});

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        
        // Add entrance animation classes
        const modalContent = modal.querySelector('.transform');
        if (modalContent) {
            modalContent.classList.add('transition-transform', 'duration-300', 'ease-out');
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        const modalContent = modal.querySelector('.transform');
        if (modalContent) {
            // Add exit animation
            modalContent.classList.remove('scale-100', 'opacity-100');
            modalContent.classList.add('scale-95', 'opacity-0');
            
            // Wait for animation to complete before hiding modal
            setTimeout(() => {
                modal.classList.add('hidden');
                document.body.style.overflow = ''; // Restore scrolling
            }, 200);
        } else {
            modal.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }
} 