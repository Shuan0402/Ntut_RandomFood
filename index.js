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


