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

function styleCheckAll() {
    const selectAllOption = document.getElementsByName("all-style-checkbox")[0];
    const options = document.getElementsByName("style-checkbox");
    options.forEach(option => {
        option.checked = selectAllOption.checked;
    });
}

function styleOptionClicked() {
    const selectAllOption = document.getElementsByName("all-style-checkbox")[0];
    const options = document.getElementsByName("style-checkbox");
    let allChecked = true;
    options.forEach(option => {
        if (!option.checked) {
            allChecked = false;
        }
    });
    selectAllOption.checked = allChecked;
}

function categoryCheckAll() {
    const selectAllOption = document.getElementsByName("all-category-checkbox")[0];
    const options = document.getElementsByName("category-checkbox");
    options.forEach(option => {
        option.checked = selectAllOption.checked;
    });
}

function categoryOptionClicked() {
    const selectAllOption = document.getElementsByName("all-category-checkbox")[0];
    const options = document.getElementsByName("category-checkbox");
    let allChecked = true;
    options.forEach(option => {
        if (!option.checked) {
            allChecked = false;
        }
    });
    selectAllOption.checked = allChecked;
}

function clickDialog(dialog_id){
    let modal=document.getElementById(dialog_id);
    modal.showModal();
}

function dialogClose(){
    let filter_dialogs=document.getElementsByClassName("filter-setting-modal");
    Array.from(filter_dialogs).forEach(filter_dialog => {
        filter_dialog.addEventListener("click", e => {
            if (e.target != filter_dialog) return;
            const dialogDimensions = filter_dialog.getBoundingClientRect()
            if (e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom) {
                
                filter_dialog.classList.add('hide');
                filter_dialog.addEventListener('animationend', function(){
                    filter_dialog.classList.remove('hide');
                    filter_dialog.close();
                    filter_dialog.removeEventListener('animationend',  arguments.callee, false);
                }, false);
            }
        })
    });

    let sideMenuOption_dialogs=document.getElementsByClassName("side-menu-modal");
    Array.from(sideMenuOption_dialogs).forEach(sideMenuOption_dialog => {
        sideMenuOption_dialog.addEventListener("click", e => {
            if (e.target != sideMenuOption_dialog) return;
            const dialogDimensions = sideMenuOption_dialog.getBoundingClientRect()
            if (e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom) {
                
                sideMenuOption_dialog.classList.add('hide');
                sideMenuOption_dialog.addEventListener('animationend', function(){
                    sideMenuOption_dialog.classList.remove('hide');
                    sideMenuOption_dialog.close();
                    sideMenuOption_dialog.removeEventListener('animationend',  arguments.callee, false);
                }, false);
            }
        })
    });

    let sideMenu_dialog=document.getElementById("side-menu-container");
    let sideMenuButton = document.getElementById('side-menu-button');
    sideMenu_dialog.addEventListener("click", e => {
        console.log('click');
        if (e.target != sideMenu_dialog) return;
        const dialogDimensions = sideMenu_dialog.getBoundingClientRect()
        if (e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom) {
            sideMenu_dialog.classList.remove('open');
            sideMenuButton.classList.remove('open');
            sideMenu_dialog.classList.add('close');
            sideMenu_dialog.addEventListener('animationend', function(){
                sideMenu_dialog.classList.remove('close');
                sideMenu_dialog.close();
                sideMenu_dialog.removeEventListener('animationend',  arguments.callee, false);
            }, false);
        }
    })
}

dialogClose();

function deleteShop(shop_id) {
    let divToDelete = document.getElementById(shop_id);
    divToDelete.remove();
}

function clickSideMenuButton(){
    let sideMenu = document.getElementById('side-menu-container');
    let sideMenuButton = document.getElementById('side-menu-button');

    const addSideMenuButtonShowAnimationEndHandler = () => {
        sideMenuButton.addEventListener('animationend', function() {
            sideMenuButton.classList.remove('show');
            sideMenuButton.removeEventListener('animationend',  arguments.callee, false);
        }, false);
    };
    const addSideMenuCloseAnimationEndHandler = () => {
        sideMenu.addEventListener('animationend', function() {
            sideMenu.classList.remove('close');
            sideMenu.close();
            sideMenu.removeEventListener('animationend', arguments.callee, false);
    
            sideMenuButton.classList.add('show');
            addSideMenuButtonShowAnimationEndHandler();
        }, false);
    };

    if(sideMenu.classList.contains('open')) {
        sideMenu.classList.remove('open');
        sideMenuButton.classList.remove('open');

        sideMenu.classList.add('close');
        addSideMenuCloseAnimationEndHandler();
    }
    else{
        sideMenu.showModal();
        sideMenu.classList.add('open');
        sideMenuButton.classList.add('open');
    }
}

