function clickToLocationPage() {
    const linkItems = document.querySelectorAll('.link-item');

    linkItems.forEach(item => {
        item.addEventListener('click', function() {
            window.location.href = 'https://maps.app.goo.gl/kpsrU75RpsYELd2R6';
        });
    });
}

clickToLocationPage();

function clickButton(button_id) {
    let button = document.getElementById(button_id);

    if(button.classList.contains('clicked')) {
        button.classList.remove('clicked');
    }
    else {
        button.classList.add('clicked');
    }
}

function clickLinkButton() {
    navigator.clipboard.writeText("text");
}