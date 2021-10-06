function getAndUpdate() {
    console.log("Updating List...");
    tit = document.getElementById('title').value;
    desc = document.getElementById('description').value;
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    } else {
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    update();
}

function update() {
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    } else {
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
    // Populate the table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        console.log(index)
        str += `
        <tr id="${index}">
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td> 
        <td class="text-center"><button id="done${index}" class="btn" onClick="done(${index})">
       
        <span id="icon${index}" class="text-blue material-icons-outlined">
done_all
</span>
      
      </button>
                <button class="btn" onclick="deleted(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor"
          class="bi bi-trash text-danger" viewBox="0 0 16 16">
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
          <path fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
        </svg>
      </button></td> 
        </tr>`;
    });
    tableBody.innerHTML = str;
}
add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();

function deleted(itemIndex) {
    console.log("Delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();

}

function clearStorage() {
    if (confirm("Do you really want to clear?")) {
        console.log('Clearing the storage')
        localStorage.clear();
        update()
    }
}

function done(idx) {
    document.getElementById(idx).style.color = "#aba";
    document.getElementById("done" + idx);
    document.getElementById("icon" + idx).innerHTML = "remove_done";
    document.getElementById("done" + idx).setAttribute("onclick", "undone(" + idx + ")");

}

function undone(idx) {
    document.getElementById(idx).style.color = "#000";
    document.getElementById("icon" + idx).innerHTML = "done_all";
    document.getElementById("done" + idx).setAttribute("onclick", "done(" + idx + ")");
}