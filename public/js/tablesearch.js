(function ($) {
    function searchTable(searchTerm){
        let hideCount = 0
        let showCount = 0
        $(".header").show()
        $("tr").not(".header").each(function(){
            //Uses the built in includes function to check if the result should be shown
            let found = false;
            for(const elem of $(this).children()){
                if($(elem).hasClass("excludeFromSearch")){
                    continue;
                }
                if(elem.textContent.trim().toLowerCase().includes(searchTerm.toLowerCase())){
                    $(this).show()
                    found = true;
                    showCount += 1;
                    break;
                }
            }
            if (!found){
                $(this).hide()
                hideCount += 1
            }
        })
        //Hides or shows relevant elements based on the results
        showCount == 0 ? $(".noResult").show() && $(".header").hide(): $(".noResult").hide();
        hideCount != 0? $(".clearResults").show() : $(".clearResults").hide();
    }

    //Base case, makes a query based on the search term
    $(document).on("click",".search",function(event) {
        event.preventDefault()
        searchTable($("#search_term").val())
    })
    
    //Clear results actually just queries for the empty string
    $(document).on("click",".clearResults",function(event){
        event.preventDefault()
        searchTable("")
    })
})(jQuery)