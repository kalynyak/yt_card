// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeTimestamps();
    initializeTimeline();
    initializeTranscript();
    initializeActions();
    initializeVideoPlayer();
});

// Tab Navigation
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to selected
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');

            // Smooth scroll to tabs if on mobile
            if (window.innerWidth < 768) {
                document.querySelector('.tabs-container').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }
        });
    });
}

// Timestamp Click Handlers
function initializeTimestamps() {
    const timestampLinks = document.querySelectorAll('.quote-timestamp, .caption-timestamp');
    
    timestampLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const timestamp = link.getAttribute('data-timestamp');
            navigateToTimestamp(timestamp);
        });
    });
}

// Timeline Navigation
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const timestamp = item.getAttribute('data-timestamp');
            navigateToTimestamp(timestamp);
        });
    });

    // Add keyboard navigation for timeline
    const timelineScroll = document.querySelector('.timeline-scroll');
    if (timelineScroll) {
        timelineScroll.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                timelineScroll.scrollBy({ left: 300, behavior: 'smooth' });
            } else if (e.key === 'ArrowLeft') {
                timelineScroll.scrollBy({ left: -300, behavior: 'smooth' });
            }
        });
    }
}

// Transcript Functionality
function initializeTranscript() {
    const transcriptEntries = document.querySelectorAll('.transcript-entry');
    const transcriptSearch = document.querySelector('.control-search');
    
    // Click to navigate
    transcriptEntries.forEach(entry => {
        entry.addEventListener('click', () => {
            const timestamp = entry.getAttribute('data-time');
            navigateToTimestamp(timestamp);
        });
    });
    
    // Search functionality
    if (transcriptSearch) {
        let searchTimeout;
        transcriptSearch.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = e.target.value.toLowerCase();
                searchTranscript(searchTerm);
            }, 300);
        });
    }

    // Download transcript
    const downloadBtn = document.querySelector('.control-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            downloadTranscript();
        });
    }
}

// Search in transcript
function searchTranscript(term) {
    const entries = document.querySelectorAll('.transcript-entry');
    let matchCount = 0;
    
    entries.forEach(entry => {
        const text = entry.textContent.toLowerCase();
        const textElement = entry.querySelector('.entry-text');
        
        if (term === '') {
            entry.style.display = 'flex';
            textElement.innerHTML = textElement.textContent;
        } else if (text.includes(term)) {
            entry.style.display = 'flex';
            matchCount++;
            
            // Highlight matching text
            const regex = new RegExp(`(${term})`, 'gi');
            const originalText = textElement.textContent;
            const highlightedText = originalText.replace(regex, '<mark style="background: #fef08a; padding: 2px 4px; border-radius: 2px;">$1</mark>');
            textElement.innerHTML = highlightedText;
        } else {
            entry.style.display = 'none';
            textElement.innerHTML = textElement.textContent;
        }
    });
    
    // Show match count (could add a UI element for this)
    if (term && matchCount > 0) {
        console.log(`Found ${matchCount} matches for "${term}"`);
    }
}

// Download transcript
function downloadTranscript() {
    const entries = document.querySelectorAll('.transcript-entry');
    let content = 'Transcript: The Future of Artificial Intelligence\n\n';
    
    entries.forEach(entry => {
        const time = entry.querySelector('.entry-time').textContent;
        const text = entry.querySelector('.entry-text').textContent;
        content += `[${time}] ${text}\n\n`;
    });
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Transcript downloaded!');
}

// Action Bar Buttons
function initializeActions() {
    const shareBtn = document.querySelector('.action-btn:nth-child(1)');
    const saveBtn = document.querySelector('.action-btn:nth-child(2)');
    const printBtn = document.querySelector('.action-btn:nth-child(3)');
    const pdfBtn = document.querySelector('.action-btn:nth-child(4)');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', () => shareArticle());
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', () => saveArticle());
    }
    
    if (printBtn) {
        printBtn.addEventListener('click', () => window.print());
    }
    
    if (pdfBtn) {
        pdfBtn.addEventListener('click', () => exportPDF());
    }
}

// Video Player Interaction
function initializeVideoPlayer() {
    const videoWrapper = document.querySelector('.video-wrapper');
    
    if (videoWrapper) {
        videoWrapper.addEventListener('click', () => {
            // In a real implementation, this would open the video player
            showNotification('Video player would open here with YouTube embed');
            console.log('Opening video player...');
        });
    }
}

