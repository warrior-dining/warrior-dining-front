

const slideInterval = 5000; 

let currentIndex = 0; 

export function initReviewSlider(reviewWrapper, reviewSlides) {
    
    function updateSlideWidth() {
        const isSmallScreen = window.matchMedia("(max-width: 861px)").matches;

        
        reviewSlides.forEach(slide => {
            slide.style.width = isSmallScreen ? '100%' : '25%';
        });
    }

   
    function moveToNextSlide() {
        currentIndex = (currentIndex + 1) % reviewSlides.length;
        const isSmallScreen = window.matchMedia("(max-width: 861px)").matches;
        const offset = isSmallScreen ? -currentIndex * 100 : -currentIndex * 25;
        reviewWrapper.style.transform = `translateX(${offset}%)`;
    }

    
    updateSlideWidth();
    reviewWrapper.style.transform = `translateX(0%)`;

    
    const intervalId = setInterval(moveToNextSlide, slideInterval);

    
    window.addEventListener('resize', () => {
        updateSlideWidth();
        moveToNextSlide(); 
    });

    return () => {
        clearInterval(intervalId); 
        window.removeEventListener('resize', updateSlideWidth); 
    };
}