let suggestionsTimeout;
let blacklistShopList = [];

function addBlacklistShops() {
    clearTimeout(suggestionsTimeout);
    const blacklistOptions = document.getElementById("blacklist-searching-options");
    blacklistOptions.innerHTML = shops.filter(shop => !blacklistShopList.includes(shop.name))
                                    .map(shop => `<label onclick="clickBlacklistOption('${shop.name}')">${shop.name}</label>`)
                                    .join("");
}

function removeBlacklistShops() {
    suggestionsTimeout = setTimeout(function() {
        document.getElementById("blacklist-searching-options").innerHTML = "";
        console.log("remove");
    }, 300);
}

function filterBlacklistOptionShops() {
    let input = document.getElementById("blacklist-modal").getElementsByTagName("input")[0];
    const blacklistOptions = document.getElementById("blacklist-searching-options");
    blacklistOptions.innerHTML = shops.filter(shop => !blacklistShopList.includes(shop.name))
                                    .filter(shop => shop.name.toLowerCase().includes(input.value.toLowerCase()))
                                    .map(shop => `<label onclick="clickBlacklistOption(${shop.name})">${shop.name}</label>`)
                                    .join("");
}

const blacklistShopTemp = document.getElementById("blacklist-shop-template");
const blacklistShopOptionList = document.getElementById("blacklist-options");

function clickBlacklistOption(shop_name) {
    console.log("click option");

    blacklistShopList.push(shop_name);
    let clone = document.importNode(blacklistShopTemp.content, true);

    let shopOption = clone.querySelector(".shop-option");
    shopOption.id = "blacklist-option-" + shop_name;
    shopOption.querySelector("label").textContent = shop_name;

    let deleteButton = clone.querySelector("button");
    deleteButton.addEventListener("click", function() {
        let toDeleteShop = document.getElementById(shopOption.id);
        blacklistShopOptionList.removeChild(toDeleteShop);
        blacklistShopList = blacklistShopList.filter(shop => shop != shop_name);
    });

    blacklistShopOptionList.appendChild(clone);
}

let whitelistShopList = [];

function addWhitelistShops() {
    clearTimeout(suggestionsTimeout);
    const whitelistOptions = document.getElementById("whitelist-searching-options");
    whitelistOptions.innerHTML = shops.filter(shop => !whitelistShopList.includes(shop.name))
                                    .map(shop => `<label onclick="clickWhitelistOption('${shop.name}')">${shop.name}</label>`)
                                    .join("");
}

function removeWhitelistShops() {
    suggestionsTimeout = setTimeout(function() {
        document.getElementById("whitelist-searching-options").innerHTML = "";
        console.log("remove");
    }, 300);
}

function filterWhitelistOptionShops() {
    let input = document.getElementById("whitelist-modal").getElementsByTagName("input")[0];
    const whitelistOptions = document.getElementById("whitelist-searching-options");
    whitelistOptions.innerHTML = shops.filter(shop => !whitelistShopList.includes(shop.name))
                                    .filter(shop => shop.name.toLowerCase().includes(input.value.toLowerCase()))
                                    .map(shop => `<label onclick="clickWhitelistOption(${shop.name})">${shop.name}</label>`)
                                    .join("");
}

const whitelistShopTemp = document.getElementById("whitelist-shop-template");
const whitelistShopOptionList = document.getElementById("whitelist-options");

function clickWhitelistOption(shop_name) {
    console.log("click option");

    whitelistShopList.push(shop_name);
    let clone = document.importNode(whitelistShopTemp.content, true);

    let shopOption = clone.querySelector(".shop-option");
    shopOption.id = "whitelist-option-" + shop_name;
    shopOption.querySelector("label").textContent = shop_name;

    let deleteButton = clone.querySelector("button");
    deleteButton.addEventListener("click", function() {
        let toDeleteShop = document.getElementById(shopOption.id);
        whitelistShopOptionList.removeChild(toDeleteShop);
        whitelistShopList = whitelistShopList.filter(shop => shop != shop_name);
    });

    whitelistShopOptionList.appendChild(clone);
}
