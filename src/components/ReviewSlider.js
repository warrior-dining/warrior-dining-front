const slideInterval = 5000;

export function initReviewSlider(reviewWrapper, reviewSlides) {
    if (!reviewSlides || reviewSlides.length === 0) {
        console.error("No slides available");
        return;
    }

    let currentIndex = 0; 
    let isTransitioning = false; 

    // 슬라이드를 복사하여 앞과 뒤에 추가해 무한 슬라이드 효과 구현
    const firstSlideClone = reviewSlides[0]?.cloneNode(true); 
    const lastSlideClone = reviewSlides[reviewSlides.length - 1]?.cloneNode(true); 
    
    if (firstSlideClone && lastSlideClone) {
        reviewWrapper.appendChild(firstSlideClone); 
        reviewWrapper.insertBefore(lastSlideClone, reviewSlides[0]);
    } else {
        console.error("Failed to clone slides");
        return;
    }

    function updateSlideWidth() {
        const isSmallScreen = window.matchMedia("(max-width: 861px)").matches;
        const slideWidth = isSmallScreen ? '100%' : '25%';

        [...reviewWrapper.children].forEach(slide => {
            slide.style.width = slideWidth;
        });

        return isSmallScreen;
    }

    function moveToNextSlide(isSmallScreen) {
        if (isTransitioning) return;

        currentIndex++;
        const offset = isSmallScreen ? -currentIndex * 100 : -currentIndex * 25; 
        reviewWrapper.style.transition = 'transform 0.5s ease-in-out';
        reviewWrapper.style.transform = `translateX(${offset}%)`;

        // 마지막 슬라이드에서 첫 슬라이드로 자연스럽게 돌아가는 처리
        if (currentIndex === reviewSlides.length) {
            isTransitioning = true;
            setTimeout(() => {
                reviewWrapper.style.transition = 'none'; 
                currentIndex = 0; 
                reviewWrapper.style.transform = `translateX(0%)`;
                isTransitioning = false;
            }, 500); 
        }
    }

    const isSmallScreen = updateSlideWidth();
    reviewWrapper.style.transform = `translateX(-25%)`;  // 첫번째 슬라이드를 기준으로

    const intervalId = setInterval(() => moveToNextSlide(isSmallScreen), slideInterval);

    const handleResize = () => {
        const isSmallScreen = updateSlideWidth();
        moveToNextSlide(isSmallScreen); 
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
        clearInterval(intervalId); 
        window.removeEventListener('resize', handleResize); 
    };
}
