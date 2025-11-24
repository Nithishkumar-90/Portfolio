// Enhanced Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
  
  // Preloader
  window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.display = 'none';
    }
  });

  // Initialize AOS
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Header scroll effect
  function headerScroll() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', headerScroll);

  // Mobile navigation toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navbar = document.querySelector('#navbar');
  
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function(e) {
      e.preventDefault();
      const navbarUl = document.querySelector('#navbar ul');
      navbarUl.classList.toggle('show');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });
  }

  // ======= FIXED DARK MODE TOGGLE =======
  const themeSwitch = document.getElementById('theme-switch');
  const body = document.body;

  // Initialize theme
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
      body.setAttribute('data-theme', savedTheme);
      themeSwitch.checked = savedTheme === 'dark';
    } else if (systemPrefersDark) {
      body.setAttribute('data-theme', 'dark');
      themeSwitch.checked = true;
    } else {
      body.setAttribute('data-theme', 'light');
      themeSwitch.checked = false;
    }
    
    console.log('Theme initialized:', body.getAttribute('data-theme'));
  }

  // Toggle theme function
  function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeSwitch.checked = newTheme === 'dark';
    
    console.log('Theme changed to:', newTheme);
    
    // Add transition for smooth theme change
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
      body.style.transition = '';
    }, 300);
  }

  // Initialize theme on load
  initTheme();

  // Add event listener to toggle
  if (themeSwitch) {
    themeSwitch.addEventListener('change', toggleTheme);
    console.log('Theme switch event listener added');
  } else {
    console.error('Theme switch element not found!');
  }

  // Also allow clicking on the label (for better UX)
  const themeLabel = document.querySelector('.theme-label');
  if (themeLabel) {
    themeLabel.addEventListener('click', function(e) {
      e.preventDefault();
      themeSwitch.checked = !themeSwitch.checked;
      themeSwitch.dispatchEvent(new Event('change'));
    });
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      body.setAttribute('data-theme', newTheme);
      themeSwitch.checked = newTheme === 'dark';
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navbarUl = document.querySelector('#navbar ul');
        if (navbarUl.classList.contains('show')) {
          navbarUl.classList.remove('show');
          mobileNavToggle.classList.toggle('bi-list');
          mobileNavToggle.classList.toggle('bi-x');
        }
      }
    });
  });

  // Typed.js initialization
  const typed = new Typed('.typed-text', {
    strings: [
      'Technical Support Specialist',
      '5G Communication Developer',
      'Cisco Network Engineer',
      'System Management Professional'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '|'
  });

  // Back to top button
  function toggleBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  }
  window.addEventListener('scroll', toggleBackToTop);

  // Enhanced Hero Section Animations
  function initHeroAnimations() {
    // Parallax effect for floating elements
    window.addEventListener('scroll', function() {
      const floatingElements = document.querySelectorAll('.floating-element');
      const scrolled = window.pageYOffset;
      
      floatingElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 1;
        const yPos = -(scrolled * speed / 10);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });

    // Interactive mouse move effect
    document.addEventListener('mousemove', function(e) {
      const hero = document.querySelector('.hero');
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      const floatingElements = document.querySelectorAll('.floating-element');
      floatingElements.forEach((element, index) => {
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        const delay = index * 100;
        
        setTimeout(() => {
          element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }, delay);
      });
    });

    // Animate tech badges on hover
    const techBadges = document.querySelectorAll('.tech-badge');
    techBadges.forEach(badge => {
      badge.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
        this.style.background = 'rgba(255, 255, 255, 1)';
      });
      
      badge.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.background = 'rgba(255, 255, 255, 0.9)';
      });
    });
  }

  initHeroAnimations();

  // Enhanced Skills animation on scroll
  function animateSkills() {
    const skills = document.querySelectorAll('.progress-bar');
    skills.forEach((skill, index) => {
      const width = skill.style.width;
      skill.style.width = '0';
      setTimeout(() => {
        skill.style.width = width;
      }, index * 200);
    });
  }

  // Intersection Observer for skills animation
  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkills();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(skillsSection);
  }

  // Add hover effect to all interactive elements
  document.querySelectorAll('.btn, .portfolio-item, .tool-item, .stat-card, .feature-item').forEach(element => {
    element.style.transition = 'all 0.3s ease';
  });

  // Console welcome message
  console.log('%c👋 Welcome to Nithishkumar\'s Portfolio!', 'font-size: 20px; color: #6366f1; font-weight: bold;');
  console.log('%cDark mode toggle is now working!', 'font-size: 16px; color: #10b981;');
  console.log('%cLet\'s build something amazing together!', 'font-size: 16px; color: #10b981;');

  // Add scroll-triggered animations for stats
  function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-content h3');
    statNumbers.forEach(stat => {
      const finalValue = parseInt(stat.textContent);
      let currentValue = 0;
      const duration = 2000;
      const increment = finalValue / (duration / 16);
      
      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
          stat.textContent = finalValue + '+';
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(currentValue) + '+';
        }
      }, 16);
    });
  }

  // Intersection Observer for stats animation
  const statsSection = document.querySelector('.about-stats');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
  }

  // Contact Form Functionality
  function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Add loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual form submission)
        try {
          // Here you would typically send the form data to your server
          // For now, we'll simulate a successful submission
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Show success message
          showFormSuccess();
          
          // Reset form
          this.reset();
          
        } catch (error) {
          alert('Sorry, there was an error sending your message. Please try again.');
        } finally {
          // Remove loading state
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }
      });
    }
  }

  function showFormSuccess() {
    // Create success message if it doesn't exist
    let successMessage = document.querySelector('.form-success');
    
    if (!successMessage) {
      successMessage = document.createElement('div');
      successMessage.className = 'form-success';
      successMessage.innerHTML = `
        <i class="bi bi-check-circle-fill" style="font-size: 3rem; margin-bottom: 1rem;"></i>
        <h3>Message Sent Successfully!</h3>
        <p>Thank you for your message. I'll get back to you as soon as possible.</p>
      `;
      
      const contactForm = document.querySelector('.contact-form');
      contactForm.appendChild(successMessage);
    }
    
    // Show success message
    successMessage.style.display = 'block';
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 5000);
  }

  // Initialize contact form
  initContactForm();
});

// Utility functions
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

window.portfolioApp = {
  debounce,
  throttle
};
