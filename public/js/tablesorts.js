(function ($){
  //Code taken from https://www.w3schools.com/howto/howto_js_sort_table.asp and modified for this use
  //Has an isNumeric field because numbers cannot be sorted like strings (i.e. 10 > 9, but "10" < "9")
  function sortTable(sortIndex, table, isNumeric) {
    let rows, switching, i, x, y, shouldSwitch, dir, switchcount;
    switching = true;
    dir="asc";
    switchcount = 0;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        //Finds two consecutive rows to compare
        x = rows[i].getElementsByClassName(sortIndex)[0];
        y = rows[i + 1].getElementsByClassName(sortIndex)[0];

        //If the sort is numeric, uses the float value (without special characters)
        //otherwise, just uses innerHTML to sort
        let tempx = isNumeric? parseFloat(x.innerHTML.replace("%","")) : x.innerHTML.toLowerCase();
        let tempy = isNumeric? parseFloat(y.innerHTML.replace("%","")) : y.innerHTML.toLowerCase();

        //Checks if the two rows should switch
        shouldSwitch = (tempx > tempy) ? (dir == "asc") : !(tempx == tempy) && (dir == "desc");

        //Makes the swap and continues
        if(shouldSwitch){
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          switchcount++;
          break;
        }
      }
      //If no switches were made, checks if it needs to be descending and then sorts it descendingly
      //otherwise, breaks the loop
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }

  //creates an onClick function for the sortButton and sortButtonNumeric class
  $(document).on("click",".sortButton, .sortButtonNumeric", function(){
    sortTable($(this).html(), $(this).parents()[1], $(this).attr("class") == "sortButtonNumeric");
  })

})(jQuery);