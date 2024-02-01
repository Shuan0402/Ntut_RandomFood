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
    let dialogs=document.getElementsByClassName("filter-setting-modal");
    Array.from(dialogs).forEach(dialog => {
        dialog.addEventListener("click", e => {
            if (e.target != dialog) return;
            const dialogDimensions = dialog.getBoundingClientRect()
            if (e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom) {
                
                dialog.classList.add('hide');
                dialog.addEventListener('animationend', function(){
                    dialog.classList.remove('hide');
                    dialog.close();
                    dialog.removeEventListener('animationend',  arguments.callee, false);
                }, false);
            }
        })
    });
}

dialogClose();

function deleteShop(shop_id) {
    let divToDelete = document.getElementById(shop_id);
    divToDelete.remove();
}

function clickSideMenuButton(){
    let sideMenu = document.getElementById('side-menu-container');
    let sideMenuButton = document.getElementById('side-menu-button');
    // let sideMenuCheckbox = document.getElementById('side-menu-checkbox');

    // sideMenuCheckbox.checked = !sideMenuCheckbox.checked;
    // if(sideMenuCheckbox.checked) {

    const addSideMenuButtonShowAnimationEndHandler = () => {
        sideMenuButton.addEventListener('animationend', function() {
            sideMenuButton.classList.remove('show');
            sideMenuButton.removeEventListener('animationend',  arguments.callee, false);
        }, false);
    };
    const addSideMenuCloseAnimationEndHandler = () => {
        sideMenu.addEventListener('animationend', function() {
            sideMenu.classList.remove('close');
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
        sideMenu.classList.add('open');
        sideMenuButton.classList.add('open');
    }
}
