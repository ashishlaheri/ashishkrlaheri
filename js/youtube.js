// YouTube video data
const videos = [
    {
        id: 'mHsvcsVUvHU',
        title: 'You Need To Learn Docker networking right now',
        thumbnail: 'https://img.youtube.com/vi/mHsvcsVUvHU/maxresdefault.jpg',
        description: 'Learn everything about Docker networking and how to master container communication.'
    },
    {
        id: 'eF_JDIWrsZ0',
        title: 'Are you a beginner at web development click this video',
        thumbnail: 'https://img.youtube.com/vi/eF_JDIWrsZ0/maxresdefault.jpg',
        description: 'Perfect guide for beginners starting their journey in web development.'
    },
    {
        id: 'j-mytBxGqhQ',
        title: "Don't know how to install VS Code and initial use check this out",
        thumbnail: 'https://img.youtube.com/vi/j-mytBxGqhQ/maxresdefault.jpg',
        description: 'Complete guide to installing and getting started with Visual Studio Code.'
    }
];

// Initialize the video scroller
function initVideoScroller() {
    const container = document.getElementById('videoContainer');
    
    videos.forEach(video => {
        const videoCard = createVideoCard(video);
        container.appendChild(videoCard);
    });

    // Initialize scroll buttons
    const leftBtn = document.querySelector('.scroll-left');
    const rightBtn = document.querySelector('.scroll-right');
    
    if (leftBtn && rightBtn) {
        leftBtn.addEventListener('click', () => scrollVideos('left'));
        rightBtn.addEventListener('click', () => scrollVideos('right'));
    }
}

// Create a video card element
function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card bg-dark rounded-lg overflow-hidden shadow-lg';
    
    card.innerHTML = `
        <div class="relative group cursor-pointer" onclick="showVideoPreview('${video.id}')">
            <img src="${video.thumbnail}" alt="${video.title}" class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105">
            <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="p-4">
            <h3 class="text-lg font-bold text-white mb-2">${video.title}</h3>
            <p class="text-gray-400">${video.description}</p>
        </div>
    `;
    
    return card;
}

// Scroll the video container
function scrollVideos(direction) {
    const container = document.querySelector('.video-scroller');
    const scrollAmount = 400;
    
    if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

// Show video preview
function showVideoPreview(videoId) {
    const preview = document.getElementById('videoPreview');
    const content = document.getElementById('videoPreviewContent');
    
    // Create and insert the iframe
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.title = 'YouTube video player';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    
    content.innerHTML = '';
    content.appendChild(iframe);
    
    // Show the preview
    preview.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close video preview
function closeVideoPreview() {
    const preview = document.getElementById('videoPreview');
    const content = document.getElementById('videoPreviewContent');
    content.innerHTML = '';
    preview.style.display = 'none';
    document.body.style.overflow = '';
}

// Initialize when the page loads
window.addEventListener('load', initVideoScroller);

// Add keyboard support for closing preview
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeVideoPreview();
    }
}); 