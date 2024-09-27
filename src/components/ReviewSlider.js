const slideInterval = 5000; 

export function initReviewSlider(reviewWrapper, reviewSlides) {
    let currentIndex = 0; 

   
    function updateSlideWidth() {
        const isSmallScreen = window.matchMedia("(max-width: 861px)").matches;
        const slideWidth = isSmallScreen ? '100%' : '25%';

       
        reviewSlides.forEach(slide => {
            slide.style.width = slideWidth;
        });

        return isSmallScreen;
    }

    
    function moveToNextSlide(isSmallScreen) {
        currentIndex = (currentIndex + 1) % reviewSlides.length;
        const offset = isSmallScreen ? -currentIndex * 100 : -currentIndex * 25; 
        reviewWrapper.style.transform = `translateX(${offset}%)`;
    }


    const isSmallScreen = updateSlideWidth();
    reviewWrapper.style.transform = `translateX(0%)`;


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
