(function ($) {
    function searchTable(searchTerm){
        let hideCount = 0
        let showCount = 0
        //The header will disappear if there are no results, so it is put in display here once more terms are shown
        $(".header").show()
        //Iterates over every row except for the header row
        $("tr").not(".header").each(function(){
            let found = false;
            //Searches include every column, so checks if *any* of the columns have the search term
            for(const elem of $(this).children()){
                //This only occurs in the links section, and we don't want those to be searched because they are all the same text
                if($(elem).hasClass("excludeFromSearch")){
                    continue;
                }
                //Uses the built in includes function to check if the result should be shown
                if(elem.textContent.trim().toLowerCase().includes(searchTerm.toLowerCase())){
                    //If the column has the term, show the row and break the loop
                    $(this).show()
                    found = true;
                    showCount += 1;
                    break;
                }
            }
            //If none do, hide the row
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
        //Checks if the search term is present and alerts the user if it is not
        if(!$("#search_term").val() || !(typeof $("#search_term").val() == "string") || !$("#search_term").val().trim()){
            alert("Please fill in the search box with a term");
            return;
        }
        searchTable($("#search_term").val())
    })
    
    //Clear results actually just queries for the empty string
    $(document).on("click",".clearResults",function(event){
        event.preventDefault()
        searchTable("")
    })
})(jQuery)