// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initSwiper();
    initAccordion();
    initLottieAnimations();
    initFloatingCTA();
    initSmoothScroll();
    initServiceCards();
    initFeedbackButtons();
    initDragScroll();
    initSmoothScrolling();
});

// Initialize Swiper for testimonials
function initSwiper() {
    const testimonialSwiper = new Swiper('.testimonial-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        }
    });
}

// Initialize accordion functionality for FAQ section
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Close all other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const lottieContainer = otherItem.querySelector('.lottie-container');
                    if (lottieContainer && lottieContainer.animation) {
                        lottieContainer.animation.goToAndStop(0, true);
                    }
                }
            });
            
            // Toggle current accordion item
            item.classList.toggle('active');
            
            // Control Lottie animation
            const lottieContainer = item.querySelector('.lottie-container');
            if (lottieContainer && lottieContainer.animation) {
                if (item.classList.contains('active')) {
                    lottieContainer.animation.playSegments([0, 30], true);
                } else {
                    lottieContainer.animation.playSegments([30, 0], true);
                }
            }
        });
    });
}

// Initialize Lottie animations
function initLottieAnimations() {
    const lottieContainers = document.querySelectorAll('.lottie-container');
    
    lottieContainers.forEach(container => {
        const animationType = container.dataset.animation;
        
        if (animationType === 'accordion') {
            const animation = lottie.loadAnimation({
                container: container,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: 'https://assets10.lottiefiles.com/packages/lf20_u4jjb9bd.json' // Accordion arrow animation
            });
            
            container.animation = animation;
        }
    });
}

// Initialize floating CTA button
function initFloatingCTA() {
    const floatingCTA = document.querySelector('.floating-cta');
    const heroSection = document.querySelector('.hero');
    const reservationSection = document.querySelector('.reservation');
    
    if (floatingCTA && heroSection && reservationSection) {
        window.addEventListener('scroll', () => {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const reservationTop = reservationSection.offsetTop;
            const reservationBottom = reservationTop + reservationSection.offsetHeight;
            const currentScroll = window.scrollY + window.innerHeight;
            
            // Show floating CTA when scrolled past hero section
            // Hide when in reservation section view
            if (window.scrollY > heroBottom && 
                (window.scrollY < reservationTop - 100 || currentScroll > reservationBottom)) {
                floatingCTA.classList.add('visible');
            } else {
                floatingCTA.classList.remove('visible');
            }
        });
    }
}

// Initialize smooth scroll for anchor links
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    const campaignButton = document.querySelector('.campaign-banner .cta-button');
    
    // Handle all anchor links
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Handle campaign button
    if (campaignButton) {
        campaignButton.addEventListener('click', function() {
            // In a real implementation, this would apply the campaign discount
            const reservationSection = document.querySelector('#reservation');
            if (reservationSection) {
                reservationSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Initialize service card hover effects
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = `0 0 20px var(--color-rose-gold-light)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = `var(--shadow-md)`;
        });
    });
}

// Initialize feedback buttons in FAQ section
function initFeedbackButtons() {
    const feedbackButtons = document.querySelectorAll('.feedback-btn');
    
    feedbackButtons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.dataset.value;
            const feedbackGroup = this.closest('.feedback');
            const allButtons = feedbackGroup.querySelectorAll('.feedback-btn');
            
            // Remove active class from all buttons in this group
            allButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // In a real implementation, this would send feedback to the server
            console.log(`Feedback: ${value}`);
            
            // Show thank you message
            const feedbackText = feedbackGroup.querySelector('p');
            feedbackText.textContent = 'ありがとうございます！';
            
            // Disable buttons
            allButtons.forEach(btn => {
                btn.disabled = true;
                btn.style.opacity = '0.5';
            });
        });
    });
}

// Initialize drag scroll for timeline
function initDragScroll() {
    const timelineContainer = document.querySelector('.timeline-container');
    
    if (timelineContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        timelineContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            timelineContainer.classList.add('active');
            startX = e.pageX - timelineContainer.offsetLeft;
            scrollLeft = timelineContainer.scrollLeft;
        });
        
        timelineContainer.addEventListener('mouseleave', () => {
            isDown = false;
            timelineContainer.classList.remove('active');
        });
        
        timelineContainer.addEventListener('mouseup', () => {
            isDown = false;
            timelineContainer.classList.remove('active');
        });
        
        timelineContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - timelineContainer.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            timelineContainer.scrollLeft = scrollLeft - walk;
        });
        
        // Add touch support for mobile
        timelineContainer.addEventListener('touchstart', (e) => {
            isDown = true;
            timelineContainer.classList.add('active');
            startX = e.touches[0].pageX - timelineContainer.offsetLeft;
            scrollLeft = timelineContainer.scrollLeft;
        });
        
        timelineContainer.addEventListener('touchend', () => {
            isDown = false;
            timelineContainer.classList.remove('active');
        });
        
        timelineContainer.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - timelineContainer.offsetLeft;
            const walk = (x - startX) * 2;
            timelineContainer.scrollLeft = scrollLeft - walk;
        });
    }
}

// Add scroll animations
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.service-cards, .testimonial-swiper, .timeline, .campaign-banner, .accordion');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
            element.classList.add('fade-in');
        }
    });
});
