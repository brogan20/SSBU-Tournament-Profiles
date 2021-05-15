(function ($) {
    function openPage(evt, tab) {
        $(".tabcontent").each((i) => {
            i.style.display = "none";
        });
        $(".tablinks").each((i) => {
            i.className = i.className.replace(" active", "");
        });
        $(`#${tab}`).style.display = "block";
        evt.currentTarget.className += " active";
    }
})(jQuery)