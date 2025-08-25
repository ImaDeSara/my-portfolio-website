document.addEventListener('DOMContentLoaded', function() {
    // Get the contact form and status message elements
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    // Listen for form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        // Show loading state on the submit button
        const submitBtn = form.querySelector('input[type="submit"]');
        const originalValue = submitBtn.value;
        submitBtn.value = 'Sending...';
        submitBtn.disabled = true;
        
        // Show status message while sending
        formStatus.style.display = 'block';
        formStatus.className = 'status-message status-info';
        formStatus.textContent = 'Sending your message...';
        
        // Send form data to Formspree using fetch API
        fetch('https://formspree.io/f/xqadzbll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            // Check if the response is successful
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .then(data => {
            // Show success message
            formStatus.className = 'status-message status-success';
            formStatus.textContent = 'Thank you! Your message has been sent successfully.';
            
            // Reset the form fields
            form.reset();
        })
        .catch(error => {
            // Show error message if sending fails
            formStatus.className = 'status-message status-error';
            formStatus.textContent = 'Sorry, there was an error sending your message. Please try again later.';
            console.error('Error:', error);
        })
        .finally(() => {
            // Restore submit button state
            submitBtn.value = originalValue;
            submitBtn.disabled = false;
            
            // Hide status message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        });
    });
});

// Mobile navigation handling
document.addEventListener('DOMContentLoaded', function() {
  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992) {
        navbarCollapse.classList.remove('show');
        navbarToggler.setAttribute('aria-expanded', 'false');
      }
    });
  });
  
  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
});

// Better touch handling for project cards on mobile
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // Prevent accidental scrolling when interacting with project cards
    card.addEventListener('touchstart', function(e) {
      if (window.innerWidth < 768) {
        this.style.overflowY = 'hidden';
      }
    });
    
    card.addEventListener('touchend', function() {
      if (window.innerWidth < 768) {
        this.style.overflowY = 'auto';
      }
    });
  });
  
  // Improve touch for skill items
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function() {
      if (window.innerWidth < 768) {
        this.classList.toggle('active');
      }
    });
  });
});

// Initialize SimpleParallax for parallax effect on images
document.addEventListener('DOMContentLoaded', function() {
  // Only apply parallax effect on non-mobile devices for better performance
  if (window.innerWidth > 768) {
    // Get the element to apply the parallax effect
    const image = document.getElementById('section-home');
    if (image) {
      // Initialize simpleParallax with custom options
      new simpleParallax(image, {
        delay: 0.6, // Delay for the parallax animation
        transition: 'cubic-bezier(0,0,0,1)' // Custom transition for smoothness
      });
    }
  }
});

// Animate project cards on scroll
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');
  
  // Only run on mobile devices
  if (window.innerWidth > 768) {
    // On desktop, make all cards visible immediately
    projectCards.forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
    return;
  }
  
  // Set up Intersection Observer to detect when cards enter viewport
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 20% of card is visible
  };
  
  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target); // Stop observing after animation
      }
    });
  }, observerOptions);
  
  // Observe each project card
  projectCards.forEach(card => {
    observer.observe(card);
  });
  
  // Also trigger on window resize in case of orientation change
  window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
      projectCards.forEach(card => {
        if (!card.classList.contains('animate')) {
          observer.observe(card);
        }
      });
    } else {
      // On desktop, make sure all cards are visible
      projectCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    }
  });
});

        // Add mobile-specific animations for contact form and footer
        document.addEventListener('DOMContentLoaded', function() {
            // Function to check if we're on a mobile device
            function isMobileDevice() {
                return window.innerWidth <= 767;
            }
            
            // Function to animate form elements
            function animateFormElements() {
                const formGroups = document.querySelectorAll('.site-form .form-group');
                formGroups.forEach((group, index) => {
                    setTimeout(() => {
                        group.classList.add('animate');
                    }, 300 + (index * 100));
                });
                
                // Add touch feedback for form inputs
                const formInputs = document.querySelectorAll('.form-control');
                formInputs.forEach(input => {
                    input.addEventListener('touchstart', function() {
                        this.style.transform = 'scale(1.02)';
                    });
                    
                    input.addEventListener('touchend', function() {
                        this.style.transform = 'scale(1)';
                    });
                });
            }
            
            // Function to animate footer elements
            function animateFooterElements() {
                const socialItems = document.querySelectorAll('.site-footer .social-item');
                socialItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, 500 + (index * 100));
                });
            }
            
            // Set up Intersection Observer to detect when elements enter viewport
            if (isMobileDevice()) {
                const contactSection = document.getElementById('section-contact');
                const footerSection = document.querySelector('.site-footer');
                
                // Create observer with a simple threshold
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            if (entry.target.id === 'section-contact') {
                                animateFormElements();
                            } else if (entry.target.classList.contains('site-footer')) {
                                animateFooterElements();
                            }
                            // Stop observing after animation is triggered
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.2 }); // Trigger when 20% of element is visible
                
                // Start observing if elements exist
                if (contactSection) observer.observe(contactSection);
                if (footerSection) observer.observe(footerSection);
                
                // Also trigger animations immediately if elements are already in view
                const contactRect = contactSection ? contactSection.getBoundingClientRect() : null;
                const footerRect = footerSection ? footerSection.getBoundingClientRect() : null;
                
                if (contactRect && contactRect.top < window.innerHeight && contactRect.bottom > 0) {
                    animateFormElements();
                    if (contactSection) observer.unobserve(contactSection);
                }
                
                if (footerRect && footerRect.top < window.innerHeight && footerRect.bottom > 0) {
                    animateFooterElements();
                    if (footerSection) observer.unobserve(footerSection);
                }
            }
            
            // Re-run animations if window is resized to mobile
            window.addEventListener('resize', function() {
                if (isMobileDevice()) {
                    // Check if form elements haven't been animated yet
                    const formGroups = document.querySelectorAll('.site-form .form-group');
                    const socialItems = document.querySelectorAll('.site-footer .social-item');
                    
                    if (formGroups.length > 0 && !formGroups[0].classList.contains('animate')) {
                        animateFormElements();
                    }
                    
                    if (socialItems.length > 0 && !socialItems[0].classList.contains('animate')) {
                        animateFooterElements();
                    }
                }
            });
        });
