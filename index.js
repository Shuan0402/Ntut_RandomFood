function styleCheckAll() {
    const selectAllOption = document.getElementsByName("all-style-checkbox")[0];
    const options = document.getElementsByName("style-checkbox");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = selectAllOption.checked;
    }
}

function categoryCheckAll() {
    const selectAllOption = document.getElementsByName("all-category-checkbox")[0];
    const options = document.getElementsByName("category-checkbox");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = selectAllOption.checked;
    }
}

function clickDialog(dialog_id){
    let modal=document.getElementById(dialog_id);
    modal.showModal();
}

// TODO: only the top dialog should be close when there are two dialogs is open.
function dialogClose(){
    let dialogs=document.getElementsByClassName("filter-setting-modal");
    Array.from(dialogs).forEach(dialog => {
        dialog.addEventListener("click", e => {
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
