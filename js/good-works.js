const activitiesList = new Swiper('.activities__list', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    pagination: {
        el: '.swiper-pagination',
        type: "bullets",
        clickable: 1,
    },

});



const eventsList = new Swiper('.events-map-list', {
    slidesPerView: 'auto',
    spaceBetween: 40,
    pagination: {
        el: '.swiper-pagination',
        type: "bullets",
        clickable: 1,
    },
});


const galleryOfReports = new Swiper('.gallery-of-reports__slider', {
    slidesPerView: 2,
    spaceBetween: 32,
    pagination: {
        el: '.swiper-pagination',
        type: "bullets",
        clickable: 1,
    },
});