
const pauseAllVideoInPage = () => {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => video.pause());
}

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
    slidesPerView: 1,
    spaceBetween: 32,
    pagination: {
        el: '.swiper-pagination',
        type: "bullets",
        clickable: 1,
    },
    breakpoints: {
        992: {
            slidesPerView: 2,
        },
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
    on: {
        slideChangeTransitionStart() {
            pauseAllVideoInPage()
        }
    }
});

const isMobileInit = window.innerWidth <= 576;
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
        on: {
            slideChangeTransitionStart() {
                pauseAllVideoInPage()
            }
        }
    });
});

// Инит селектов
$(document).ready(function () {
    $('.form-select').select2({
        minimumResultsForSearch: -1,
        placeholder: "Выбрать активность",
    });

    $('.form-select').on('select2:select', function (e) {
        const parentWrapper = e.target.closest('.form-label__wrapper');
        if (parentWrapper) parentWrapper.classList.remove('err');

        const parentForm = e.target.closest('#tell-about-good-deed');
        if (parentForm) {
            const hiddenField = parentForm.querySelector('.hidden-field');
            if (e.target.value == 'other') {
                $(hiddenField).slideDown();

            } else {
                $(hiddenField).slideUp();
                hiddenField.querySelector('.form-label__wrapper').classList.remove('err');
            }
        }


    });

});



// Инит дропзон и базовые параметры
const maxFilesCount = 999;// Максимальное колличество файлов 
const maxFilesSize = 50; //Общий размер файлов дропзоны в МБ
const maxFilesSizeInBytes = maxFilesSize * 1024 * 1024; // МБ в байтах
const formsDropzones = document.querySelectorAll('.file-input');
formsDropzones.forEach(fileInput => {
    let dropzoneInit = new Dropzone(fileInput, {
        url: "/upload",
        autoProcessQueue: false,
        uploadMultiple: true,
        parallelUploads: 5,
        maxFiles: maxFilesCount,
        addRemoveLinks: true,
        dictRemoveFile: "Удалить файл",
        paramName: "files",
        maxFilesize: maxFilesSizeInBytes,
        acceptedFiles: '.pdf,.jpg,.jpeg,.png,.gif,.bmp,.webp,.svg,.heic,.mp4,.mov,.avi,.webm,.mkv,.m4v',
        previewTemplate: `
        <div class="dz-preview dz-file-preview">
            <div class="dz-details">
                <div class="dz-filename"><span data-dz-name></span></div>
                <div class="dz-size" data-dz-size></div>
            </div>
            <div class="dz-error-message"><span data-dz-errormessage></span></div>
        </div>
        `
    });

    fileInput.dropzone = dropzoneInit;

    // Функция подсчёта общего размера всех файлов
    function getTotalSize() {
        let size = 0;
        dropzoneInit.files.forEach(file => size += file.size);
        return size;
    }

    dropzoneInit.on("addedfile", function (file) {
        fileInput.closest('.form-label__wrapper').classList.remove('err');
        // Проверка на общий размер файлов
        if (getTotalSize() > maxFilesSizeInBytes) {
            dropzoneInit.removeFile(file);
            alert(`Общий размер файлов не должен превышать ${maxFilesSize} МБ.`);
            return;
        }
    });

    dropzoneInit.on("maxfilesexceeded", function (file) {
        dropzoneInit.removeFile(file);
        alert(`Можно загрузить не более ${maxFilesCount} файлов.`);
    });

    dropzoneInit.on("error", function (file, message) {
        if (message === "You can't upload files of this type.") {
            dropzoneInit.removeFile(file);
            alert("Неправильный формат файла.");
        }
    });

})






// Сброс ошибок в полях ввода при начале ввода в поле.
const formInputs = document.querySelectorAll('.form-input');
formInputs.forEach(field => {
    field.addEventListener('input', () => {
        const fieldParent = field.closest('.form-label__wrapper');
        if (fieldParent && field.value.trim().length > 0) fieldParent.classList.remove('err');
    })
})

const bodyTag = document.querySelector('body');



// Обработка формы  "Предложить мероприятие"
const suggestForm = document.querySelector('#suggest-form');
suggestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedCity = suggestForm.querySelector('[name="city"]');
    const membersCount = suggestForm.querySelector('[name="members-count"]');
    const whoToHelp = suggestForm.querySelector('[name="who-to-help"]');
    const howToHelp = suggestForm.querySelector('[name="how-to-help"]');
    const socialLink = suggestForm.querySelector('[name="social-link"]');
    const fields = [
        selectedCity,
        membersCount,
        whoToHelp,
        howToHelp,
        socialLink
    ];
    fields.forEach(field => {
        const fieldParent = field.closest('.form-label__wrapper');
        if (!field.value.trim()) {
            fieldParent.classList.add('err');
        }
    })

    const data = {
        selectedCity: selectedCity.value.trim(),
        membersCount: membersCount.value.trim(),
        whoToHelp: whoToHelp.value.trim(),
        howToHelp: howToHelp.value.trim(),
        socialLink: socialLink.value.trim()
    };


    const formHasError = suggestForm.querySelector('.err');
    if (formHasError) return;
    bodyTag.classList.add('sending');
    console.log(data);
})

