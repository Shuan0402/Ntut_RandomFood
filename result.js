function clickToLocationPage(){
    const linkItems = document.querySelectorAll('.link-item');

    // 設置點擊事件監聽器
    linkItems.forEach(item => {
        item.addEventListener('click', function() {
            // 導向到指定的連結，這裡以示例連結 'example.com' 為例
            window.location.href = 'https://maps.app.goo.gl/kpsrU75RpsYELd2R6';
        });
    });
}

clickToLocationPage();