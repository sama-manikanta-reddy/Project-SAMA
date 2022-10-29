const closeBtn = document.querySelectorAll('.btn-close');
closeBtn.forEach(element => {
    element.addEventListener('click', () => {
        element.parentElement.remove();
    })
});