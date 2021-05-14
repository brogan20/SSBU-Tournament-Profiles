(function ($) {
    function searchTable(searchTerm){
        let hideCount = 0
        let showCount = 0
        $("tr").not(".header").each(function(){
            if($(this).children()[0].textContent.trim().toLowerCase().includes(searchTerm.toLowerCase())){
                $(this).show()
                showCount += 1
            }
            else{
                $(this).hide()
                hideCount += 1
            }
        })
        showCount == 0 ? $(".noResult").show() && $(".header").hide(): $(".noResult").hide();
        hideCount != 0? $(".clearResults").show() : $(".clearResults").hide();
    }
    $(document).on("click",".search",function(event) {
        event.preventDefault()
        searchTable($("#search_term").val())
    })
    
    $(document).on("click",".clearResults",function(event){
        event.preventDefault()
        searchTable("")
    })
})(jQuery)