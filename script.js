document.addEventListener('DOMContentLoaded', function() {
    // Get all tab elements
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Set the first tab as active by default
    if (tabs.length > 0 && !document.querySelector('.tab.active')) {
        tabs[0].classList.add('active');
        document.getElementById('home').classList.add('active');
    }
    
    // Add click event listener to each tab
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the tab content id from data-tab attribute
            const tabContentId = this.getAttribute('data-tab');
            
            // Hide all tab content sections
            tabContents.forEach(content => {
                content.classList.remove('active');
                // Add fade-out animation
                content.style.opacity = 0;
            });
            
            // Show the selected tab content with fade-in animation
            const selectedContent = document.getElementById(tabContentId);
            if (selectedContent) {
                selectedContent.classList.add('active');
                setTimeout(() => {
                    selectedContent.style.opacity = 1;
                }, 50);
            }
        });
    });

    // Add scroll animation for content cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.content-card').forEach(card => {
        observer.observe(card);
    });

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.criteria-card, .certification, .switch-category, .firewall-type, .vpn-type, .siem-type');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Handle component link clicks
    document.querySelectorAll('.component-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            const tabToActivate = document.querySelector(`.tab[data-tab="${tabId}"]`);
            
            if (tabToActivate) {
                tabToActivate.click();
                // Scroll to top of content
                window.scrollTo({
                    top: document.querySelector('main').offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add mobile navigation handling
    function checkMobile() {
        if (window.innerWidth <= 768) {
            // Adjust tab behavior for mobile
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Scroll to content area
                    const mainContent = document.querySelector('main');
                    mainContent.scrollIntoView({ behavior: 'smooth' });
                });
            });
        }
    }

    // Check on load and resize
    checkMobile();
    window.addEventListener('resize', checkMobile);
});