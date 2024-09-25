const slideInterval = 5000; // 슬라이드 전환 간격 (5초)

export function initReviewSlider(reviewWrapper, reviewSlides) {
    let currentIndex = 0; // 현재 슬라이드 인덱스

    // 슬라이드 너비를 설정하는 함수
    function updateSlideWidth() {
        const isSmallScreen = window.matchMedia("(max-width: 861px)").matches;
        const slideWidth = isSmallScreen ? '100%' : '25%';

        // 슬라이드 너비 설정
        reviewSlides.forEach(slide => {
            slide.style.width = slideWidth;
        });

        return isSmallScreen;
    }

    // 슬라이드를 이동시키는 함수
    function moveToNextSlide(isSmallScreen) {
        currentIndex = (currentIndex + 1) % reviewSlides.length;
        const offset = isSmallScreen ? -currentIndex * 100 : -currentIndex * 25; // 100% 또는 25%
        reviewWrapper.style.transform = `translateX(${offset}%)`;
    }

    // 페이지 로드 시 초기 위치 설정 및 슬라이드 너비 업데이트
    const isSmallScreen = updateSlideWidth();
    reviewWrapper.style.transform = `translateX(0%)`;

    // 슬라이드 전환을 주기적으로 실행
    const intervalId = setInterval(() => moveToNextSlide(isSmallScreen), slideInterval);

    // 화면 크기 변경 시 슬라이드 너비와 위치를 업데이트
    const handleResize = () => {
        const isSmallScreen = updateSlideWidth();
        moveToNextSlide(isSmallScreen); // 크기 변경 시 현재 슬라이드가 계속 보이도록 조정
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
        clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 클리어
        window.removeEventListener('resize', handleResize); // 리스너 제거
    };
}
