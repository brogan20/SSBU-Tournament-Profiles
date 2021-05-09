//Code taken from https://www.w3schools.com/howto/howto_js_sort_table.asp and modified for this use
function sortTable(sortIndex) {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount;
  table = document.getElementsByTagName("TABLE")[0];
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

      if(dir=="asc"){
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else{
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      console.log('hello')
      switchcount++;
    }
    else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        console.log('hello2')
        switching = true;
      }
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