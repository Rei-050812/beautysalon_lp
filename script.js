document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navClose = document.querySelector('.nav-close');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('active');
        });
        
        if (navClose) {
            navClose.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        }
    }
    
    // Hero section fade-in animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('fade-in');
        }, 300);
    }
    
    // Initialize VanillaTilt for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    if (window.VanillaTilt && serviceCards.length > 0) {
        VanillaTilt.init(serviceCards, {
            max: 10,
            speed: 400,
            glare: true,
            'max-glare': 0.3,
            scale: 1.05
        });
    }
    
    // Initialize Swiper for testimonials
    const testimonialSwiper = new Swiper('.testimonialSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
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
    });
    
    // Draggable flow timeline
    const flowTimeline = document.querySelector('.flow-timeline');
    if (flowTimeline) {
        let isDown = false;
        let startX;
        let scrollLeft;

        flowTimeline.addEventListener('mousedown', (e) => {
            isDown = true;
            flowTimeline.classList.add('active');
            startX = e.pageX - flowTimeline.offsetLeft;
            scrollLeft = flowTimeline.scrollLeft;
        });

        flowTimeline.addEventListener('mouseleave', () => {
            isDown = false;
            flowTimeline.classList.remove('active');
        });

        flowTimeline.addEventListener('mouseup', () => {
            isDown = false;
            flowTimeline.classList.remove('active');
        });

        flowTimeline.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - flowTimeline.offsetLeft;
            const walk = (x - startX) * 2;
            flowTimeline.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        flowTimeline.addEventListener('touchstart', (e) => {
            isDown = true;
            flowTimeline.classList.add('active');
            startX = e.touches[0].pageX - flowTimeline.offsetLeft;
            scrollLeft = flowTimeline.scrollLeft;
        });

        flowTimeline.addEventListener('touchend', () => {
            isDown = false;
            flowTimeline.classList.remove('active');
        });

        flowTimeline.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - flowTimeline.offsetLeft;
            const walk = (x - startX) * 2;
            flowTimeline.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Sticky next button for flow section
    const nextButton = document.querySelector('.next-step-btn');
    const flowSection = document.querySelector('.flow');
    
    if (nextButton && flowSection) {
        window.addEventListener('scroll', () => {
            const flowRect = flowSection.getBoundingClientRect();
            if (flowRect.top < 0 && flowRect.bottom > window.innerHeight) {
                nextButton.classList.add('visible');
            } else {
                nextButton.classList.remove('visible');
            }
        });
        
        nextButton.addEventListener('click', () => {
            // Scroll to the next section
            const nextSection = flowSection.nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Campaign badge and modal
    const campaignBadge = document.querySelector('.campaign-badge');
    const modal = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const reservationButtons = document.querySelectorAll('.reservation-btn');
    
    function openModal() {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    if (campaignBadge) {
        campaignBadge.addEventListener('click', openModal);
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    reservationButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });
    
    // FAQ Accordion with Lottie animations
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const icon = item.querySelector('.faq-icon');
        let animation;
        
        // Initialize Lottie animation if available
        if (window.lottie && icon) {
            animation = lottie.loadAnimation({
                container: icon,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: `assets/animations/faq-${item.dataset.icon || 'default'}.json`
            });
            
            animation.goToAndStop(0, true);
        }
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    
                    // Reset other animations
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    if (otherIcon && otherIcon._lottie) {
                        otherIcon._lottie.goToAndStop(0, true);
                    }
                }
            });
            
            // Toggle current item
            const isActive = item.classList.toggle('active');
            
            // Play or reverse animation
            if (animation) {
                if (isActive) {
                    animation.setDirection(1);
                    animation.play();
                } else {
                    animation.setDirection(-1);
                    animation.play();
                }
            }
        });
    });
    
    // FAQ Feedback buttons
    const feedbackButtons = document.querySelectorAll('.feedback-btn');
    
    feedbackButtons.forEach(button => {
        button.addEventListener('click', function() {
            const feedbackContainer = this.closest('.faq-feedback');
            const buttons = feedbackContainer.querySelectorAll('.feedback-btn');
            
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show thank you message
            const message = feedbackContainer.querySelector('p');
            message.textContent = 'ありがとうございます！';
            
            // Reset after 3 seconds
            setTimeout(() => {
                message.textContent = 'この回答は役に立ちましたか？';
            }, 3000);
        });
    });
    
    // Floating reservation button
    const floatingReservation = document.querySelector('.floating-reservation');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > heroSection.offsetHeight) {
            floatingReservation.classList.add('active');
        } else {
            floatingReservation.classList.remove('active');
        }
    });
    
    // Chat button functionality
    const chatButton = document.querySelector('.chat-button');
    const chatWindow = document.querySelector('.chat-window');
    const chatClose = document.querySelector('.chat-close');
    const chatInput = document.querySelector('.chat-input input');
    const chatSend = document.querySelector('.chat-input button');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (chatButton && chatWindow) {
        chatButton.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
        });
        
        if (chatClose) {
            chatClose.addEventListener('click', () => {
                chatWindow.classList.remove('active');
            });
        }
        
        // Send message functionality
        function sendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                // Create user message
                const userMessage = document.createElement('div');
                userMessage.classList.add('chat-message', 'message-sent');
                userMessage.textContent = message;
                chatMessages.appendChild(userMessage);
                
                // Clear input
                chatInput.value = '';
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simulate response after a short delay
                setTimeout(() => {
                    const botMessage = document.createElement('div');
                    botMessage.classList.add('chat-message', 'message-received');
                    botMessage.textContent = 'ありがとうございます。スタッフが確認次第、ご連絡いたします。';
                    chatMessages.appendChild(botMessage);
                    
                    // Scroll to bottom again
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        }
        
        if (chatSend) {
            chatSend.addEventListener('click', sendMessage);
        }
        
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission (prevent default for demo)
    const reservationForm = document.querySelector('.reservation-form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const requiredFields = reservationForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success message (in a real application, you would send the form data to a server)
                alert('ご予約ありがとうございます！確認メールをお送りしました。');
                reservationForm.reset();
            } else {
                alert('すべての必須項目を入力してください。');
            }
        });
    }
    
    // Current date for the date picker (prevent past dates)
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        
        const currentDate = `${yyyy}-${mm}-${dd}`;
        dateInput.setAttribute('min', currentDate);
    }
});
