//Code taken from https://www.w3schools.com/howto/howto_js_sort_table.asp and modified for this use
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
      x = rows[i].getElementsByClassName(sortIndex)[0];
      y = rows[i + 1].getElementsByClassName(sortIndex)[0];

      tempx = isNumeric? parseFloat(x.innerHTML.replace("%","")) : x.innerHTML.toLowerCase();
      tempy = isNumeric? parseFloat(y.innerHTML.replace("%","")) : y.innerHTML.toLowerCase();
      shouldSwitch = (tempx > tempy) ? (dir == "asc") : (dir == "desc");
      if(shouldSwitch){
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
        break;
      }
    }
    if(!shouldSwitch) {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

document.onclick = function (e) {
    e = e || window.event;
    let element = e.target;

    if(element.className == 'sortButton'){
      sortTable(element.innerHTML, element.parentElement.parentElement, false);
    }
    if(element.className == 'sortButtonNumeric'){
      sortTable(element.innerHTML, element.parentElement.parentElement, true);
    }
}