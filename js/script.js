document.addEventListener('DOMContentLoaded', function() {
    // --- ヒーローセクションのロジック --- //

    // 1. パララックス背景の切り替え
    const parallaxBg = document.getElementById('parallax-bg');
    const heroSection = document.getElementById('hero');
    const afterImage = new Image();
    // TODO: images/after.jpg にアフター画像を配置してください
    afterImage.src = 'images/after.jpg'; 

    let isAfter = false;
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroHeight = heroSection.offsetHeight;

        // ヒーローセクションの半分までスクロールしたら画像を切り替え
        if (scrollPosition > heroHeight / 2 && !isAfter) {
            parallaxBg.style.backgroundImage = `url('${afterImage.src}')`;
            isAfter = true;
        } else if (scrollPosition <= heroHeight / 2 && isAfter) {
            // TODO: images/before.jpg にビフォー画像を配置してください
            parallaxBg.style.backgroundImage = `url('images/before.jpg')`;
            isAfter = false;
        }

        // スクロールによる微細なズームアウト効果
        const scale = 1 + (scrollPosition / heroHeight) * 0.1;
        parallaxBg.style.transform = `scale(${scale})`;
    });

    // 2. 地域情報の動的表示 (簡易版)
    // 本来はIPアドレスから地域を判定するAPIを使用しますが、ここではダミーデータを表示します。
    const cityElement = document.getElementById('city-name');
    const exampleCities = ['渋谷区', '横浜市', 'さいたま市', '千葉市'];
    const randomCity = exampleCities[Math.floor(Math.random() * exampleCities.length)];
    if (cityElement) {
        cityElement.textContent = randomCity;
    }

    // --- サービス紹介セクションのロジック --- //

    const diagnosisSelect = document.getElementById('diagnosis-select');
    const resultMessage = document.getElementById('diagnosis-result');
    const serviceCards = document.querySelectorAll('.service-card');

    if (diagnosisSelect) {
        diagnosisSelect.addEventListener('change', function() {
            const selectedValue = this.value;
            
            // すべてのカードのハイライトをリセット
            serviceCards.forEach(card => card.classList.remove('highlighted'));

            if (selectedValue) {
                // 対応するカードをハイライト
                const targetCard = document.getElementById(`card-${selectedValue}`);
                if (targetCard) {
                    targetCard.classList.add('highlighted');
                }

                // 結果メッセージを表示
                const selectedOptionText = this.options[this.selectedIndex].text;
                resultMessage.textContent = `「${selectedOptionText}」方には、このコースがおすすめです！`;
                resultMessage.style.display = 'block';
            } else {
                resultMessage.style.display = 'none';
            }
        });
    }

    // --- お客様の声セクションのロジック --- //

    const testimonialsSlider = new Swiper('.testimonials-slider', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // 768px以上で3枚表示
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });

    const videoContainers = document.querySelectorAll('.video-container');

    videoContainers.forEach(container => {
        const video = container.querySelector('.testimonial-video');
        let hasEnded = false;

        container.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                container.classList.add('playing');
            } else {
                video.pause();
                container.classList.remove('playing');
            }
        });

        video.addEventListener('ended', () => {
            container.classList.add('show-cta');
            hasEnded = true;
        });

        video.addEventListener('play', () => {
            // 再生開始時にCTAを隠し、再生状態をリセット
            if(hasEnded) {
                container.classList.remove('show-cta');
                hasEnded = false;
            }
        });
    });

    // スライドが切り替わったら、再生中の動画を停止する
    testimonialsSlider.on('slideChange', function () {
        videoContainers.forEach(container => {
            const video = container.querySelector('.testimonial-video');
            video.pause();
            video.currentTime = 0; // 動画を最初に戻す
            container.classList.remove('playing');
            container.classList.remove('show-cta');
        });
    });

    // --- 施術フローセクションのロジック --- //

    const timelineContainer = document.getElementById('timeline-container');

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
            const walk = (x - startX) * 2; // スクロール速度を調整
            timelineContainer.scrollLeft = scrollLeft - walk;
        });
    }

    // --- FAQセクションのロジック --- //

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const lottieContainer = item.querySelector('.lottie-icon');

        // Lottieアニメーションをロード
        const anim = lottie.loadAnimation({
            container: lottieContainer,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: lottieContainer.dataset.lottiePath
        });

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // 他のアイテムをすべて閉じる
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = 0;
                    otherItem.querySelector('.faq-answer').style.padding = '0 20px';
                }
            });

            // クリックされたアイテムの開閉
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = 0;
                answer.style.padding = '0 20px';
                anim.setDirection(-1);
                anim.play();
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 40 + 'px';
                answer.style.padding = '0 20px 20px';
                anim.setDirection(1);
                anim.play();
            }
        });

        // フィードバックボタンの処理
        const feedbackButtons = item.querySelectorAll('.feedback-btn');
        feedbackButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // 質問のクリックイベントを発火させない
                // 兄弟要素の選択状態を解除
                feedbackButtons.forEach(btn => btn.classList.remove('selected'));
                // クリックされたボタンを選択状態にする
                button.classList.add('selected');
            });
        });
    });

    // --- ライブカウンセリングのロジック --- //

    const toast = document.getElementById('toast-notification');
    let toastShown = false;

    window.addEventListener('scroll', () => {
        // ページ全体の高さの25%をスクロールしたら表示
        if (window.scrollY > document.body.scrollHeight * 0.25 && !toastShown) {
            toast.classList.add('show');
            toastShown = true;

            // 5秒後に自動で消す
            setTimeout(() => {
                toast.classList.remove('show');
            }, 5000);
        }
    });

    // --- ここから他のセクションのロジックを追加 --- //
});
