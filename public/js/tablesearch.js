(function ($) {
    function searchTable(searchTerm){
        let hideCount = 0
        let showCount = 0
        $("tr").not(".header").each(function(){
            //Uses the built in includes function to check if the result should be shown
            if($(this).children()[0].textContent.trim().toLowerCase().includes(searchTerm.toLowerCase())){
                $(this).show()
                showCount += 1
            }
            else{
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