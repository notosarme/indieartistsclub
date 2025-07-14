document.addEventListener('DOMContentLoaded', function () {
    var popupTrigger = document.getElementById('popupTrigger');
    popupTrigger.addEventListener('click', showPopup);

    var closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', hidePopup);
});

function showPopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'flex';
}

function hidePopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'none';
}
