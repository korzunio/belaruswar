const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    IOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.IOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};

if (isMobile.any()) {
    document.getElementById("text_promo").classList.remove('animate__animated');
    document.getElementById("title_about_with_stars").classList.remove('animate__animated'); 
    document.getElementById("title_about").classList.remove('animate__animated');
    document.getElementById("paragraph_about_first").classList.remove('animate__animated');
    document.getElementById("paragraph_about_second").classList.remove('animate__animated');
    document.getElementById("paragraph_about_third").classList.remove('animate__animated');
    document.getElementById("paragraph_about_four").classList.remove('animate__animated');
    document.getElementById("click_block_first").classList.remove('animate__animated');
    document.getElementById("click_block_second").classList.remove('animate__animated');
    document.getElementById("image_fact_first").classList.remove('animate__animated');
    document.getElementById("image_fact_second").classList.remove('animate__animated');
    document.getElementById("defenition_promo_archive").classList.remove('animate__animated');
} else {
    document.body.classList.add('pc');
}
