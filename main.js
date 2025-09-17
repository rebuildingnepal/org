document.addEventListener('DOMContentLoaded', () => {
  /**
   * Mobile Navigation Toggle
   * This function handles the opening and closing of the mobile navigation menu.
   */
  const setupMobileNav = () => {
    const navToggleBtn = document.querySelector('.header__nav-toggle');
    const primaryNav = document.querySelector('#primary-navigation');

    if (navToggleBtn && primaryNav) {
      navToggleBtn.addEventListener('click', () => {
        // Check if the navigation is currently expanded
        const isExpanded = primaryNav.getAttribute('aria-expanded') === 'true';

        // Toggle the aria-expanded attribute for accessibility and CSS styling
        primaryNav.setAttribute('aria-expanded', !isExpanded);
        navToggleBtn.setAttribute('aria-expanded', !isExpanded);
      });
    }
  };

  /**
   * Animated Statistics Counter
   * This function animates the numbers in the stats section, counting up
   * from 0 to the target number when the section becomes visible.
   */
  const setupStatsCounter = () => {
    const statsSection = document.querySelector('.stats');
    const counters = document.querySelectorAll('.stats__number');

    // Exit if the necessary elements aren't on the page
    if (!statsSection || counters.length === 0) {
      return;
    }

    const animateCounter = (counter) => {
      const target = parseInt(counter.dataset.target, 10);
      const duration = 2000; // Animation duration in milliseconds
      let startTimestamp = null;

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        
        // Calculate the progress of the animation
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Calculate the current value and format it with commas
        const currentValue = Math.floor(progress * target);
        counter.innerText = currentValue.toLocaleString();

        // Continue the animation until it's complete
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    };

    // Use Intersection Observer to trigger the animation only when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counters.forEach(counter => {
            // Check if the counter has already been animated
            if (!counter.classList.contains('animated')) {
              animateCounter(counter);
              counter.classList.add('animated'); // Mark as animated
            }
          });
          // Optional: Stop observing after the animation has been triggered
          // observer.unobserve(statsSection);
        }
      });
    }, {
      threshold: 0.5 // Trigger when 50% of the element is visible
    });

    // Start observing the stats section
    observer.observe(statsSection);
  };

  // Initialize all functions
  setupMobileNav();
  setupStatsCounter();
});