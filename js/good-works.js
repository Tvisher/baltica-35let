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



$(document).ready(function () {
    $('.form-select').select2({
        minimumResultsForSearch: -1,
        placeholder: "Выбрать активность",
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

    // Функция подсчёта общего размера всех файлов
    function getTotalSize() {
        let size = 0;
        dropzoneInit.files.forEach(file => size += file.size);
        return size;
    }

    dropzoneInit.on("addedfile", function (file) {
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




// Обработка кликов по странице
document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.activity-modal__close') || (target.closest('.activity-modal') && !target.closest('.activity-modal__content'))) {
        const openedModal = target.closest('.activity-modal');
        openedModal && openedModal.classList.remove('show');
    }

    if (target.closest('[data-activity]')) {
        const activityId = target.closest('[data-activity]').dataset.activity;
        const activityModal = document.querySelector(`[ data-activity-modal="${activityId}"]`);
        activityModal && activityModal.classList.add('show');
    }
    if (target.closest('[data-good-works]')) {
        const goodWorksModal = document.querySelector('.good-deed-modal');
        goodWorksModal.classList.add('show');

    }
});

// Сброс ошибок в полях ввода при начале ввода в поле.
const formInputs = document.querySelectorAll('.form-input');
formInputs.forEach(field => {
    field.addEventListener('input', () => {
        const fieldParent = field.closest('.form-label__wrapper');
        if (fieldParent && field.value.trim().length > 0) fieldParent.classList.remove('err');
    })
})


// Обработка формы  "Предложить мероприятие"
const suggestForm = document.querySelector('#suggest-form');
suggestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedCity = suggestForm.querySelector('.form-select');
    const membersCount = suggestForm.querySelector('[name="members-count"]');
    const whoToHelp = suggestForm.querySelector('[name="who-to-help"]');
    const howToHelp = suggestForm.querySelector('[name="how-to-help"]');
    const fields = [
        selectedCity,
        membersCount,
        whoToHelp,
        howToHelp];
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
        howToHelp: howToHelp.value.trim()
    };


    const formHasError = suggestForm.querySelector('.err');
    if (formHasError) return;

    console.log(data);

})