function styleCheckAll() {
    let option=document.getElementsByName("style-checkbox");
    if (option[0].checked){
        for (let i=1; i<option.length; i++){
            option[i].checked=true;
        }
    }
    else{
        for (let i=1; i<option.length; i++){
            option[i].checked=false;
        }
    }
}

function categoryCheckAll() {
    let option=document.getElementsByName("category-checkbox");
    if (option[0].checked){
        for (let i=1; i<option.length; i++){
            option[i].checked=true;
        }
    }
    else{
        for (let i=1; i<option.length; i++){
            option[i].checked=false;
        }
    }
}

function clickBlacklist(){
    let modal=document.getElementById("blacklist-modal");
    modal.showModal();
}

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
