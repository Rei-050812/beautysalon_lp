document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSwiper();
    initAccordion();
    initLottieAnimations();
    initServiceCardHover();
    initFloatingCTA();
    initSmoothScroll();
    initMobileMenu();
});

/**
 * Initialize Swiper for testimonial carousel
 */
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
        breakpoints: {
            // when window width is >= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            // when window width is >= 992px
            992: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });
}

/**
 * Initialize accordion functionality for FAQ section
 */
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
    
    // Handle feedback buttons
    const feedbackButtons = document.querySelectorAll('.feedback-btn');
    feedbackButtons.forEach(button => {
        button.addEventListener('click', function() {
            const feedbackSection = this.closest('.feedback');
            const value = this.getAttribute('data-value');
            
            // Highlight selected button
            feedbackSection.querySelectorAll('.feedback-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            this.classList.add('selected');
            
            // Here you could send the feedback to a server
            console.log(`Feedback: ${value}`);
            
            // Show thank you message
            feedbackSection.innerHTML = '<p>ありがとうございます！</p>';
        });
    });
}

/**
 * Initialize Lottie animations for accordion icons
 */
function initLottieAnimations() {
    if (typeof lottie !== 'undefined') {
        const lottieContainers = document.querySelectorAll('.lottie-container[data-animation="accordion"]');
        
        lottieContainers.forEach(container => {
            const animation = lottie.loadAnimation({
                container: container,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: 'https://assets5.lottiefiles.com/packages/lf20_dboteqxz.json' // Chevron animation
            });
            
            // Store animation reference
            container.animation = animation;
        });
    }
}

/**
 * Initialize hover effect for service cards
 */
function initServiceCardHover() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.toggle('touch-hover');
        });
    });
}

/**
 * Initialize floating CTA button visibility
 */
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
            
            if (window.scrollY > heroBottom && 
                (window.scrollY < reservationTop - 100 || currentScroll > reservationBottom)) {
                floatingCTA.classList.add('visible');
            } else {
                floatingCTA.classList.remove('visible');
            }
        });
    }
}

/**
 * Initialize smooth scrolling for all reservation buttons and anchor links
 */
function initSmoothScroll() {
    // Get all reservation buttons
    const reservationButtons = document.querySelectorAll('.reservation-btn');
    
    reservationButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const reservationSection = document.querySelector('#reservation');
            if (reservationSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = reservationSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Get all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip if it's a reservation button (already handled above)
            if (this.classList.contains('reservation-btn')) {
                return;
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.global-nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'translateY(8px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
                
                // Reset hamburger icon
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}
