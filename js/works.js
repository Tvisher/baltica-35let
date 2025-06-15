
Fancybox.bind("[data-fancybox]", {

});


document.querySelectorAll('.work-item__like').forEach(likeBtn => {
    likeBtn.addEventListener('click', e => {
        e.stopPropagation();
        likeBtn.classList.toggle('active');
    });
});