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

let dialogTag;
let suggestionsTimeout;
let blacklistShopList = [];
let defaultBlacklistShopList = [];
let whitelistShopList = [];
let defaultWhitelistShopList = [];

const blacklistShopTemp = document.getElementById("blacklist-shop-template");
const blacklistShopOptionList = document.getElementById("blacklist-options");
const whitelistShopTemp = document.getElementById("whitelist-shop-template");
const whitelistShopOptionList = document.getElementById("whitelist-options");

function getShopBlackList() {
    if(dialogTag == 'Default') {
        return defaultBlacklistShopList;
    }
    else {
        return blacklistShopList;
    }
}

function addBlacklistOption(shop_name) {
    let clone = document.importNode(blacklistShopTemp.content, true);

    let shopOption = clone.querySelector(".shop-option");
    shopOption.id = "blacklist-option-" + shop_name;
    shopOption.querySelector("label").textContent = shop_name;

    let deleteButton = clone.querySelector("button");
    deleteButton.addEventListener("click", function() {
        let toDeleteShop = document.getElementById(shopOption.id);
        blacklistShopOptionList.removeChild(toDeleteShop);
        getShopBlackList() = getShopBlackList().filter(shop => shop != shop_name);
    });

    blacklistShopOptionList.appendChild(clone);
}

function getShopWhiteList() {
    if(dialogTag == 'Default') {
        return defaultWhitelistShopList;
    }
    else {
        return whitelistShopList;
    }
}

function addWhitelistOption(shop_name) {
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


function clickDialog(dialog_id, tag){
    let modal=document.getElementById(dialog_id);
    dialogTag = tag;

    modal.showModal();

    if(dialog_id == 'blacklist-modal') {
        blacklistShopOptionList.innerHTML = `<template id="blacklist-shop-template">
                                                    <div class="shop-option">
                                                        <label>shop1</label>
                                                        <button>
                                                            <img src="img/remove_button.svg" />
                                                        </button>
                                                    </div>
                                                </template>`;
        for (shop of getShopBlackList()) {
            addBlacklistOption(shop);
        }
    }
    else {
        whitelistShopOptionList.innerHTML = `<template id="whitelist-shop-template">
                                                    <div class="shop-option">
                                                        <label>shop1</label>
                                                        <button>
                                                            <img src="img/remove_button.svg" />
                                                        </button>
                                                    </div>
                                                </template>`;
        for (shop of getShopWhiteList()) {
            addWhitelistOption(shop);
        }
    }
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


function toDialogOptions(shops) {
    return shops
        .map(shop => `<label onclick="clickBlacklistOption('${shop.name}')">${shop.name}</label>`)
        .join("");
}

function addBlacklistShops() {
    clearTimeout(suggestionsTimeout);
    const blacklistOptions = document.getElementById("blacklist-searching-options");
    blacklistOptions.innerHTML = toDialogOptions(shops.filter(shop => !getShopBlackList().includes(shop.name)));
}

function removeBlacklistShops() {
    suggestionsTimeout = setTimeout(function() {
        document.getElementById("blacklist-searching-options").innerHTML = "";
    }, 300);
}

function filterBlacklistOptionShops() {
    let input = document.getElementById("blacklist-modal").getElementsByTagName("input")[0];
    const blacklistOptions = document.getElementById("blacklist-searching-options");
    blacklistOptions.innerHTML = toDialogOptions(shops.filter(shop => !getShopBlackList().includes(shop.name))
                                                    .filter(shop => shop.name.toLowerCase().includes(input.value.toLowerCase())));
}

function clickBlacklistOption(shop_name) {
    getShopBlackList().push(shop_name);
    addBlacklistOption(shop_name);
}

function addWhitelistShops() {
    clearTimeout(suggestionsTimeout);
    const whitelistOptions = document.getElementById("whitelist-searching-options");
    whitelistOptions.innerHTML = shops.filter(shop => !getShopWhiteList().includes(shop.name))
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
    whitelistOptions.innerHTML = shops.filter(shop => !getShopWhiteList().includes(shop.name))
                                    .filter(shop => shop.name.toLowerCase().includes(input.value.toLowerCase()))
                                    .map(shop => `<label onclick="clickWhitelistOption(${shop.name})">${shop.name}</label>`)
                                    .join("");
}

function clickWhitelistOption(shop_name) {
    getShopWhiteList().push(shop_name);
    addWhitelistOption(shop_name)
}