// Обработка формы  "Рассказать о добром деле"
const tellAboutGoodDeed = document.querySelector('#tell-about-good-deed');
tellAboutGoodDeed.addEventListener('submit', (e) => {
    e.preventDefault();
    const personnelNumber = tellAboutGoodDeed.querySelector('[name="personnel-number"]');
    const selectedEvent = tellAboutGoodDeed.querySelector('[name="event-select"]');
    const howWasHelp = tellAboutGoodDeed.querySelector('[name="how-was-help"]');
    const customCity = tellAboutGoodDeed.querySelector('[name="custom-city"]');
    const fileInput = tellAboutGoodDeed.querySelector('.file-input');
    const fields = [
        personnelNumber,
        selectedEvent,
        howWasHelp,
        customCity
    ];
    // Смотрим и валидируем поле с файлами
    const formDropzone = fileInput.dropzone;
    const files = formDropzone.files;
    if (files.length < 1) {
        fileInput.closest('.form-label__wrapper').classList.add('err');
    }

    // Смотрим и валидируем текстовые поля и селект
    fields.forEach(field => {
        const fieldParent = field.closest('.form-label__wrapper');
        if (field.name == 'custom-city' && selectedEvent.value !== 'other') {
            return;
        }

        if (!field.value.trim()) {
            fieldParent.classList.add('err');
        }
    });


    const data = {
        personnelNumber: personnelNumber.value.trim(),
        selectedEvent: selectedEvent.value.trim(),
        howWasHelp: howWasHelp.value.trim(),
        customCity: selectedEvent.value == 'other' ? customCity.value.trim() : null,
        files
    };


    const formHasError = tellAboutGoodDeed.querySelector('.err');
    if (formHasError) return;

    bodyTag.classList.add('sending');
    console.log(data);

    // Тут аякс и то что в setTimeout нужно будет сделать в succes
    setTimeout(() => {
        bodyTag.classList.remove('sending');
        $(selectedEvent).val(null).trigger('change');
        tellAboutGoodDeed.reset();
        const customCityWrapper = customCity.closest('.hidden-field');
        $(customCityWrapper).slideUp();
        formDropzone.removeAllFiles();
    }, 2000);

});


// Обработка формы  "Рассказать о добром деле"

const eventForms = document.querySelectorAll('.current-event-form');
eventForms.forEach(eventForm => {
    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const eventId = eventForm.getAttribute('data-event-id');
        const personnelNumber = eventForm.querySelector('[name="personnel-number"]');
        const activityName = eventForm.querySelector('[name="activity-name"]');
        const selectedCity = eventForm.querySelector('[name="activity-city"]');
        const howWasHelp = eventForm.querySelector('[name="how-was-help"]');
        const fileInput = eventForm.querySelector('.file-input');

        const fields = [
            personnelNumber,
            selectedCity,
            howWasHelp,
            activityName
        ];


        // Смотрим и валидируем поле с файлами
        const formDropzone = fileInput.dropzone;
        const files = formDropzone.files;
        if (files.length < 1) {
            fileInput.closest('.form-label__wrapper').classList.add('err');
        }

        // Смотрим и валидируем текстовые поля и селект
        fields.forEach(field => {
            const fieldParent = field.closest('.form-label__wrapper');
            if (!field.value.trim()) {
                fieldParent.classList.add('err');
            }
        });


        const data = {
            personnelNumber: personnelNumber.value.trim(),
            selectedCity: selectedCity.value.trim(),
            howWasHelp: howWasHelp.value.trim(),
            activityName: activityName.value.trim(),
            eventId,
            files
        };


        const formHasError = eventForm.querySelector('.err');
        if (formHasError) return;
        bodyTag.classList.add('sending');
        // formDropzone.removeAllFiles();
        console.log(data);
    })
})



const albumModal = document.querySelector('.album-modal');

// Обработка кликов по странице
document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.activity-modal__close') || (target.closest('.activity-modal') && !target.closest('.activity-modal__content'))) {
        const openedModal = target.closest('.activity-modal');
        openedModal && openedModal.classList.remove('show');
        return;
    }

    if (target.closest('[data-activity]')) {
        const activityId = target.closest('[data-activity]').dataset.activity;
        const activityModal = document.querySelector(`[ data-activity-modal="${activityId}"]`);
        const activityModalBody = activityModal.querySelector('.activity-modal__body');
        activityModalBody.scrollTop = 0;
        activityModal && activityModal.classList.add('show');
        return;
    }
    if (target.closest('[data-good-works]')) {
        const goodWorksModal = document.querySelector('.good-deed-modal');
        goodWorksModal.classList.add('show');
        return;
    }
    if ((target.closest('.album-modal') && !target.closest('.album-modal__content')) || target.closest('.album-modal__close')) {
        const openedAlbumModal = document.querySelector('.album-modal.show');
        openedAlbumModal && openedAlbumModal.classList.remove('show');
        pauseAllVideoInPage();
        return;
    }

    if (target.closest('[data-report-id]')) {
        const reportId = target.closest('[data-report-id]').dataset.reportId;
        const currentSlide = albumSliderMain.slides.findIndex((slide) => {
            return slide.dataset.reportSliderId == reportId;
        });
        albumSliderMain.slideTo(currentSlide, 0);
        albumModal.classList.add('show');
    }

});