// Navigate to video timestamp
function navigateToTimestamp(timestamp) {
    console.log(`Navigating to timestamp: ${timestamp}`);
    
    // In a real implementation, this would:
    // 1. Open/focus the video player
    // 2. Seek to the specified timestamp
    // 3. Start playing
    
    const seconds = convertTimestampToSeconds(timestamp);
    const youtubeVideoId = 'dQw4w9WgXcQ'; // Example ID
    const youtubeUrl = `https://www.youtube.com/watch?v=${youtubeVideoId}&t=${seconds}s`;
    
    showNotification(`Jumping to ${timestamp}`, 'info');
    
    // Uncomment to actually open YouTube in new tab:
    // window.open(youtubeUrl, '_blank');
}

// Convert timestamp to seconds
function convertTimestampToSeconds(timestamp) {
    const parts = timestamp.split(':').map(Number);
    if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return 0;
}

// Share Article
function shareArticle() {
    if (navigator.share) {
        navigator.share({
            title: document.querySelector('.video-title').textContent,
            text: 'Check out this in-depth video article',
            url: window.location.href
        }).then(() => {
            showNotification('Shared successfully!', 'success');
        }).catch((error) => {
            console.log('Error sharing:', error);
            fallbackShare();
        });
    } else {
        fallbackShare();
    }
}

// Fallback share (copy to clipboard)
function fallbackShare() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        showNotification('Link copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Unable to copy link', 'error');
    });
}

// Save Article
function saveArticle() {
    // Toggle saved state
    const saveBtn = document.querySelector('.action-btn:nth-child(2)');
    const isSaved = saveBtn.classList.toggle('saved');
    
    if (isSaved) {
        saveBtn.style.background = 'var(--accent)';
        saveBtn.style.color = 'white';
        showNotification('Article saved!', 'success');
    } else {
        saveBtn.style.background = '';
        saveBtn.style.color = '';
        showNotification('Article removed from saved', 'info');
    }
    
    // In a real implementation, this would save to user's account
    console.log('Save state:', isSaved);
}

// Export to PDF
function exportPDF() {
    showNotification('Generating PDF...', 'info');
    
    // In a real implementation, this would use a library like jsPDF or html2pdf
    // For now, just show a message
    setTimeout(() => {
        showNotification('PDF export would be generated here', 'info');
    }, 1500);
    
    console.log('Exporting PDF...');
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '24px',
        right: '24px',
        padding: '16px 24px',
        background: type === 'success' ? '#10b981' : 
                   type === 'error' ? '#ef4444' : '#2563eb',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '1000',
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        fontWeight: '500',
        animation: 'slideIn 0.3s ease',
        maxWidth: '300px'
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @media print {
        .top-nav,
        .breadcrumb,
        .video-embed,
        .secondary-content,
        .action-bar,
        .site-footer {
            display: none !important;
        }
        
        .container {
            max-width: 100%;
        }
        
        .article-body {
            font-size: 12pt;
        }
    }
`;
document.head.appendChild(style);

// Language selector functionality
const languageSelectors = document.querySelectorAll('.control-select');
languageSelectors.forEach(selector => {
    selector.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        if (selectedLang && e.target.closest('#translations')) {
            showNotification(`Loading ${selectedLang} translation...`, 'info');
            // In real implementation, would load translated content
        } else if (selectedLang) {
            showNotification(`Switching to ${selectedLang}...`, 'info');
        }
    });
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effect for tags
const tags = document.querySelectorAll('.tag');
tags.forEach(tag => {
    tag.style.cursor = 'pointer';
    tag.addEventListener('click', () => {
        showNotification(`Filtering by: ${tag.textContent}`, 'info');
    });
});

// Back to top button (appears after scrolling)
const backToTop = document.createElement('button');
backToTop.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="18 15 12 9 6 15"/>
    </svg>
`;
Object.assign(backToTop.style, {
    position: 'fixed',
    bottom: '32px',
    right: '32px',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'var(--accent)',
    color: 'white',
    border: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    cursor: 'pointer',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '999',
    transition: 'all 0.3s'
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

console.log('Video Article Card initialized successfully!');
