//Code taken from https://www.w3schools.com/howto/howto_js_sort_table.asp and modified for this use
function sortTable(sortIndex) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementsByTagName("TABLE")[0];
  switching = true;
  console.log(sortIndex)
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByClassName(sortIndex)[0];
      y = rows[i + 1].getElementsByClassName(sortIndex)[0];
      console.log(x);
      console.log(y);

      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

document.onclick = function (e) {
    e = e || window.event;
    let element = e.target;

    if(element.className == 'sortButton'){
        sortTable(element.innerHTML);
    }
}