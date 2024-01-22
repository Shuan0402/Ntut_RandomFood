function styleCheckAll() {
    var option=document.getElementsByName("style-checkbox");
    if (option[0].checked){
        for (var i=1; i<option.length; i++){
            option[i].checked=true;
        }
    }
    else{
        for (var i=1; i<option.length; i++){
            option[i].checked=false;
        }
    }
}

function categoryCheckAll() {
    var option=document.getElementsByName("category-checkbox");
    if (option[0].checked){
        for (var i=1; i<option.length; i++){
            option[i].checked=true;
        }
    }
    else{
        for (var i=1; i<option.length; i++){
            option[i].checked=false;
        }
    }
}

function clickBlacklist(){
    var modal=document.getElementById("blacklist-modal");
    modal.showModal();
}