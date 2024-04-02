const shops = [
    {
        "name": "光華車輪餅"
    },
    {
        "name": "全家"
    },
    {
        "name": "露易莎咖啡"
    },
    {
        "name": "COMEBUY"
    }
]

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

let defaultBlacklist = localStorage.getItem("defaultBlacklist");
defaultBlacklistShopList = JSON.parse(defaultBlacklist);
let defaultWhitelist = localStorage.getItem("defaultWhitelist");
defaultWhitelistShopList = JSON.parse(defaultWhitelist);

let blacklist = sessionStorage.getItem("blacklist");
blacklistShopList = JSON.parse(blacklist);
let whitelist = sessionStorage.getItem("whitelist");
whitelistShopList = JSON.parse(whitelist);