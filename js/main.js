const isMobileInit = window.innerWidth <= 576;

const periodsSlider = new Swiper('.poriods-slider', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    slideToClickedSlide: isMobileInit,
    freeMode: {
        enabled: 1,
        sticky: true,
    },
});




let periodSliders = [];
const periodCardsItems = document.querySelectorAll('.period-cards-item');
periodCardsItems.forEach(sliderBlock => {

    const sliderElement = sliderBlock.querySelector('.period-cards');
    const paginationParent = sliderBlock.querySelector(".custom-cards-pagination");

    const periodCards = new Swiper(sliderElement, {
        slidesPerView: 'auto',
        centeredSlides: !isMobileInit,
        centeredSlidesBounds: !isMobileInit,
        resizeObserver: 0,
        init: false,
        freeMode: {
            enabled: !isMobileInit,
            sticky: !isMobileInit,
        },
        on: {
            init(swiper) {
                renderCustomPagination(swiper);
                if (isMobileInit) return;
                swiper.slides.forEach(slide =>
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
            },
            transitionStart(swiper) {
                if (isMobileInit) return;
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
            activeIndexChange(swiper) {
                if (isMobileInit) {
                    const slideItem = swiper.slides[swiper.activeIndex];
                    const slideYear = slideItem.dataset.year;
                    const currentPaginationItem = paginationParent.querySelector(`[data-slide="${slideYear}"]`);
                    const prevActivPag = paginationParent.querySelector('.custom-cards-pagination__item.current');
                    prevActivPag && prevActivPag.classList.remove('current');
                    currentPaginationItem && currentPaginationItem.classList.add('current');
                }
            }

        }
    });
    periodSliders.push(periodCards);

    function renderCustomPagination(slider) {
        let htmlCustomPagination = '';
        slider.slides.forEach((el, ind) => {
            const isFirst = ind == 0;
            htmlCustomPagination += `<span data-slide="${el.dataset.year}" class="custom-cards-pagination__item ${isFirst ? 'current' : ''}">${el.dataset.year}</span>`;
        });

        paginationParent.innerHTML = htmlCustomPagination;
    };


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
})
periodSliders[0].init()

const activitiesList = new Swiper('.activities__list', {
    slidesPerView: 'auto',
    spaceBetween: 24,
    pagination: {
        el: '.swiper-pagination',
        type: "bullets",
        clickable: 1,
    },
    // freeMode: {
    //     enabled: !isMobileInit,
    //     sticky: !isMobileInit,
    // },
});


const albumSlidepSpeed = isMobileInit ? 500 : 1200;
const albumSlider = new Swiper('.album-slider', {
    slidesPerView: 'auto',
    speed: albumSlidepSpeed,
    touchRatio: 0.5,
    freeMode: {
        enabled: isMobileInit,
        sticky: isMobileInit,
    },
    keyboard: {
        enabled: true,
        onlyInViewport: false,
    },
    // pagination: {
    //     el: '.swiper-pagination',
    //     type: "bullets",
    //     clickable: 1,
    // },
    on: {
        activeIndexChange(swiper) {
            // if (isMobileInit) return;
            const currentSlide = swiper.slides[swiper.activeIndex];
            const activeYear = currentSlide.dataset.year;
            const timelineNeededSlideIndex = timelineSlider.slides.findIndex(slide => slide.dataset.year == activeYear);
            const timelineNeededSlide = timelineSlider.slides.find(slide => slide.dataset.year == activeYear);
            timelineSlider.slides.forEach(slide => slide.classList.remove('active'))
            timelineNeededSlide.classList.add('active');

            timelineSlider.slideTo(timelineNeededSlideIndex, 200)

        }
    }
});


const timelineSlider = new Swiper('.album-timeline', {
    slidesPerView: 'auto',
    freeMode: {
        enabled: true,
    },
    resizeObserver: 0,
    centeredSlides: 1,
    centeredSlidesBounds: 1,
    on: {
        transitionEnd(swiper) {
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
        click(swiper, event) {
            const target = event.target;
            const currentSlide = target.closest('.timeline-slide');
            if (currentSlide) {
                swiper.slides.forEach(el => el.classList.remove('active'))
                currentSlide.classList.add('active');
                const currentYear = currentSlide.dataset.year;
                const albumSliderCurrentSlideIndex = albumSlider.slides.findIndex(el => el.dataset.year == currentYear);

                albumSlider.slideTo(albumSliderCurrentSlideIndex, 900)
            }
        }
    }
});


const albumSliderMain = new Swiper(".album-modal__slider-main", {
    allowTouchMove: false,
    spaceBetween: 100,
    speed: 800,

    navigation: {
        nextEl: ".slider-main-button-next",
        prevEl: ".slider-main-button-prev",
    },
});


const albumItems = document.querySelectorAll('.album-item');
albumItems.forEach(slideItem => {
    const mainSlider = slideItem.querySelector('.group-main');
    const mainThumbs = slideItem.querySelector('.group-thumbs');
    const progressBlock = slideItem.querySelector(".group-thumbs__progress")
    const albumThumbsSlider = new Swiper(mainThumbs, {
        touchRatio: 0.5,
        spaceBetween: 10,
        slidesPerView: "auto",
        freeMode: !isMobileInit,
        watchSlidesProgress: true,
        mousewheel: {
            enable: true,
        },
        pagination: {
            el: progressBlock,
            type: "progressbar",
        },
    });
    const albumInnerSlider = new Swiper(mainSlider, {
        spaceBetween: 10,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        navigation: {
            nextEl: ".group-main-next",
            prevEl: ".group-main-prev",
        },
        thumbs: {
            swiper: albumThumbsSlider,
        },
    });
})


document.addEventListener('click', (e) => {
    const target = e.target;
    const poriodItem = target.closest('.poriod-item');
    if (poriodItem) {
        const prevActivePeriod = document.querySelector('.poriod-item.active');
        prevActivePeriod && prevActivePeriod.classList.remove('active');
        poriodItem.classList.add('active');
        const poriodItemId = poriodItem.dataset.period;
        const neededPeriodContent = document.querySelector(`.period-cards-item[data-period-view="${poriodItemId}"]`);
        if (neededPeriodContent) {
            const prevActivePeriodContent = document.querySelector(`.period-cards-item.active`);
            prevActivePeriodContent.classList.remove('active')
            neededPeriodContent && neededPeriodContent.classList.add('active');
            periodSliders.forEach(slider => {
                if (slider.el.closest('[data-period-view]').dataset.periodView == poriodItemId) {
                    slider.init();
                }
            }
            )
        }
        return;
    }
    if (target.closest('.period-card')) {
        const periodCard = target.closest('.period-card');
        const cardYear = periodCard.dataset.year;
        const periodId = periodCard.closest('.period-cards-item').dataset.periodView;
        const currentModal = document.querySelector(`[data-period-modal="${periodId}"]`);

        if (currentModal) {
            const targetSection = currentModal.querySelector(`[data-modal-section="${cardYear}"]`);
            targetSection.scrollIntoView({
                behavior: 'auto',
                block: 'start'
            });
            setTimeout(() => {
                currentModal.classList.add('show');
            }, 100);

        }
        return;
    }
    if ((target.closest('.period-modal') && !target.closest('.period-modal__content')) || target.closest('.period-modal__close')) {
        const openedModal = document.querySelector('.period-modal.show');
        openedModal && openedModal.classList.remove('show');
        return;
    }
    if ((target.closest('.album-modal') && !target.closest('.album-modal__content')) || target.closest('.album-modal__close')) {
        const openedAlbumModal = document.querySelector('.album-modal.show');
        openedAlbumModal && openedAlbumModal.classList.remove('show');
        return;
    }

    if (target.closest('.album-slide__btn')) {
        const albumYear = target.closest('.album-slide__btn').closest('.album-slide').dataset.year;
        const currentAlbumIndex = albumSliderMain.slides.findIndex(album => album.dataset.albumYear == albumYear);
        if (currentAlbumIndex >= 0) {
            albumSliderMain.slideTo(currentAlbumIndex, 0);
            document.querySelector('.album-modal').classList.add('show');
        }
    }
})
