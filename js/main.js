const periodsSlider = new Swiper('.poriods-slider', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    freeMode: {
        enabled: true,
        sticky: true,
    },
});


const periodCardsItems = document.querySelectorAll('.period-cards-item');
periodCardsItems.forEach(sliderBlock => {

    const sliderElement = sliderBlock.querySelector('.period-cards');
    const paginationParent = sliderBlock.querySelector(".custom-cards-pagination");

    const periodCards = new Swiper(sliderElement, {
        slidesPerView: 'auto',
        spaceBetween: 24,
        centeredSlides: 1,
        centeredSlidesBounds: 1,
        freeMode: {
            enabled: true,
            sticky: true,
        },
        on: {
            transitionStart(swiper) {
                if (swiper.isEnd) {
                    swiper.el.classList.add('slider-end')
                } else {
                    swiper.el.classList.remove('slider-end')
                }

                if (swiper.translate < 0) {
                    swiper.el.classList.add('slider-start')
                } else {
                    swiper.el.classList.remove('slider-start')
                }
            },

        }
    });

    function renderCustomPagination() {
        let htmlCustomPagination = '';
        periodCards.slides.forEach((el, ind) => {
            const isFirst = ind == 0;
            htmlCustomPagination += `<span data-slide="${el.dataset.year}" class="custom-cards-pagination__item ${isFirst ? 'current' : ''}">${el.dataset.year}</span>`;
        });
        paginationParent.innerHTML = htmlCustomPagination;
    };
    renderCustomPagination();

    paginationParent.addEventListener('click', (e) => {
        const yearPagination = e.target.closest('.custom-cards-pagination__item');
        if (!yearPagination) return;
        const prevActivePagination = paginationParent.querySelector('.custom-cards-pagination__item.current');
        prevActivePagination && prevActivePagination.classList.remove('current');
        yearPagination.classList.add('current');

        const currentYear = yearPagination.dataset.slide;
        const currentSlide = periodCards.slides.findIndex(slide => slide.dataset.year === currentYear);
        periodCards.slideTo(currentSlide, 800);

    });

    periodCards.slides.forEach(slide =>
        slide.addEventListener('mouseover', (e) => {
            const slideItem = e.target.closest('.period-card');
            if (!slideItem) return;
            const slideYear = slideItem.dataset.year;
            const currentPaginationItem = paginationParent.querySelector(`[data-slide="${slideYear}"]`);
            const prevActivPag = paginationParent.querySelector('.custom-cards-pagination__item.current');

            prevActivPag && prevActivPag.classList.remove('current');
            currentPaginationItem && currentPaginationItem.classList.add('current');
        })
    )


})




const activitiesList = new Swiper('.activities__list', {
    slidesPerView: 'auto',
    spaceBetween: 24,
    freeMode: {
        enabled: true,
        sticky: true,
    },
});



document.addEventListener('click', (e) => {
    const target = e.target;
    const poriodItem = target.closest('.poriod-item');
    if (poriodItem) {
        const prevActivePeriod = document.querySelector('.poriod-item.active');
        prevActivePeriod && prevActivePeriod.classList.remove('active');
        poriodItem.classList.add('active');
    }
})