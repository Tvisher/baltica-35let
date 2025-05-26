const mobMenu = document.querySelector('#mob-menu');
const messageModal = document.querySelector('[data-message-modal]');

document.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('.mob-btn')) {
        mobMenu.classList.add('show');
    }

    if (target.closest('.mob-btn__close')) {
        mobMenu.classList.remove('show');
    }
    if (target.closest('.header__link') && isMobileInit) {
        mobMenu.classList.remove('show');
    }

    if (target.closest('.feedback-btn')) {
        e.preventDefault();
        messageModal.classList.add('show');
    }

    if ((target.closest('.message-modal') && !target.closest('.auth-modal__content')) || target.closest('[data-close-modal]')) {
        messageModal.classList.remove('show');
    }
});




// const messageForm = document.querySelector('.message-form');
// const textField = messageForm.querySelector('.message-modal__text');
// const textFieldLabel = textField.closest('.auth-modal__field');
// const personnelNumberValue = messageForm.querySelector('.auth-modal__input').value;
// textField.addEventListener('input', (e) => {
//     textFieldLabel.classList.remove('err');
// });

// messageForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const messageValue = textField.value.trim();
//     if (messageValue.length < 1) {
//         textFieldLabel.classList.add('err');
//         return;
//     }
//     const data = {
//         personnelNumber: personnelNumberValue,
//         message: messageValue
//     }
//     messageModal.classList.add('pending');

//     $.ajax({
//         type: 'POST',
//         url: 'someUrl',
//         dataType: 'json',
//         data: data,
//         success: function (data) {
//             messageModal.classList.remove('pending');
//             const modalResult = `
//                 <div class="auth-modal__content">
//                     <div class="auth-modal__head">
//                         <span>Сообщение отправлено</span>
//                         <div class="message-modal__close" data-close-modal>
//                             <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M13 1L1 13M1 1L13 13" stroke="#002D74" stroke-width="2" stroke-linecap="round"
//                                 stroke-linejoin="round" />
//                             </svg>
//                         </div>
//                     </div>
//                     <div class="message-form">
//                         <p class="message-form__text">Спасибо за отправленное вами сообщение! <br> Оно будет рассмотрено модератором.</p>
//                         <button class="auth-submit-btn" type="button" data-close-modal>Закрыть</button>
//                     </div>
//                 </div>
//             `;
//             messageModal.innerHTML = modalResult;
//         },
//         error: function () {
//             messageModal.classList.remove('pending');
//             alert('Произошла ошибка, пожалуйста попробуйте позднее');
//         }
//     });
// });
