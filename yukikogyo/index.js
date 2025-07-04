// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu when clicking on a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.add('hidden');
    });
  });

  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('header-shrink');
    } else {
      header.classList.remove('header-shrink');
    }
  });

  // Testimonial slider
  const track = document.getElementById('testimonials-track');
  const dots = document.querySelectorAll('.testimonial-dot');
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      // Update active dot
      document.querySelector('.testimonial-dot.active').classList.remove('active');
      this.classList.add('active');
      
      // Move the track
      track.style.transform = `translateX(-${index * 100}%)`;
    });
  });

  // Section fade-in animation
  const sections = document.querySelectorAll('.section-fade');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Here you would typically send the form data to a server
      // For now, we'll just show an alert
      alert('お問い合わせありがとうございます。担当者より折り返しご連絡いたします。');
      contactForm.reset();
    });
  }
});
