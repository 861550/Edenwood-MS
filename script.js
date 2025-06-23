// Apple Navigation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const menuTrigger = document.getElementById('globalnav-menutrigger-button');
    const navList = document.getElementById('globalnav-list');

    if (menuTrigger && navList) {
        menuTrigger.addEventListener('click', function() {
            navList.classList.toggle('mobile-open');

            // Update aria-expanded attribute
            const isOpen = navList.classList.contains('mobile-open');
            menuTrigger.setAttribute('aria-expanded', isOpen);

            // Update button text for accessibility
            menuTrigger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Menu');
        });
    }

    // Search functionality
    const searchButton = document.getElementById('globalnav-search-button');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');

    if (searchButton && searchOverlay && searchClose && searchInput) {
        // Open search
        searchButton.addEventListener('click', function () {
            searchOverlay.style.display = 'flex'; // show overlay
            requestAnimationFrame(() => {
                searchOverlay.classList.add('active'); // trigger fade-in
            });
            document.body.style.overflow = 'hidden';

            setTimeout(() => {
                searchInput.focus();
            }, 100);
        });

        // Close search
        function closeSearch() {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
            searchInput.value = '';

            // Delay hiding to allow animation to finish
            setTimeout(() => {
                searchOverlay.style.display = 'none';
            }, 300); // match your CSS transition time
        }

        searchClose.addEventListener('click', closeSearch);

        // Close when clicking outside the search box
        searchOverlay.addEventListener('click', function (e) {
            if (e.target === searchOverlay) {
                closeSearch();
            }
        });

        // Escape key closes overlay
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                closeSearch();
            }
        });

        // Enter key triggers search
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
                    closeSearch();
                }
            }
        });
    }


    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navList && navList.classList.contains('mobile-open')) {
            const globalnav = document.getElementById('globalnav');
            if (!globalnav.contains(e.target)) {
                navList.classList.remove('mobile-open');
                if (menuTrigger) {
                    menuTrigger.setAttribute('aria-expanded', 'false');
                    menuTrigger.setAttribute('aria-label', 'Menu');
                }
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 834 && navList && navList.classList.contains('mobile-open')) {
            navList.classList.remove('mobile-open');
            if (menuTrigger) {
                menuTrigger.setAttribute('aria-expanded', 'false');
                menuTrigger.setAttribute('aria-label', 'Menu');
            }
        }
    });

    // Add smooth scrolling behavior for anchor links
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
    const marquee = document.querySelector('.fam-gallery-marquee');
    const totalDistance = 2502;  // px to scroll (make sure this matches your slide distance)
    const fullDuration = 30000;  // full scroll duration in ms (30 seconds)
    let startTime = null;
    let currentPosition = 0;
    let speedFactor = 1;  // 1 = full speed, 0 = stopped
    let targetSpeed = 1;
    let animationFrameId = null;

    function easeOutQuad(t) {
      return t * (2 - t);
    }

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Smoothly interpolate speedFactor towards targetSpeed
      const speedDiff = targetSpeed - speedFactor;
      const easing = 0.05;  // how fast speed changes
      speedFactor += speedDiff * easing;

      // Move position based on speedFactor
      currentPosition += (totalDistance / fullDuration) * speedFactor * (timestamp - (animate.lastTimestamp || timestamp));
      currentPosition %= totalDistance; // wrap around
      animate.lastTimestamp = timestamp;

      marquee.style.transform = `translateX(${-currentPosition}px)`;

      animationFrameId = requestAnimationFrame(animate);
    }

    // When mouse enters, slow down to 0 smoothly
    marquee.parentElement.addEventListener('mouseenter', () => {
      targetSpeed = 0;
    });

    // When mouse leaves, speed back up to full speed smoothly
    marquee.parentElement.addEventListener('mouseleave', () => {
      targetSpeed = 1;
    });

    // Start the animation
    animationFrameId = requestAnimationFrame(animate);



    console.log('Apple Navigation initialized successfully!');
});