// AOS (Animate On Scroll) 初期化
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // ナビゲーションスクロール効果
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // モバイルナビゲーションの切り替え
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // ポートフォリオフィルター
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // アクティブクラスの切り替え
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // テスティモニアルスライダー
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function showTestimonial(index) {
        testimonialItems.forEach(item => item.style.display = 'none');
        testimonialItems[index].style.display = 'block';
    }

    if (testimonialItems.length > 0) {
        showTestimonial(currentIndex);

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentIndex++;
                if (currentIndex >= testimonialItems.length) {
                    currentIndex = 0;
                }
                showTestimonial(currentIndex);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentIndex--;
                if (currentIndex < 0) {
                    currentIndex = testimonialItems.length - 1;
                }
                showTestimonial(currentIndex);
            });
        }
    }

    // カーソル追従ライティングエフェクト
    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
        // カーソルライト要素を作成
        const cursorLight = document.createElement('div');
        cursorLight.className = 'cursor-light';
        testimonialsSection.appendChild(cursorLight);

        // カーソルの動きを追跡
        testimonialsSection.addEventListener('mousemove', function(e) {
            const rect = testimonialsSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            cursorLight.style.left = x + 'px';
            cursorLight.style.top = y + 'px';
        });

        // セクションに入るとエフェクトを表示
        testimonialsSection.addEventListener('mouseenter', function() {
            cursorLight.style.opacity = '1';
        });

        // セクションから出るとエフェクトを非表示
        testimonialsSection.addEventListener('mouseleave', function() {
            cursorLight.style.opacity = '0';
        });
    }

    // パーティクルアニメーション
    const particlesBg = document.querySelector('.particles-bg');
    if (particlesBg && window.particlesJS) {
        particlesJS('particles-bg', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#c9a063'
                },
                shape: {
                    type: 'circle',
                },
                opacity: {
                    value: 0.3,
                    random: true,
                },
                size: {
                    value: 3,
                    random: true,
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#c9a063',
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.3
                        }
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    }
});

